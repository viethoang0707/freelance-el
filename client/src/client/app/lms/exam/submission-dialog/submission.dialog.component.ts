import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable,Subject } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { CloudAccount } from '../../../shared/models/cloud/cloud-account.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import {WebcamImage} from 'ngx-webcam';

@Component({
    moduleId: module.id,
    selector: 'submission-dialog',
    templateUrl: 'submission.dialog.component.html',
    styleUrls: ['submission.dialog.component.css'],
})
export class SubmissionDialog extends BaseComponent {
    display: boolean;
    exam: Exam;
    submission: Submission;
      trigger: Subject<void> = new Subject<void>();

  

    private onConfirmReceiver: Subject<any> = new Subject();
    onConfirm: Observable<any> = this.onConfirmReceiver.asObservable();

     @ViewChild('printSection') printSection;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.exam = new Exam();
    }

    show(exam: Exam, submission: Submission) {
        this.display = true;
        this.exam = exam;
        this.submission = submission;
    }

    hide() {
        this.display = false;
    }

    confirm(){
        if (this.exam.take_picutre_on_submit)
            this.trigger.next();
        else {
            this.onConfirmReceiver.next();
            this.hide();
        }
    }

   handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.submission.picture = webcamImage.imageAsDataUrl();
    this.onConfirmReceiver.next();
    this.hide();
  }

   get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}



