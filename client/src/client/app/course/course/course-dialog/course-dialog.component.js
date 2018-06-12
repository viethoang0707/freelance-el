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
var socket_service_1 = require("../../../shared/services/socket.service");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var ticket_model_1 = require("../../../shared/models/ticket/ticket.model");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var workflow_service_1 = require("../../../shared/services/workflow.service");
var select_competency_level_dialog_component_1 = require("../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component");
var CourseDialog = (function (_super) {
    __extends(CourseDialog, _super);
    function CourseDialog(socketService, workflowService) {
        var _this = _super.call(this) || this;
        _this.socketService = socketService;
        _this.workflowService = workflowService;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.courseStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        _this.allowToChangeState = false;
        _this.user = _this.authService.UserProfile;
        return _this;
    }
    CourseDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
        }
    };
    CourseDialog.prototype.selectAuthor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(function (users) {
            if (users.length > 1) {
                _this.error('You can select only one author.');
                return;
            }
            else if (users.length == 1) {
                var author = users[0];
                _this.object.author_id = author.id;
                _this.object.author_name = author.name;
            }
        });
    };
    CourseDialog.prototype.selectCompetencyLevel = function () {
        var _this = this;
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.subscribe(function (level) {
            _this.object.competency_level_id = level.id;
            _this.object.competency_level_name = level.name;
            _this.object.competency_id = level.competency_id;
            _this.object.competency_name = level.competency_name;
        });
    };
    CourseDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.id)
                ticket_model_1.Ticket.byWorkflowObject(_this, object.id, course_model_1.Course.Model).subscribe(function (ticket) {
                    _this.openTicket = ticket;
                });
            object.supervisor_id = _this.authService.UserProfile.id;
            _this.checkWorkflow(object);
            _this.buildCourseTree(object);
        });
        this.onCreateComplete.subscribe(function (object) {
            if (_this.submitForReview)
                _this.review();
        });
        this.onUpdateComplete.subscribe(function (object) {
            if (_this.submitForReview)
                _this.review();
        });
    };
    CourseDialog.prototype.checkWorkflow = function (object) {
        this.allowToChangeState = !object.supervisor_id ||
            this.user.IsSuperAdmin ||
            (this.user.id != object.supervisor_id);
    };
    CourseDialog.prototype.buildCourseTree = function (object) {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
            if (object.group_id) {
                _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
            }
        });
    };
    CourseDialog.prototype.review = function () {
        this.workflowService.createCoursePublishTicket(this, this.object).subscribe(function (ticket) {
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseDialog.prototype, "usersDialog", void 0);
    __decorate([
        core_1.ViewChild(select_competency_level_dialog_component_1.SelectCompetencyLevelDialog),
        __metadata("design:type", select_competency_level_dialog_component_1.SelectCompetencyLevelDialog)
    ], CourseDialog.prototype, "competencyLevelDialog", void 0);
    CourseDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-dialog',
            templateUrl: 'course-dialog.component.html',
        }),
        __metadata("design:paramtypes", [socket_service_1.WebSocketService, workflow_service_1.WorkflowService])
    ], CourseDialog);
    return CourseDialog;
}(base_dialog_1.BaseDialog));
exports.CourseDialog = CourseDialog;
//# sourceMappingURL=course-dialog.component.js.map