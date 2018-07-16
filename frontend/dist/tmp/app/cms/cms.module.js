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
var assessment_module_1 = require("../assessment/assessment.module");
var shared_module_1 = require("../shared/shared.module");
var cms_component_1 = require("./cms.component");
var exam_content_dialog_component_1 = require("./exam/content-dialog/exam-content.dialog.component");
var project_content_dialog_component_1 = require("./project/content-dialog/project-content.dialog.component");
var course_syllabus_dialog_component_1 = require("./course/course-syllabus/course-syllabus.dialog.component");
var sum_pipe_1 = require("./exam/sum.pipe");
var unit_container_directive_1 = require("./course/course-unit-template/unit-container.directive");
var folder_unit_component_1 = require("./course/course-unit-template/folder/folder-unit.component");
var exercise_unit_component_1 = require("./course/course-unit-template/exercise/exercise-unit.component");
var scorm_lecture_unit_component_1 = require("./course/course-unit-template/scorm/scorm-lecture-unit.component");
var slide_lecture_unit_component_1 = require("./course/course-unit-template/slide/slide-lecture-unit.component");
var video_lecture_unit_component_1 = require("./course/course-unit-template/video/video-lecture-unit.component");
var html_lecture_unit_component_1 = require("./course/course-unit-template/lecture/html-lecture-unit.component");
var course_unit_dialog_component_1 = require("./course/course-unit-dialog/course-unit-dialog.component");
var course_unit_preview_dialog_component_1 = require("./course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var course_setting_dialog_component_1 = require("./course/course-setting/course-setting.dialog.component");
var question_sheet_editor_dialog_component_1 = require("./exam/question-sheet-editor/question-sheet-editor.dialog.component");
var question_sheet_save_dialog_component_1 = require("./exam/question-sheet-save/question-sheet-save.dialog.component");
var survey_content_dialog_component_1 = require("./survey/content-dialog/survey-content.dialog.component");
var survey_sheet_save_dialog_component_1 = require("./survey/survey-sheet-save/survey-sheet-save.dialog.component");
var grade_pipe_1 = require("./exam/exam-setting/grade.pipe");
var exam_setting_dialog_component_1 = require("./exam/exam-setting/exam-setting.dialog.component");
var course_publish_dialog_component_1 = require("./course/course-publish/course-publish.dialog.component");
var course_backup_dialog_component_1 = require("./course/course-backup/course-backup.dialog.component");
var course_restore_dialog_component_1 = require("./course/course-restore/course-restore.dialog.component");
var CMSModule = (function () {
    function CMSModule() {
    }
    CMSModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.ErpSharedModule, auth_module_1.AuthModule, assessment_module_1.AssessmentModule],
            declarations: [cms_component_1.CMSComponent, sum_pipe_1.SumPipe, exam_content_dialog_component_1.ExamContentDialog, course_unit_preview_dialog_component_1.CourseUnitPreviewDialog, project_content_dialog_component_1.ProjectContentDialog,
                course_syllabus_dialog_component_1.CourseSyllabusDialog, unit_container_directive_1.CourseUnitContainerDirective, folder_unit_component_1.FolderCourseUnitComponent, course_setting_dialog_component_1.CourseSettingDialog,
                slide_lecture_unit_component_1.SlideLectureCourseUnitComponent, question_sheet_editor_dialog_component_1.QuestionSheetEditorDialog, question_sheet_save_dialog_component_1.QuestionSheetSaveDialog, survey_sheet_save_dialog_component_1.SurveySheetSaveDialog,
                exercise_unit_component_1.ExerciseCourseUnitComponent, scorm_lecture_unit_component_1.SCORMLectureCourseUnitComponent, video_lecture_unit_component_1.VideoLectureCourseUnitComponent,
                html_lecture_unit_component_1.HtmlLectureCourseUnitComponent, course_unit_dialog_component_1.CourseUnitDialog, survey_content_dialog_component_1.SurveyContentDialog, grade_pipe_1.ValidateGradePipe, exam_setting_dialog_component_1.ExamSettingDialog,
                course_publish_dialog_component_1.CoursePublishDialog, course_backup_dialog_component_1.CourseBackupDialog, course_restore_dialog_component_1.CourseRestoreDialog],
            exports: [exam_content_dialog_component_1.ExamContentDialog, course_syllabus_dialog_component_1.CourseSyllabusDialog, course_unit_preview_dialog_component_1.CourseUnitPreviewDialog, unit_container_directive_1.CourseUnitContainerDirective,
                project_content_dialog_component_1.ProjectContentDialog, survey_content_dialog_component_1.SurveyContentDialog, course_publish_dialog_component_1.CoursePublishDialog, course_backup_dialog_component_1.CourseBackupDialog, course_restore_dialog_component_1.CourseRestoreDialog],
            providers: [],
            entryComponents: [folder_unit_component_1.FolderCourseUnitComponent, exercise_unit_component_1.ExerciseCourseUnitComponent, scorm_lecture_unit_component_1.SCORMLectureCourseUnitComponent, slide_lecture_unit_component_1.SlideLectureCourseUnitComponent,
                video_lecture_unit_component_1.VideoLectureCourseUnitComponent, html_lecture_unit_component_1.HtmlLectureCourseUnitComponent]
        })
    ], CMSModule);
    return CMSModule;
}());
exports.CMSModule = CMSModule;
