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
import { QuestionImportDialog } from '../import-dialog/import-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'question-list',
    templateUrl: 'question-list.component.html',
    styleUrls: ['question-list.component.css'],
})
export class QuestionListComponent extends BaseComponent {

    @ViewChild(QuestionDialog) questionDialog: QuestionDialog;
    @ViewChild(QuestionImportDialog) questionImportDialog: QuestionImportDialog;

    tree: TreeNode[];
    items: MenuItem[];
    questions: Question[];
    selectedQuestion: any;
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];
    QUESTION_LEVEL = QUESTION_LEVEL;
    QUESTION_TYPE = QUESTION_TYPE;
    total: number;
    questionsFilter: Question[];
    treeUtils: TreeUtils;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
        this.filterGroups = [];
        this.questions = [];
    }

    ngOnInit() {
        Group.listByCategory(this, GROUP_CATEGORY.QUESTION).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        });
        this.loadQuestions();
        this.items = [
            {label: this.translateService.instant(QUESTION_TYPE['sc']), command: ()=> { this.add('sc')}},
            {label: this.translateService.instant(QUESTION_TYPE['mc']), command: ()=> { this.add('mc')}},
            {label: this.translateService.instant(QUESTION_TYPE['ext']), command: ()=> { this.add('ext')}},
        ];
    }

    add(type: string) {
        var question = new Question();
        question.type = type;
        this.questionDialog.show(question);
        this.questionDialog.onCreateComplete.subscribe(() => {
            this.loadQuestionsAction();
        });
    }

    edit() {
        if (this.selectedQuestion)
            this.questionDialog.show(this.selectedQuestion);
        this.questionDialog.onUpdateComplete.subscribe(() => {
            this.loadQuestionsAction();
        });
    }

    delete() {
        if (this.selectedQuestion)
            this.confirm('Are you sure to delete ?', () => {
                this.selectedQuestion.delete(this).subscribe(() => {
                    this.loadQuestionsAction();
                    this.selectedQuestion = null;
                });
            });
    }

    loadQuestions() {
        Question.all(this).subscribe(questions => {
            this.questions = questions;
            this.questionsFilter = questions;
        });
    }
    loadQuestionsAction(){
        Question.all(this).subscribe(questions => {
            this.questions = questions;
            this.selectQuestion();
        });
    }
    import() {
        this.questionImportDialog.show();
        this.questionImportDialog.onImportComplete.subscribe(() => {
            this.loadQuestions();
        });
    }

    selectQuestion()
    {
        this.questionsFilter = this.questions.filter(item => {
            for(var i=0; i < this.selectedGroupNodes.length; i++)
            {
            if(this.selectedGroupNodes[i].data.id == item.group_id)
            {
                return true;
            }
            } 
            return false;
        });
    }

    nodeSelect(event: any) {
        if (this.selectedGroupNodes.length != 0) {
            this.selectQuestion();
        } else {
            this.loadQuestions();
        }
    }
}