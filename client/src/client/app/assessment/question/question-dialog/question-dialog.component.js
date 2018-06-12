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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var question_container_directive_1 = require("../question-template/question-container.directive");
var question_decorator_1 = require("../question-template/question.decorator");
var QuestionDialog = (function (_super) {
    __extends(QuestionDialog, _super);
    function QuestionDialog(componentFactoryResolver, changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.changeDetectionRef = changeDetectionRef;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    QuestionDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
        }
    };
    QuestionDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            group_model_1.Group.listQuestionGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
            var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(object.type);
            var viewContainerRef = _this.questionHost.viewContainerRef;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'edit';
                _this.componentRef.instance.render(object);
            }
            else {
                viewContainerRef.clear();
                _this.componentRef = null;
            }
        });
        this.onUpdateComplete.subscribe(function (object) {
            if (_this.componentRef)
                _this.componentRef.instance.saveEditor().subscribe(function () {
                    _this.success(_this.translateService.instant('Question saved.'));
                });
        });
        this.onCreateComplete.subscribe(function (object) {
            if (_this.componentRef)
                _this.componentRef.instance.saveEditor().subscribe(function () {
                    _this.success(_this.translateService.instant('Question saved.'));
                });
        });
    };
    __decorate([
        core_1.ViewChild(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", question_container_directive_1.QuestionContainerDirective)
    ], QuestionDialog.prototype, "questionHost", void 0);
    QuestionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-dialog',
            templateUrl: 'question-dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], QuestionDialog);
    return QuestionDialog;
}(base_dialog_1.BaseDialog));
exports.QuestionDialog = QuestionDialog;
//# sourceMappingURL=question-dialog.component.js.map