import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../shared/models/elearning/user.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseDialog } from '../../course/course/course-dialog/course-dialog.component';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../shared/models/elearning/exam.model';
import { DateUtils } from '../../shared/helpers/date.utils';
import { Group } from '../../shared/models/elearning/group.model';
import { ExamDialog } from '../../assessment/exam/exam-dialog/exam-dialog.component';
import * as _ from 'underscore';
import * as moment from 'moment';
import { USER_STATUS, SERVER_DATETIME_FORMAT, COURSE_MODE, CONTENT_STATUS } from '../../shared/models/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html'

})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

    private userCount: any;
    private studentCount: any;
    private teacherCount: any;
    private courseCount: any;
    private events: any[];
    private exams: Exam[];
    private courses: Course[];
    private course: Course;
    private selectedExam: any;
    private header: any;
    private now: Date;
    COURSE_MODE =  COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

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
    }

    editCourse(course) {
        this.course = course;
        this.courseDialog.show(this.course);
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
        this.startTransaction();
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
            this.closeTransaction();
        });
    }

    loadCourses() {
        this.startTransaction();
        Course.searchByDate(this,this.dateUtils.firstDateOfMonth(this.now),this.dateUtils.lastDateOfMonth(this.now)).subscribe(courses => {
            this.courses = courses;
            this.courses.sort((course1, course2): any => {
                if (course1.create_date > course2.create_date)
                    return -1;
                else if (course1.create_date < course2.create_date)
                    return 1;
                else
                    return 0;
            });
            this.closeTransaction();
        });
    }


}

