import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ExamSetting } from '../../../shared/models/elearning/exam-setting.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { WebcamImage } from 'ngx-webcam';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'offline-exam-submission-dialog',
    templateUrl: 'offline-exam-submission.dialog.component.html',
    styleUrls: ['offline-exam-submission.dialog.component.css'],
})
export class OfflineExamSubmissionDialog extends BaseComponent {

    private display: boolean;
    private exam: Exam;
    private submit: Submission;
    private trigger: Subject<void> = new Subject<void>();
    private percentage: number;
    private grades: SelectItem[];

    private onConfirmReceiver: Subject<any> = new Subject();
    onConfirm: Observable<any> = this.onConfirmReceiver.asObservable();


    constructor(private componentFactoryResolver: ComponentFactoryResolver, private ngZone: NgZone) {
        super();
        this.display = false;
        this.exam = new Exam();
        this.submit = new Submission();
    }

    show(exam: Exam, submit: Submission) {
        this.display = true;
        this.exam = exam;
        this.submit = submit;
        this.exam.listGrades(this).subscribe(grades => {
            this.grades = _.map(grades, (grade:ExamGrade)=> {
                return {
                    label: grade.name,
                    value: grade.name;
                }
            });
        })
    }

    hide() {
        this.display = false;
    }


    confirm() {
        if (!this.submit.file_url)
            this.error(this.translateService.instant('You have not submiited any attachment'));
        else {
            this.submit.save(this).subscribe(() => {
                this.onConfirmReceiver.next();
                this.success(this.translateService.instant('Action completed'));
                this.hide();
            });
        }
    }

    changeFileEvent(event: any) {
        let file = event.files[0];
        this.uploadFile(file);
    }

    uploadFile(file) {
        this.percentage = 0;
        this.apiService.upload(file, this.authService.LoginToken).subscribe(
            data => {
                if (data["result"]) {
                    this.ngZone.run(() => {
                        this.submit.submit_user_id = this.ContextUser.id;
                        this.submit.submission_file_id = data["attachment_id"];
                        this.submit.file_url = data["url"];
                        this.submit.filename = file.name;
                    });
                } else {
                    this.ngZone.run(() => {
                        this.percentage = +data;
                    });
                }
            }
        );
    }

}



