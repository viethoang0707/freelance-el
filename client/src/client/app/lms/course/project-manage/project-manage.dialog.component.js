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
var base_component_1 = require("../../../shared/components/base/base.component");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var project_marking_dialog_component_1 = require("../project-marking/project-marking.dialog.component");
var ProjectManageDialog = (function (_super) {
    __extends(ProjectManageDialog, _super);
    function ProjectManageDialog() {
        var _this = _super.call(this) || this;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.project = new project_model_1.Project();
        return _this;
    }
    ProjectManageDialog.prototype.show = function (project) {
        var _this = this;
        this.project = project;
        this.display = true;
        project_submission_model_1.ProjectSubmission.listByProject(this, project.id).subscribe(function (submits) {
            _this.scoreRecords = submits;
            _this.loadScores();
        });
    };
    ProjectManageDialog.prototype.mark = function () {
        if (this.selectedRecord && this.selectedRecord['submit'])
            this.projectMarkDialog.show(this.selectedRecord['submit']);
    };
    ProjectManageDialog.prototype.loadScores = function () {
        var _this = this;
        course_class_model_1.CourseClass.get(this, this.project.class_id).subscribe(function (clazz) {
            course_member_model_1.CourseMember.listByClass(_this, clazz.id).subscribe(function (members) {
                _this.scoreRecords = members;
                _.each(members, function (member) {
                    var submit = _.find(_this.scoreRecords, function (submit) {
                        return submit.member_id == member.id;
                    });
                    member["submit"] = submit;
                    if (submit) {
                        if (submit.score != null) {
                            member["score"] = submit.score;
                            member["date_submit"] = submit.date_submit;
                        }
                        else {
                            member["score"] = '';
                            member["date_submit"] = '';
                        }
                    }
                });
            });
        });
    };
    ProjectManageDialog.prototype.hide = function () {
        this.display = false;
    };
    __decorate([
        core_1.ViewChild(project_marking_dialog_component_1.ProjectMarkingDialog),
        __metadata("design:type", project_marking_dialog_component_1.ProjectMarkingDialog)
    ], ProjectManageDialog.prototype, "projectMarkDialog", void 0);
    ProjectManageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-manage-dialog',
            templateUrl: 'project-manage.dialog.component.html',
            styleUrls: ['project-manage.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], ProjectManageDialog);
    return ProjectManageDialog;
}(base_component_1.BaseComponent));
exports.ProjectManageDialog = ProjectManageDialog;
//# sourceMappingURL=project-manage.dialog.component.js.map