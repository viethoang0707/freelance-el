import { Component, OnInit, Input, NgZone, ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { UserLog } from '../../../shared/models/elearning/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { AnswerSheetDialog } from '../../exam/answer-sheet/answer-sheet.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';


@Component({
    moduleId: module.id,
    selector: 'gradebook-dialog',
    templateUrl: 'gradebook.dialog.component.html',
    styleUrls: ['gradebook.dialog.component.css'],
})
export class GradebookDialog extends BaseComponent {

	display: boolean;
	member: CourseMember;
	exams: Exam[];

	@ViewChild(AnswerSheetDialog) answerSheetDialog:AnswerSheetDialog;

	constructor() {
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
            	this.exams = _.filter(exams, (exam=> {
                     return  exam.status == 'published';
                }));
                _.each(this.exams, (exam=> {
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
                }));
            });
        });
	}

	viewAnswerSheet() {
        if (this.selectedRecord)
            this.answerSheetDialog.show(this.exam, this.selectedRecord.member);
    }

}

