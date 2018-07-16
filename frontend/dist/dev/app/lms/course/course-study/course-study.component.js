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
var router_1 = require("@angular/router");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var conference_member_model_1 = require("../../../shared/models/elearning/conference-member.model");
var conference_model_1 = require("../../../shared/models/elearning/conference.model");
var constants_1 = require("../../../shared/models/constants");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var exam_study_dialog_component_1 = require("../../exam/exam-study/exam-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var certificate_print_dialog_component_1 = require("../certificate-print/certificate-print.dialog.component");
var answer_print_dialog_component_1 = require("../../exam/answer-print/answer-print.dialog.component");
var meeting_service_1 = require("../../../shared/services/meeting.service");
var unit_decorator_1 = require("../../../cms/course/course-unit-template/unit.decorator");
var unit_container_directive_1 = require("../../../cms/course/course-unit-template/unit-container.directive");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var project_submission_dialog_component_1 = require("../../class/project-submit/project-submission.dialog.component");
var gradebook_dialog_component_1 = require("../../class/gradebook/gradebook.dialog.component");
var course_unit_preview_dialog_component_1 = require("../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var CourseStudyComponent = (function (_super) {
    __extends(CourseStudyComponent, _super);
    function CourseStudyComponent(router, route, meetingSerivce, componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.meetingSerivce = meetingSerivce;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.completedUnitIds = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.course = new course_model_1.Course();
        _this.member = new course_member_model_1.CourseMember();
        _this.certificate = new course_certificate_model_1.Certificate();
        _this.conference = new conference_model_1.Conference();
        _this.conferenceMember = new conference_member_model_1.ConferenceMember();
        _this.studyMode = false;
        _this.enableLogging = true;
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        return _this;
    }
    CourseStudyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var memberId = +params['memberId'];
            var courseId = +params['courseId'];
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.course = _this.lmsProfileService.courseById(courseId);
                if (_this.course.syllabus_status != 'published') {
                    _this.error('Syllabus has not been published');
                    return;
                }
                _this.member = _this.lmsProfileService.courseMemberById(memberId);
                _this.certificate = _this.lmsProfileService.certificateByMember(memberId);
                _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                    _this.syl = content["syllabus"];
                    _this.faqs = content["faqs"];
                    _this.materials = content["materials"];
                    _this.units = content["units"];
                    log_model_1.CourseLog.memberStudyActivity(_this, memberId, courseId).subscribe(function (logs) {
                        _this.logs = logs;
                        _this.displayCouseSyllabus();
                        if (_this.member.class_id) {
                            _this.examMembers = _this.lmsProfileService.examMembersByClassId(_this.member.class_id);
                            _this.conferenceMember = _this.lmsProfileService.conferenceMemberByClass(_this.member.class_id);
                            if (_this.conferenceMember)
                                _this.conference = _this.conferenceMember.conference;
                            _this.projectSubmits = _this.lmsProfileService.projectSubmitsByMember(_this.member.id);
                            _this.lmsProfileService.getClassContent(_this.member.class_id).subscribe(function (content) {
                                _this.projects = content["projects"];
                            });
                        }
                    });
                });
            });
        });
    };
    CourseStudyComponent.prototype.displayCouseSyllabus = function () {
        var _this = this;
        this.units = _.filter(this.units, function (unit) {
            return unit.status == 'published';
        });
        _.each(this.units, function (unit) {
            var log = _.find(_this.logs, function (obj) {
                return obj.res_id == unit.id && obj.res_model == course_unit_model_1.CourseUnit.Model && obj.code == 'COMPLETE_COURSE_UNIT';
            });
            if (log)
                _this.completedUnitIds.push(unit.id);
        });
        this.tree = this.sylUtils.buildGroupTree(this.units);
        this.treeList = this.sylUtils.flattenTree(this.tree);
        var last_attempt = _.max(this.logs, function (log) {
            return log.start.getTime();
        });
        if (last_attempt) {
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, last_attempt.res_id);
        }
        if (this.syl.status != 'published')
            this.warn('Cours syllabus is not published');
    };
    CourseStudyComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
            if (this.studyMode == true) {
                this.studyMode = false;
            }
            this.unloadCurrentUnit();
        }
    };
    CourseStudyComponent.prototype.unloadCurrentUnit = function () {
        if (this.unitHost) {
            var viewContainerRef = this.unitHost.viewContainerRef;
            if (viewContainerRef)
                viewContainerRef.clear();
        }
    };
    CourseStudyComponent.prototype.prevUnit = function () {
        if (this.selectedUnit) {
            if (this.enableLogging)
                log_model_1.CourseLog.stopCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
            var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.studyMode = false;
            this.unloadCurrentUnit();
        }
    };
    CourseStudyComponent.prototype.nextUnit = function () {
        if (this.selectedUnit) {
            if (this.enableLogging)
                log_model_1.CourseLog.stopCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
            var nextUnit = this.computedNextUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.studyMode = false;
            this.unloadCurrentUnit();
        }
    };
    CourseStudyComponent.prototype.completeUnit = function () {
        if (this.selectedUnit) {
            if (this.enableLogging)
                log_model_1.CourseLog.completeCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
            this.completedUnitIds.push(this.selectedUnit.id);
            this.studyMode = false;
            this.unloadCurrentUnit();
        }
    };
    CourseStudyComponent.prototype.computedPrevUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
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
    CourseStudyComponent.prototype.computedNextUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
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
    CourseStudyComponent.prototype.studyUnit = function () {
        if (this.selectedUnit) {
            if (this.course.complete_unit_by_order) {
                var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
                if (prevUnit) {
                    if (this.completedUnitIds.includes(prevUnit.id)) {
                        this.openUnit(this.selectedUnit);
                        if (this.enableLogging)
                            log_model_1.CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
                    }
                    else
                        this.error(this.translateService.instant('You have not completed previous unit'));
                }
                else {
                    this.openUnit(this.selectedUnit);
                    log_model_1.CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
                }
            }
            else {
                this.openUnit(this.selectedUnit);
                if (this.enableLogging)
                    log_model_1.CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
            }
        }
    };
    CourseStudyComponent.prototype.viewGradebook = function () {
        this.gradebookDialog.show(this.member);
    };
    CourseStudyComponent.prototype.openUnit = function (unit) {
        var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(unit.type);
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'study';
            this.componentRef.instance.render(unit);
            this.studyMode = true;
        }
        else {
            viewContainerRef.clear();
            this.componentRef = null;
        }
    };
    CourseStudyComponent.prototype.getProjectSubmit = function (project) {
        return _.find(this.projectSubmits, function (submit) {
            return submit.project_id == project.id;
        }) || new project_submission_model_1.ProjectSubmission();
    };
    CourseStudyComponent.prototype.joinConference = function () {
        if (this.conference.id && this.conferenceMember.id && this.conferenceMember.is_active)
            this.meetingSerivce.join(this.conference.room_ref, this.conferenceMember.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    };
    CourseStudyComponent.prototype.submitProject = function (project) {
        this.projectSubmitDialog.show(project, this.member);
    };
    CourseStudyComponent.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.selectedNode.data.course_id = this.course.id;
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseStudyComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseStudyComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], CourseStudyComponent.prototype, "examStudyDialog", void 0);
    __decorate([
        core_1.ViewChild(answer_print_dialog_component_1.AnswerPrintDialog),
        __metadata("design:type", answer_print_dialog_component_1.AnswerPrintDialog)
    ], CourseStudyComponent.prototype, "answerSheetDialog", void 0);
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], CourseStudyComponent.prototype, "certPrintDialog", void 0);
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseStudyComponent.prototype, "unitHost", void 0);
    __decorate([
        core_1.ViewChild(project_submission_dialog_component_1.ProjectSubmissionDialog),
        __metadata("design:type", project_submission_dialog_component_1.ProjectSubmissionDialog)
    ], CourseStudyComponent.prototype, "projectSubmitDialog", void 0);
    __decorate([
        core_1.ViewChild(gradebook_dialog_component_1.GradebookDialog),
        __metadata("design:type", gradebook_dialog_component_1.GradebookDialog)
    ], CourseStudyComponent.prototype, "gradebookDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseStudyComponent.prototype, "unitPreviewDialog", void 0);
    CourseStudyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-study',
            templateUrl: 'course-study.component.html',
            styleUrls: ['course-study.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute,
            meeting_service_1.MeetingService, core_1.ComponentFactoryResolver])
    ], CourseStudyComponent);
    return CourseStudyComponent;
}(base_component_1.BaseComponent));
exports.CourseStudyComponent = CourseStudyComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1zdHVkeS9jb3Vyc2Utc3R1ZHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5RiwwQ0FBaUU7QUFFakUsaUZBQStFO0FBQy9FLDhFQUF1RTtBQUV2RSw0RkFBb0Y7QUFDcEYsOEJBQWdDO0FBR2hDLG9HQUE0RjtBQUM1RixzRkFBK0U7QUFBQyw4REFHdkM7QUFJekMseUZBQTRFO0FBRTVFLHdHQUEyRjtBQUMzRixnR0FBd0Y7QUFDeEYseUVBQXVFO0FBQ3ZFLHdGQUFnRjtBQUVoRix3RUFBdUU7QUFPdkUsaUdBQW9GO0FBQ3BGLHFFQUFtRTtBQUVuRSxzR0FBd0Y7QUFDeEYsOEdBQWlHO0FBQ2pHLHVHQUEwRjtBQUMxRiw0RUFBMEU7QUFDMUUsMEZBQTZGO0FBQzdGLDhHQUFpSDtBQUdqSCxzR0FBOEY7QUFDOUYsc0hBQXlHO0FBUXpHLCtGQUFtRjtBQUNuRiw0SUFBOEg7QUFROUg7SUFBMEMsd0NBQWE7SUE4Q3RELDhCQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFDeEQsY0FBOEIsRUFBVSx3QkFBa0Q7UUFEbkcsWUFFQyxpQkFBTyxTQVdQO1FBYm1CLFlBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxXQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUN4RCxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBN0NuRyxzQkFBZ0IsR0FBRyw0QkFBZ0IsQ0FBQztRQUNwQyxpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFDMUIsb0JBQWMsR0FBRywwQkFBYyxDQUFDO1FBQ2hDLG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQTBCdEIsc0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBa0I3QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFB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NENBQWUsQ0FBQztrQ0FBa0IsNENBQWU7aUVBQUM7SUFDekI7UUFBbkMsZ0JBQVMsQ0FBQyw4REFBdUIsQ0FBQztrQ0FBb0IsOERBQXVCO21FQUFDO0lBNUNuRSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBK0MyQixlQUFNLEVBQWlCLHVCQUFjO1lBQ3hDLGdDQUFjLEVBQW9DLCtCQUF3QjtPQS9DdkYsb0JBQW9CLENBbVJoQztJQUFELDJCQUFDO0NBblJELEFBbVJDLENBblJ5Qyw4QkFBYSxHQW1SdEQ7QUFuUlksb0RBQW9CIiwiZmlsZSI6ImFwcC9sbXMvY291cnNlL2NvdXJzZS1zdHVkeS9jb3Vyc2Utc3R1ZHkuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb25mZXJlbmNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29uZmVyZW5jZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwnOyBpbXBvcnQge1xuXHRTVVJWRVlfU1RBVFVTLCBDT05URU5UX1NUQVRVUywgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfUk9MRSwgUFJPSkVDVF9TVEFUVVMsXG5cdENPVVJTRV9NRU1CRVJfU1RBVFVTLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIENPVVJTRV9VTklUX1RZUEUsIEVYQU1fU1RBVFVTXG59IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDb3Vyc2VGYXEgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtZmFxLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUZhcURpYWxvZyB9IGZyb20gJy4uL2NvdXJzZS1mYXEvY291cnNlLWZhcS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZU1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1hdGVyaWFsLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1hdGVyaWFsRGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLW1hdGVyaWFsL2NvdXJzZS1tYXRlcmlhbC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IFN5bGxhYnVzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zeWxsYWJ1cy51dGlscyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEV4YW1Db250ZW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vY21zL2V4YW0vY29udGVudC1kaWFsb2cvZXhhbS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbVN0dWR5RGlhbG9nIH0gZnJvbSAnLi4vLi4vZXhhbS9leGFtLXN0dWR5L2V4YW0tc3R1ZHkuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBSb3V0ZSwgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGVQcmludERpYWxvZyB9IGZyb20gJy4uL2NlcnRpZmljYXRlLXByaW50L2NlcnRpZmljYXRlLXByaW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5zd2VyUHJpbnREaWFsb2cgfSBmcm9tICcuLi8uLi9leGFtL2Fuc3dlci1wcmludC9hbnN3ZXItcHJpbnQuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWV0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tZWV0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0Lm1vZGVsJztcbmltcG9ydCB7IFByb2plY3RTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcHJvamVjdC1zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFByb2plY3RTdWJtaXNzaW9uRGlhbG9nIH0gZnJvbSAnLi4vLi4vY2xhc3MvcHJvamVjdC1zdWJtaXQvcHJvamVjdC1zdWJtaXNzaW9uLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleVN0dWR5RGlhbG9nIH0gZnJvbSAnLi4vLi4vc3VydmV5L3N1cnZleS1zdHVkeS9zdXJ2ZXktc3R1ZHkuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IEV4YW1SZWNvcmQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXJlY29yZC5tb2RlbCc7XG5pbXBvcnQgeyBHcmFkZWJvb2tEaWFsb2cgfSBmcm9tICcuLi8uLi9jbGFzcy9ncmFkZWJvb2svZ3JhZGVib29rLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9jbXMvY291cnNlL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvdXJzZS1zdHVkeScsXG5cdHRlbXBsYXRlVXJsOiAnY291cnNlLXN0dWR5LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2NvdXJzZS1zdHVkeS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZVN0dWR5Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0Q09VUlNFX1VOSVRfVFlQRSA9IENPVVJTRV9VTklUX1RZUEU7XG5cdEVYQU1fU1RBVFVTID0gRVhBTV9TVEFUVVM7XG5cdFBST0pFQ1RfU1RBVFVTID0gUFJPSkVDVF9TVEFUVVM7XG5cdFNVUlZFWV9TVEFUVVMgPSBTVVJWRVlfU1RBVFVTO1xuXG5cdHByaXZhdGUgY291cnNlOiBDb3Vyc2U7XG5cdHByaXZhdGUgY291cnNlQ2xhc3M6IENvdXJzZUNsYXNzO1xuXHRwcml2YXRlIG1lbWJlcjogQ291cnNlTWVtYmVyO1xuXHRwcml2YXRlIGZhcXM6IENvdXJzZUZhcVtdO1xuXHRwcml2YXRlIG1hdGVyaWFsczogQ291cnNlTWF0ZXJpYWxbXTtcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bDogQ291cnNlU3lsbGFidXM7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSB1bml0czogQ291cnNlVW5pdFtdO1xuXHRwcml2YXRlIHNlbGVjdGVkVW5pdDogQ291cnNlVW5pdDtcblx0cHJpdmF0ZSBleGFtTWVtYmVyczogRXhhbU1lbWJlcltdO1xuXHRwcml2YXRlIGNvbXBsZXRlZE1lbWJlcnM6IEV4YW1NZW1iZXJbXTtcblx0cHJpdmF0ZSBjZXJ0aWZpY2F0ZTogQ2VydGlmaWNhdGU7XG5cdHByaXZhdGUgY29uZmVyZW5jZTogQ29uZmVyZW5jZTtcblx0cHJpdmF0ZSBjb25mZXJlbmNlTWVtYmVyOiBDb25mZXJlbmNlTWVtYmVyO1xuXHRwcml2YXRlIHRyZWVMaXN0OiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bFV0aWxzOiBTeWxsYWJ1c1V0aWxzO1xuXHRwcml2YXRlIHJlcG9ydFV0aWxzOiBSZXBvcnRVdGlscztcblx0cHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdO1xuXHRwcml2YXRlIGNvbXBvbmVudFJlZjogYW55O1xuXHRwcml2YXRlIHN0dWR5TW9kZTogYm9vbGVhbjtcblx0cHJpdmF0ZSBlbmFibGVMb2dnaW5nOiBib29sZWFuO1xuXHRwcml2YXRlIGxvZ3M6IENvdXJzZUxvZ1tdO1xuXHRwcml2YXRlIHN1cnZleXM6IFN1cnZleVtdO1xuXHRwcml2YXRlIGNvbXBsZXRlZFVuaXRJZHMgPSBbXTtcblx0cHJpdmF0ZSBwcm9qZWN0U3VibWl0czogUHJvamVjdFN1Ym1pc3Npb25bXTtcblx0cHJpdmF0ZSBleGFtczogRXhhbVtdO1xuXHRwcml2YXRlIGV4YW1SZWNvcmRzOiBFeGFtUmVjb3JkW107XG5cblx0QFZpZXdDaGlsZChDb3Vyc2VNYXRlcmlhbERpYWxvZykgbWF0ZXJpYWxEaWFsb2c6IENvdXJzZU1hdGVyaWFsRGlhbG9nO1xuXHRAVmlld0NoaWxkKENvdXJzZUZhcURpYWxvZykgZmFxRGlhbG9nOiBDb3Vyc2VGYXFEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoRXhhbVN0dWR5RGlhbG9nKSBleGFtU3R1ZHlEaWFsb2c6IEV4YW1TdHVkeURpYWxvZztcblx0QFZpZXdDaGlsZChBbnN3ZXJQcmludERpYWxvZykgYW5zd2VyU2hlZXREaWFsb2c6IEFuc3dlclByaW50RGlhbG9nO1xuXHRAVmlld0NoaWxkKENlcnRpZmljYXRlUHJpbnREaWFsb2cpIGNlcnRQcmludERpYWxvZzogQ2VydGlmaWNhdGVQcmludERpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlKSB1bml0SG9zdDogQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZTtcblx0QFZpZXdDaGlsZChQcm9qZWN0U3VibWlzc2lvbkRpYWxvZykgcHJvamVjdFN1Ym1pdERpYWxvZzogUHJvamVjdFN1Ym1pc3Npb25EaWFsb2c7XG5cdEBWaWV3Q2hpbGQoR3JhZGVib29rRGlhbG9nKSBncmFkZWJvb2tEaWFsb2c6IEdyYWRlYm9va0RpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VVbml0UHJldmlld0RpYWxvZykgdW5pdFByZXZpZXdEaWFsb2c6IENvdXJzZVVuaXRQcmV2aWV3RGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuXHRcdHByaXZhdGUgbWVldGluZ1Nlcml2Y2U6IE1lZXRpbmdTZXJ2aWNlLCBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnJlcG9ydFV0aWxzID0gbmV3IFJlcG9ydFV0aWxzKCk7XG5cdFx0dGhpcy5zeWxVdGlscyA9IG5ldyBTeWxsYWJ1c1V0aWxzKCk7XG5cdFx0dGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XG5cdFx0dGhpcy5tZW1iZXIgPSBuZXcgQ291cnNlTWVtYmVyKCk7XG5cdFx0dGhpcy5jZXJ0aWZpY2F0ZSA9IG5ldyBDZXJ0aWZpY2F0ZSgpO1xuXHRcdHRoaXMuY29uZmVyZW5jZSA9IG5ldyBDb25mZXJlbmNlKCk7XG5cdFx0dGhpcy5jb25mZXJlbmNlTWVtYmVyID0gbmV3IENvbmZlcmVuY2VNZW1iZXIoKTtcblx0XHR0aGlzLnN0dWR5TW9kZSA9IGZhbHNlO1xuXHRcdHRoaXMuZW5hYmxlTG9nZ2luZyA9IHRydWU7XG5cdFx0dGhpcy5zeWwgPSBuZXcgQ291cnNlU3lsbGFidXMoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuXHRcdFx0dmFyIG1lbWJlcklkID0gK3BhcmFtc1snbWVtYmVySWQnXTtcblx0XHRcdHZhciBjb3Vyc2VJZCA9ICtwYXJhbXNbJ2NvdXJzZUlkJ107XG5cdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmluaXQodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0dGhpcy5jb3Vyc2UgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNvdXJzZUJ5SWQoY291cnNlSWQpO1xuXHRcdFx0XHRpZiAodGhpcy5jb3Vyc2Uuc3lsbGFidXNfc3RhdHVzICE9ICdwdWJsaXNoZWQnKSB7XG5cdFx0XHRcdFx0dGhpcy5lcnJvcignU3lsbGFidXMgaGFzIG5vdCBiZWVuIHB1Ymxpc2hlZCcpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLm1lbWJlciA9IHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuY291cnNlTWVtYmVyQnlJZChtZW1iZXJJZCk7XG5cdFx0XHRcdHRoaXMuY2VydGlmaWNhdGUgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNlcnRpZmljYXRlQnlNZW1iZXIobWVtYmVySWQpO1xuXHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZUNvbnRlbnQoY291cnNlSWQpLnN1YnNjcmliZShjb250ZW50ID0+IHtcblx0XHRcdFx0XHR0aGlzLnN5bCA9IGNvbnRlbnRbXCJzeWxsYWJ1c1wiXTtcblx0XHRcdFx0XHR0aGlzLmZhcXMgPSBjb250ZW50W1wiZmFxc1wiXTtcblx0XHRcdFx0XHR0aGlzLm1hdGVyaWFscyA9IGNvbnRlbnRbXCJtYXRlcmlhbHNcIl07XG5cdFx0XHRcdFx0dGhpcy51bml0cyA9IGNvbnRlbnRbXCJ1bml0c1wiXTtcblx0XHRcdFx0XHRDb3Vyc2VMb2cubWVtYmVyU3R1ZHlBY3Rpdml0eSh0aGlzLCBtZW1iZXJJZCwgY291cnNlSWQpLnN1YnNjcmliZShsb2dzID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubG9ncyA9IGxvZ3M7XG5cdFx0XHRcdFx0XHR0aGlzLmRpc3BsYXlDb3VzZVN5bGxhYnVzKCk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5tZW1iZXIuY2xhc3NfaWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5leGFtTWVtYmVycyA9IHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZXhhbU1lbWJlcnNCeUNsYXNzSWQodGhpcy5tZW1iZXIuY2xhc3NfaWQpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbmZlcmVuY2VNZW1iZXIgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNvbmZlcmVuY2VNZW1iZXJCeUNsYXNzKHRoaXMubWVtYmVyLmNsYXNzX2lkKTtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuY29uZmVyZW5jZU1lbWJlcilcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmNvbmZlcmVuY2UgPSB0aGlzLmNvbmZlcmVuY2VNZW1iZXIuY29uZmVyZW5jZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9qZWN0U3VibWl0cyA9IHRoaXMubG1zUHJvZmlsZVNlcnZpY2UucHJvamVjdFN1Ym1pdHNCeU1lbWJlcih0aGlzLm1lbWJlci5pZCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0Q2xhc3NDb250ZW50KHRoaXMubWVtYmVyLmNsYXNzX2lkKS5zdWJzY3JpYmUoY29udGVudCA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wcm9qZWN0cyA9IGNvbnRlbnRbXCJwcm9qZWN0c1wiXTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGRpc3BsYXlDb3VzZVN5bGxhYnVzKCkge1xuXHRcdHRoaXMudW5pdHMgPSBfLmZpbHRlcih0aGlzLnVuaXRzLCAodW5pdDogQ291cnNlVW5pdCkgPT4ge1xuXHRcdFx0cmV0dXJuIHVuaXQuc3RhdHVzID09ICdwdWJsaXNoZWQnO1xuXHRcdH0pO1xuXHRcdF8uZWFjaCh0aGlzLnVuaXRzLCAodW5pdDogQ291cnNlVW5pdCkgPT4ge1xuXHRcdFx0dmFyIGxvZyA9IF8uZmluZCh0aGlzLmxvZ3MsIChvYmo6IENvdXJzZUxvZykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gb2JqLnJlc19pZCA9PSB1bml0LmlkICYmIG9iai5yZXNfbW9kZWwgPT0gQ291cnNlVW5pdC5Nb2RlbCAmJiBvYmouY29kZSA9PSAnQ09NUExFVEVfQ09VUlNFX1VOSVQnO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAobG9nKVxuXHRcdFx0XHR0aGlzLmNvbXBsZXRlZFVuaXRJZHMucHVzaCh1bml0LmlkKTtcblx0XHR9KTtcblx0XHR0aGlzLnRyZWUgPSB0aGlzLnN5bFV0aWxzLmJ1aWxkR3JvdXBUcmVlKHRoaXMudW5pdHMpO1xuXHRcdHRoaXMudHJlZUxpc3QgPSB0aGlzLnN5bFV0aWxzLmZsYXR0ZW5UcmVlKHRoaXMudHJlZSk7XG5cdFx0dmFyIGxhc3RfYXR0ZW1wdCA9IF8ubWF4KHRoaXMubG9ncywgKGxvZzogQ291cnNlTG9nKSA9PiB7XG5cdFx0XHRyZXR1cm4gbG9nLnN0YXJ0LmdldFRpbWUoKTtcblx0XHR9KTtcblx0XHRpZiAobGFzdF9hdHRlbXB0KSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMuc3lsVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgbGFzdF9hdHRlbXB0LnJlc19pZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnN5bC5zdGF0dXMgIT0gJ3B1Ymxpc2hlZCcpXG5cdFx0XHR0aGlzLndhcm4oJ0NvdXJzIHN5bGxhYnVzIGlzIG5vdCBwdWJsaXNoZWQnKTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZFVuaXQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhO1xuXHRcdFx0aWYgKHRoaXMuc3R1ZHlNb2RlID09IHRydWUpIHtcblx0XHRcdFx0dGhpcy5zdHVkeU1vZGUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRoaXMudW5sb2FkQ3VycmVudFVuaXQoKTtcblx0XHR9XG5cdH1cblxuXHR1bmxvYWRDdXJyZW50VW5pdCgpIHtcblx0XHRpZiAodGhpcy51bml0SG9zdCkge1xuXHRcdFx0bGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLnVuaXRIb3N0LnZpZXdDb250YWluZXJSZWY7XG5cdFx0XHRpZiAodmlld0NvbnRhaW5lclJlZilcblx0XHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHRcdH1cblx0fVxuXG5cdHByZXZVbml0KCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkVW5pdCkge1xuXHRcdFx0aWYgKHRoaXMuZW5hYmxlTG9nZ2luZylcblx0XHRcdFx0Q291cnNlTG9nLnN0b3BDb3Vyc2VVbml0KHRoaXMsIHRoaXMubWVtYmVyLmlkLCB0aGlzLnNlbGVjdGVkVW5pdC5pZCkuc3Vic2NyaWJlKCk7XG5cdFx0XHR2YXIgcHJldlVuaXQgPSB0aGlzLmNvbXB1dGVkUHJldlVuaXQodGhpcy5zZWxlY3RlZFVuaXQuaWQpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGUgPSB0aGlzLnN5bFV0aWxzLmZpbmRUcmVlTm9kZSh0aGlzLnRyZWUsIHByZXZVbml0LmlkKTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRVbml0ID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHRcdHRoaXMuc3R1ZHlNb2RlID0gZmFsc2U7XG5cdFx0XHR0aGlzLnVubG9hZEN1cnJlbnRVbml0KCk7XG5cdFx0fVxuXHR9XG5cblx0bmV4dFVuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRVbml0KSB7XG5cdFx0XHRpZiAodGhpcy5lbmFibGVMb2dnaW5nKVxuXHRcdFx0XHRDb3Vyc2VMb2cuc3RvcENvdXJzZVVuaXQodGhpcywgdGhpcy5tZW1iZXIuaWQsIHRoaXMuc2VsZWN0ZWRVbml0LmlkKS5zdWJzY3JpYmUoKTtcblx0XHRcdHZhciBuZXh0VW5pdCA9IHRoaXMuY29tcHV0ZWROZXh0VW5pdCh0aGlzLnNlbGVjdGVkVW5pdC5pZCk7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMuc3lsVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgbmV4dFVuaXQuaWQpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZFVuaXQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhO1xuXHRcdFx0dGhpcy5zdHVkeU1vZGUgPSBmYWxzZTtcblx0XHRcdHRoaXMudW5sb2FkQ3VycmVudFVuaXQoKTtcblx0XHR9XG5cdH1cblxuXHRjb21wbGV0ZVVuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRVbml0KSB7XG5cdFx0XHRpZiAodGhpcy5lbmFibGVMb2dnaW5nKVxuXHRcdFx0XHRDb3Vyc2VMb2cuY29tcGxldGVDb3Vyc2VVbml0KHRoaXMsIHRoaXMubWVtYmVyLmlkLCB0aGlzLnNlbGVjdGVkVW5pdC5pZCkuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLmNvbXBsZXRlZFVuaXRJZHMucHVzaCh0aGlzLnNlbGVjdGVkVW5pdC5pZCk7XG5cdFx0XHR0aGlzLnN0dWR5TW9kZSA9IGZhbHNlO1xuXHRcdFx0dGhpcy51bmxvYWRDdXJyZW50VW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXB1dGVkUHJldlVuaXQoY3VycmVudFVuaXRJZDogbnVtYmVyKTogQ291cnNlVW5pdCB7XG5cdFx0dmFyIGN1cnJlbnROb2RlSW5kZXggPSAwO1xuXHRcdGZvciAoOyBjdXJyZW50Tm9kZUluZGV4IDwgdGhpcy50cmVlTGlzdC5sZW5ndGg7IGN1cnJlbnROb2RlSW5kZXgrKykge1xuXHRcdFx0dmFyIG5vZGUgPSB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdO1xuXHRcdFx0aWYgKG5vZGUuZGF0YS5pZCA9PSBjdXJyZW50VW5pdElkKVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y3VycmVudE5vZGVJbmRleC0tO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZUluZGV4ID49IDApIHtcblx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XTtcblx0XHRcdGlmIChub2RlLmRhdGEudHlwZSAhPSAnZm9sZGVyJylcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjdXJyZW50Tm9kZUluZGV4LS07XG5cdFx0fVxuXHRcdHJldHVybiAoY3VycmVudE5vZGVJbmRleCA+PSAwID8gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XS5kYXRhIDogbnVsbCk7XG5cdH1cblxuXHRjb21wdXRlZE5leHRVbml0KGN1cnJlbnRVbml0SWQ6IG51bWJlcik6IENvdXJzZVVuaXQge1xuXHRcdHZhciBjdXJyZW50Tm9kZUluZGV4ID0gMDtcblx0XHRmb3IgKDsgY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoOyBjdXJyZW50Tm9kZUluZGV4KyspIHtcblx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XTtcblx0XHRcdGlmIChub2RlLmRhdGEuaWQgPT0gY3VycmVudFVuaXRJZClcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGN1cnJlbnROb2RlSW5kZXgrKztcblx0XHR3aGlsZSAoY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoKSB7XG5cdFx0XHR2YXIgbm9kZSA9IHRoaXMudHJlZUxpc3RbY3VycmVudE5vZGVJbmRleF07XG5cdFx0XHRpZiAobm9kZS5kYXRhLnR5cGUgIT0gJ2ZvbGRlcicpXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y3VycmVudE5vZGVJbmRleCsrO1xuXHRcdH1cblx0XHRyZXR1cm4gKGN1cnJlbnROb2RlSW5kZXggPCB0aGlzLnRyZWVMaXN0Lmxlbmd0aCA/IHRoaXMudHJlZUxpc3RbY3VycmVudE5vZGVJbmRleF0uZGF0YSA6IG51bGwpO1xuXHR9XG5cblx0c3R1ZHlVbml0KCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkVW5pdCkge1xuXHRcdFx0aWYgKHRoaXMuY291cnNlLmNvbXBsZXRlX3VuaXRfYnlfb3JkZXIpIHtcblx0XHRcdFx0bGV0IHByZXZVbml0OiBDb3Vyc2VVbml0ID0gdGhpcy5jb21wdXRlZFByZXZVbml0KHRoaXMuc2VsZWN0ZWRVbml0LmlkKTtcblx0XHRcdFx0aWYgKHByZXZVbml0KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuY29tcGxldGVkVW5pdElkcy5pbmNsdWRlcyhwcmV2VW5pdC5pZCkpIHtcblx0XHRcdFx0XHRcdHRoaXMub3BlblVuaXQodGhpcy5zZWxlY3RlZFVuaXQpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZW5hYmxlTG9nZ2luZylcblx0XHRcdFx0XHRcdFx0Q291cnNlTG9nLnN0YXJ0Q291cnNlVW5pdCh0aGlzLCB0aGlzLm1lbWJlci5pZCwgdGhpcy5zZWxlY3RlZFVuaXQuaWQpLnN1YnNjcmliZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR0aGlzLmVycm9yKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdZb3UgaGF2ZSBub3QgY29tcGxldGVkIHByZXZpb3VzIHVuaXQnKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5vcGVuVW5pdCh0aGlzLnNlbGVjdGVkVW5pdCk7XG5cdFx0XHRcdFx0Q291cnNlTG9nLnN0YXJ0Q291cnNlVW5pdCh0aGlzLCB0aGlzLm1lbWJlci5pZCwgdGhpcy5zZWxlY3RlZFVuaXQuaWQpLnN1YnNjcmliZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5vcGVuVW5pdCh0aGlzLnNlbGVjdGVkVW5pdCk7XG5cdFx0XHRcdGlmICh0aGlzLmVuYWJsZUxvZ2dpbmcpXG5cdFx0XHRcdFx0Q291cnNlTG9nLnN0YXJ0Q291cnNlVW5pdCh0aGlzLCB0aGlzLm1lbWJlci5pZCwgdGhpcy5zZWxlY3RlZFVuaXQuaWQpLnN1YnNjcmliZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHZpZXdHcmFkZWJvb2soKSB7XG5cdFx0dGhpcy5ncmFkZWJvb2tEaWFsb2cuc2hvdyh0aGlzLm1lbWJlcik7XG5cdH1cblxuXHRvcGVuVW5pdCh1bml0OiBDb3Vyc2VVbml0KSB7XG5cdFx0dmFyIGRldGFpbENvbXBvbmVudCA9IENvdXJzZVVuaXRSZWdpc3Rlci5JbnN0YW5jZS5sb29rdXAodW5pdC50eXBlKTtcblx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudW5pdEhvc3Qudmlld0NvbnRhaW5lclJlZjtcblx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGRldGFpbENvbXBvbmVudCk7XG5cdFx0XHR2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdzdHVkeSc7XG5cdFx0XHQoPElDb3Vyc2VVbml0PnRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlKS5yZW5kZXIodW5pdCk7XG5cdFx0XHR0aGlzLnN0dWR5TW9kZSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm9qZWN0U3VibWl0KHByb2plY3Q6IFByb2plY3QpIHtcblx0XHRyZXR1cm4gXy5maW5kKHRoaXMucHJvamVjdFN1Ym1pdHMsIChzdWJtaXQ6IFByb2plY3RTdWJtaXNzaW9uKSA9PiB7XG5cdFx0XHRyZXR1cm4gc3VibWl0LnByb2plY3RfaWQgPT0gcHJvamVjdC5pZDtcblx0XHR9KSB8fCBuZXcgUHJvamVjdFN1Ym1pc3Npb24oKTtcblx0fVxuXG5cdGpvaW5Db25mZXJlbmNlKCkge1xuXHRcdGlmICh0aGlzLmNvbmZlcmVuY2UuaWQgJiYgdGhpcy5jb25mZXJlbmNlTWVtYmVyLmlkICYmIHRoaXMuY29uZmVyZW5jZU1lbWJlci5pc19hY3RpdmUpXG5cdFx0XHR0aGlzLm1lZXRpbmdTZXJpdmNlLmpvaW4odGhpcy5jb25mZXJlbmNlLnJvb21fcmVmLCB0aGlzLmNvbmZlcmVuY2VNZW1iZXIucm9vbV9tZW1iZXJfcmVmKVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuZXJyb3IoJ1lvdSBhcmUgIG5vdCBhbGxvd2VkIHRvIGpvaW4gdGhlIGNvbmZlcmVuY2UnKTtcblx0fVxuXG5cdHN1Ym1pdFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuXHRcdHRoaXMucHJvamVjdFN1Ym1pdERpYWxvZy5zaG93KHByb2plY3QsIHRoaXMubWVtYmVyKTtcblx0fVxuXG5cdHByZXZpZXdVbml0KCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5jb3Vyc2VfaWQgPSB0aGlzLmNvdXJzZS5pZDtcblx0XHRcdHRoaXMudW5pdFByZXZpZXdEaWFsb2cuc2hvdyh0aGlzLnNlbGVjdGVkTm9kZS5kYXRhKTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==
