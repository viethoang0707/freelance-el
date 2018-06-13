import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { Question } from '../../../shared/models/elearning/question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { QuestionSheetPreviewDialog } from '../question-sheet-preview/question-sheet-preview.dialog.component';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';

@Component({
    moduleId: module.id,
    selector: 'question-sheet-list',
    templateUrl: 'question-sheet-list.component.html',
    styleUrls: ['question-sheet-list.component.css'],
})
export class QuestionSheetListComponent extends BaseComponent {

    private sheets: Question[];
    private selectedSheet: any;

    @ViewChild(QuestionSheetPreviewDialog) sheetDialog: QuestionSheetPreviewDialog;


    constructor() {
        super();
        this.sheets = [];
    }

    ngOnInit() {
        this.loadQuestionSheets();
    }

    deleteSheet(){
        if(this.selectedSheet)
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                // this.startTransaction();
                this.selectedSheet.delete(this).subscribe(() => {
                    this.selectedSheet = null;
                    this.loadQuestionSheets();
                    
                });
            });
    }

    previewSheet() {
        if(this.selectedSheet)
            this.sheetDialog.show(this.selectedSheet);
    }

    loadQuestionSheets() {
        QuestionSheet.listTemplate(this).subscribe(sheets => {
            this.sheets =  sheets;
        });
    }

}