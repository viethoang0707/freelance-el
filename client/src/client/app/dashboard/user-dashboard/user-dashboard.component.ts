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

    displayCourses() {
        var courseMembers = this.lmsService.MyCourseMember;
        var courses = this.lmsService.MyCourse;
        var classList = this.lmsService.MyClass;
        courses = _.filter(courses, (course: Course) => {
            return course.review_state == 'approved';
        });
        _.each(courses, (course: Course) => {
            course["student"] = _.find(courseMembers, (member: CourseMember) => {
                return member.course_id == course.id && member.role == 'student';
            });
            course["teacher"] = _.find(courseMembers, (member: CourseMember) => {
                return member.course_id == course.id && member.role == 'teacher';
            });
            course["supervisor"] = _.find(courseMembers, (member: CourseMember) => {
                return member.course_id == course.id && member.role == 'supervisor';
            });
            course["editor"] = _.find(courseMembers, (member: CourseMember) => {
                return member.course_id == course.id && member.role == 'editor';
            });
            if (course["supervisor"])
                course["editor"] = course["teacher"] = course["supervisor"];
        });
        courses.sort((course1: Course, course2: Course): any => {
            return this.getLastCourseTimestamp(course2) - this.getLastCourseTimestamp(course1);
        });
        this.courses = courses;
        this.events = this.events.concat(_.map(classList, (clazz: CourseClass) => {
            return {
                title: clazz.name,
                start: clazz.start,
                end: clazz.end,
                id: clazz.id,
                allDay: true
            }
        }));
    }

    getLastCourseTimestamp(course: Course) {
        var timestamp = course.create_date.getTime();
        if (course["student"] && course["student"].create_date.getTime() < timestamp)
            timestamp = course["student"].create_date.getTime();
        if (course["teacher"] && course["teacher"].create_date.getTime() < timestamp)
            timestamp = course["teacher"].create_date.getTime();
        if (course["editor"] && course["editor"].create_date.getTime() < timestamp)
            timestamp = course["editor"].create_date.getTime();
        if (course["supervisor"] && course["supervisor"].create_date.getTime() < timestamp)
            timestamp = course["supervisor"].create_date.getTime();
        return timestamp;
    }

    displayExams() {
        var examMembers = this.lmsService.MyExamMember;
        var exams = this.lmsService.MyExam;
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
            if (exam["supervisor"])
                exam["editor"] = exam["teacher"] = exam["supervisor"];
        });
        exams.sort((exam1: Exam, exam2: Exam): any => {
            return this.getLastExamTimestamp(exam2) - this.getLastExamTimestamp(exam1);
        });

        this.exams = exams;
        this.events = this.events.concat(_.map(exams, (exam: Exam) => {
            return {
                title: exam.name,
                start: exam.start,
                end: exam.end,
                id: exam.id,
                allDay: true
            }
        }));
    }

    getLastExamTimestamp(exam: Exam) {
        var timestamp = exam.create_date.getTime();
        if (exam["candidate"] && exam["candidate"].create_date.getTime() < timestamp)
            timestamp = exam["candidate"].create_date.getTime();
        if (exam["editor"] && exam["editor"].create_date.getTime() < timestamp)
            timestamp = exam["exam"].create_date.getTime();
        if (exam["supervisor"] && exam["supervisor"].create_date.getTime() < timestamp)
            timestamp = exam["supervisor"].create_date.getTime();
        return timestamp;
    }

    displayConferences() {
        var conferenceMembers = this.lmsService.MyConferenceMember;
        var conferences = this.lmsService.MyConference;
        conferences.sort((conf1: Conference, conf2: Conference): any => {
            return this.getLastConferenceTimestamp(conf2) - this.getLastConferenceTimestamp(conf1);
        });
        this.conferences = conferences;
        _.each(conferences, (conf: Conference) => {
            conferences["member"] = _.find(conferenceMembers, (member: ConferenceMember) => {
                return member.conference_id == conf.id;
            });
        });
    }

    getLastConferenceTimestamp(conf: Conference) {
        var timestamp = conf.create_date.getTime();
        if (conf["member"] && conf["member"].create_date.getTime() < timestamp)
            timestamp = conf["member"].create_date.getTime();
        return timestamp;
    }

    ngOnInit() {
        this.lmsService.init(this).subscribe(() => {
            this.displayCourses();
            this.displayExams();
            this.displayConferences();
        });
    }

    joinConference(conference, member) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
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