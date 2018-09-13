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
import { ExamSetting } from '../../../../shared/models/elearning/exam-setting.model';

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
	private member: CourseMember;
	private submissions: Submission[];
	private examId, settingId, examMemberId: number;

	protected onViewCompletedReceiver: Subject<any> = new Subject();
	onViewCompleted: Observable<any> = this.onViewCompletedReceiver.asObservable();
	viewCompleted: boolean;

	@ViewChild(ExamStudyDialog) studyDialog: ExamStudyDialog;
	@ViewChild(AnswerPrintDialog) answerPrintDialog: AnswerPrintDialog;

	constructor() {
		super();
		this.viewCompleted = false;
		this.submissions = [];
	}

	play(unit: CourseUnit, member: CourseMember) {
		this.unit = unit;
		this.member = member;
		this.member.getAssessmentInfo(this, this.unit.self_assessment_id).subscribe(resp => {
			this.examMemberId = resp["exam_member_id"];
			this.examId = resp["exam_id"];
			this.settingId = resp["exam_setting_id"];
			this.loadSubmissionHistory();
		});
	}

	loadSubmissionHistory() {
		BaseModel
			.bulk_search(this, ExamMember.__api__listSubmissions(this.examMemberId))
			.subscribe(jsonArr => {
				var submission = Submission.toArray(jsonArr[0]);
				this.submissions = _.filter(submits, (submit: Submission) => {
					return submit.start != null && submit.end != null;
				});
			});
	}

	doAssessment() {
		this.member.doAssessment(this, this.unit.self_assessment_id, this.examMemberId).subscribe(() => {
			Exam.get(this, this.examMemberId).subscribe(exam => {
				ExamSetting.get(this, this.settingId).subscribe(setting => {
					ExamMember.get(this, this.examMemberId).subscribe(member => {
						this.studyDialog.show(exam, exam.setting, member);
						this.studyDialog.onFinish.subscribe(() => {
							this.viewCompleted = true;
							this.onViewCompletedReceiver.next();
							this.loadSubmissionHistory();
						});
					});
				});
			});

		});
	}

	viewAnswer(submit: Submission) {
		Exam.get(this, this.examMemberId).subscribe(exam => {
			ExamMember.get(this, this.examMemberId).subscribe(member => {
				this.answerPrintDialog.show(exam, member, submit);
			});
		});
	}


}

