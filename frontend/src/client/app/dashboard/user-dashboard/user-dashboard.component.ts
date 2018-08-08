import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseLog } from '../../shared/models/elearning/log.model';
import { ExamMember } from '../../shared/models/elearning/exam-member.model';
import { Exam } from '../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../shared/models/elearning/exam-question.model';
import { CourseClass } from '../../shared/models/elearning/course-class.model';
import { ConferenceMember } from '../../shared/models/elearning/conference-member.model';
import { Conference } from '../../shared/models/elearning/conference.model';
import { MeetingService } from '../../shared/services/meeting.service';
import { User } from '../../shared/models/elearning/user.model';
import { GROUP_CATEGORY, CONFERENCE_STATUS, COURSE_MODE, COURSE_STATUS, EXAM_STATUS, SCHEDULER_HEADER } from '../../shared/models/constants'
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
import { CoursePublishDialog } from '../../cms/course/course-publish/course-publish.dialog.component';
import * as _ from 'underscore';

const COURSE_FIELDS = ['status', 'review_state', 'name', 'write_date', 'create_date', 'supervisor_id', 'logo', 'summary', 'description', 'code', 'mode', 'unit_count', 'group_name'];
const EXAM_FIELDS = ['status', 'review_state', 'name', 'write_date', 'create_date', 'supervisor_id', 'summary', 'instruction', 'start', 'end', 'duration', 'question_count', 'sheet_status'];
const CLASS_FIELDS = ['start', 'end', 'name'];

@Component({
    moduleId: module.id,
    selector: 'user-dashboard',
    templateUrl: 'user-dashboard.component.html',
    styleUrls: ['user-dashboard.component.css'],

})
export class UserDashboardComponent extends BaseComponent implements OnInit {

    CONFERENCE_STATUS = CONFERENCE_STATUS;
    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;
    EXAM_STATUS = EXAM_STATUS;

    private conferenceMembers: ConferenceMember[];
    private courseMembers: CourseMember[];
    private examMembers: ExamMember[];
    private courses: Course[];
    private exams: Exam[];
    private header: any;
    private events: any[];

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    @ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;
    @ViewChild(CoursePublishDialog) publisiDialog: CoursePublishDialog;
    @ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;

    constructor(private meetingSerivce: MeetingService, private router: Router) {
        super();
        this.conferenceMembers = [];
        this.exams = [];
        this.courses = [];
        this.events = [];
        this.header = SCHEDULER_HEADER;
    }

    displayCourses(courses: Course[]) {
        this.ContextUser.lastCourseUnitAttempt(this).subscribe(logs => {
            if (logs && logs.length) {
                let log: CourseLog = logs[0];
                if (log.code == 'START_COURSE_UNIT')
                    this.confirm('Do you want to continue last course', () => {
                        var member = this.lmsProfileService.courseMemberById(log.member_id);
                        var course = _.find(courses, (obj:Course)=> {
                            return obj.id == log.course_id;
                        });
                        this.studyCourse(course, member);
                    });
            }
        });
        _.each(courses, (course: Course) => {
            course['student'] = this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
        });
        this.courses = _.sortBy(courses, (course: Course) => {
            return -this.lmsProfileService.getLastCourseTimestamp(course);
        });
        var classIds = _.pluck(this.courseMembers, 'class_id');
        classIds = _.filter(classIds, id => {
            return id;
        });
        classIds = _.uniq(classIds, id => {
            return id;
        });
        CourseClass.array(this, classIds, CLASS_FIELDS).subscribe(classList => {
            _.each(classList, (clazz: CourseClass) => {
                if (clazz.IsAvailable)
                    this.events.push({
                        title: clazz.name,
                        start: clazz.start,
                        end: clazz.end,
                        id: clazz.id,
                        allDay: true
                    });
            })
        });
    }

    displayExams(exams: Exam[]) {
        _.each(exams, (exam: Exam) => {
            exam['candidate'] = this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam.IsAvailable)
                this.events.push({
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                });
        });
        exams.sort((exam1: Exam, exam2: Exam): any => {
            return this.lmsProfileService.getLastExamTimestamp(exam2) - this.lmsProfileService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    }

    displayConferences(conferenceMembers: ConferenceMember[]) {
        conferenceMembers = _.sortBy(conferenceMembers, (member: ConferenceMember) => {
            return -this.lmsProfileService.getLastConferenceTimestamp(member);
        });
        this.conferenceMembers = conferenceMembers;
    }


    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.courseMembers = this.lmsProfileService.MyCourseMembers;
            var courseIds = _.pluck(this.courseMembers, 'course_id');
            courseIds = _.uniq(courseIds, id => {
                return id;
            });
            Course.array(this, courseIds, COURSE_FIELDS).subscribe(courses => {
                this.displayCourses(courses);
            });
            this.examMembers = this.lmsProfileService.MyExamMembers;
            var examIds = _.pluck(this.examMembers, 'exam_id');
            examIds = _.uniq(examIds, id => {
                return id;
            });
            Exam.array(this, examIds, EXAM_FIELDS).subscribe(exams => {
                this.displayExams(exams);
            });
            var conferenceMembers = this.lmsProfileService.MyConferenceMembers;
            ConferenceMember.populateConferences(this, conferenceMembers).subscribe(() => {
                this.displayConferences(conferenceMembers);
            });
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

    viewCourse(course: Course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    }

    editSyllabus(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    }

    publishCourse(course: Course) {
        course.populate(this).subscribe(() => {
            this.publisiDialog.show(course);
        });

    }

    manageCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    }

    manageExam(exam: Exam, member: ExamMember) {
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    }

    editExamContent(exam: Exam) {
        exam.populate(this).subscribe(() => {
            this.examContentDialog.show(exam);
        });

    }

    startExam(exam: Exam, member: ExamMember) {
        this.confirm('Are you sure to start ?', () => {
            exam.populate(this).subscribe(() => {
                this.examStudyDialog.show(exam, member);
            });

        });
    }

    publishExam(exam: Exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    }

    unpublishExam(exam: Exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    }

    viewAnswer(exam: Exam, member: ExamMember) {
        exam.populate(this).subscribe(() => {
            member.populate(this).subscribe(() => {
                this.answerSheetDialog.show(exam, member);
            });
        });
    }
}