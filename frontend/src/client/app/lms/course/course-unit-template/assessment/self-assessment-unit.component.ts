import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Exam } from '../../../../shared/models/elearning/exam.model';
import { QuestionOption } from '../../../../shared/models/elearning/option.model';
import { SelfAssessment } from '../../../../shared/models/elearning/self_assessment.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitPlayerTemplate } from '../unit.decorator';
import { ICourseUnitPlay } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/elearning/course-unit.model';
import { BaseModel } from '../../../../shared/models/base.model';
import { ExamStudyDialog } from '../../../exam/exam-study/exam-study.dialog.component';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';
import { ExamMember } from '../../../../shared/models/elearning/exam-member.model';
import { Submission } from '../../../../shared/models/elearning/submission.model';
import { AnswerPrintDialog } from '../../../exam/answer-print/answer-print.dialog.component';

@Component({
	moduleId: module.id,
	selector: 'self-assessment-player',
	templateUrl: 'self-assessment-unit.component.html',
})
@CourseUnitPlayerTemplate({
	type: 'self-assess'
})
export class SelfAssessmentCourseUnitPlayerComponent extends BaseComponent implements ICourseUnitPlay {

	private unit: CourseUnit;
	private assessment: SelfAssessment;
	private member: CourseMember;
	private examMember: ExamMember;
	private submissions: Submission[];
	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@ViewChild(ExamStudyDialog) studyDialog: ExamStudyDialog;
	@ViewChild(AnswerPrintDialog) answerPrintDialog: AnswerPrintDialog;

	constructor() {
		super();
		this.assessment = new SelfAssessment();
		this.viewCompleted = false;
		this.examMember = new ExamMember();
		this.submissions = [];
	}

	play(unit: CourseUnit, member: CourseMember) {
		this.unit = unit;
		this.member = member;
		this.unit.populateSelfAssessment(this).subscribe(() => {
			this.assessment = this.unit.selfAssessment;
			this.member.joinAssessment(this, this.assessment.id).subscribe(examMemberId => {
				ExamMember.get(this, examMemberId).subscribe(examMember => {
					this.examMember = examMember;
					this.loadSubmissionHistory();
				});
				
			});
		});

	}

	loadSubmissionHistory() {
			
			this.examMember.listSubmissions(this).subscribe((submits: Submission[]) => {
				this.submissions = _.filter(submits, (submit: Submission) => {
					return submit.start != null && submit.end != null;
				})
			});

	}

	doAssessment() {
		this.assessment.populateExam(this).subscribe(() => {
			this.member.doAssessment(this, this.assessment.id, this.examMember.id).subscribe(examMemberId => {
				this.studyDialog.show(this.assessment.exam, this.examMember);
				this.studyDialog.onFinish.subscribe(() => {
					this.viewCompleted = true;
					this.onViewCompletedReceiver.next();
						this.examMember.populate(this).subscribe(()=> {
							this.loadSubmissionHistory();						
					});
				});
			});
		});
	}

	viewAnswer(submit: Submission) {
		this.assessment.populateExam(this).subscribe(() => {
			this.answerPrintDialog.show(this.assessment.exam, this.examMember, submit);
		});

	}


}

