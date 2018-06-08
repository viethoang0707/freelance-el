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
import { Submission } from '../../shared/models/elearning/submission.model';
import { BaseModel } from '../../shared/models/base.model';

import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'user-dashboard',
    templateUrl: 'user-dashboard.component.html',
    styleUrls: ['user-dashboard.component.css'],

})
export class UserDashboardComponent extends BaseComponent implements OnInit {

    CONFERENCE_STATUS = CONFERENCE_STATUS;
    COURSE_MODE = COURSE_MODE;
    EXAM_STATUS = EXAM_STATUS;
    
    private conferenceMembers: ConferenceMember[];
    private courseMembers: CourseMember[];
    private currentUser: User;
    private examMembers: ExamMember[];
    private courses: Course[];

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;

    constructor(private meetingSerivce: MeetingService, private router: Router) {
        super();
        this.courseMembers = [];
        this.conferenceMembers = [];
        this.examMembers = [];
        this.currentUser = this.authService.UserProfile;
        this.courses = [];
    }

    displayCourses() {
        this.startTransaction();
        this.courseMembers = _.filter(this.courseMembers, (member:CourseMember) => {
            return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status=='active';
        });
        CourseMember.populateCourseForMembers(this, this.courseMembers).subscribe((courses)=> {
            this.courses = this.courses.concat(courses);
            this.courses = _.uniq(courses, (course) => {
                  return course.id;
             });
            this.courses.sort((course1, course2): any => {
                return (course1.create_date < course2.create_date);
            });
            _.each(this.courses, (course:Course)=> {
                course["student"] =  _.find(this.courseMembers, (member:CourseMember)=> {
                    return member.course_id == course.id && member.role == 'student';
                });
                course["teacher"] = _.find(this.courseMembers, (member:CourseMember)=> {
                    return member.course_id == course.id && member.role == 'teacher';
                });
                course["isAuthor"] = course.author_id == this.currentUser.id;
            });
        });
    }

    loadExam() {
        this.startTransaction();
        ExamMember.listByUser(this, this.authService.UserProfile.id).subscribe(members => {
            members = _.filter(members, (member => {
                return (member.exam_id && member.status=='active');
            }));
            Submission.listByUser(this, this.authService.UserProfile.id).subscribe(submits => {
                var examIds = _.pluck(members, 'exam_id');
                Exam.array(this, examIds)
                    .subscribe(exams => {
                        _.each(exams, (exam) => {
                            exam.member = _.find(members, (member: ExamMember) => {
                                return member.exam_id == exam.id;
                            });
                            exam.submit = _.find(submits, (submit: Submission) => {
                                return submit.member_id == exam.member.id && submit.exam_id == exam.id;
                            });
                            if (exam.submit) {
                                if (exam.submit.score != null)
                                    exam.score = exam.submit.score;
                                else
                                    exam.score = '';
                            }
                            ExamQuestion.countByExam(this, exam.id).subscribe(count => {
                                exam.question_count = count;
                            });
                        });
                        this.exams = _.filter(exams, (exam) => {
                            return exam.member.role == 'supervisor' || (exam.member.role == 'candidate' && exam.IsAvailable);
                        });
                        this.exams.sort((exam1, exam2): any => {
                            if (exam1.create_date > exam2.create_date)
                                return -1;
                            else if (exam1.create_date < exam2.create_date)
                                return 1;
                            else
                                return 0;
                        });
                        this.closeTransaction();
                    });
             });
        });
    }

    loadConference() {
        this.startTransaction();
        ConferenceMember.listByUser(this, this.authService.UserProfile.id)
            .subscribe(members => {
                members = _.filter(members, (member => {
                    return member.conference_id && member.conference_status =='open';
                }));
                var confIds = _.pluck(members, 'conference_id');
                Conference.array(this, confIds).subscribe(conferences => {
                    _.each(members, (member) => {
                        member.conference = _.find(conferences, conference => {
                            return conference.id == member.conference_id;
                        });
                    });
                    this.confMembers = members;
                    this.confMembers.sort((confMember1, confMember2): any => {
                        if (confMember1.create_date > confMember2.create_date)
                            return -1;
                        else if (confMember1.create_date < confMember2.create_date)
                            return 1;
                        else
                            return 0;
                        });
            });
                this.closeTransaction();
            });
    }

    ngOnInit() {
        this.startTransaction();
        BaseModel.bulk_search(this, 
            CourseMember.__api__listByUser(this.currentUser.id),
            ExamMember.__api__listByUser(this.currentUser.id),
            ConferenceMember.__api__listByUser(this.currentUser.id),
            Course.__api__listByAuthor(this.currentUser.id))
        .subscribe(jsonArray=> {
                this.courseMembers =  CourseMember.toArray(jsonArray[0]);
                this.examMembers =  ExamMember.toArray(jsonArray[1]);
                this.conferenceMembers =  ConferenceMember.toArray(jsonArray[2]);
                this.courses =  Course.toArray(jsonArray[3]);
                this.displayCourses();
                this.startTransaction();
            });
    }

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
        this.startTransaction();
        this.getCourseSyllabus(course).subscribe(syllabus => {
            this.closeTransaction();
            this.syllabusDialog.show(syllabus);
            this.syllabusDialog.onHide.subscribe(() => {
                this.loadCourse();
            });
        });
    }

    studyCourse(course: Course, member: CourseMember) {
        if (course.status == 'published') {
            this.startTransaction();
            CourseSyllabus.byCourse(this, course.id).subscribe(syl => {
                if (syl && syl.status == 'published')
                    this.router.navigate(['/lms/courses/study', course.id, member.id]);
                else
                    this.error('The course has not been published');
                this.closeTransaction();
            });
        }
        else {
            this.error('The course has not been published');
        }
    }

    manageCourse(course: Course, member: CourseMember) {
        if (course.status == 'published') {
            this.startTransaction();
            CourseSyllabus.byCourse(this, course.id).subscribe(syl => {
                if (syl && syl.status == 'published')
                    this.router.navigate(['/lms/courses/manage', course.id]);
                else
                    this.error('The course has not been published');
                this.closeTransaction();
            });
        }
        else {
            this.error('The course has not been published');
        }

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
            this.examStudyDialog.onHide.subscribe(() => {
                this.loadExam();
            });
        });
    }
}