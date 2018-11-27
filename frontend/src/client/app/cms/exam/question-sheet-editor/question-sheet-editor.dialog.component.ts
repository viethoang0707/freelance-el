import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
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
import { QuestionSelectorComponent } from './question-selector.component';
import { QuestionSheetSection } from '../../../shared/models/elearning/question_sheet-section.model';
import { SectionDialog } from './section-dialog.component';
import { QuestionSheetSectionEditorDialog } from './question-sheet-section-editor.dialog.component';

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'question_count'];

@Component({
	moduleId: module.id,
	selector: 'question-sheet-editor-dialog',
	templateUrl: 'question-sheet-editor.dialog.component.html',
})
export class QuestionSheetEditorDialog extends BaseComponent {

	QUESTION_LEVEL = QUESTION_LEVEL;

	private display: boolean;
	private sheet: QuestionSheet;
	private sections: QuestionSheetSection[];
	private examQuestions: ExamQuestion[];

	@ViewChild(QuestionSelectorComponent) singleSection: QuestionSelectorComponent;
	@ViewChild(SectionDialog) sectionDialog: SectionDialog;
	@ViewChild(QuestionSheetSectionEditorDialog) sectionEditorDialog: QuestionSheetSectionEditorDialog;

	private onSaveReceiver: Subject<any> = new Subject();
	onSave: Observable<any> = this.onSaveReceiver.asObservable();

	constructor() {
		super();
		this.sheet = new QuestionSheet();
	}

	show(sheet: QuestionSheet) {
		this.sheet = sheet;
		this.sheet.listSections(this).subscribe(sections => {
			this.sections = sections;
		});
		this.display = true;
	}


	hide() {
		this.display = false;
	}

	save() {
		if (this.sheet.layout == 'single')
			Observable.forkJoin(this.singleSection.generateQuestion())
				.map(questions => {
					return _.flatten(questions)
				})
				.subscribe(questions => {
					this.examQuestions = questions;
					_.each(this.examQuestions, (examQuestion: ExamQuestion) => {
						examQuestion.sheet_id = this.sheet.id;
					});
					//this.onSaveReceiver.next(this.examQuestions);
					this.hide();
					console.log(this.examQuestions);
					this.success(this.translateService.instant('Content saved successfully.'));
				});
			if (this.sheet.layout == 'multiple') 
				console.log(this.examQuestions);
	}

	addSection() {
		let section: QuestionSheetSection = new QuestionSheetSection();
		section.order = this.sections.length + 1;
		section.sheet_id = this.sheet.id;
		this.sectionDialog.show(section);
		this.sectionDialog.onCreateComplete.first().subscribe(() => {
			this.sections.push(section);
		});
	}

	editSection(section: QuestionSheetSection) {
		this.sectionDialog.show(section);
	}

	selectQuestion(section: QuestionSheetSection) {
		this.sectionEditorDialog.show(section);
		this.sectionEditorDialog.onSave.subscribe(questions=> {
			this.examQuestions =  this.examQuestions.concat(questions);
		});
	}

	removeSection(section: QuestionSheetSection) {
		this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
			section.delete(this).subscribe(() => {
				this.sections = _.reject(this.sections, (obj: QuestionSheetSection) => {
					return obj.id == section.id;
				});
				this.success(this.translateService.instant('Delete section successfully'));
			})
		});
	}

	moveUp(section: QuestionSheetSection, itemIndex: number) {
		if (itemIndex > 0) {
			var tmp = this.sections[itemIndex];
			this.sections[itemIndex] = this.sections[itemIndex - 1];
			this.sections[itemIndex - 1] = tmp;
			_.each(this.sections, (item: QuestionSheetSection, idx) => {
				item.order = idx + 1;
			});
			QuestionSheetSection.updateArray(this, this.sections).subscribe(() => {
				this.success('Action completed');
			});
		}
	}

	moveDown(section: QuestionSheetSection, itemIndex: number) {
		if (itemIndex + 1 < this.sections.length - 1) {
			var tmp = this.sections[itemIndex];
			this.sections[itemIndex] = this.sections[itemIndex + 1];
			this.sections[itemIndex + 1] = tmp;
			_.each(this.sections, (item: QuestionSheetSection, idx) => {
				item.order = idx + 1;
			});
			QuestionSheetSection.updateArray(this, this.sections).subscribe(() => {
				this.success('Action completed');
			});
		}
	}

}