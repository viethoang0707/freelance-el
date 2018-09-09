import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';

import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { Question } from '../../../shared/models/elearning/question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { SurveySheetPreviewDialog } from '../../../cms/survey/survey-sheet-preview/survey-sheet-preview.dialog.component';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';
import { SurveyQuestion } from '../../../shared/models/elearning/survey-question.model';

const SHEET_FIELDS = ['name', 'question_count','create_date', 'write_date',];

@Component({
    moduleId: module.id,
    selector: 'survey-sheet-list',
    templateUrl: 'survey-sheet-list.component.html',
    styleUrls: ['survey-sheet-list.component.css'],
})
export class SurveySheetListComponent extends BaseComponent {

    @ViewChild(SurveySheetPreviewDialog) sheetDialog: SurveySheetPreviewDialog;

    private sheets: SurveySheet[];
    private selectedSheet: any;

    constructor() {
        super();
        this.sheets = [];
    }

    ngOnInit() {
        this.loadSurveySheets();
    }

    deleteSheet(sheet:SurveySheet) {
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            sheet.delete(this).subscribe(() => {
                this.selectedSheet = null;
                this.sheets = _.reject(this.sheets, (obj:SurveySheet)=> {
                    return sheet.id == obj.id;
                });
            });
            this.success(this.translateService.instant('Delete sheet successfully'));
        });
    }

    previewSheet(sheet:SurveySheet) {
        this.sheetDialog.show(this.selectedSheet);
    }

    loadSurveySheets() {
        SurveySheet.listTemplate(this, SHEET_FIELDS).subscribe(sheets => {
            this.sheets = _.sortBy(sheets, (sheet:SurveySheet)=> {
                return -sheet.id;
            });
        });
    }

}