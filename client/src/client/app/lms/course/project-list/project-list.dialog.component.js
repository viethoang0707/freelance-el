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
var constants_1 = require("../../../shared/models/constants");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var project_manage_dialog_component_1 = require("../project-manage/project-manage.dialog.component");
var project_content_dialog_component_1 = require("../../../cms/project/content-dialog/project-content.dialog.component");
var router_1 = require("@angular/router");
var ProjectListDialog = (function (_super) {
    __extends(ProjectListDialog, _super);
    function ProjectListDialog(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.display = false;
        _this.courseClass = new course_class_model_1.CourseClass();
        _this.projects = [];
        return _this;
    }
    ProjectListDialog.prototype.show = function (courseClass) {
        this.display = true;
        this.courseClass = courseClass;
        this.loadProjects();
    };
    ProjectListDialog.prototype.loadProjects = function () {
        var _this = this;
        project_model_1.Project.listByClass(this, this.courseClass.id).subscribe(function (projects) {
            _this.projects = projects;
        });
    };
    ProjectListDialog.prototype.hide = function () {
        this.display = false;
    };
    ProjectListDialog.prototype.addProject = function () {
        var _this = this;
        var project = new project_model_1.Project();
        project.class_id = this.courseClass.id;
        project.course_id = this.courseClass.course_id;
        this.projectContentDialog.show(project);
        this.projectContentDialog.onCreateComplete.subscribe(function () {
            _this.loadProjects();
        });
    };
    ProjectListDialog.prototype.editProject = function () {
        if (this.selectedProject) {
            this.projectContentDialog.show(this.selectedProject);
        }
    };
    ProjectListDialog.prototype.deleteProject = function () {
        var _this = this;
        if (this.selectedProject) {
            this.confirm('Are you sure to delete ?', function () {
                _this.selectedProject.delete(_this).subscribe(function () {
                    _this.success('Project deleted');
                    _this.loadProjects();
                });
            });
        }
    };
    ProjectListDialog.prototype.markProject = function () {
        if (this.selectedProject)
            this.projectManageDialog.show(this.selectedProject);
    };
    __decorate([
        core_1.ViewChild(project_content_dialog_component_1.ProjectContentDialog),
        __metadata("design:type", project_content_dialog_component_1.ProjectContentDialog)
    ], ProjectListDialog.prototype, "projectContentDialog", void 0);
    __decorate([
        core_1.ViewChild(project_manage_dialog_component_1.ProjectManageDialog),
        __metadata("design:type", project_manage_dialog_component_1.ProjectManageDialog)
    ], ProjectListDialog.prototype, "projectManageDialog", void 0);
    ProjectListDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-list-dialog',
            templateUrl: 'project-list.dialog.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ProjectListDialog);
    return ProjectListDialog;
}(base_component_1.BaseComponent));
exports.ProjectListDialog = ProjectListDialog;
//# sourceMappingURL=project-list.dialog.component.js.map