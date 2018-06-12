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
var Rx_1 = require("rxjs/Rx");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var socket_service_1 = require("../../../shared/services/socket.service");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var course_unit_dialog_component_1 = require("../course-unit-dialog/course-unit-dialog.component");
var course_unit_preview_dialog_component_1 = require("../course-unit-preview-dialog/course-unit-preview-dialog.component");
var course_setting_dialog_component_1 = require("../course-setting/course-setting.dialog.component");
var _ = require("underscore");
var ticket_model_1 = require("../../../shared/models/ticket/ticket.model");
var workflow_service_1 = require("../../../shared/services/workflow.service");
var CourseSyllabusDialog = (function (_super) {
    __extends(CourseSyllabusDialog, _super);
    function CourseSyllabusDialog(socketService, workflowService) {
        var _this = _super.call(this) || this;
        _this.socketService = socketService;
        _this.workflowService = workflowService;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
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
        _this.user = _this.authService.UserProfile;
        return _this;
    }
    CourseSyllabusDialog.prototype.show = function (syl) {
        this.onShowReceiver.next();
        this.display = true;
        this.syl = syl;
        this.buildCourseTree();
    };
    CourseSyllabusDialog.prototype.checkWorkflow = function () {
        var _this = this;
        course_model_1.Course.get(this, this.syl.course_id).subscribe(function (course) {
            _this.course = course;
            _this.allowToChangeState = !_this.course.supervisor_id ||
                _this.user.IsSuperAdmin;
        });
        ticket_model_1.Ticket.byWorkflowObject(this, this.syl.id, course_syllabus_model_1.CourseSyllabus.Model).subscribe(function (ticket) {
            _this.openTicket = ticket;
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
        });
    };
    CourseSyllabusDialog.prototype.editUnit = function () {
        var _this = this;
        if (this.selectedNode) {
            this.unitDialog.show(this.selectedNode.data);
            this.unitDialog.onUpdateComplete.subscribe(function () {
                _this.buildCourseTree();
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
                });
            });
        }
    };
    CourseSyllabusDialog.prototype.hide = function () {
        this.clearSelection();
        this.display = false;
        this.onHideReceiver.next();
    };
    CourseSyllabusDialog.prototype.moveUp = function () {
        var _this = this;
        if (this.selectedNode) {
            var unit = this.selectedNode.data;
            this.sylUtils.moveUp(this.tree, this.selectedNode);
            course_unit_model_1.CourseUnit.updateArray(this, this.units).subscribe(function () {
                _this.success('Move sucessfully');
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
    CourseSyllabusDialog.prototype.submitForReview = function () {
        this.workflowService.createCourseSyllabusPublishTicket(this, this.syl).subscribe(function (ticket) {
        });
    };
    CourseSyllabusDialog.prototype.updateStatus = function () {
        var _this = this;
        this.syl.save(this).subscribe(function () {
            _this.success(_this.translateService.instant('Syllabus status updated'));
        });
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
            templateUrl: 'course-syllabus.dialog.component.html',
            styleUrls: ['course-syllabus.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [socket_service_1.WebSocketService, workflow_service_1.WorkflowService])
    ], CourseSyllabusDialog);
    return CourseSyllabusDialog;
}(base_component_1.BaseComponent));
exports.CourseSyllabusDialog = CourseSyllabusDialog;
//# sourceMappingURL=course-syllabus.dialog.component.js.map