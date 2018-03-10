import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/exam.model';
import { Question } from '../../../shared/models/question.model';
import { ExamGrade } from '../../../shared/models/exam-grade.model';
import { ExamQuestion } from '../../../shared/models/exam-question.model';
import { QuestionSelector } from '../../../shared/models/question_selector.model';
import { Http, Response } from '@angular/http';
import { QUESTION_SELECTION, GROUP_CATEGORY, EXAM_STATUS, QUESTION_TYPE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { SelectQuestionsDialog } from '../../../shared/components/select-question-dialog/select-question-dialog.component';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'etraining-exam-content-dialog',
	templateUrl: 'exam-content.dialog.component.html',
})
export class ExamContentDialog extends BaseComponent {

	display: boolean;
	tree: TreeNode[];
	exam: Exam;
	selectedNode: TreeNode;
	selector: QuestionSelector;
	grades: ExamGrade[];
	questions: ExamQuestion[];
	groups: Group[];
	examStatus: SelectItem[];
	@ViewChild(SelectQuestionsDialog) questionDialog : SelectQuestionsDialog;

	constructor(private treeUtils: TreeUtils) {
		super();
		this.selector = new QuestionSelector();
		this.grades = [];
		this.exam = new Exam();
		this.questions = [];
		this.examStatus = _.map(EXAM_STATUS, (val, key)=> {
            return {
                label: val,
                value: key
            }
        });
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selector.group_id = this.selectedNode.data.id;
		}
	}

	createExamQuestionFromQuestionBank(questions: Question[]):Observable<any> {
		var createSubscriptions = _.map(questions, (question)=> {
			var examQuestion = new ExamQuestion();
			examQuestion.exam_id = this.exam.id;
			examQuestion.question_id = question.id;
			return examQuestion.save(this);
		});
		return Observable.forkJoin(...createSubscriptions);
	}

	removeOldQuestions():Observable<any> {
		var delSubscriptions = [];
		_.each(this.questions, (question)=> {
			delSubscriptions.push(question.delete(this));
		});
		if (delSubscriptions.length)
			return Observable.forkJoin(...delSubscriptions);
		else
			return Observable.of(null);
	}

	selectQuestion() {
		this.removeOldQuestions().subscribe(() => {
			this.questionDialog.show();
			this.questionDialog.onSelectQuestions.subscribe(questions => {
				this.createExamQuestionFromQuestionBank(questions).subscribe((examQuestins) => {
					this.questions = examQuestins;
				});
			});
		});
	}

	generateQuestion() {
		this.removeOldQuestions().subscribe(() => {
			var groupIds=[];
			if (this.selector.include_sub_group) {
				var selectedGroups = this.treeUtils.getSubGroup(this.groups, this.selector.group_id);
				groupIds = _.pluck(selectedGroups, 'id');
			}
			else
				groupIds = [this.selector.group_id];
			Question.listByGroups(this, groupIds).subscribe(questions => {
				if (this.selector.mode =='random' && this.selector.number) {
					questions = _.shuffle(questions);
					if (this.selector.level)
						questions = _.filter(questions, (obj:Question)=> {
							return obj.level == this.selector.level;
						});
					questions = questions.slice(0, this.selector.number);
				}
				this.createExamQuestionFromQuestionBank(questions);
			});
		});
	}

	show(exam: Exam) {
		this.display = true;
		this.exam = exam;
		ExamGrade.listByExam(this, exam.id).subscribe(grades => {
			this.grades = grades;
		});
		ExamQuestion.listByExam(this, exam.id).subscribe(questions => {
			this.questions = questions;
		});
		this.getQuestionSelector().subscribe(selector => {
			this.selector = selector;
			Group.listByCategory(this, GROUP_CATEGORY.QUESTION).subscribe(groups => {
				this.groups = groups;
				this.tree = this.treeUtils.buildTree(groups);
				if (this.selector.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.selector.group_id);
				}
			});
		});
	}

	getQuestionSelector(): Observable<QuestionSelector> {
		if (this.exam.selector_id) {
			return QuestionSelector.get(this, this.exam.selector_id);
		} else {
			return Observable.of(new QuestionSelector());
		}
	}

	hide() {
		this.display = false;
	}

	save() {
		var subscriptions = [];
		_.each(this.grades, (grade)=> {
			subscriptions.push(grade.save(this));
		});
		_.each(this.questions, (question)=> {
			subscriptions.push(question.save(this));
		});
		subscriptions.push(this.selector.save(this).flatMap(() => {
			this.exam.selector_id = this.selector.id;
			return this.exam.save(this);
		}));
		return Observable.forkJoin(...subscriptions).subscribe(() => {
			this.hide();
			this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('Content saved successfully.') });
		});
	}

	addGrade() {
		var grade = new ExamGrade();
		grade.exam_id = this.exam.id;
		this.grades.push(grade);
	}

	removeGrade(grade: ExamGrade) {
		if (grade.id) {
			grade.delete(this).subscribe(() => {
				this.grades = _.reject(this.grades, (obj)=> {
					return obj == grade;
				});
			})
		} else
			this.grades = _.reject(this.grades, (obj)=> {
				return obj == grade;
			});
	}


}