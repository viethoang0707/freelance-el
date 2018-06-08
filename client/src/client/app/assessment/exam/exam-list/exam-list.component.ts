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

    private selectedExam: Exam;
    private exams: Exam[];
    private events: any[];
    private header: any;
    EXAM_STATUS = EXAM_STATUS;

    constructor() {
        super();
        this.header = {
            left: 'prev, today, next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    enrollExam() {
        if (this.selectedExam)
            this.examEnrollDialog.enroll(this.selectedExam);
    }

    ngOnInit() {
        this.loadExams();
    }


    addExam() {
        var exam = new Exam();
        exam.supervisor_id =  this.authService.UserProfile.id;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(() => {
            this.loadExams();
        });
    }

    editExam() {
        if (this.selectedExam)
            this.examDialog.show(this.selectedExam);
    }

    deleteExam() {
        if (this.selectedExam)
            this.confirm('Are you sure to delete ?', () => {
                this.selectedExam.delete(this).subscribe(() => {
                    this.loadExams();
                    this.selectedExam = null;
                })
            });
    }

    onDayClick() {
        this.addExam();
    }

    onEventClick(event) {
        var examId = event.calEvent.id;
        this.selectedExam = _.find(this.exams, (exam) => {
            return exam.id == examId;
        });
        this.editExam();
    }

    loadExams() {
        
        Exam.all(this).subscribe(exams => {
            this.exams = exams;
            this.events = _.map(exams, (exam) => {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                }
            });
            this.exams.sort((exam1, exam2): any => {
                if (exam1.id > exam2.id)
                    return -1;
                else if (exam1.id < exam2.id)
                    return 1;
                else
                    return 0;
            });
            
        });
    }
}