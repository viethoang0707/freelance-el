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
var course_faq_model_1 = require("../../../shared/models/elearning/course-faq.model");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_model_1 = require("../../../shared/models/elearning/course-material.model");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var exam_study_dialog_component_1 = require("../../exam/exam-study/exam-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var class_exam_model_1 = require("../../../shared/models/elearning/class-exam.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var certificate_print_dialog_component_1 = require("../certificate-print/certificate-print.dialog.component");
var answer_print_dialog_component_1 = require("../../exam/answer-print/answer-print.dialog.component");
var meeting_service_1 = require("../../../shared/services/meeting.service");
var unit_decorator_1 = require("../../../cms/course/course-unit-template/unit.decorator");
var unit_container_directive_1 = require("../../../cms/course/course-unit-template/unit-container.directive");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var project_submission_dialog_component_1 = require("../project-submit/project-submission.dialog.component");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
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
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.course = new course_model_1.Course();
        _this.member = new course_member_model_1.CourseMember();
        _this.certificate = new course_certificate_model_1.Certificate();
        _this.conference = new conference_model_1.Conference();
        _this.conferenceMember = new conference_member_model_1.ConferenceMember();
        _this.studyMode = false;
        _this.enableLogging = false;
        return _this;
    }
    CourseStudyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var memberId = +params['memberId'];
            var courseId = +params['courseId'];
            course_model_1.Course.get(_this, courseId).subscribe(function (course) {
                course_member_model_1.CourseMember.get(_this, memberId).subscribe(function (member) {
                    _this.member = member;
                    _this.course = course;
                    _this.loadFaqs();
                    _this.loadMaterials();
                    _this.loadExam();
                    _this.loadProject();
                    _this.loadCertificate();
                    _this.loadConference();
                    _this.loadCouseSyllabus();
                    if (course.mode == 'group')
                        course_class_model_1.CourseClass.get(_this, member.class_id).subscribe(function (courseClass) {
                            _this.courseClass = courseClass;
                            if (_this.courseClass.IsAvailable)
                                _this.enableLogging = true;
                        });
                });
            });
        });
    };
    CourseStudyComponent.prototype.loadCouseSyllabus = function () {
        var _this = this;
        course_syllabus_model_1.CourseSyllabus.byCourse(this, this.course.id).subscribe(function (syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(_this, syl.id).subscribe(function (units) {
                _this.syl = syl;
                _this.units = _.filter(units, function (unit) {
                    return unit.status == 'published';
                });
                _this.tree = _this.sylUtils.buildGroupTree(units);
                _this.treeList = _this.sylUtils.flattenTree(_this.tree);
                log_model_1.CourseLog.lastUserAttempt(_this, _this.authService.UserProfile.id, _this.course.id).subscribe(function (attempt) {
                    if (attempt) {
                        _this.selectedNode = _this.sylUtils.findTreeNode(_this.tree, attempt.res_id);
                    }
                });
            });
        });
    };
    CourseStudyComponent.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
            this.member.completeUnit(this, this.selectedUnit.id).subscribe(function (success) {
                _this.selectedUnit["completed"] = success;
            });
            if (this.studyMode == true) {
                this.studyMode = false;
                this.unloadCurrentUnit();
            }
        }
    };
    CourseStudyComponent.prototype.unloadCurrentUnit = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
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
            this.selectedUnit["completed"] = true;
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
        var _this = this;
        if (this.selectedUnit) {
            if (this.syl.complete_unit_by_order) {
                var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
                if (prevUnit)
                    this.member.completeUnit(this, this.selectedUnit.id).subscribe(function (success) {
                        if (success) {
                            _this.openUnit(_this.selectedUnit);
                            if (_this.enableLogging)
                                log_model_1.CourseLog.startCourseUnit(_this, _this.member.id, _this.selectedUnit.id).subscribe();
                        }
                        else
                            _this.error(_this.translateService.instant('You have not completed previous unit'));
                    });
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
    CourseStudyComponent.prototype.loadCertificate = function () {
        var _this = this;
        course_certificate_model_1.Certificate.byMember(this, this.member.id).subscribe(function (certificate) {
            _this.certificate = certificate;
        });
    };
    CourseStudyComponent.prototype.loadConference = function () {
        var _this = this;
        conference_member_model_1.ConferenceMember.byCourseMember(this, this.member.id)
            .subscribe(function (member) {
            _this.conferenceMember = member;
            if (member)
                conference_model_1.Conference.get(_this, member.conference_id).subscribe(function (conference) {
                    _this.conference = conference;
                });
        });
    };
    CourseStudyComponent.prototype.loadExam = function () {
        var _this = this;
        if (this.member.class_id) {
            class_exam_model_1.ClassExam.listByClass(this, this.member.class_id).subscribe(function (classExams) {
                var examIds = _.pluck(classExams, 'exam_id');
                exam_member_model_1.ExamMember.listByUser(_this, _this.authService.UserProfile.id).subscribe(function (members) {
                    members = _.filter(members, function (member) {
                        return member.enroll_status != 'completed' && _.contains(examIds, member.exam_id);
                    });
                    submission_model_1.Submission.listByUser(_this, _this.authService.UserProfile.id).subscribe(function (submits) {
                        var examIds = _.pluck(members, 'exam_id');
                        exam_model_1.Exam.array(_this, examIds)
                            .subscribe(function (exams) {
                            _.each(exams, function (exam) {
                                exam.member = _.find(members, function (member) {
                                    return member.exam_id == exam.id;
                                });
                                exam.submit = _.find(submits, function (submit) {
                                    return submit.member_id == exam.member.id && submit.exam_id == exam.id;
                                });
                                if (exam.submit) {
                                    if (exam.submit.score != null)
                                        exam.score = exam.submit.score;
                                    else
                                        exam.score = '';
                                }
                                exam_question_model_1.ExamQuestion.countByExam(_this, exam.id).subscribe(function (count) {
                                    exam.question_count = count;
                                });
                                exam.examMemberData = {};
                                exam_member_model_1.ExamMember.listByExam(_this, exam.id).subscribe(function (members) {
                                    exam.examMemberData = _this.reportUtils.analyseExamMember(exam, members);
                                });
                            });
                            _this.exams = _.filter(exams, function (exam) {
                                return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.status == 'published');
                            });
                            _this.exams.sort(function (exam1, exam2) {
                                if (exam1.create_date > exam2.create_date)
                                    return -1;
                                else if (exam1.create_date < exam2.create_date)
                                    return 1;
                                else
                                    return 0;
                            });
                            _this.completedExams = _.filter(exams, function (exam) {
                                return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.member.enroll_status == 'completed');
                            });
                            _this.completedExams.sort(function (exam1, exam2) {
                                if (exam1.create_date > exam2.create_date)
                                    return -1;
                                else if (exam1.create_date < exam2.create_date)
                                    return 1;
                                else
                                    return 0;
                            });
                        });
                    });
                });
            });
        }
    };
    CourseStudyComponent.prototype.loadProject = function () {
        var _this = this;
        if (this.member.class_id) {
            project_model_1.Project.listByClass(this, this.member.class_id).subscribe(function (projects) {
                project_submission_model_1.ProjectSubmission.listByMember(_this, _this.member.id).subscribe(function (submits) {
                    _this.projects = projects;
                    _.each(projects, function (project) {
                        project["submit"] = _.find(submits, function (submit) {
                            return submit.project_id == projects.id;
                        });
                        if (project["submit"]) {
                            if (project["submit"].score != null)
                                project["score"] = project["submit"].score;
                            else
                                project["score"] = '';
                        }
                    });
                });
            });
        }
    };
    CourseStudyComponent.prototype.loadFaqs = function () {
        var _this = this;
        course_faq_model_1.CourseFaq.listByCourse(this, this.course.id)
            .subscribe(function (faqs) {
            _this.faqs = faqs;
        });
    };
    CourseStudyComponent.prototype.loadMaterials = function () {
        var _this = this;
        course_material_model_1.CourseMaterial.listByCourse(this, this.course.id)
            .subscribe(function (materials) {
            _this.materials = materials;
        });
    };
    CourseStudyComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        var now = new Date();
        if (exam.start && exam.start.getTime() > now.getTime()) {
            this.warn(this.translateService.instant('Exam has not been started'));
            return;
        }
        if (exam.end && exam.end.getTime() < now.getTime()) {
            this.warn(this.translateService.instant('Exam has ended'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to start?'), function () {
            _this.examStudyDialog.show(exam, member);
        });
    };
    CourseStudyComponent.prototype.joinConference = function () {
        if (this.conference.id && this.conferenceMember.id)
            this.meetingSerivce.join(this.conference.room_ref, this.conferenceMember.room_member_ref);
    };
    CourseStudyComponent.prototype.submitProject = function (project) {
        var now = new Date();
        if (project.start && project.start.getTime() > now.getTime()) {
            this.warn(this.translateService.instant('Project has not been started'));
            return;
        }
        if (project.end && project.end.getTime() < now.getTime()) {
            this.warn(this.translateService.instant('Project has ended'));
            return;
        }
        this.projectSubmitDialog.show(project, this.member);
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
//# sourceMappingURL=course-study.component.js.map