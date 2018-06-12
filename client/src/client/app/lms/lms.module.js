"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var analysis_module_1 = require("../analysis/analysis.module");
var assessment_module_1 = require("../assessment/assessment.module");
var cms_module_1 = require("../cms/cms.module");
var lms_component_1 = require("./lms.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var exam_study_dialog_component_1 = require("./exam/exam-study/exam-study.dialog.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var class_conference_dialog_component_1 = require("./course/class-conference/class-conference.dialog.component");
var question_marking_dialog_component_1 = require("./exam/question-marking/question-marking.dialog.component");
var answer_print_dialog_component_1 = require("./exam/answer-print/answer-print.dialog.component");
var question_sheet_print_dialog_component_1 = require("./exam/question-sheet-print/question-sheet-print.dialog.component");
var conference_list_component_1 = require("./conference/conference-list/conference-list.component");
var course_material_dialog_component_1 = require("./course/course-material/course-material.dialog.component");
var course_faq_dialog_component_1 = require("./course/course-faq/course-faq.dialog.component");
var gradebook_list_component_1 = require("./course/gradebook-list/gradebook-list.component");
var gradebook_dialog_component_1 = require("./course/gradebook/gradebook.dialog.component");
var class_exam_enroll_dialog_component_1 = require("./course/class-exam-enroll/class-exam-enroll.dialog.component");
var class_exam_list_dialog_component_1 = require("./course/class-exam-list/class-exam-list.dialog.component");
var course_study_component_1 = require("./course/course-study/course-study.component");
var course_certificate_dialog_component_1 = require("./course/course-certificate/course-certificate.dialog.component");
var certificate_print_dialog_component_1 = require("./course/certificate-print/certificate-print.dialog.component");
var course_manage_component_1 = require("./course/course-manage/course-manage.component");
var exam_manage_component_1 = require("./exam/exam-manage/exam-manage.component");
var exam_submission_dialog_component_1 = require("./exam/exam-submit/exam-submission.dialog.component");
var exam_report_dialog_component_1 = require("./exam/exam-report/exam-report.dialog.component");
var exam_stats_dialog_component_1 = require("./exam/exam-stats/exam-stats.dialog.component");
var project_manage_dialog_component_1 = require("./course/project-manage/project-manage.dialog.component");
var project_list_dialog_component_1 = require("./course/project-list/project-list.dialog.component");
var project_marking_dialog_component_1 = require("./course/project-marking/project-marking.dialog.component");
var project_submission_dialog_component_1 = require("./course/project-submit/project-submission.dialog.component");
var ngx_webcam_1 = require("ngx-webcam");
var LMSModule = (function () {
    function LMSModule() {
    }
    LMSModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.ErpSharedModule, cms_module_1.CMSModule, assessment_module_1.AssessmentModule, auth_module_1.AuthModule, ngx_webcam_1.WebcamModule, analysis_module_1.AnalysisModule],
            declarations: [lms_component_1.LMSComponent, exam_list_component_1.ExamListComponent, exam_study_dialog_component_1.ExamStudyDialog, answer_print_dialog_component_1.AnswerPrintDialog,
                course_list_component_1.CourseListComponent, question_marking_dialog_component_1.QuestionMarkingDialog, certificate_print_dialog_component_1.CertificatePrintDialog,
                exam_submission_dialog_component_1.ExamSubmissionDialog, class_exam_list_dialog_component_1.ClassExamListDialog, exam_manage_component_1.ExamManageComponent, question_sheet_print_dialog_component_1.QuestionSheetPrintDialog,
                class_conference_dialog_component_1.ClassConferenceDialog, conference_list_component_1.ConferenceListComponent, course_manage_component_1.CourseManageComponent,
                course_material_dialog_component_1.CourseMaterialDialog, course_faq_dialog_component_1.CourseFaqDialog, course_study_component_1.CourseStudyComponent, project_submission_dialog_component_1.ProjectSubmissionDialog,
                gradebook_dialog_component_1.GradebookDialog, gradebook_list_component_1.GradebookListDialog, class_exam_enroll_dialog_component_1.ClassExamEnrollDialog, course_certificate_dialog_component_1.CourseCertificateDialog,
                exam_report_dialog_component_1.ExamReportDialog, exam_stats_dialog_component_1.ExamStatsDialog, project_manage_dialog_component_1.ProjectManageDialog, project_list_dialog_component_1.ProjectListDialog, project_marking_dialog_component_1.ProjectMarkingDialog],
            exports: [certificate_print_dialog_component_1.CertificatePrintDialog, exam_study_dialog_component_1.ExamStudyDialog, answer_print_dialog_component_1.AnswerPrintDialog, exam_submission_dialog_component_1.ExamSubmissionDialog],
            providers: []
        })
    ], LMSModule);
    return LMSModule;
}());
exports.LMSModule = LMSModule;
//# sourceMappingURL=lms.module.js.map