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
            template: "<div class=\"ui-g card card-w-title\">   <div class=\"ui-lg-12 ui-g-12\">   <h1>{{'Course study'|translate}}: {{course.name}} </h1>   </div>   <div class=\"ui-lg-12 ui-g-12\">   <p-tabView [style]=\"{width: '100%', height: '100vh'}\">     <p-tabPanel header=\"{{'Course syllabus'|translate}}\" leftIcon=\"ui-icon-dehaze\" [disabled]=\"syl.status!='published'\">       <div class=\"ui-lg-3 ui-md-3 ui-g-12 course-study-tree\">         <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\" styleClass=\"tree-unit-course-study\"></p-tree>       </div>       <div class=\"ui-lg-9 ui-md-9 ui-g-12\" *ngIf=\"selectedUnit\">         <div class=\"card course-study-unit\">           <div class=\"image-box-content\">             <div class=\"fLeft\">               <h3 class=\"removeMT mb5 mr10 fLeft heading-unit-course\">{{selectedUnit.name}}</h3>               <span class=\"complete-status\" *ngIf=\"completedUnitIds.includes(selectedUnit.id)\">{{'Completed'|translate}}</span>               <span class=\"incomplete-status\" *ngIf=\"!completedUnitIds.includes(selectedUnit.id)\">{{'Incompleted'|translate}}</span>               <div class=\"clearfix\"></div>               <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type] |translate }}</span>             </div>             <div class=\"image-box-footer fRight\">               <button pButton type=\"button\" icon=\"ui-icon-open-in-browser\" title=\"{{'Study'| translate}}\" label=\"{{'Study'|translate}}\" class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"studyUnit()\" *ngIf=\"selectedUnit.type!='folder' && !studyMode\"></button>               <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"prevUnit()\"></button>               <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" title=\"{{'Next'|translate}}\" label=\"{{'Next'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"nextUnit()\"></button>             </div>             <div class=\"clearfix\"></div>             <div>               <ng-template course-unit-container></ng-template>               <div style=\"text-align: center;\">                 <button pButton type=\"button\" icon=\"ui-icon-open-in-browser\" title=\"{{'Complete'| translate}}\" label=\"{{'Complete'|translate}}\" class=\"cyan-btn mt5\" (click)=\"completeUnit()\" [disabled]=\"completedUnitIds.includes(selectedUnit.id)\" *ngIf=\"selectedUnit.type!='folder' && studyMode\"></button>                 <button pButton type=\"button\" icon=\"ui-icon-zoom-in\" title=\"{{'Zoom in'| translate}}\" label=\"{{'Zoom in'|translate}}\" class=\"blue-grey-btn mt5\" (click)=\"previewUnit()\" [disabled]=\"completedUnitIds.includes(selectedUnit.id)\" *ngIf=\"selectedUnit.type!='folder' && studyMode\"></button>               </div>             </div>           </div>         </div>       </div>     </p-tabPanel>     <p-tabPanel *ngIf=\"member.class_id\" header=\"{{'Project'|translate}}\" leftIcon=\"ui-icon-assignment\" styleClass=\"project-course-study\" headerStyleClass=\"project-course-study\">       <div class=\"ui-lg-12 ui-g-12\">         <p-dataList [value]=\"projects\" [paginator]=\"true\" [rows]=\"5\">           <ng-template let-project pTemplate=\"item\">             <p-card>               <p-header>                 <div class=\"head-exam\">                 </div>               </p-header>               <div class=\"ui-g body-exam\">                 <div class=\"ui-lg-8 ui-g-12\">                   <h4 class=\"title\">{{project.name}}</h4>                   <span class=\"e-status\">                     {{PROJECT_STATUS[project.status] | translate}}                   </span>                   <div class=\"clearfix\"></div>                   <p-accordion styleClass=\"cont\">                     <p-accordionTab header=\"{{'Content' | translate}}\">                       <p [innerHTML]=\"project.content\"></p>                     </p-accordionTab>                     <p-accordionTab header=\"{{'Attachment' | translate}}\">                       <div class=\"ui-g-6\">                         <a href=\"{{project.file_url}}\" target=\"_blank\" *ngIf=\"project.file_url\">{{project.filename}}</a>                       </div>                     </p-accordionTab>                   </p-accordion>                 </div>                 <div class=\"ui-lg-4 ui-g-12\">                   <p-card>                     <ul class=\"list-cmt\">                       <li class=\"clearfix\">                         <i class=\"material-icons\">date_range</i>                         <span class=\"cmt-title\">{{'Start date'|translate}}</span>                         <span class=\"cmt-detail\">{{project.start | date : \"dd/MM/yyyy\"}}</span>                       </li>                       <li class=\"clearfix\">                         <i class=\"material-icons\">date_range</i>                         <span class=\"cmt-title\">{{'End date'|translate}}</span>                         <span class=\"cmt-detail\">{{project.end | date : \"dd/MM/yyyy\"}}</span>                       </li>                       <li class=\"clearfix\" *ngVar=\"getProjectSubmit(project) as submit\">                         <i class=\"material-icons\">date_range</i>                         <span class=\"cmt-title\">{{'Submit date'|translate}}</span>                         <span class=\"cmt-detail\">{{submit.date_submit | date : \"dd/MM/yyyy\"}}</span>                       </li>                       <li class=\"clearfix\">                         <i class=\"material-icons\">star</i>                         <span class=\"cmt-title\">{{'Score'|translate}}</span>                         <span class=\"cmt-detail\">{{project.score}}</span>                       </li>                     </ul>                     <p-footer>                       <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Submit'| translate}}\" label=\"{{'Submit project'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"submitProject(project)\" [disabled]=\"project.submit || !project.IsAvailable\"></button>                     </p-footer>                   </p-card>                 </div>               </div>             </p-card>           </ng-template>         </p-dataList>         <project-submission-dialog></project-submission-dialog>       </div>     </p-tabPanel>     <p-tabPanel *ngIf=\"member.class_id\" header=\"{{'Exam'|translate}}\" leftIcon=\"ui-icon-grade\">       <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <p-dataList [value]=\"examMembers\" [paginator]=\"true\" [rows]=\"5\">           <ng-template let-member pTemplate=\"item\">             <p-card>               <p-header>                 <div class=\"head-exam\">                 </div>               </p-header>               <div class=\"ui-g body-exam\">                 <div class=\"ui-lg-8 ui-md-12 ui-g-12\">                   <h4 class=\"title\">{{member.exam.name}}</h4>                   <span class=\"e-status\">                     {{EXAM_STATUS[member.exam.status] | translate}}                   </span>                   <div class=\"clearfix\"></div>                   <p-accordion styleClass=\"cont\">                     <p-accordionTab header=\"{{'Summary' | translate}}\">                       {{member.exam.summary}}                     </p-accordionTab>                     <p-accordionTab header=\"{{'Instruction' | translate}}\">                       <p [innerHTML]=\"member.exam.instruction\"></p>                     </p-accordionTab>                   </p-accordion>                 </div>                 <div class=\"ui-lg-4 ui-md-12 ui-g-12\">                   <p-card>                     <ul class=\"list-cmt\">                       <li class=\"clearfix\">                         <i class=\"material-icons\">date_range</i>                         <span class=\"cmt-title\">{{'Start date'|translate}}</span>                         <span class=\"cmt-detail\">{{member.exam.start | date : \"dd/MM/yyyy\"}}</span>                       </li>                       <li class=\"clearfix\">                         <i class=\"material-icons\">date_range</i>                         <span class=\"cmt-title\">{{'End date'|translate}}</span>                         <span class=\"cmt-detail\">{{member.exam.end | date : \"dd/MM/yyyy\"}}</span>                       </li>                       <li class=\"clearfix\">                         <i class=\"material-icons\">alarm</i>                         <span class=\"cmt-title\">{{'Duration (mintes)'|translate}}</span>                         <span class=\"cmt-detail\">{{member.exam.duration}}</span>                       </li>                       <li class=\"clearfix\">                         <i class=\"material-icons\">done</i>                         <span class=\"cmt-title\">{{'Number of question'|translate}}</span>                         <span class=\"cmt-detail\">{{member.exam.question_count}}</span>                       </li>                     </ul>                     <p-footer>                       <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"startExam(member.exam, member)\" [disabled]=\"!member.exam.IsAvailable || member.enroll_status=='completed'\"></button>                     </p-footer>                   </p-card>                 </div>               </div>               <p-footer>               </p-footer>             </p-card>           </ng-template>         </p-dataList>         <exam-study-dialog></exam-study-dialog>       </div>     </p-tabPanel>     <p-tabPanel *ngIf=\"member.class_id\" header=\"{{'Gradebook'|translate}}\" leftIcon=\"ui-icon-book\">       <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <p-toolbar>           <div class=\"ui-toolbar-group-left\">             <button pButton type=\"button \" label=\"{{ 'View certificate'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-print \" (click)=\"showCertificate()\" *ngIf=\"certificate\"></button>             <button pButton type=\"button\" label=\"{{ 'Gradebook'|translate}}\" class=\"blue-grey-btn \" icon=\"ui-icon-visibility\" (click)=\"viewGradebook()\" ></button>           </div>         </p-toolbar>         <answer-print-dialog></answer-print-dialog>         <certificate-print-dialog></certificate-print-dialog>       </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Course material'|translate}}\" leftIcon=\"ui-icon-cloud-download\" styleClass=\"course-material-study\" headerStyleClass=\"course-material-study\">       <div class=\"ui-g-12 ui-md-6 ui-lg-4 task-list\">         <ul class=\"task-list-container\">           <li *ngFor=\"let material of materials\">             <a href=\"{{material.url}}\">               <span class=\"task-name\">{{material.name}}</span>             </a>             <i class=\"material-icons\" *ngIf=\"material.type=='video'\">videocam</i>             <i class=\"material-icons\" *ngIf=\"material.type=='audio'\">mic</i>             <i class=\"material-icons\" *ngIf=\"material.type=='file'\">attachment</i>           </li>         </ul>       </div>     </p-tabPanel>     <p-tabPanel header=\"{{'Course FAQ'|translate}}\" leftIcon=\"ui-icon-question-answer\">       <div class=\"ui-g-12\">         <p-accordion>           <p-accordionTab header=\"{{faq.question}}\" [selected]=\"true\" *ngFor=\"let faq of faqs\">             <div [innerHTML]=\"faq.answer\"></div>           </p-accordionTab>         </p-accordion>       </div>     </p-tabPanel>     <p-tabPanel *ngIf=\"course.mode=='group'\" header=\"{{'Conference'|translate}}\" leftIcon=\"ui-icon-call\">       <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <div class=\"ui-lg-4 ui-md-6 ui-g-12\">           <div class=\"task-box task-box-1\">             <div class=\"task-box-header\">               <button pButton type=\"button \" label=\"{{ 'Join'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-call \" (click)=\"joinConference() \" [disabled]=\"conference.status!='open'\"></button>             </div>             <div class=\"task-box-content\">               <h3>{{'Live conference'|translate}} : {{conference.name}}</h3>               <p>{{'Room password'|translate}} : {{conference.room_pass}}               </p>             </div>             <div class=\"task-box-footer\">               <span class=\"task-status\">{{conference.status}}</span>             </div>           </div>         </div>       </div>     </p-tabPanel>   </p-tabView>   </div> </div> <course-unit-preview-dialog></course-unit-preview-dialog>",
            styles: [".image-box-footer{margin-top:10px;margin-bottom:10px}.course-study-unit{height:528px}@media screen and (max-width:500px){.course-study-unit{height:auto}}.list-cmt{padding-left:0}.complete-status{background-color:green}.complete-status,.incomplete-status{border-radius:9px;padding:2px 8px;color:#fff}.incomplete-status{background-color:grey}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.e-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}h4.title{float:left;font-weight:600;color:#192fa9;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 15px}"],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute,
            meeting_service_1.MeetingService, core_1.ComponentFactoryResolver])
    ], CourseStudyComponent);
    return CourseStudyComponent;
}(base_component_1.BaseComponent));
exports.CourseStudyComponent = CourseStudyComponent;
