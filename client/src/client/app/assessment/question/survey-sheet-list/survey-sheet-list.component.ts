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
import { SurveySheetPreviewDialog } from '../survey-sheet-preview/survey-sheet-preview.dialog.component';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';

@Component({
    moduleId: module.id,
    selector: 'survey-sheet-list',
    templateUrl: 'survey-sheet-list.component.html',
    styleUrls: ['survey-sheet-list.component.css'],
})
export class SurveySheetListComponent extends BaseComponent {

    @ViewChild(SurveySheetPreviewDialog) sheetDialog: SurveySheetPreviewDialog;

    private sheets: Question[];
    private selectedSheet: any;

    constructor() {
        super();
        this.sheets = [];
    }

    ngOnInit() {
        this.loadSurveySheets();
    }

    deleteSheet(){
        if(this.selectedSheet)
            this.confirm('Are you sure to delete ?', () => {
                this.startTransaction();
                this.selectedSheet.delete(this).subscribe(() => {
                    this.selectedSheet = null;
                    this.loadSurveySheets();
                    this.closeTransaction();
                });
            });
    }

    previewSheet() {
        if(this.selectedSheet)
            this.sheetDialog.show(this.selectedSheet);
    }

    loadSurveySheets() {
        this.startTransaction();
        SurveySheet.listTemplate(this).subscribe(sheets => {
            this.sheets =  sheets;
            _.each(sheets, sheet=> {
                SurveyQuestion.countBySheet(this, sheet["id"]).subscribe(count=> {
                    sheet["question_count"] = count;
                });
            });
            this.closeTransaction();
        });
    }

}