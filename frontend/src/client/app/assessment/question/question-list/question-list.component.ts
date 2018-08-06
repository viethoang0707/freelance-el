import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { Question } from '../../../shared/models/elearning/question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { QuestionDialog } from '../question-dialog/question-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { QuestionImportDialog } from '../import-dialog/import-dialog.component';
import { BaseModel } from '../../../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'question-list',
    templateUrl: 'question-list.component.html',
    styleUrls: ['question-list.component.css'],
})
export class QuestionListComponent extends BaseComponent {

    QUESTION_LEVEL = QUESTION_LEVEL;
    QUESTION_TYPE = QUESTION_TYPE;

    private tree: TreeNode[];
    private items: MenuItem[];
    private questions: Question[];
    private displayQuestions: Question[];
    private selectedGroupNodes: TreeNode[];
    private treeUtils: TreeUtils;
    private selectedQuestions: any;

    @ViewChild(QuestionDialog) questionDialog: QuestionDialog;
    @ViewChild(QuestionImportDialog) questionImportDialog: QuestionImportDialog;


    constructor() {
        super();
        this.treeUtils = new TreeUtils();
        this.questions = [];
        this.items = [
            { label: this.translateService.instant(QUESTION_TYPE['sc']), command: () => { this.addQuestion('sc') } },
            { label: this.translateService.instant(QUESTION_TYPE['mc']), command: () => { this.addQuestion('mc') } },
            { label: this.translateService.instant(QUESTION_TYPE['ext']), command: () => { this.addQuestion('ext') } },
        ];
    }

    ngOnInit() {
        Group.listQuestionGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        });
        this.loadQuestions();
    }

    addQuestion(type: string) {
        var question = new Question();
        question.type = type;
        this.questionDialog.show(question);
        this.questionDialog.onCreateComplete.subscribe(() => {
            this.questions.unshift(question);
            this.displayQuestions = [...this.questions];
            this.selectedQuestions = [];
            this.selectedGroupNodes = [];
            this.success('Add question successfully');
        });
    }

    editQuestion(question: Question) {
        this.questionDialog.show(question);
        this.selectedQuestions = [];
    }

    deleteMultipleQuestions(questions: Question[]) {
        this.confirm('Are you sure to delete ?', () => {
            Question.deleteArray(this, questions).subscribe(() => {
                this.selectedQuestions = [];
                var qIds = _.pluck(questions,'id');
                this.questions = _.reject(this.questions, (obj:Question)=> {
                    return qIds.includes(obj.id);
                });
                this.displayQuestions = this.questions;
                this.success('Delete question successfully');
            });
        });
    }

    loadQuestions() {
        Question.all(this).subscribe(questions => {
            questions  = _.sortBy(questions,(question:Question)=> {
                return question.create_date;
            });
            this.questions = questions;
            this.displayQuestions = questions;
            this.selectedQuestions = [];
        });
    }

    importQuestion() {
        this.questionImportDialog.show();
        this.questionImportDialog.onImportComplete.subscribe(() => {
            this.loadQuestions();
        });
    }

    filterQuestion() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayQuestions = _.filter(this.questions, question => {
                var parentGroupNode = _.find(this.selectedGroupNodes, node => {
                    return node.data.id == question.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayQuestions = this.questions;
        }
    }
}