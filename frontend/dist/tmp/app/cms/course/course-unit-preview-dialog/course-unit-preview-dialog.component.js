"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var unit_decorator_1 = require("../course-unit-template/unit.decorator");
var unit_container_directive_1 = require("../course-unit-template/unit-container.directive");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var CourseUnitPreviewDialog = (function (_super) {
    __extends(CourseUnitPreviewDialog, _super);
    function CourseUnitPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        return _this;
    }
    CourseUnitPreviewDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(object.type);
            var viewContainerRef = _this.unitHost.viewContainerRef;
            _this.nameUnit = object.name;
            course_syllabus_model_1.CourseSyllabus.get(_this, object.syllabus_id).subscribe(function (syl) {
                course_unit_model_1.CourseUnit.listBySyllabus(_this, syl.id).subscribe(function (units) {
                    _this.tree = _this.sylUtils.buildGroupTree(units);
                    _this.treeList = _this.sylUtils.flattenTree(_this.tree);
                });
            });
            _this.selectedUnit = object;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'preview';
                _this.componentRef.instance.render(object);
            }
            else {
                viewContainerRef.clear();
                _this.componentRef = null;
            }
        });
        this.onHide.subscribe(function () {
            var viewContainerRef = _this.unitHost.viewContainerRef;
            if (viewContainerRef)
                viewContainerRef.clear();
        });
    };
    CourseUnitPreviewDialog.prototype.nextUnitPreview = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
        this.selectedUnit = this.computedNextUnit(this.selectedUnit);
        if (!this.selectedUnit)
            return;
        this.selectedUnit = this.selectedUnit;
        var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
        this.nameUnit = this.selectedUnit.name;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'preview';
            this.componentRef.instance.render(this.selectedUnit);
        }
        else {
            viewContainerRef.clear();
            this.componentRef = null;
        }
    };
    CourseUnitPreviewDialog.prototype.prevUnitPreview = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
        this.selectedUnit = this.computedPrevUnit(this.selectedUnit);
        if (!this.selectedUnit)
            return;
        var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
        this.nameUnit = this.selectedUnit.name;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'preview';
            this.componentRef.instance.render(this.selectedUnit);
        }
        else {
            viewContainerRef.clear();
            this.componentRef = null;
        }
    };
    CourseUnitPreviewDialog.prototype.computedNextUnit = function (unit) {
        var currentNodeIndex = 0;
        if (unit)
            for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
                var node = this.treeList[currentNodeIndex];
                if (node.data.id == unit.id)
                    break;
            }
        currentNodeIndex++;
        while (currentNodeIndex < this.treeList.length) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex++;
        }
        return (currentNodeIndex < this.treeList.length ? this.treeList[currentNodeIndex].data : null);
    };
    CourseUnitPreviewDialog.prototype.computedPrevUnit = function (unit) {
        var currentNodeIndex = 0;
        if (unit)
            for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
                var node = this.treeList[currentNodeIndex];
                if (node.data.id == unit.id)
                    break;
            }
        currentNodeIndex--;
        while (currentNodeIndex >= 0) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex--;
        }
        return (currentNodeIndex >= 0 ? this.treeList[currentNodeIndex].data : null);
    };
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseUnitPreviewDialog.prototype, "unitHost", void 0);
    CourseUnitPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-unit-preview-dialog',
            template: "<form novalidate (ngSubmit)=\"save()\" #f=\"ngForm\" autocomplete=\"off\">   <p-dialog header=\"{{nameUnit}}\" [(visible)]=\"display\" modal=\"true\" [responsive]=\"true\" width=\"1000\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%'}\">       <div class=\"ui-g ui-fluid form-group\">         <div class=\"ui-g-12 ui-md-12 ui-lg-12\">           <ng-template course-unit-container></ng-template>         </div>       </div>     </p-scrollPanel>     <p-footer>       <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous'|translate}}\"         (click)=\"prevUnitPreview()\"></button>       <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" iconPos=\"right\" title=\"{{'Next'|translate}}\" label=\"{{'Next'|translate}}\"         (click)=\"nextUnitPreview()\"></button>       <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>   </p-dialog> </form>",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], CourseUnitPreviewDialog);
    return CourseUnitPreviewDialog;
}(base_dialog_1.BaseDialog));
exports.CourseUnitPreviewDialog = CourseUnitPreviewDialog;
