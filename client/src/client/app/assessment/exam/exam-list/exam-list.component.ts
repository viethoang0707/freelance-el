import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS, SCHEDULER_HEADER } from '../../../shared/models/constants'
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

    EXAM_STATUS = EXAM_STATUS;

    private selectedExam: Exam;
    private exams: Exam[];
    private events: any[];
    private header: any;
    
    @ViewChild(ExamDialog) examDialog: ExamDialog;
    @ViewChild(ExamEnrollDialog) examEnrollDialog: ExamEnrollDialog;

    constructor() {
        super();
        this.header = SCHEDULER_HEADER;
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
        exam.is_public =  true;
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
        Exam.listPublicExam(this).subscribe(exams => {
            this.exams = exams;
            this.events = _.map(exams, (exam:Exam) => {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam.id,
                    allDay: true
                }
            });
            this.exams.sort((exam1, exam2): any => {
                return exam1.id - exam2.id;
            });
        });
    }
}