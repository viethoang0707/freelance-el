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
import { CoursePublishDialog } from '../../cms/course/course-publish/course-publish.dialog.component';

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

    displayCourses(courses:Course[]) {
        _.each(courses, (course:Course)=> {
            course['student'] =  this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] =  this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] =  this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] =  this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
            if (course['supervisor'])
                course['teacher'] =  course['editor'] =  course['supervisor'];
        });
        this.courses =  _.sortBy(courses, (course: Course) => {
            return -this.lmsProfileService.getLastCourseTimestamp(course);
        });
        var classList = this.lmsProfileService.MyClasses;
        _.each(classList, (clazz:CourseClass)=> {
            if (clazz.IsAvailable)
                this.events.push({
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: clazz.id,
                    allDay: true
                });
        })
    }

    displayExams(exams: Exam[]) {
        _.each(exams, (exam:Exam)=> {
            exam['candidate'] =  this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] =  this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] =  this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] =  exam['supervisor'];
            if (exam.IsAvailable)
                this.events.push( {
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
            var courses = this.lmsProfileService.MyCourses;
            var exams = this.lmsProfileService.MyExams;
            var conferenceMembers = this.lmsProfileService.MyConferenceMembers;
            this.displayCourses(courses);
            this.displayExams(exams);
            this.displayConferences(conferenceMembers);
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
        this.publisiDialog.show(course);
    }

    manageCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
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

    publishExam(exam:Exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    }

    unpublishExam(exam:Exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    }
}