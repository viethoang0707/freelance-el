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
import { GROUP_CATEGORY, CONFERENCE_STATUS, COURSE_MODE, EXAM_STATUS, SCHEDULER_HEADER } from '../../shared/models/constants'
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
import { Survey } from '../../shared/models/elearning/survey.model';
import { SurveyStudyDialog } from '../../lms/survey/survey-study/survey-study.dialog.component';
import { SurveyMember } from '../../shared/models/elearning/survey-member.model';

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

    private conferences: Conference[];
    private courses: Course[];
    private exams: Exam[];
    private header: any;
    private events: any[];

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;

    constructor(private meetingSerivce: MeetingService, private router: Router) {
        super();
        this.conferences = [];
        this.exams = [];
        this.courses = [];
        this.events = [];
        this.header = SCHEDULER_HEADER;
    }

    displayCourses(courseMembers: CourseMember[]) {
        courseMembers = _.filter(courseMembers, (member: CourseMember) => {
            return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status == 'active';
        });
        CourseMember.populateCourses(this, courseMembers).subscribe((courses) => {
            courses = _.filter(courses, (course: Course) => {
                return course.review_state == 'approved';
            });
            courses = _.uniq(courses, (course: Course) => {
                return course.id;
            });
            courses.sort((course1: Course, course2: Course): any => {
                return (course2.create_date.getTime() - course1.create_date.getTime());
            });
            _.each(courses, (course: Course) => {
                course["student"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && member.role == 'student';
                });
                course["teacher"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && (member.role == 'teacher' || member.role == 'supervisor');
                });
                course["editor"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && (member.role == 'editor'|| member.role == 'supervisor');
                });
            });
            this.courses = courses;
            var classMembers = _.filter(courseMembers, (member:CourseMember)=> {
                return member.class_id != null;
            });
            CourseMember.populateClasses(this, classMembers).subscribe(classList=> {
                classList = _.uniq(classList, (clazz: CourseClass) => {
                    return clazz.id;
                });
                this.events = this.events.concat(_.map(classList, (clazz:CourseClass)=> {
                    return {
                        title: clazz.name,
                        start: clazz.start,
                        end: clazz.end,
                        id: clazz.id,
                        allDay: true
                    }
                }));
            });
        });
    }

    displayExams(examMembers: ExamMember[]) {
        examMembers = _.filter(examMembers, (member: ExamMember) => {
            return member.exam_id && member.status == 'active';
        });
        ExamMember.populateExams(this, examMembers).subscribe(exams => {
            exams = _.filter(exams, (exam: Exam) => {
                return exam.review_state == 'approved';
            });
            exams = _.uniq(exams, (exam: Exam) => {
                return exam.id;
            });
            exams.sort((exam1: Exam, exam2: Exam): any => {
                return (exam2.create_date.getTime() - exam1.create_date.getTime());
            });
            _.each(exams, (exam: Exam) => {
                exam["candidate"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && member.role == 'candidate';
                });
                exam["supervisor"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && member.role == 'supervisor';
                });
                exam["editor"] = _.find(examMembers, (member: ExamMember) => {
                    return member.exam_id == exam.id && (member.role == 'editor' || member.role == 'supervisor');
                });
            });
            this.exams = exams;
            var countApi = _.map(exams, (exam: Exam) => {
                return ExamQuestion.__api__countByExam(exam.id);
            });
            BaseModel.bulk_count(this, ...countApi)
                .map((jsonArray) => {
                    return _.flatten(jsonArray);
                })
                .subscribe(counts => {
                    for (var i = 0; i < exams.length; i++) {
                        exams[i]["question_count"] = counts[i];
                    }
                    
                });
             this.events = this.events.concat(_.map(exams, (exam:Exam)=> {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                }
            }));
        });
    }

    displayConferences(conferenceMembers: ConferenceMember[]) {
        conferenceMembers = _.filter(conferenceMembers, (member: ConferenceMember) => {
            return member.conference_id && member.conference_status == 'open';
        });
        ConferenceMember.populateConferences(this, conferenceMembers).subscribe(conferences => {
            conferences.sort((conf1: Conference, conf2: Conference): any => {
                return conf2.create_date.getTime() - conf1.create_date.getTime();
            });
            this.conferences = conferences;
            _.each(conferences, (conf: Conference) => {
                conferences["member"] = _.find(conferenceMembers, (member: ConferenceMember) => {
                    return member.conference_id == conf.id;
                });
            });
        });
    }

    ngOnInit() {
        BaseModel.bulk_search(this,
            CourseMember.__api__listByUser(this.ContextUser.id),
            ExamMember.__api__listByUser(this.ContextUser.id),
            ConferenceMember.__api__listByUser(this.ContextUser.id),
            Survey.__api__listAvailableSurvey(),
            SurveyMember.__api__listByUser(this.ContextUser.id)
        )
            .subscribe(jsonArray => {
                var courseMembers = CourseMember.toArray(jsonArray[0]);
                var examMembers = ExamMember.toArray(jsonArray[1]);
                var conferenceMembers = ConferenceMember.toArray(jsonArray[2]);
                var surveys = Survey.toArray(jsonArray[3]);
                var surveyMembers = SurveyMember.toArray(jsonArray[4]);
                this.displayCourses(courseMembers);
                this.displayExams(examMembers);
                this.displayConferences(conferenceMembers);
            });
    }

    joinConference(conference,member) {
        if (member.is_active)
            this.meetingSerivce.join( conference.room_ref,member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    }

    editSyllabus(course: Course, member:CourseMember) {
        CourseSyllabus.byCourse(this, course.id).subscribe(syllabus => {
            this.syllabusDialog.show(syllabus, course, member);
        });
    }

    studyCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    }

    manageCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/manage', course.id]);
    }

    manageExam(exam: Exam, member: ExamMember) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editExamContent(exam: Exam) {
        this.examContentDialog.show(exam);
    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?', () => {
            this.examStudyDialog.show(exam, member);
        });
    }
}