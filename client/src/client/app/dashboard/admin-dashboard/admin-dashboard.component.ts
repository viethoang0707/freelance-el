import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../shared/models/elearning/user.model';
import { Course } from '../../shared/models/elearning/course.model';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../shared/models/elearning/exam.model';
import { Group } from '../../shared/models/elearning/group.model';
import { ExamDialog } from '../../assessment/exam/exam-dialog/exam-dialog.component';
import { SelectItem } from 'primeng/api';
import * as _ from 'underscore';

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
    events: any;
    exams: Exam[];
    selectedExam: any;
    header:any;

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
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

    onDayClick() {
        this.add();
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
                    send: exam.end,
                    id: exam.id,
                    allDay: true
                }
            });
        });
    }


}

