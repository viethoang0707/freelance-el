import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { Question } from '../../../shared/models/elearning/question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';

const QUESTION_FIELDS = ['title', 'level', 'type', 'group_id', 'group_name', 'content'];

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
    private selectedQuestions: any;

    private mode: string;
    private batchAction: string;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.questions = [];
        this.items = [
            { label: this.translateService.instant(QUESTION_TYPE['sc']), command: () => { this.addQuestion('sc') } },
            { label: this.translateService.instant(QUESTION_TYPE['mc']), command: () => { this.addQuestion('mc') } },
            { label: this.translateService.instant(QUESTION_TYPE['ext']), command: () => { this.addQuestion('ext') } },
        ];
    }

    ngOnInit() {
        Group.listQuestionGroup(this).subscribe(groups => {
            var treeUtils = new TreeUtils();
            this.tree = treeUtils.buildGroupTree(groups);
        });
        this.loadQuestions();
        this.enterSingleMode();
    }

    addQuestion(type: string) {
        this.router.navigate(['/assessment/question/form/create', type]);
    }

    editQuestion(question: Question) {
        this.router.navigate(['/assessment/question/form/edit', question.id]);
    }

    viewQuestion(question: Question) {
        this.router.navigate(['/assessment/question/view', question.id]);
    }

    deleteMultipleQuestions(questions: Question[]) {
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            Question.deleteArray(this, questions).subscribe(() => {
                this.selectedQuestions = [];
                var qIds = _.pluck(questions, 'id');
                this.questions = _.reject(this.questions, (obj: Question) => {
                    return qIds.includes(obj.id);
                });
                this.displayQuestions = this.questions;
                this.success(this.translateService.instant('Delete question successfully'));
            });
        });
    }

    loadQuestions() {
        Question.all(this, QUESTION_FIELDS).subscribe(questions => {
            questions = _.sortBy(questions, (question: Question) => {
                return -question.id;
            });
            this.questions = questions;
            this.displayQuestions = questions;

            console.log(this.questions);
        });
    }

    importQuestion() {
        this.router.navigate(['/assessment/questions/import']);
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

    enterBatchMode(action: string) {
        this.batchAction = action;
        this.mode = 'multiple';
        this.selectedQuestions = [];
    }

    enterSingleMode() {
        this.mode = 'single';
        this.batchAction = '';
        this.selectedQuestions = null;
    }

    applyBatchAction() {
        if (this.batchAction == 'delete')
            this.deleteMultipleQuestions(this.selectedQuestions);
        this.enterSingleMode();
    }
}