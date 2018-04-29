import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../shared/models/elearning/user.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../shared/models/elearning/exam.model';
import { DateUtils } from '../../shared/helpers/date.utils';
import { Group } from '../../shared/models/elearning/group.model';
import { ExamDialog } from '../../assessment/exam/exam-dialog/exam-dialog.component';
import * as _ from 'underscore';
import * as moment from 'moment';
import { USER_STATUS, SERVER_DATETIME_FORMAT, COURSE_MODE, COURSE_STATUS } from '../../shared/models/constants'
import { CourseDialog } from '../../course/course/course-dialog/course-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html'

})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

    userCount: any;
    studentCount: any;
    teacherCount: any;
    courseCount: any;
    events: any[];
    exams: Exam[];
    courses: Course[];
    course: Course;
    selectedExam: any;
    header: any;
    now: Date;
    COURSE_MODE =  COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(CourseDialog) courseDialog: CourseDialog;
    
    constructor(private dateUtils: DateUtils) {
        super();
        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.now = new Date();
        this.course = new Course();
    }

    ngOnInit() {
        User.count(this).subscribe(count => {
            this.userCount = count;
        });
        Course.count(this).subscribe(count => {
            this.courseCount = count;
        });
        CourseMember.countTeacher(this).subscribe(count => {
            this.teacherCount = count;
        });
        CourseMember.countStudent(this).subscribe(count => {
            this.studentCount = count;
        });    
        this.loadExams();
        // this.loadRecentCourse();
        this.loadCourses();
    }


    addExam() {
        var exam = new Exam();
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editExam(exam) {
        this.examDialog.show(exam);
        this.examDialog.onUpdateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editCourse(course) {
        this.courseDialog.show(course);
        this.courseDialog.onUpdateComplete.subscribe(() => {
            this.loadCourses();
        });
    }

    onDayClick() {
        this.addExam();
    }

    onEventClick(event) {
        var examId = event.calEvent.id;
        var exam = _.find(this.exams, (exam)=> {
            return exam.id == examId;
        });
        this.editExam(exam);
    }

    loadExams() {
        Exam.all(this).subscribe(exams => {
            this.exams = exams;
            this.events = _.map(exams, (exam)=> {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                }
            });
        });
    }

    loadRecentCourse() {
        var cloud_acc = this.authService.CloudAcc;
        var startDateStr = moment(this.dateUtils.firstDateOfMonth(this.now)).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(this.dateUtils.lastDateOfMonth(this.now)).format(SERVER_DATETIME_FORMAT);
        this.apiService.search(Course.Model,[],"[('create_date','>=','"+startDateStr+"'),('create_date','<=','"+endDateStr+"')]",
         cloud_acc.id, cloud_acc.api_endpoint).subscribe(courses => {
             this.courses = courses;
         });
    }

    loadCourses() {
        var cloud_acc = this.authService.CloudAcc;
        var startDateStr = moment(this.dateUtils.firstDateOfMonth(this.now)).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(this.dateUtils.lastDateOfMonth(this.now)).format(SERVER_DATETIME_FORMAT);
        Course.search(this,[],"[('create_date','>=','"+startDateStr+"'),('create_date','<=','"+endDateStr+"')]", ).subscribe(courses => {
            this.courses = courses;
        });
    }


}

