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
import { GROUP_CATEGORY, CONFERENCE_STATUS, EXAM_MODE, COURSE_MODE, COURSE_STATUS, EXAM_STATUS, SCHEDULER_HEADER } from '../../shared/models/constants'
import { CourseSyllabus } from '../../shared/models/elearning/course-syllabus.model';
import { SelectItem } from 'primeng/api';
import { QuestionMarkingDialog } from '../../lms/exam/question-marking/question-marking.dialog.component';
import { AnswerPrintDialog } from '../../lms/exam/answer-print/answer-print.dialog.component';
import { ExamStudyDialog } from '../../lms/exam/exam-study/exam-study.dialog.component';
import { ExamSetting } from '../../shared/models/elearning/exam-setting.model';
import { Submission } from '../../shared/models/elearning/submission.model';
import { BaseModel } from '../../shared/models/base.model';
import { Survey } from '../../shared/models/elearning/survey.model';
import { SurveyStudyDialog } from '../../lms/survey/survey-study/survey-study.dialog.component';
import { SurveyMember } from '../../shared/models/elearning/survey-member.model';
import * as _ from 'underscore';

const COURSE_FIELDS = ['status', 'review_state', 'name', 'write_date', 'create_date', 'supervisor_id', 'logo', 'summary', 'description', 'code', 'mode', 'unit_count', 'group_name', 'syllabus_id'];
const EXAM_FIELDS = ['status', 'mode', 'review_state', 'name', 'setting_id', 'write_date', 'create_date', 'supervisor_id', 'summary', 'instruction', 'start', 'end', 'duration', 'question_count', 'sheet_status', 'sheet_id'];
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

    @ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
    @ViewChild(SurveyStudyDialog) surveyStudyDialog: SurveyStudyDialog;
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
        this.ContextUser.lastCourseUnitAttempt(this).subscribe(log => {
            if (log) {
                if (log.code == 'START_COURSE_UNIT')
                    this.confirm(this.translateService.instant('Do you want to continue last course'), () => {
                        var member = this.lmsProfileService.courseMemberById(log.member_id);
                        var course = _.find(courses, (obj: Course) => {
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
            return -course.id;
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
            });
        });
    }

    displayExams(exams: Exam[]) {
        console.log(exams);
        _.each(exams, (exam: Exam) => {
            exam['candidate'] = this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            // if (exam.IsAvailable)
            this.events.push({
                title: exam.name,
                start: exam.start,
                end: exam.end,
                id: exam.id,
                allDay: true
            });
        });
        this.exams = _.sortBy(exams, (exam: Exam) => {
            return -exam.id;
        });
    }

    displayConferences(conferenceMembers: ConferenceMember[]) {
        conferenceMembers = _.sortBy(conferenceMembers, (member: ConferenceMember) => {
            return -member.id;
        });
        this.conferenceMembers = conferenceMembers;
    }


    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            this.courseMembers = this.lmsProfileService.MyCourseMembers;
            Course.array(this, this.lmsProfileService.MyCourseIds, COURSE_FIELDS).subscribe(courses => {
                this.displayCourses(courses);
            });
            this.examMembers = this.lmsProfileService.MyExamMembers;
            Exam.array(this, this.lmsProfileService.MyExamIds, EXAM_FIELDS).subscribe(exams => {
                this.displayExams(exams);
            });
            var conferenceMembers = this.lmsProfileService.MyConferenceMembers;
            ConferenceMember.populateConferences(this, conferenceMembers).subscribe(() => {
                this.displayConferences(conferenceMembers);
            });
        });
    }

    joinConference(conference, member) {
        this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
    }

    studyCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/course/study', course.id, member.id]);
    }

    viewCourse(course: Course) {
        this.router.navigate(['/lms/course/view', course.id]);
    }

    editCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/course/edit', course.id]);
    }

    publishCourse(course: Course) {
        this.router.navigate(['/cms/course/publish', course.id, course.syllabus_id]);
    }

    manageCourse(course: Course, member: CourseMember) {
        if (course.mode == 'group')
            this.router.navigate(['/lms/course/group-manage', course.id, member.id]);
        if (course.mode == 'self-study')
            this.router.navigate(['/lms/course/self-study-manage', course.id, member.id]);
    }

    manageExam(exam: Exam, member: ExamMember) {
        this.router.navigate(['/lms/exam/manage', exam.id]);
    }

    editExamContent(exam: Exam) {
        this.router.navigate(['/cms/exam/compose', exam.id, exam.sheet_id]);
    }

    startExam(exam: Exam, member: ExamMember) {
        if (exam.exam_mode == 'offline' ) {
            this.warn('This exam does not support online mode');
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to start?'), () => {
            ExamSetting.get(this, exam.setting_id).subscribe(() => {
                member.joinExam(this).subscribe(() => {
                    this.examStudyDialog.show(exam, exam.setting, member);
                });
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
        ExamSetting.get(this, exam.setting_id).subscribe((setting: ExamSetting) => {
            if (!setting.allow_review_answer) {
                this.info('Answer sheet review is not allowed!');
                return;
            }
            Submission.get(this, member.submission_id).subscribe(submit => {
                this.answerSheetDialog.show(exam, member, submit);
            });
        });
    }
}