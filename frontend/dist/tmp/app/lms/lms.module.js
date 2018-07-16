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
var class_conference_dialog_component_1 = require("./class/class-conference/class-conference.dialog.component");
var question_marking_dialog_component_1 = require("./exam/question-marking/question-marking.dialog.component");
var answer_print_dialog_component_1 = require("./exam/answer-print/answer-print.dialog.component");
var question_sheet_print_dialog_component_1 = require("./exam/question-sheet-print/question-sheet-print.dialog.component");
var conference_list_component_1 = require("./conference/conference-list/conference-list.component");
var course_material_dialog_component_1 = require("./course/course-material/course-material.dialog.component");
var course_faq_dialog_component_1 = require("./course/course-faq/course-faq.dialog.component");
var class_manage_component_1 = require("./class/class-manage/class-manage.component");
var gradebook_dialog_component_1 = require("./class/gradebook/gradebook.dialog.component");
var class_exam_enroll_dialog_component_1 = require("./class/class-exam-enroll/class-exam-enroll.dialog.component");
var course_study_component_1 = require("./course/course-study/course-study.component");
var course_certificate_dialog_component_1 = require("./course/course-certificate/course-certificate.dialog.component");
var certificate_print_dialog_component_1 = require("./course/certificate-print/certificate-print.dialog.component");
var course_manage_component_1 = require("./course/course-manage/course-manage.component");
var exam_manage_component_1 = require("./exam/exam-manage/exam-manage.component");
var exam_submission_dialog_component_1 = require("./exam/exam-submit/exam-submission.dialog.component");
var exam_report_dialog_component_1 = require("./exam/exam-report/exam-report.dialog.component");
var exam_stats_dialog_component_1 = require("./exam/exam-stats/exam-stats.dialog.component");
var project_manage_dialog_component_1 = require("./class/project-manage/project-manage.dialog.component");
var project_marking_dialog_component_1 = require("./class/project-marking/project-marking.dialog.component");
var project_submission_dialog_component_1 = require("./class/project-submit/project-submission.dialog.component");
var survey_stats_dialog_component_1 = require("./survey/survey-stats/survey-stats.dialog.component");
var class_survey_enroll_dialog_component_1 = require("./class/class-survey-enroll/class-survey-enroll.dialog.component");
var survey_study_dialog_component_1 = require("./survey/survey-study/survey-study.dialog.component");
var course_search_component_1 = require("./course/course-search/course-search.component");
var course_recommend_component_1 = require("./course/course-recommend/course-recommend.component");
var survey_list_component_1 = require("./survey/survey-list/survey-list.component");
var lms_profile_dialog_component_1 = require("./course/lms-profile/lms-profile-dialog.component");
var ngx_webcam_1 = require("ngx-webcam");
var course_view_component_1 = require("./course/course-view/course-view.component");
var course_edit_component_1 = require("./course/course-edit/course-edit.component");
var class_member_activity_dialog_component_1 = require("./class/class-member-activity/class-member-activity.dialog.component");
var lms_routing_1 = require("./lms-routing");
var LMSModule = (function () {
    function LMSModule() {
    }
    LMSModule = __decorate([
        core_1.NgModule({
            imports: [lms_routing_1.LMSRoutingModule, shared_module_1.ErpSharedModule, cms_module_1.CMSModule, assessment_module_1.AssessmentModule, auth_module_1.AuthModule, ngx_webcam_1.WebcamModule, analysis_module_1.AnalysisModule],
            declarations: [lms_component_1.LMSComponent, exam_list_component_1.ExamListComponent, exam_study_dialog_component_1.ExamStudyDialog, answer_print_dialog_component_1.AnswerPrintDialog,
                course_list_component_1.CourseListComponent, question_marking_dialog_component_1.QuestionMarkingDialog, certificate_print_dialog_component_1.CertificatePrintDialog, lms_profile_dialog_component_1.LMSProfileDialog,
                exam_submission_dialog_component_1.ExamSubmissionDialog, exam_manage_component_1.ExamManageComponent, question_sheet_print_dialog_component_1.QuestionSheetPrintDialog,
                class_conference_dialog_component_1.ClassConferenceDialog, conference_list_component_1.ConferenceListComponent, course_manage_component_1.CourseManageComponent,
                course_material_dialog_component_1.CourseMaterialDialog, course_faq_dialog_component_1.CourseFaqDialog, course_study_component_1.CourseStudyComponent, project_submission_dialog_component_1.ProjectSubmissionDialog,
                gradebook_dialog_component_1.GradebookDialog, class_manage_component_1.ClassManageComponent, class_exam_enroll_dialog_component_1.ClassExamEnrollDialog, course_certificate_dialog_component_1.CourseCertificateDialog,
                exam_report_dialog_component_1.ExamReportDialog, exam_stats_dialog_component_1.ExamStatsDialog, project_manage_dialog_component_1.ProjectManageDialog, project_marking_dialog_component_1.ProjectMarkingDialog,
                class_survey_enroll_dialog_component_1.ClassSurveyEnrollDialog, survey_stats_dialog_component_1.SurveyStatsDialog, survey_study_dialog_component_1.SurveyStudyDialog,
                course_search_component_1.CourseSearchComponent, course_recommend_component_1.CourseRecommendComponent, survey_list_component_1.SurveyListComponent, course_view_component_1.CourseViewComponent,
                course_edit_component_1.CourseEditComponent, class_member_activity_dialog_component_1.ClassMemberActivityDialog],
            exports: [certificate_print_dialog_component_1.CertificatePrintDialog, exam_study_dialog_component_1.ExamStudyDialog, survey_study_dialog_component_1.SurveyStudyDialog, answer_print_dialog_component_1.AnswerPrintDialog, exam_submission_dialog_component_1.ExamSubmissionDialog],
            providers: []
        })
    ], LMSModule);
    return LMSModule;
}());
exports.LMSModule = LMSModule;
