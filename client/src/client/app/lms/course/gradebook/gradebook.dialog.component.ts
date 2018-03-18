import { Component, OnInit, Input, NgZone} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/course-faq.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { CourseUnit } from '../../../shared/models/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/course-syllabus.model';
import { UserLog } from '../../../shared/models/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { Exam } from '../../../shared/models/exam.model';
import { ExamMember } from '../../../shared/models/exam-member.model';
import { AnswerSheetDialog } from '../../exam/answer-sheet/answer-sheet.dialog.component';
import { ExamGrade } from '../../../shared/models/exam-grade.model';


@Component({
    moduleId: module.id,
    selector: 'etraining-gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class GradebookDialog extends BaseComponent {

	display: boolean;
	member: CourseMember;
	exams: Exam[];

	@ViewChild(AnswerSheetDialog) answerSheetDialog:AnswerSheetDialog;

	constructor(private reportUtils: ReportUtils,private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.exams = [];
	}

	ngOnInit() {
	}

	hide() {
		this.display = false;
	}


	show(member: CourseMember) {
		this.display = true;
		this.member = member;
		ExamMember.listByUser(this, this.member.user_id).subscribe(members => {
            var examIds = _.pluck(members,'exam_id');
            Exam.array(this, examIds)
            .subscribe(exams => {
            	this.exams = _.filter(exams, (exam)=> {
                     return  exam.status == 'published');
                });
                _.each(this.exams, (exam)=> {
                    exam.member = _.find(members, (member:ExamMember)=> {
                        return member.exam_id == exam.id;
                    });
                    exam.member.examScore(this, exam.id).subscribe(score=> {
                        exam.member.score = score;
                        ExamGrade.listByExam(this, exam.id).subscribe(grades=> {
                        	var grade = member.examGrade(grades,score);
                        	if (grade)
                        		exam.member.grade = grade.name;
                    	});
                    });
                    ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                        exam.question_count = count;
                    });
                });
            });
        });
	}

	viewAnswerSheet() {
        if (this.selectedRecord)
            this.answerSheetDialog.show(this.exam, this.selectedRecord.member);
    }

}

