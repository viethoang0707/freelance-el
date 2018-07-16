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
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var course_unit_preview_dialog_component_1 = require("../course-unit-preview-dialog/course-unit-preview-dialog.component");
var _ = require("underscore");
var base_model_1 = require("../../../shared/models/base.model");
var CoursePublishDialog = (function (_super) {
    __extends(CoursePublishDialog, _super);
    function CoursePublishDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.contentStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        return _this;
    }
    CoursePublishDialog.prototype.show = function (course) {
        var _this = this;
        this.display = true;
        this.course = course;
        course_syllabus_model_1.CourseSyllabus.get(this, course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            _this.buildCourseTree();
        });
    };
    CoursePublishDialog.prototype.clearSelection = function () {
        this.selectedNode = null;
        this.selectedUnit = null;
    };
    CoursePublishDialog.prototype.buildCourseTree = function () {
        var _this = this;
        if (this.syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(this, this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
            });
        }
    };
    CoursePublishDialog.prototype.hide = function () {
        this.clearSelection();
        this.display = false;
    };
    CoursePublishDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
                this.clearSelection();
            }
            else
                this.selectedUnit = this.selectedNode.data;
        }
    };
    CoursePublishDialog.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.selectedNode.data.course_id = this.course.id;
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    CoursePublishDialog.prototype.save = function () {
        var _this = this;
        var saveApiList = _.map(this.units, function (unit) {
            return unit.__api__update();
        });
        saveApiList.push(this.syl.__api__update());
        base_model_1.BaseModel.bulk_update.apply(base_model_1.BaseModel, [this].concat(saveApiList)).subscribe(function () {
            _this.hide();
        });
    };
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CoursePublishDialog.prototype, "unitPreviewDialog", void 0);
    CoursePublishDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-publish-dialog',
            template: "<p-dialog header=\"{{'Course syllabus'|translate}}: {{syl.name}}\" [(visible)]=\"display\" modal=\"false\" width=\"1000\" [responsive]=\"true\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <p-selectButton [options]=\"contentStatus\" [(ngModel)]=\"syl.status\" name=\"status\"></p-selectButton>         </div>         <div class=\"ui-g-12 course-syllabus\">             <div class=\"ui-g-4\" style=\"padding: 10px 10px 0 0\">                 <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\" styleClass=\"tree-unit-course-syllabus\"></p-tree>             </div>             <div class=\"ui-g-8\" style=\"padding: 10px 0 0\" *ngIf=\"selectedUnit\">                 <div class=\"card course-syllabus-unit\">                     <div class=\"image-box-content\">                         <div>                             <div class=\"ui-g-12\">                                 <p-selectButton [options]=\"contentStatus\" [(ngModel)]=\"selectedUnit.status\" name=\"unitStatus\"></p-selectButton>                             </div>                             <h3 class=\"removeMT\">{{selectedUnit.name}}</h3>                             <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type]|translate}}</span>                         </div>                         <div class=\"image-box-footer\">                              <div class=\"ui-g-12\">                                 <button pButton type=\"button\" icon=\"ui-icon-remove-red-eye\" title=\"{{'Preview'| translate}}\" label=\"{{'Preview'|translate}}\"                                     class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"previewUnit()\" *ngIf=\"selectedUnit.type!='folder'\"></button>                             </div>                         </div>                     </div>                 </div>             </div>         </div>     </div>     <course-unit-preview-dialog></course-unit-preview-dialog>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"{{'Save'|translate}}\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
            styles: [".image-box-footer{margin-top:10px}.course-syllabus-unit{height:398px;margin-bottom:0}"],
        }),
        __metadata("design:paramtypes", [])
    ], CoursePublishDialog);
    return CoursePublishDialog;
}(base_component_1.BaseComponent));
exports.CoursePublishDialog = CoursePublishDialog;
