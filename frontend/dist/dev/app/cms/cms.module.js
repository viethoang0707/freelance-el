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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY21zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6QyxtREFBaUQ7QUFDakQscUVBQW1FO0FBQ25FLHlEQUEwRDtBQUMxRCxpREFBK0M7QUFDL0MscUdBQXdGO0FBQ3hGLDhHQUFpRztBQUNqRyw4R0FBaUc7QUFDakcsNENBQTBDO0FBQzFDLG1HQUFzRztBQUN0RyxvR0FBdUc7QUFDdkcsMEdBQTZHO0FBQzdHLGlIQUFrSDtBQUNsSCxpSEFBa0g7QUFDbEgsaUhBQWtIO0FBQ2xILGlIQUFtSDtBQUNuSCx5R0FBNEY7QUFDNUYsaUlBQW1IO0FBQ25ILDJHQUE4RjtBQUM5Riw4SEFBZ0g7QUFDaEgsd0hBQTBHO0FBQzFHLDJHQUE4RjtBQUM5RixvSEFBc0c7QUFDdEcsNkRBQW1FO0FBQ25FLG1HQUFzRjtBQUN0RiwyR0FBOEY7QUFDOUYsd0dBQTJGO0FBQzNGLDJHQUE4RjtBQWlCOUY7SUFBQTtJQUNBLENBQUM7SUFEWSxTQUFTO1FBZHJCLGVBQVEsQ0FBQztZQUNULE9BQU8sRUFBRSxDQUFDLCtCQUFlLEVBQUUsd0JBQVUsRUFBRSxvQ0FBZ0IsQ0FBQztZQUN4RCxZQUFZLEVBQUUsQ0FBQyw0QkFBWSxFQUFFLGtCQUFPLEVBQUUsaURBQWlCLEVBQUUsOERBQXVCLEVBQUMsdURBQW9CO2dCQUNwRyx1REFBb0IsRUFBRSx1REFBNEIsRUFBRSxpREFBeUIsRUFBRSxxREFBbUI7Z0JBQ2xHLDhEQUErQixFQUFDLGtFQUF5QixFQUFFLDhEQUF1QixFQUFDLDBEQUFxQjtnQkFDeEcscURBQTJCLEVBQUUsOERBQStCLEVBQUUsOERBQStCO2dCQUM1Riw0REFBOEIsRUFBRSwrQ0FBZ0IsRUFBRSxxREFBbUIsRUFBQyw4QkFBaUIsRUFBRSxpREFBaUI7Z0JBQzFHLHFEQUFtQixFQUFFLG1EQUFrQixFQUFFLHFEQUFtQixDQUFDO1lBQy9ELE9BQU8sRUFBRSxDQUFDLGlEQUFpQixFQUFFLHVEQUFvQixFQUFFLDhEQUF1QixFQUFFLHVEQUE0QjtnQkFDeEcsdURBQW9CLEVBQUUscURBQW1CLEVBQUUscURBQW1CLEVBQUUsbURBQWtCLEVBQUUscURBQW1CLENBQUM7WUFDeEcsU0FBUyxFQUFFLEVBQUU7WUFDYixlQUFlLEVBQUUsQ0FBQyxpREFBeUIsRUFBRSxxREFBMkIsRUFBRSw4REFBK0IsRUFBRSw4REFBK0I7Z0JBQ3pJLDhEQUErQixFQUFFLDREQUE4QixDQUFDO1NBQ2pFLENBQUM7T0FDVyxTQUFTLENBQ3JCO0lBQUQsZ0JBQUM7Q0FERCxBQUNDLElBQUE7QUFEWSw4QkFBUyIsImZpbGUiOiJhcHAvY21zL2Ntcy5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aE1vZHVsZSB9IGZyb20gJy4uL2F1dGgvYXV0aC5tb2R1bGUnO1xuaW1wb3J0IHsgQXNzZXNzbWVudE1vZHVsZSB9IGZyb20gJy4uL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC5tb2R1bGUnO1xuaW1wb3J0IHsgRXJwU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ01TQ29tcG9uZW50IH0gZnJvbSAnLi9jbXMuY29tcG9uZW50JztcbmltcG9ydCB7IEV4YW1Db250ZW50RGlhbG9nIH0gZnJvbSAnLi9leGFtL2NvbnRlbnQtZGlhbG9nL2V4YW0tY29udGVudC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2plY3RDb250ZW50RGlhbG9nIH0gZnJvbSAnLi9wcm9qZWN0L2NvbnRlbnQtZGlhbG9nL3Byb2plY3QtY29udGVudC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzRGlhbG9nIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXN5bGxhYnVzL2NvdXJzZS1zeWxsYWJ1cy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1bVBpcGUgfSBmcm9tICcuL2V4YW0vc3VtLnBpcGUnO1xuaW1wb3J0IHsgQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQtY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGb2xkZXJDb3Vyc2VVbml0Q29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXVuaXQtdGVtcGxhdGUvZm9sZGVyL2ZvbGRlci11bml0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGVyY2lzZUNvdXJzZVVuaXRDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS9leGVyY2lzZS9leGVyY2lzZS11bml0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTQ09STUxlY3R1cmVDb3Vyc2VVbml0Q29tcG9uZW50fSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS9zY29ybS9zY29ybS1sZWN0dXJlLXVuaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnR9IGZyb20gJy4vY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3NsaWRlL3NsaWRlLWxlY3R1cmUtdW5pdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlkZW9MZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXVuaXQtdGVtcGxhdGUvdmlkZW8vdmlkZW8tbGVjdHVyZS11bml0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdG1sTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS9sZWN0dXJlL2h0bWwtbGVjdHVyZS11bml0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0RGlhbG9nIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLXVuaXQtZGlhbG9nL2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlU2V0dGluZ0RpYWxvZyB9IGZyb20gJy4vY291cnNlL2NvdXJzZS1zZXR0aW5nL2NvdXJzZS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldEVkaXRvckRpYWxvZyB9IGZyb20gJy4vZXhhbS9xdWVzdGlvbi1zaGVldC1lZGl0b3IvcXVlc3Rpb24tc2hlZXQtZWRpdG9yLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldFNhdmVEaWFsb2cgfSBmcm9tICcuL2V4YW0vcXVlc3Rpb24tc2hlZXQtc2F2ZS9xdWVzdGlvbi1zaGVldC1zYXZlLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3VydmV5Q29udGVudERpYWxvZyB9IGZyb20gJy4vc3VydmV5L2NvbnRlbnQtZGlhbG9nL3N1cnZleS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3VydmV5U2hlZXRTYXZlRGlhbG9nIH0gZnJvbSAnLi9zdXJ2ZXkvc3VydmV5LXNoZWV0LXNhdmUvc3VydmV5LXNoZWV0LXNhdmUuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWYWxpZGF0ZUdyYWRlUGlwZSB9IGZyb20gJy4vZXhhbS9leGFtLXNldHRpbmcvZ3JhZGUucGlwZSc7XG5pbXBvcnQgeyBFeGFtU2V0dGluZ0RpYWxvZyB9IGZyb20gJy4vZXhhbS9leGFtLXNldHRpbmcvZXhhbS1zZXR0aW5nLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlUHVibGlzaERpYWxvZyB9IGZyb20gJy4vY291cnNlL2NvdXJzZS1wdWJsaXNoL2NvdXJzZS1wdWJsaXNoLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlQmFja3VwRGlhbG9nIH0gZnJvbSAnLi9jb3Vyc2UvY291cnNlLWJhY2t1cC9jb3Vyc2UtYmFja3VwLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlUmVzdG9yZURpYWxvZyB9IGZyb20gJy4vY291cnNlL2NvdXJzZS1yZXN0b3JlL2NvdXJzZS1yZXN0b3JlLmRpYWxvZy5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtFcnBTaGFyZWRNb2R1bGUsIEF1dGhNb2R1bGUsIEFzc2Vzc21lbnRNb2R1bGVdLFxuXHRkZWNsYXJhdGlvbnM6IFtDTVNDb21wb25lbnQsIFN1bVBpcGUsIEV4YW1Db250ZW50RGlhbG9nLCBDb3Vyc2VVbml0UHJldmlld0RpYWxvZyxQcm9qZWN0Q29udGVudERpYWxvZyxcblx0XHRDb3Vyc2VTeWxsYWJ1c0RpYWxvZywgQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZSwgRm9sZGVyQ291cnNlVW5pdENvbXBvbmVudCwgQ291cnNlU2V0dGluZ0RpYWxvZywgXG5cdFx0U2xpZGVMZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudCxRdWVzdGlvblNoZWV0RWRpdG9yRGlhbG9nLCBRdWVzdGlvblNoZWV0U2F2ZURpYWxvZyxTdXJ2ZXlTaGVldFNhdmVEaWFsb2csXG5cdFx0RXhlcmNpc2VDb3Vyc2VVbml0Q29tcG9uZW50LCBTQ09STUxlY3R1cmVDb3Vyc2VVbml0Q29tcG9uZW50LCBWaWRlb0xlY3R1cmVDb3Vyc2VVbml0Q29tcG9uZW50LFxuXHRcdCBIdG1sTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnQsIENvdXJzZVVuaXREaWFsb2csIFN1cnZleUNvbnRlbnREaWFsb2csVmFsaWRhdGVHcmFkZVBpcGUsIEV4YW1TZXR0aW5nRGlhbG9nLFxuXHRcdCBDb3Vyc2VQdWJsaXNoRGlhbG9nLCBDb3Vyc2VCYWNrdXBEaWFsb2csIENvdXJzZVJlc3RvcmVEaWFsb2ddLFxuXHRleHBvcnRzOiBbRXhhbUNvbnRlbnREaWFsb2csIENvdXJzZVN5bGxhYnVzRGlhbG9nLCBDb3Vyc2VVbml0UHJldmlld0RpYWxvZywgQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZSwgXG5cdFByb2plY3RDb250ZW50RGlhbG9nLCBTdXJ2ZXlDb250ZW50RGlhbG9nLCBDb3Vyc2VQdWJsaXNoRGlhbG9nLCBDb3Vyc2VCYWNrdXBEaWFsb2csIENvdXJzZVJlc3RvcmVEaWFsb2ddLFxuXHRwcm92aWRlcnM6IFtdLFxuXHRlbnRyeUNvbXBvbmVudHM6IFtGb2xkZXJDb3Vyc2VVbml0Q29tcG9uZW50LCBFeGVyY2lzZUNvdXJzZVVuaXRDb21wb25lbnQsIFNDT1JNTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnQsIFNsaWRlTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnQsXG5cdFx0VmlkZW9MZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudCwgSHRtbExlY3R1cmVDb3Vyc2VVbml0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBDTVNNb2R1bGUge1xufVxuIl19
