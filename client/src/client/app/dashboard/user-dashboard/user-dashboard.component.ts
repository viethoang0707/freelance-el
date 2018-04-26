import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Course } from '../../shared/models/elearning/course.model';
import { ExamMember } from '../../shared/models/elearning/exam-member.model';
import { Exam } from '../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../shared/models/elearning/exam-question.model';
import { CourseClass } from '../../shared/models/elearning/course-class.model';
import { ConferenceMember } from '../../shared/models/elearning/conference-member.model';
import { Conference } from '../../shared/models/elearning/conference.model';
import { Room } from '../../shared/models/meeting/room.model';
import { MeetingService } from '../../shared/services/meeting.service';
import { User } from '../../shared/models/elearning/user.model';
import { GROUP_CATEGORY, CONFERENCE_STATUS, COURSE_MODE, EXAM_STATUS } from '../../shared/models/constants'
import { CourseSyllabus } from '../../shared/models/elearning/course-syllabus.model';
import { SelectItem } from 'primeng/api';
import { CourseSyllabusDialog } from '../../cms/course/course-syllabus/course-syllabus.dialog.component';
import { QuestionMarkingDialog } from '../../lms/exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from '../../lms/exam/answer-print/answer-print.dialog.component';
import { ExamContentDialog } from '../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../lms/exam/exam-study/exam-study.dialog.component';
import { CourseUnit } from '../../shared/models/elearning/course-unit.model';

declare var $: any;
declare var _: any;

@Component({
    moduleId: module.id,
    selector: 'user-dashboard',
    templateUrl: 'user-dashboard.component.html'

})
export class UserDashboardComponent extends BaseComponent implements OnInit {


    confMembers: ConferenceMember[];
    courses: Course[];
    currentUser: User;
    CONFERENCE_STATUS = CONFERENCE_STATUS;
    COURSE_MODE = COURSE_MODE;
    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    exams: Exam[];
    EXAM_STATUS = EXAM_STATUS;
    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private meetingSerivce: MeetingService, private router: Router) {
        super();
        this.courses = [];
        this.exams = [];
    }


    ngOnInit() {
        ConferenceMember.listByUser(this, this.authService.UserProfile.id)
            .subscribe(members => {
                this.confMembers = members;
                _.each(members, (member) => {
                    member.conference = new Conference();
                    Conference.get(this, member.conference_id).subscribe(conference => {
                        member.conference = conference;
                    });
                });
            });
        this.currentUser = this.authService.UserProfile;
        CourseMember.listByUser(this, this.currentUser.id).subscribe(members => {
            var courseIds = _.pluck(members, 'course_id');
            courseIds = _.filter(courseIds, (id) => {
                return id && id != '';
            });
            Observable.zip(Course.array(this, courseIds), Course.listByAuthor(this, this.currentUser.id))
                .map(courses => {
                    return _.flatten(courses);
                })
                .subscribe(courses => {
                    courses = _.uniq(courses, (course) => {
                        return course.id;
                    });
                    _.each(courses, (course) => {
                        if (course.syllabus_id)
                            CourseUnit.countBySyllabus(this, course.syllabus_id).subscribe(count => {
                                course.unit_count = count;
                            });
                        else
                            course.unit_count = 0;
                        course.member = _.find(members, (member: CourseMember) => {
                            return member.course_id == course.id;
                        });
                        _.each(courses, (course) => {
                            if (course.syllabus_id)
                                CourseUnit.countBySyllabus(this, course.syllabus_id).subscribe(count => {
                                    course.unit_count = count;
                                });
                            else
                                course.unit_count = 0;
                            course.member = _.find(members, (member: CourseMember) => {
                                return member.course_id == course.id;
                            });

                        });
                        this.courses = courses;
                    });
                });
        });

        ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(members => {
            var examIds = _.pluck(members, 'exam_id');
            Exam.array(this, examIds)
                .subscribe(exams => {
                    _.each(exams, (exam) => {
                        exam.member = _.find(members, (member: ExamMember) => {
                            return member.exam_id == exam.id;
                        });
                        exam.member.examScore(this, exam.id).subscribe(score => {
                            exam.member.score = score;
                        });
                        ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                            exam.question_count = count;
                        });
                    });
                    this.exams = _.filter(exams, (exam) => {
                        return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.status == 'published');
                    });
                });
        });
    });

    joinConference(member) {
        this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref)
    }

    getCourseSyllabus(course: Course): Observable<any> {
        return CourseSyllabus.byCourse(this, course.id).flatMap((syllabus: CourseSyllabus) => {
            if (syllabus)
                return Observable.of(syllabus);
            else {
                var syllabus = new CourseSyllabus();
                syllabus.course_id = course.id;
                syllabus.name = course.name;
                return syllabus.save(this);
            }
        });
    }

    editSyllabus(course: Course) {
        this.getCourseSyllabus(course).subscribe(syllabus => {
            this.syllabusDialog.show(syllabus);
        });
    }

    studyCourse(member: CourseMember, course: Course) {
        if (course.syllabus_id && course.status == 'published')
            this.router.navigate(['/lms/courses/study', course.id, member.id]);
    }

    manageCourse(member: CourseMember, course: Course) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    }

    manageExam(exam: Exam, member: ExamMember) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editContent(exam: Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?', () => {
            this.examStudyDialog.show(exam, member);
        }
        );
    }
}