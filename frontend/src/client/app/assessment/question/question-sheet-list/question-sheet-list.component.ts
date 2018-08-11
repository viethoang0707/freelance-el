import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { QuestionSheetPreviewDialog } from '../../../cms/exam/question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { Question } from '../../../shared/models/elearning/question.model';

@Component({
    moduleId: module.id,
    selector: 'question-sheet-list',
    templateUrl: 'question-sheet-list.component.html',
    styleUrls: ['question-sheet-list.component.css'],
})
export class QuestionSheetListComponent extends BaseComponent {

    private sheets: QuestionSheet[];
    private selectedSheet: any;

    @ViewChild(QuestionSheetPreviewDialog) sheetDialog: QuestionSheetPreviewDialog;

    constructor() {
        super();
        this.sheets = [];
    }

    ngOnInit() {
        this.loadQuestionSheets();
    }

    deleteSheet(sheet:QuestionSheet) {
        this.confirm('Are you sure to delete?', () => {
            sheet.delete(this).subscribe(() => {
                this.selectedSheet = null;
                this.sheets = _.reject(this.sheets, (obj:QuestionSheet)=> {
                    return sheet.id == obj.id;
                });
                this.success('Delete sheet successfully');
            });
        });
    }

    previewSheet(sheet:QuestionSheet) {
        this.sheetDialog.show(sheet);
    }

    loadQuestionSheets() {
        QuestionSheet.listTemplate(this).subscribe(sheets => {
            this.sheets = sheets;
        });
    }

}