import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
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
import { QuestionContainerDirective } from '../../../assessment/question/question-template/question-container.directive';
import { IQuestion } from '../../../assessment/question/question-template/question.interface';
import { QuestionRegister } from '../../../assessment/question/question-template/question.decorator';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { WebcamImage } from 'ngx-webcam';

@Component({
    moduleId: module.id,
    selector: 'exam-submission-dialog',
    templateUrl: 'exam-submission.dialog.component.html',
    styleUrls: ['exam-submission.dialog.component.css'],
})
export class ExamSubmissionDialog extends BaseComponent {

    private display: boolean;
    private exam: Exam;
    private submission: Submission;
    private trigger: Subject<void> = new Subject<void>();
    private setting: ExamSetting;

    private onConfirmReceiver: Subject<any> = new Subject();
    onConfirm: Observable<any> = this.onConfirmReceiver.asObservable();

    @ViewChild('printSection') printSection;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.display = false;
        this.exam = new Exam();
        this.submission = new Submission();
        this.setting = new ExamSetting();
    }

    show(exam: Exam, submission: Submission) {
        this.display = true;
        this.exam = exam;
        this.submission = submission;
        ExamSetting.all(this).subscribe(settings => {
            if (settings.length)
                this.setting = settings[0];
        });
    }

    hide() {
        this.display = false;
    }

    confirm() {
        if (this.setting.take_picture_on_submit)
            this.trigger.next();
        else {
            this.onConfirmReceiver.next();
            this.hide();
        }
    }

   handleImage(webcamImage: WebcamImage): void {
    console.info(this.translateService.instant('received webcam image'), webcamImage);
    this.submission.picture = webcamImage.imageAsBase64;
    this.onConfirmReceiver.next();
    this.hide();
  }

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }
}



