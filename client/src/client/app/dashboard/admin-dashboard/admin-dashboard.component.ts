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
import { USER_STATUS, SERVER_DATETIME_FORMAT, COURSE_MODE, CONTENT_STATUS, SCHEDULER_HEADER } from '../../shared/models/constants';
import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html'

})
export class AdminDashboardComponent extends BaseComponent implements OnInit {

    COURSE_MODE =  COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

    private events: any[];
    private exams: Exam[];
    private courses: Course[];
    private course: Course;
    private selectedExam: any;
    private header: any;
    private now: Date;

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(CourseDialog) courseDialog: CourseDialog;
    
    constructor(private dateUtils: DateUtils) {
        super();
        this.header = SCHEDULER_HEADER;
        this.now = new Date();
        this.course = new Course();
    }

    ngOnInit() {  
        this.loadExams();
        this.loadCourses();
    }


    addExam() {
        this.examDialog.show(new Exam());
        this.examDialog.onCreateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editExam(exam) {
        if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != exam.supervisor_id) {
                this.error('You do not have edit permission for this exam');
                return;
            }
        this.examDialog.show(exam);
        this.examDialog.onUpdateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editCourse(course) {
        if  (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != course.supervisor_id) {
                this.error('You do not have edit permission for this course');
                return;
            }
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
        Exam.searchByDate(this,this.dateUtils.firstDateOfMonth(this.now),this.dateUtils.lastDateOfMonth(this.now)).subscribe(exams => {
            this.exams = exams;
            this.events = _.map(exams, (exam:Exam)=> {
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

    loadCourses() {
        Course.searchByDate(this,this.dateUtils.firstDateOfMonth(this.now),this.dateUtils.lastDateOfMonth(this.now)).subscribe(courses => {
            this.courses = courses;
            this.courses.sort((course1:Course, course2:Course): any => {
                return (course1.create_date.getTime() - course2.create_date.getTime())
            });
        });
    }
}

