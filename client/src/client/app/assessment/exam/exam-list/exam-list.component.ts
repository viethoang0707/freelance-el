import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/elearning/exam.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamDialog } from '../exam-dialog/exam-dialog.component';
import { ExamEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'exam-list',
    templateUrl: 'exam-list.component.html',
    styleUrls: ['exam-list.component.css'],
})
export class ExamListComponent extends BaseComponent {

    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(ExamEnrollDialog) examEnrollDialog: ExamEnrollDialog;

    selectedExam: Exam;
    exams: Exam[];
    events: any[];
    header: any;
    EXAM_STATUS =  EXAM_STATUS;

    constructor() {
        super();
        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    enroll() {
        if (this.selectedExam)
            this.examEnrollDialog.enroll(this.selectedExam);
    }

    ngOnInit() {
        this.loadExams();
    }


    add() {
        var exam = new Exam();
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    edit() {
        if (this.selectedExam)
            this.examDialog.show(this.selectedExam);
        this.examDialog.onUpdateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    delete() {
        if (this.selectedExam)
            this.confirm('Are you sure to delete ?', () => {
                    this.selectedExam.delete(this).subscribe(() => {
                        this.loadExams();
                        this.selectedExam = null;
                    })
                }
            );
    }

    onDayClick() {
        this.add();
    }

    onEventClick(event) {
        var examId = event.calEvent.id;
        this.selectedExam = _.find(this.exams, (exam)=> {
            return exam.id == examId;
        });
        this.edit();
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
}