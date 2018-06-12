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
var assessment_component_1 = require("./assessment.component");
var exam_list_component_1 = require("./exam/exam-list/exam-list.component");
var exam_dialog_component_1 = require("./exam/exam-dialog/exam-dialog.component");
var question_list_component_1 = require("./question/question-list/question-list.component");
var question_dialog_component_1 = require("./question/question-dialog/question-dialog.component");
var question_container_directive_1 = require("./question/question-template/question-container.directive");
var single_choice_question_component_1 = require("./question/question-template/single-choice-question/single-choice-question.component");
var open_end_question_component_1 = require("./question/question-template/open-end-question/open-end-question.component");
var import_dialog_component_1 = require("./question/import-dialog/import-dialog.component");
var enrollment_dialog_component_1 = require("./exam/enrollment-dialog/enrollment-dialog.component");
var multi_choice_question_component_1 = require("./question/question-template/multi-choice-question/multi-choice-question.component");
var question_sheet_list_component_1 = require("./question/question-sheet-list/question-sheet-list.component");
var question_sheet_preview_dialog_component_1 = require("./question/question-sheet-preview/question-sheet-preview.dialog.component");
var AssessmentModule = (function () {
    function AssessmentModule() {
    }
    AssessmentModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [assessment_component_1.AssessmentComponent, exam_list_component_1.ExamListComponent, exam_dialog_component_1.ExamDialog, question_sheet_list_component_1.QuestionSheetListComponent, question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog,
                question_list_component_1.QuestionListComponent, question_dialog_component_1.QuestionDialog, question_container_directive_1.QuestionContainerDirective, multi_choice_question_component_1.MultiChoiceQuestionComponent,
                single_choice_question_component_1.SingleChoiceQuestionComponent, open_end_question_component_1.OpenEndQuestionComponent, import_dialog_component_1.QuestionImportDialog, enrollment_dialog_component_1.ExamEnrollDialog],
            providers: [],
            exports: [question_container_directive_1.QuestionContainerDirective, exam_dialog_component_1.ExamDialog, question_sheet_preview_dialog_component_1.QuestionSheetPreviewDialog],
            entryComponents: [single_choice_question_component_1.SingleChoiceQuestionComponent, open_end_question_component_1.OpenEndQuestionComponent, multi_choice_question_component_1.MultiChoiceQuestionComponent]
        })
    ], AssessmentModule);
    return AssessmentModule;
}());
exports.AssessmentModule = AssessmentModule;
//# sourceMappingURL=assessment.module.js.map