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
var course_unit_dialog_component_1 = require("../course-unit-dialog/course-unit-dialog.component");
var course_unit_preview_dialog_component_1 = require("../course-unit-preview-dialog/course-unit-preview-dialog.component");
var course_setting_dialog_component_1 = require("../course-setting/course-setting.dialog.component");
var _ = require("underscore");
var CourseSyllabusDialog = (function (_super) {
    __extends(CourseSyllabusDialog, _super);
    function CourseSyllabusDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.items = [
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['folder']), command: function () { _this.addUnit('folder'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['html']), command: function () { _this.addUnit('html'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['slide']), command: function () { _this.addUnit('slide'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['video']), command: function () { _this.addUnit('video'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['exercise']), command: function () { _this.addUnit('exercise'); } },
            { label: _this.translateService.instant(constants_1.COURSE_UNIT_TYPE['scorm']), command: function () { _this.addUnit('scorm'); } },
        ];
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.courseStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    CourseSyllabusDialog.prototype.show = function (course) {
        var _this = this;
        this.display = true;
        this.display = true;
        this.course = course;
        course_syllabus_model_1.CourseSyllabus.get(this, course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            _this.buildCourseTree();
        });
    };
    CourseSyllabusDialog.prototype.clearSelection = function () {
        this.selectedNode = null;
        this.selectedUnit = null;
    };
    CourseSyllabusDialog.prototype.buildCourseTree = function () {
        var _this = this;
        if (this.syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(this, this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
            });
        }
    };
    CourseSyllabusDialog.prototype.showSetting = function () {
        this.settingDialog.show(this.course);
    };
    CourseSyllabusDialog.prototype.addUnit = function (type) {
        var _this = this;
        if (type != 'folder' && (!this.selectedNode || this.selectedNode.data.type != 'folder')) {
            this.error(this.translateService.instant('You need to select a folder.'));
            return;
        }
        var maxOrder = this.selectedNode ? this.selectedNode.children.length : this.tree.length;
        var unit = new course_unit_model_1.CourseUnit();
        unit.syllabus_id = this.syl.id;
        unit.icon = constants_1.COURSE_UNIT_ICON[type];
        unit.type = type;
        unit.name = 'New unit';
        unit.parent_id = this.selectedNode ? this.selectedNode.data.id : null;
        unit.order = maxOrder;
        unit.save(this).subscribe(function () {
            if (_this.selectedNode)
                _this.sylUtils.addChildNode(_this.selectedNode, unit);
            else
                _this.sylUtils.addRootNode(_this.tree, unit);
            _this.lmsProfileService.clearCourseContent(_this.course.id);
        });
    };
    CourseSyllabusDialog.prototype.editUnit = function () {
        var _this = this;
        if (this.selectedNode) {
            this.unitDialog.show(this.selectedNode.data);
            this.unitDialog.onUpdateComplete.subscribe(function () {
                _this.buildCourseTree();
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.deleteUnit = function () {
        var _this = this;
        if (this.selectedNode) {
            if (this.selectedNode.children.length) {
                this.error(this.translateService.instant('Cannot delete non-empty folder'));
                return;
            }
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedNode.data.delete(_this).subscribe(function () {
                    _this.buildCourseTree();
                    _this.selectedNode = null;
                    _this.lmsProfileService.clearCourseContent(_this.course.id);
                });
            });
        }
    };
    CourseSyllabusDialog.prototype.hide = function () {
        this.clearSelection();
        this.display = false;
    };
    CourseSyllabusDialog.prototype.moveUp = function () {
        var _this = this;
        if (this.selectedNode) {
            var unit = this.selectedNode.data;
            this.sylUtils.moveUp(this.tree, this.selectedNode);
            course_unit_model_1.CourseUnit.updateArray(this, this.units).subscribe(function () {
                _this.success('Move sucessfully');
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.moveDown = function () {
        var _this = this;
        if (this.selectedNode) {
            var unit = this.selectedNode.data;
            this.sylUtils.moveDown(this.tree, this.selectedNode);
            course_unit_model_1.CourseUnit.updateArray(this, this.units).subscribe(function () {
                _this.success('Move sucessfully');
                _this.lmsProfileService.clearCourseContent(_this.course.id);
            });
        }
    };
    CourseSyllabusDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            if (this.selectedUnit && this.selectedUnit.id == this.selectedNode.data.id) {
                this.clearSelection();
            }
            else
                this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseSyllabusDialog.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.selectedNode.data.course_id = this.course.id;
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    __decorate([
        core_1.ViewChild(course_unit_dialog_component_1.CourseUnitDialog),
        __metadata("design:type", course_unit_dialog_component_1.CourseUnitDialog)
    ], CourseSyllabusDialog.prototype, "unitDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseSyllabusDialog.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(course_setting_dialog_component_1.CourseSettingDialog),
        __metadata("design:type", course_setting_dialog_component_1.CourseSettingDialog)
    ], CourseSyllabusDialog.prototype, "settingDialog", void 0);
    CourseSyllabusDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-syllabus-dialog',
            template: "<p-dialog header=\"{{'Course syllabus'|translate}}: {{syl.name}}\" [(visible)]=\"display\" modal=\"false\"   [height]=\"WINDOW_HEIGHT\"  positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12 course-syllabus-dialog\" [responsive]=\"true\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g\">     <div class=\"ui-g-12 course-syllabus\">       <p-toolbar>         <div class=\"ui-toolbar-group-left mt5\">           <p-splitButton label=\"{{'Add'|translate}}\" icon=\"ui-icon-add\" [model]=\"items\" styleClass=\"ui-button-success\"></p-splitButton>           <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editUnit()\" *ngIf=\"selectedNode\"></button>           <button pButton type=\"button\" pTooltip=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteUnit()\" *ngIf=\"selectedNode\" label=\"{{'Delete'|translate}}\"></button>         </div>         <div class=\"ui-toolbar-group-right\">           <button pButton type=\"button\" pTooltip=\"{{'Setting'|translate}}\" class=\"orange-btn\" icon=\"ui-icon-settings\" (click)=\"showSetting()\" label=\"{{'Setting'|translate}}\"></button>         </div>       </p-toolbar>       <div class=\"ui-g-4\" style=\"padding: 10px 10px 0 0\">         <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\" styleClass=\"tree-unit-course-syllabus\"></p-tree>       </div>       <div class=\"ui-g-8\" style=\"padding: 10px 0 0\" *ngIf=\"selectedUnit\">         <div class=\"card course-syllabus-unit\">           <div class=\"image-box-content\">             <div>               <h3 class=\"removeMT\">{{selectedUnit.name}}</h3>               <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type]|translate}}</span>             </div>             <div class=\"image-box-footer\">               <button pButton type=\"button\" label=\"{{'Move up'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-arrow-upward\" (click)=\"moveUp()\"></button>               <button pButton type=\"button\" label=\"{{'Move down'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-arrow-downward\" (click)=\"moveDown()\"></button>               <button pButton type=\"button\" icon=\"ui-icon-remove-red-eye\" title=\"{{'Preview'| translate}}\" label=\"{{'Preview'|translate}}\" class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"previewUnit()\" *ngIf=\"selectedUnit.type!='folder'\"></button>             </div>           </div>         </div>       </div>     </div>   </div>   <course-setting-dialog></course-setting-dialog>   <course-unit-dialog></course-unit-dialog>   <course-unit-preview-dialog></course-unit-preview-dialog>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".image-box-footer{margin-top:10px}.course-syllabus-unit{height:398px;margin-bottom:0}"],
        }),
        __metadata("design:paramtypes", [])
    ], CourseSyllabusDialog);
    return CourseSyllabusDialog;
}(base_component_1.BaseComponent));
exports.CourseSyllabusDialog = CourseSyllabusDialog;
