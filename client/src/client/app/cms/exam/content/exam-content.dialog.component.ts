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

	constructor(private treeUtils: TreeUtils) {
		super();
		this.selector = new QuestionSelector();
		this.grades = [];
		this.exam = new Exam();
		this.questions = [];
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selector.group_id = this.selectedNode.data.id;
		}
	}

	createExamQuestionFromQuestionBank(questions: Question[]) {
		var self = this;
		var createSubscriptions = _.map(questions, function(question) {
			var examQuestion = new ExamQuestion();
			examQuestion.exam_id = self.exam.id;
			examQuestion.question_id = question.id;
			return examQuestion.save(self);
		});
		Observable.forkJoin(...createSubscriptions).subscribe((examQuestins) => {
			this.questions = examQuestins;
		});
	}

	generateQuestion() {
		var self = this;
		var delSubscriptions = [];
		_.each(this.questions, function(question) {
			delSubscriptions.push(question.delete(self));
		});
		Observable.forkJoin(...delSubscriptions).subscribe(() => {
			var selectedGroups = [];
			if (this.selector.include_sub_group)
				selectedGroups = this.treeUtils.getSubGroup(this.groups, this.selector.group_id);
			else
				selectedGroups = [this.selector.group_id];
			var groupIds = _.pluck(selectedGroups, 'id');
			Question.listByGroups(this, groupIds).subscribe(questions => {
				if (this.selector.mode =='random' && this.selector.number) {
					questions = _.shuffle(questions);
					if (this.selector.level)
						questions = _.filter(questions, function(obj:Question) {
							return obj.level == self.selector.level;
						});
					questions = questions.slice(0, this.selector.number);
				}
				self.createExamQuestionFromQuestionBank(questions);
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
			return Observable.of(new QuestionSelector();)
		}
	}

	hide() {
		this.display = false;
	}

	save() {
		var self = this;
		var subscriptions = [];
		_.each(this.grades, function(grade) {
			subscriptions.push(grade.save(self));
		});
		_.each(this.questions, function(question) {
			subscriptions.push(question.save(self));
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
				this.grades = _.reject(this.grades, function(obj) {
					return obj == grade;
				});
			})
		} else
			this.grades = _.reject(this.grades, function(obj) {
				return obj == grade;
			});
	}


}