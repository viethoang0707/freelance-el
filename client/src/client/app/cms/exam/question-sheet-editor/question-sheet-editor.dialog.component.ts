import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS, QUESTION_LEVEL } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'question-sheet-editor-dialog',
	templateUrl: 'question-sheet-editor.dialog.component.html',
})
export class QuestionSheetEditorDialog extends BaseComponent {

	private display: boolean;
	private tree: any;
	private selectors: any;
	private selectorGroups: any;
	private selectedNodes: any;
	private groups: Group[];
	private treeUtils: TreeUtils;
	QUESTION_LEVEL = QUESTION_LEVEL;
	private examQuestions: ExamQuestion[];
	private sheet: QuestionSheet;
	private onSaveReceiver: Subject<any> = new Subject();
    onSave: Observable<any> = this.onSaveReceiver.asObservable();

	constructor() {
		super();
		this.initControl();
	}

	initControl() {
		this.treeUtils = new TreeUtils();
		this.examQuestions = [];
		this.tree = {};
		this.selectors = [];
		this.selectorGroups = {};
		this.selectedNodes = {};
		_.each(QUESTION_LEVEL, (val, key) => {
			this.selectorGroups[key] = {};
			this.selectorGroups[key]["number"] = 0;
			this.selectorGroups[key]["score"] = 0;
			this.selectorGroups[key]["include_sub_group"] = true;
			this.selectorGroups[key]["group_ids"] = [];
			this.selectedNodes[key] = [];
		});
	}

	nodeSelect(event: any, level) {
		this.selectorGroups[level]["group_ids"] = _.map(this.selectedNodes[level], (node => {
			return node['data']['id'];
		}));
	}

	createExamQuestionFromQuestionBank(questions: Question[], score)  {
		return  _.map(questions, (question:Question) => {
			var examQuestion = new ExamQuestion();
			examQuestion.sheet_id = this.sheet.id;
			examQuestion.question_id = question.id;
			examQuestion.score = score;
			return examQuestion;
		});
	}

	generateQuestion() {
		var subscriptions = [];
		_.each(QUESTION_LEVEL, (val, key)=> {
			var selectors = _.filter(this.selectors, sel=> {
				return sel["level"] == key;
			});
			var groupIds  = [];
			_.each(selectors, sel=> {
				if (sel["group_id"]) {
					var selectedGroups = this.treeUtils.getSubGroup(this.groups, sel["group_id"]);
					groupIds = groupIds.concat(_.pluck(selectedGroups, 'id'));
				}
			});
			groupIds = _.uniq(groupIds);
			if (groupIds.length > 0 && selectors[0]["number"])
				subscriptions.push(Question.listByGroups(this, groupIds).do(questions => {
					questions = _.shuffle(questions);
					questions = _.filter(questions, (obj:Question)=> {
						return obj.level == selectors[0]["level"];
					});
					var score = selectors[0]["score"];
					questions = questions.slice(0, selectors[0]["number"]);
					this.examQuestions = this.examQuestions.concat(this.createExamQuestionFromQuestionBank(questions, score));
				}));
		});
		return subscriptions;
	}

	show(sheet: QuestionSheet) {
		this.initControl();
		this.display = true;
		this.sheet = sheet;
	}


	hide() {
		this.display = false;
	}

	save() {
		this.startTransaction();
		Observable.forkJoin(this.generateQuestion()).subscribe(()=> {
			var subscriptions = _.map(this.examQuestions, examQuestion=> {
				return examQuestion.save(this);
			});
			Observable.forkJoin(...subscriptions).subscribe(()=> {
				this.hide();
				this.onSaveReceiver.next();
				this.success(this.translateService.instant('Content saved successfully.'));
				this.closeTransaction();
			});
		})
		
	}

	
}