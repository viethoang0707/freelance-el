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
var common_1 = require("@angular/common");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var time_pipe_1 = require("../../../shared/pipes/time.pipe");
var gradebook_dialog_component_1 = require("../gradebook/gradebook.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var lms_profile_dialog_component_1 = require("../../course/lms-profile/lms-profile-dialog.component");
var router_1 = require("@angular/router");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var exam_dialog_component_1 = require("../../../assessment/exam/exam-dialog/exam-dialog.component");
var project_manage_dialog_component_1 = require("../project-manage/project-manage.dialog.component");
var project_content_dialog_component_1 = require("../../../cms/project/content-dialog/project-content.dialog.component");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var class_exam_enroll_dialog_component_1 = require("../class-exam-enroll/class-exam-enroll.dialog.component");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var survey_model_1 = require("../../../shared/models/elearning/survey.model");
var survey_dialog_component_1 = require("../../../assessment/survey/survey-dialog/survey-dialog.component");
var survey_content_dialog_component_1 = require("../../../cms/survey/content-dialog/survey-content.dialog.component");
var class_survey_enroll_dialog_component_1 = require("../class-survey-enroll/class-survey-enroll.dialog.component");
var survey_stats_dialog_component_1 = require("../../survey/survey-stats/survey-stats.dialog.component");
var class_member_activity_dialog_component_1 = require("../class-member-activity/class-member-activity.dialog.component");
var ClassManageComponent = (function (_super) {
    __extends(ClassManageComponent, _super);
    function ClassManageComponent(router, route, datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.viewModes = [
            { value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
            { value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
        ];
        _this.viewModes = _this.viewModes.map(function (viewMode) {
            return {
                label: viewMode.title,
                value: viewMode.value,
            };
        });
        _this.classSurveys = [];
        _this.classExams = [];
        return _this;
    }
    ClassManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            var classId = +params['classId'];
            _this.memberId = +params['memberId'];
            _this.viewMode = "outline";
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.courseClass = _this.lmsProfileService.classById(classId);
                _this.course = _this.lmsProfileService.courseById(courseId);
                _this.classExams = _this.lmsProfileService.examsByClass(classId) || [];
                _this.classSurveys = _this.lmsProfileService.surveysByClass(classId) || [];
                _this.lmsProfileService.getClassContent(classId).subscribe(function (classContent) {
                    _this.projects = classContent["projects"];
                    base_model_1.BaseModel.bulk_search(_this, course_member_model_1.CourseMember.__api__listByClass(classId), course_certificate_model_1.Certificate.__api__listByClass(classId), log_model_1.CourseLog.__api__classActivity(classId))
                        .subscribe(function (jsonArr) {
                        _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
                        _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[1]);
                        _this.logs = log_model_1.CourseLog.toArray(jsonArr[2]);
                        _this.lmsProfileService.getCourseContent(courseId).subscribe(function (courseContent) {
                            _this.courseUnits = courseContent["units"];
                            _this.loadMemberStats(_this.logs);
                        });
                    });
                });
            });
        });
    };
    ClassManageComponent.prototype.viewChart = function (record) {
        this.memberActivityChart.show(record);
    };
    ClassManageComponent.prototype.viewGradebook = function () {
        if (this.selectedRecord)
            this.gradebookDialog.show(this.selectedRecord);
    };
    ClassManageComponent.prototype.viewLMSProfile = function () {
        if (this.selectedRecord)
            this.lmsProfileDialog.show(this.selectedRecord);
    };
    ClassManageComponent.prototype.loadMemberStats = function (logs) {
        var _this = this;
        this.studentRecords = _.filter(this.courseMembers, function (member) {
            return member.role == 'student';
        });
        var totalUnit = this.course.unit_count;
        _.each(this.studentRecords, (function (record) {
            var certificate = _.find(_this.certificates, function (cert) {
                return cert.member_id == record["id"];
            });
            if (certificate)
                record["certificate"] = certificate.name;
            else
                record["certificate"] = '';
            var memberLogs = _.filter(logs, function (log) {
                return log.member_id == record["id"];
            });
            var result = _this.reportUtils.analyzeCourseMemberActivity(memberLogs);
            if (result[0])
                record["first_attempt"] = _this.datePipe.transform(result[0], constants_1.EXPORT_DATETIME_FORMAT);
            if (result[1])
                record["last_attempt"] = _this.datePipe.transform(result[1], constants_1.EXPORT_DATETIME_FORMAT);
            record["time_spent"] = _this.timePipe.transform(+result[2], 'min');
            if (totalUnit)
                record["completion"] = Math.floor(+result[3] * 100 / +totalUnit);
            else
                record["completion"] = 0;
            record["logs"] = memberLogs;
        }));
    };
    ClassManageComponent.prototype.checkUnitComplete = function (record, unit) {
        var log = _.find(record["logs"], function (log) {
            return log.res_model == course_unit_model_1.CourseUnit.Model && log.res_id == unit.id && log.code == 'COMPLETE_COURSE_UNIT';
        });
        if (log)
            return 'Finished';
        else
            return 'Unfinished';
    };
    ClassManageComponent.prototype.addProject = function () {
        var _this = this;
        var project = new project_model_1.Project();
        project.class_id = this.courseClass.id;
        project.course_id = this.courseClass.course_id;
        this.projectContentDialog.show(project);
        this.projectContentDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addProject(project);
            _this.lmsProfileService.getClassContent(_this.courseClass.id).subscribe(function (content) {
                _this.projects = content["projects"];
            });
        });
    };
    ClassManageComponent.prototype.editProject = function () {
        this.projectContentDialog.show(this.selectedProject);
    };
    ClassManageComponent.prototype.deleteProject = function () {
        var _this = this;
        this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
            _this.selectedProject.delete(_this).subscribe(function () {
                _this.success(_this.translateService.instant('Project deleted'));
                _this.lmsProfileService.removeProject(_this.selectedProject);
                _this.lmsProfileService.getClassContent(_this.courseClass.id).subscribe(function (content) {
                    _this.projects = content["projects"];
                });
            });
        });
    };
    ClassManageComponent.prototype.markProject = function () {
        this.projectManageDialog.show(this.selectedProject);
    };
    ClassManageComponent.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.is_public = false;
        exam.supervisor_id = this.ContextUser.id;
        exam.course_class_id = this.courseClass.id;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addExam(exam).subscribe(function () {
                _this.classExams = _this.lmsProfileService.examsByClass(_this.courseClass.id) || [];
            });
        });
    };
    ClassManageComponent.prototype.editExam = function () {
        this.examDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.enrollExam = function () {
        this.examEnrollDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.manageExam = function () {
        var supervisor = this.lmsProfileService.getExamMemberByRole('supervisor', this.selectedClassExam.id);
        var teacher = this.lmsProfileService.getExamMemberByRole('teacher', this.selectedClassExam.id);
        if (supervisor || teacher)
            this.router.navigate(['/lms/exams/manage', this.selectedClassExam.id, supervisor.id]);
    };
    ClassManageComponent.prototype.editExamContent = function () {
        this.examContentDialog.show(this.selectedClassExam);
    };
    ClassManageComponent.prototype.enrollSurvey = function () {
        this.enrollDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.addSurvey = function () {
        var _this = this;
        var survey = new survey_model_1.Survey();
        survey.is_public = false;
        survey.supervisor_id = this.ContextUser.id;
        survey.course_class_id = this.courseClass.id;
        this.surveyDialog.show(survey);
        this.surveyDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addSurvey(survey).subscribe(function () {
                _this.classSurveys = _this.lmsProfileService.surveysByClass(_this.courseClass.id) || [];
            });
        });
    };
    ClassManageComponent.prototype.editSurvey = function () {
        this.surveyDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.viewReportSurvey = function () {
        this.statsDialog.show(this.selectedClassSurvey);
    };
    ClassManageComponent.prototype.editSurveyContent = function () {
        this.surveyContentDialog.show(this.selectedClassSurvey);
    };
    __decorate([
        core_1.ViewChild(gradebook_dialog_component_1.GradebookDialog),
        __metadata("design:type", gradebook_dialog_component_1.GradebookDialog)
    ], ClassManageComponent.prototype, "gradebookDialog", void 0);
    __decorate([
        core_1.ViewChild(lms_profile_dialog_component_1.LMSProfileDialog),
        __metadata("design:type", lms_profile_dialog_component_1.LMSProfileDialog)
    ], ClassManageComponent.prototype, "lmsProfileDialog", void 0);
    __decorate([
        core_1.ViewChild(project_content_dialog_component_1.ProjectContentDialog),
        __metadata("design:type", project_content_dialog_component_1.ProjectContentDialog)
    ], ClassManageComponent.prototype, "projectContentDialog", void 0);
    __decorate([
        core_1.ViewChild(project_manage_dialog_component_1.ProjectManageDialog),
        __metadata("design:type", project_manage_dialog_component_1.ProjectManageDialog)
    ], ClassManageComponent.prototype, "projectManageDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ClassManageComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(class_exam_enroll_dialog_component_1.ClassExamEnrollDialog),
        __metadata("design:type", class_exam_enroll_dialog_component_1.ClassExamEnrollDialog)
    ], ClassManageComponent.prototype, "examEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ClassManageComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_dialog_component_1.SurveyDialog),
        __metadata("design:type", survey_dialog_component_1.SurveyDialog)
    ], ClassManageComponent.prototype, "surveyDialog", void 0);
    __decorate([
        core_1.ViewChild(class_survey_enroll_dialog_component_1.ClassSurveyEnrollDialog),
        __metadata("design:type", class_survey_enroll_dialog_component_1.ClassSurveyEnrollDialog)
    ], ClassManageComponent.prototype, "enrollDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_content_dialog_component_1.SurveyContentDialog),
        __metadata("design:type", survey_content_dialog_component_1.SurveyContentDialog)
    ], ClassManageComponent.prototype, "surveyContentDialog", void 0);
    __decorate([
        core_1.ViewChild(survey_stats_dialog_component_1.SurveyStatsDialog),
        __metadata("design:type", survey_stats_dialog_component_1.SurveyStatsDialog)
    ], ClassManageComponent.prototype, "statsDialog", void 0);
    __decorate([
        core_1.ViewChild(class_member_activity_dialog_component_1.ClassMemberActivityDialog),
        __metadata("design:type", class_member_activity_dialog_component_1.ClassMemberActivityDialog)
    ], ClassManageComponent.prototype, "memberActivityChart", void 0);
    ClassManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-manage',
            templateUrl: 'class-manage.component.html',
            styleUrls: ['class-manage.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], ClassManageComponent);
    return ClassManageComponent;
}(base_component_1.BaseComponent));
exports.ClassManageComponent = ClassManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvY2xhc3MtbWFuYWdlL2NsYXNzLW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUcvRSwwQ0FBMkM7QUFDM0MsOEJBQWdDO0FBQ2hDLDhEQUd5QztBQUN6Qyw0RkFBb0Y7QUFFcEYsd0ZBQWdGO0FBQ2hGLHNHQUF3RjtBQUV4Rix3RUFBdUU7QUFDdkUscUVBQW1FO0FBRW5FLDZEQUFrRTtBQUNsRSxzRkFBMEU7QUFDMUUsZ0VBQThEO0FBQzlELHNHQUF5RjtBQUN6RiwwQ0FBaUU7QUFFakUsZ0ZBQXlFO0FBQ3pFLG9HQUF3RjtBQUN4RixxR0FBd0Y7QUFDeEYseUhBQTRHO0FBQzVHLDBFQUFtRTtBQUNuRSw4R0FBZ0c7QUFDaEcsZ0hBQW1HO0FBQ25HLDhFQUF1RTtBQUd2RSw0R0FBZ0c7QUFDaEcsc0hBQXlHO0FBQ3pHLG9IQUFzRztBQUN0Ryx5R0FBNEY7QUFHNUYsMEhBQTRHO0FBUTVHO0lBQTBDLHdDQUFhO0lBMEN0RCw4QkFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsUUFBa0IsRUFBVSxRQUF5QjtRQUFoSSxZQUNDLGlCQUFPLFNBY1A7UUFmbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFdBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsY0FBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGNBQVEsR0FBUixRQUFRLENBQWlCO1FBeENoSSxvQkFBYyxHQUFHLDBCQUFjLENBQUM7UUFDaEMsaUNBQTJCLEdBQUcsdUNBQTJCLENBQUM7UUFDMUQsaUJBQVcsR0FBRyx1QkFBVyxDQUFDO1FBQzFCLG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQXVDN0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUNyQyxLQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2hCLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFB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QUFhLEdBa1B0RDtBQWxQWSxvREFBb0IiLCJmaWxlIjoiYXBwL2xtcy9jbGFzcy9jbGFzcy1tYW5hZ2UvY2xhc3MtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQge1xuXHRFWFBPUlRfREFURVRJTUVfRk9STUFULCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIFBST0pFQ1RfU1RBVFVTLFxuXHRFWEFNX1NUQVRVUywgU1VSVkVZX1NUQVRVU1xufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENlcnRpZmljYXRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNlcnRpZmljYXRlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xvZy5tb2RlbCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVGltZUNvbnZlcnRQaXBlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3BpcGVzL3RpbWUucGlwZSc7XG5pbXBvcnQgeyBHcmFkZWJvb2tEaWFsb2cgfSBmcm9tICcuLi9ncmFkZWJvb2svZ3JhZGVib29rLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IExNU1Byb2ZpbGVEaWFsb2cgfSBmcm9tICcuLi8uLi9jb3Vyc2UvbG1zLXByb2ZpbGUvbG1zLXByb2ZpbGUtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1EaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L2V4YW0vZXhhbS1kaWFsb2cvZXhhbS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RNYW5hZ2VEaWFsb2cgfSBmcm9tICcuLi9wcm9qZWN0LW1hbmFnZS9wcm9qZWN0LW1hbmFnZS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RDb250ZW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vY21zL3Byb2plY3QvY29udGVudC1kaWFsb2cvcHJvamVjdC1jb250ZW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQ2xhc3NFeGFtRW5yb2xsRGlhbG9nIH0gZnJvbSAnLi4vY2xhc3MtZXhhbS1lbnJvbGwvY2xhc3MtZXhhbS1lbnJvbGwuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtQ29udGVudERpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9leGFtL2NvbnRlbnQtZGlhbG9nL2V4YW0tY29udGVudC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3N1cnZleS9zdXJ2ZXktZGlhbG9nL3N1cnZleS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleUNvbnRlbnREaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9jbXMvc3VydmV5L2NvbnRlbnQtZGlhbG9nL3N1cnZleS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2xhc3NTdXJ2ZXlFbnJvbGxEaWFsb2cgfSBmcm9tICcuLi9jbGFzcy1zdXJ2ZXktZW5yb2xsL2NsYXNzLXN1cnZleS1lbnJvbGwuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdXJ2ZXlTdGF0c0RpYWxvZyB9IGZyb20gJy4uLy4uL3N1cnZleS9zdXJ2ZXktc3RhdHMvc3VydmV5LXN0YXRzLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENsYXNzTWVtYmVyQWN0aXZpdHlEaWFsb2cgfSBmcm9tICcuLi9jbGFzcy1tZW1iZXItYWN0aXZpdHkvY2xhc3MtbWVtYmVyLWFjdGl2aXR5LmRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjbGFzcy1tYW5hZ2UnLFxuXHR0ZW1wbGF0ZVVybDogJ2NsYXNzLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydjbGFzcy1tYW5hZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDbGFzc01hbmFnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdFBST0pFQ1RfU1RBVFVTID0gUFJPSkVDVF9TVEFUVVM7XG5cdENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUyA9IENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUztcblx0RVhBTV9TVEFUVVMgPSBFWEFNX1NUQVRVUztcblx0U1VSVkVZX1NUQVRVUyA9IFNVUlZFWV9TVEFUVVM7XG5cblx0cHJpdmF0ZSBzdHVkZW50UmVjb3JkczogYW55O1xuXHRwcml2YXRlIHNlbGVjdGVkUmVjb3JkOiBhbnk7XG5cdHByaXZhdGUgY291cnNlQ2xhc3M6IENvdXJzZUNsYXNzO1xuXHRwcml2YXRlIHJlcG9ydFV0aWxzOiBSZXBvcnRVdGlscztcblx0cHJpdmF0ZSB2aWV3TW9kZXM6IFNlbGVjdEl0ZW1bXTtcblx0cHJpdmF0ZSB2aWV3TW9kZTogYW55O1xuXHRwcml2YXRlIGNvdXJzZTogQ291cnNlO1xuXHRwcml2YXRlIG1lbWJlcklkOiBudW1iZXI7XG5cdHByaXZhdGUgY291cnNlVW5pdHM6IENvdXJzZVVuaXRbXTtcblx0cHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdO1xuXHRwcml2YXRlIHNlbGVjdGVkUHJvamVjdDogUHJvamVjdDtcblx0cHJpdmF0ZSBjb3Vyc2VNZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXTtcblx0cHJpdmF0ZSBjZXJ0aWZpY2F0ZXM6IENlcnRpZmljYXRlW107XG5cdHByaXZhdGUgY2xhc3NFeGFtczogRXhhbVtdO1xuXHRwcml2YXRlIGxvZ3M6IENvdXJzZUxvZ1tdO1xuXHRwcml2YXRlIHNlbGVjdGVkQ2xhc3NFeGFtOiBhbnk7XG5cdHByaXZhdGUgY2xhc3NTdXJ2ZXlzOiBTdXJ2ZXlbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZENsYXNzU3VydmV5OiBhbnk7XG5cdHByaXZhdGUgY29uZmVyZW5jZTogQ29uZmVyZW5jZTtcblx0cHJpdmF0ZSBzZWxlY3RlZE1lbWJlcjogQ291cnNlTWVtYmVyO1xuXHRwcml2YXRlIGNvdXJzZUNvbnRlbnQ6IGFueTtcblxuXHRAVmlld0NoaWxkKEdyYWRlYm9va0RpYWxvZykgZ3JhZGVib29rRGlhbG9nOiBHcmFkZWJvb2tEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoTE1TUHJvZmlsZURpYWxvZykgbG1zUHJvZmlsZURpYWxvZzogTE1TUHJvZmlsZURpYWxvZztcblx0QFZpZXdDaGlsZChQcm9qZWN0Q29udGVudERpYWxvZykgcHJvamVjdENvbnRlbnREaWFsb2c6IFByb2plY3RDb250ZW50RGlhbG9nO1xuXHRAVmlld0NoaWxkKFByb2plY3RNYW5hZ2VEaWFsb2cpIHByb2plY3RNYW5hZ2VEaWFsb2c6IFByb2plY3RNYW5hZ2VEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoRXhhbURpYWxvZykgZXhhbURpYWxvZzogRXhhbURpYWxvZztcblx0QFZpZXdDaGlsZChDbGFzc0V4YW1FbnJvbGxEaWFsb2cpIGV4YW1FbnJvbGxEaWFsb2c6IENsYXNzRXhhbUVucm9sbERpYWxvZztcblx0QFZpZXdDaGlsZChFeGFtQ29udGVudERpYWxvZykgZXhhbUNvbnRlbnREaWFsb2c6IEV4YW1Db250ZW50RGlhbG9nO1xuXHRAVmlld0NoaWxkKFN1cnZleURpYWxvZykgc3VydmV5RGlhbG9nOiBTdXJ2ZXlEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoQ2xhc3NTdXJ2ZXlFbnJvbGxEaWFsb2cpIGVucm9sbERpYWxvZzogQ2xhc3NTdXJ2ZXlFbnJvbGxEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoU3VydmV5Q29udGVudERpYWxvZykgc3VydmV5Q29udGVudERpYWxvZzogU3VydmV5Q29udGVudERpYWxvZztcblx0QFZpZXdDaGlsZChTdXJ2ZXlTdGF0c0RpYWxvZykgc3RhdHNEaWFsb2c6IFN1cnZleVN0YXRzRGlhbG9nO1xuXHRAVmlld0NoaWxkKENsYXNzTWVtYmVyQWN0aXZpdHlEaWFsb2cpIG1lbWJlckFjdGl2aXR5Q2hhcnQ6IENsYXNzTWVtYmVyQWN0aXZpdHlEaWFsb2c7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlLCBwcml2YXRlIHRpbWVQaXBlOiBUaW1lQ29udmVydFBpcGUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmVwb3J0VXRpbHMgPSBuZXcgUmVwb3J0VXRpbHMoKTtcblx0XHR0aGlzLnZpZXdNb2RlcyA9IFtcblx0XHRcdHsgdmFsdWU6ICdvdXRsaW5lJywgdGl0bGU6ICdPdXRsaW5lJywgaWNvbjogJ3VpLWljb24tZGVoYXplJyB9LFxuXHRcdFx0eyB2YWx1ZTogJ2RldGFpbCcsIHRpdGxlOiAnRGV0YWlsJywgaWNvbjogJ3VpLWljb24tYXBwcycgfSxcblx0XHRdO1xuXHRcdHRoaXMudmlld01vZGVzID0gdGhpcy52aWV3TW9kZXMubWFwKHZpZXdNb2RlID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGxhYmVsOiB2aWV3TW9kZS50aXRsZSxcblx0XHRcdFx0dmFsdWU6IHZpZXdNb2RlLnZhbHVlLFxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuY2xhc3NTdXJ2ZXlzID0gW107XG5cdFx0dGhpcy5jbGFzc0V4YW1zID0gW107XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcblx0XHRcdHZhciBjb3Vyc2VJZCA9ICtwYXJhbXNbJ2NvdXJzZUlkJ107XG5cdFx0XHR2YXIgY2xhc3NJZCA9ICtwYXJhbXNbJ2NsYXNzSWQnXTtcblx0XHRcdHRoaXMubWVtYmVySWQgPSArcGFyYW1zWydtZW1iZXJJZCddO1xuXHRcdFx0dGhpcy52aWV3TW9kZSA9IFwib3V0bGluZVwiO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5pbml0KHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuY291cnNlQ2xhc3MgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNsYXNzQnlJZChjbGFzc0lkKTtcblx0XHRcdFx0dGhpcy5jb3Vyc2UgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNvdXJzZUJ5SWQoY291cnNlSWQpO1xuXHRcdFx0XHR0aGlzLmNsYXNzRXhhbXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmV4YW1zQnlDbGFzcyhjbGFzc0lkKSB8fCBbXTtcblx0XHRcdFx0dGhpcy5jbGFzc1N1cnZleXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLnN1cnZleXNCeUNsYXNzKGNsYXNzSWQpIHx8IFtdO1xuXHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENsYXNzQ29udGVudChjbGFzc0lkKS5zdWJzY3JpYmUoY2xhc3NDb250ZW50PT4ge1xuXHRcdFx0XHRcdHRoaXMucHJvamVjdHMgPSAgY2xhc3NDb250ZW50W1wicHJvamVjdHNcIl07XG5cdFx0XHRcdFx0QmFzZU1vZGVsLmJ1bGtfc2VhcmNoKHRoaXMsXG5cdFx0XHRcdFx0Q291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlDbGFzcyhjbGFzc0lkKSxcblx0XHRcdFx0XHRDZXJ0aWZpY2F0ZS5fX2FwaV9fbGlzdEJ5Q2xhc3MoY2xhc3NJZCksXG5cdFx0XHRcdFx0Q291cnNlTG9nLl9fYXBpX19jbGFzc0FjdGl2aXR5KGNsYXNzSWQpKVxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoanNvbkFyciA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmNvdXJzZU1lbWJlcnMgPSBDb3Vyc2VNZW1iZXIudG9BcnJheShqc29uQXJyWzBdKTtcblx0XHRcdFx0XHRcdHRoaXMuY2VydGlmaWNhdGVzID0gQ2VydGlmaWNhdGUudG9BcnJheShqc29uQXJyWzFdKTtcblx0XHRcdFx0XHRcdHRoaXMubG9ncyA9IENvdXJzZUxvZy50b0FycmF5KGpzb25BcnJbMl0pO1xuXHRcdFx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VDb250ZW50KCBjb3Vyc2VJZCkuc3Vic2NyaWJlKGNvdXJzZUNvbnRlbnQ9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY291cnNlVW5pdHMgPSBjb3Vyc2VDb250ZW50W1widW5pdHNcIl07XG5cdFx0XHRcdFx0XHRcdHRoaXMubG9hZE1lbWJlclN0YXRzKHRoaXMubG9ncyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHZpZXdDaGFydChyZWNvcmQpIHtcblx0XHR0aGlzLm1lbWJlckFjdGl2aXR5Q2hhcnQuc2hvdyhyZWNvcmQpO1xuXHR9XG5cblx0dmlld0dyYWRlYm9vaygpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZFJlY29yZClcblx0XHRcdHRoaXMuZ3JhZGVib29rRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFJlY29yZCk7XG5cdH1cblxuXHR2aWV3TE1TUHJvZmlsZSgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZFJlY29yZClcblx0XHRcdHRoaXMubG1zUHJvZmlsZURpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRSZWNvcmQpO1xuXHR9XG5cblx0bG9hZE1lbWJlclN0YXRzKGxvZ3M6IENvdXJzZUxvZ1tdKSB7XG5cdFx0dGhpcy5zdHVkZW50UmVjb3JkcyA9IF8uZmlsdGVyKHRoaXMuY291cnNlTWVtYmVycywgKG1lbWJlcjogQ291cnNlTWVtYmVyKSA9PiB7XG5cdFx0XHRyZXR1cm4gbWVtYmVyLnJvbGUgPT0gJ3N0dWRlbnQnO1xuXHRcdH0pO1xuXHRcdHZhciB0b3RhbFVuaXQgPSB0aGlzLmNvdXJzZS51bml0X2NvdW50O1xuXHRcdF8uZWFjaCh0aGlzLnN0dWRlbnRSZWNvcmRzLCAocmVjb3JkID0+IHtcblx0XHRcdHZhciBjZXJ0aWZpY2F0ZSA9IF8uZmluZCh0aGlzLmNlcnRpZmljYXRlcywgKGNlcnQ6IENlcnRpZmljYXRlKSA9PiB7XG5cdFx0XHRcdHJldHVybiBjZXJ0Lm1lbWJlcl9pZCA9PSByZWNvcmRbXCJpZFwiXTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGNlcnRpZmljYXRlKVxuXHRcdFx0XHRyZWNvcmRbXCJjZXJ0aWZpY2F0ZVwiXSA9IGNlcnRpZmljYXRlLm5hbWU7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJlY29yZFtcImNlcnRpZmljYXRlXCJdID0gJyc7XG5cdFx0XHR2YXIgbWVtYmVyTG9ncyA9IF8uZmlsdGVyKGxvZ3MsIChsb2c6IENvdXJzZUxvZykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gbG9nLm1lbWJlcl9pZCA9PSByZWNvcmRbXCJpZFwiXTtcblx0XHRcdH0pXG5cdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5yZXBvcnRVdGlscy5hbmFseXplQ291cnNlTWVtYmVyQWN0aXZpdHkobWVtYmVyTG9ncyk7XG5cdFx0XHRpZiAocmVzdWx0WzBdKVxuXHRcdFx0XHRyZWNvcmRbXCJmaXJzdF9hdHRlbXB0XCJdID0gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0ocmVzdWx0WzBdLCBFWFBPUlRfREFURVRJTUVfRk9STUFUKTtcblx0XHRcdGlmIChyZXN1bHRbMV0pXG5cdFx0XHRcdHJlY29yZFtcImxhc3RfYXR0ZW1wdFwiXSA9IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHJlc3VsdFsxXSwgRVhQT1JUX0RBVEVUSU1FX0ZPUk1BVCk7XG5cdFx0XHRyZWNvcmRbXCJ0aW1lX3NwZW50XCJdID0gdGhpcy50aW1lUGlwZS50cmFuc2Zvcm0oK3Jlc3VsdFsyXSwgJ21pbicpO1xuXHRcdFx0aWYgKHRvdGFsVW5pdClcblx0XHRcdFx0cmVjb3JkW1wiY29tcGxldGlvblwiXSA9IE1hdGguZmxvb3IoK3Jlc3VsdFszXSAqIDEwMCAvICt0b3RhbFVuaXQpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZWNvcmRbXCJjb21wbGV0aW9uXCJdID0gMDtcblx0XHRcdHJlY29yZFtcImxvZ3NcIl0gPSBtZW1iZXJMb2dzO1xuXHRcdH0pKTtcblx0fVxuXG5cdGNoZWNrVW5pdENvbXBsZXRlKHJlY29yZCwgdW5pdCkge1xuXHRcdGxldCBsb2c6IENvdXJzZUxvZyA9IF8uZmluZChyZWNvcmRbXCJsb2dzXCJdLCBsb2cgPT4ge1xuXHRcdFx0cmV0dXJuIGxvZy5yZXNfbW9kZWwgPT0gQ291cnNlVW5pdC5Nb2RlbCAmJiBsb2cucmVzX2lkID09IHVuaXQuaWQgJiYgbG9nLmNvZGUgPT0gJ0NPTVBMRVRFX0NPVVJTRV9VTklUJztcblx0XHR9KTtcblx0XHRpZiAobG9nKVxuXHRcdFx0cmV0dXJuICdGaW5pc2hlZCc7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuICdVbmZpbmlzaGVkJztcblx0fVxuXG5cdGFkZFByb2plY3QoKSB7XG5cdFx0dmFyIHByb2plY3QgPSBuZXcgUHJvamVjdCgpO1xuXHRcdHByb2plY3QuY2xhc3NfaWQgPSB0aGlzLmNvdXJzZUNsYXNzLmlkO1xuXHRcdHByb2plY3QuY291cnNlX2lkID0gdGhpcy5jb3Vyc2VDbGFzcy5jb3Vyc2VfaWQ7XG5cdFx0dGhpcy5wcm9qZWN0Q29udGVudERpYWxvZy5zaG93KHByb2plY3QpO1xuXHRcdHRoaXMucHJvamVjdENvbnRlbnREaWFsb2cub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5hZGRQcm9qZWN0KHByb2plY3QpO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDbGFzc0NvbnRlbnQoIHRoaXMuY291cnNlQ2xhc3MuaWQpLnN1YnNjcmliZShjb250ZW50PT4ge1xuXHRcdFx0XHR0aGlzLnByb2plY3RzID0gY29udGVudFtcInByb2plY3RzXCJdO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRlZGl0UHJvamVjdCgpIHtcblx0XHR0aGlzLnByb2plY3RDb250ZW50RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFByb2plY3QpO1xuXHR9XG5cblx0ZGVsZXRlUHJvamVjdCgpIHtcblx0XHR0aGlzLmNvbmZpcm0odGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0FyZSB5b3Ugc3VyZSB0byBkZWxldGU/JyksICgpID0+IHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRQcm9qZWN0LmRlbGV0ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1Byb2plY3QgZGVsZXRlZCcpKTtcblx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5yZW1vdmVQcm9qZWN0KHRoaXMuc2VsZWN0ZWRQcm9qZWN0KTtcblx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDbGFzc0NvbnRlbnQoIHRoaXMuY291cnNlQ2xhc3MuaWQpLnN1YnNjcmliZShjb250ZW50PT4ge1xuXHRcdFx0XHRcdHRoaXMucHJvamVjdHMgPSBjb250ZW50W1wicHJvamVjdHNcIl07XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYXJrUHJvamVjdCgpIHtcblx0XHR0aGlzLnByb2plY3RNYW5hZ2VEaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkUHJvamVjdCk7XG5cdH1cblxuXHRhZGRFeGFtKCkge1xuXHRcdHZhciBleGFtID0gbmV3IEV4YW0oKTtcblx0XHRleGFtLmlzX3B1YmxpYyA9IGZhbHNlO1xuXHRcdGV4YW0uc3VwZXJ2aXNvcl9pZCA9IHRoaXMuQ29udGV4dFVzZXIuaWQ7XG5cdFx0ZXhhbS5jb3Vyc2VfY2xhc3NfaWQgPSB0aGlzLmNvdXJzZUNsYXNzLmlkO1xuXHRcdHRoaXMuZXhhbURpYWxvZy5zaG93KGV4YW0pO1xuXHRcdHRoaXMuZXhhbURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmFkZEV4YW0oZXhhbSkuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0XHR0aGlzLmNsYXNzRXhhbXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmV4YW1zQnlDbGFzcyh0aGlzLmNvdXJzZUNsYXNzLmlkKSB8fCBbXTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0fSk7XG5cdH1cblxuXHRlZGl0RXhhbSgpIHtcblx0XHR0aGlzLmV4YW1EaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkQ2xhc3NFeGFtKTtcblx0fVxuXG5cdGVucm9sbEV4YW0oKSB7XG5cdFx0dGhpcy5leGFtRW5yb2xsRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZENsYXNzRXhhbSk7XG5cdH1cblxuXHRtYW5hZ2VFeGFtKCkge1xuXHRcdHZhciBzdXBlcnZpc29yID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRFeGFtTWVtYmVyQnlSb2xlKCdzdXBlcnZpc29yJyx0aGlzLnNlbGVjdGVkQ2xhc3NFeGFtLmlkICk7XG5cdFx0dmFyIHRlYWNoZXIgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldEV4YW1NZW1iZXJCeVJvbGUoJ3RlYWNoZXInLHRoaXMuc2VsZWN0ZWRDbGFzc0V4YW0uaWQgKTtcblx0XHRpZiAoc3VwZXJ2aXNvciB8fCB0ZWFjaGVyKVxuXHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG1zL2V4YW1zL21hbmFnZScsIHRoaXMuc2VsZWN0ZWRDbGFzc0V4YW0uaWQsIHN1cGVydmlzb3IuaWRdKTtcblx0fVxuXG5cdGVkaXRFeGFtQ29udGVudCgpIHtcblx0XHR0aGlzLmV4YW1Db250ZW50RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZENsYXNzRXhhbSk7XG5cdH1cblxuXG5cdGVucm9sbFN1cnZleSgpIHtcblx0XHR0aGlzLmVucm9sbERpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDbGFzc1N1cnZleSk7XG5cdH1cblxuXHRhZGRTdXJ2ZXkoKSB7XG5cdFx0dmFyIHN1cnZleSA9IG5ldyBTdXJ2ZXkoKTtcblx0XHRzdXJ2ZXkuaXNfcHVibGljID0gZmFsc2U7XG5cdFx0c3VydmV5LnN1cGVydmlzb3JfaWQgPSB0aGlzLkNvbnRleHRVc2VyLmlkO1xuXHRcdHN1cnZleS5jb3Vyc2VfY2xhc3NfaWQgPSB0aGlzLmNvdXJzZUNsYXNzLmlkO1xuXHRcdHRoaXMuc3VydmV5RGlhbG9nLnNob3coc3VydmV5KTtcblx0XHR0aGlzLnN1cnZleURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmFkZFN1cnZleShzdXJ2ZXkpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0dGhpcy5jbGFzc1N1cnZleXMgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLnN1cnZleXNCeUNsYXNzKHRoaXMuY291cnNlQ2xhc3MuaWQpIHx8IFtdO1x0XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGVkaXRTdXJ2ZXkoKSB7XG5cdFx0dGhpcy5zdXJ2ZXlEaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkQ2xhc3NTdXJ2ZXkpO1xuXHR9XG5cblx0dmlld1JlcG9ydFN1cnZleSgpIHtcblx0XHR0aGlzLnN0YXRzRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZENsYXNzU3VydmV5KTtcblx0fVxuXG5cdGVkaXRTdXJ2ZXlDb250ZW50KCkge1xuXHRcdHRoaXMuc3VydmV5Q29udGVudERpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDbGFzc1N1cnZleSk7XG5cdH1cblxuXG5cbn1cbiJdfQ==
