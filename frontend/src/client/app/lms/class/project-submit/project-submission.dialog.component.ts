import { Component, OnInit, Input, ViewChild, ViewChildren, NgZone, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Token } from '../../../shared/models/cloud/token.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { Project } from '../../../shared/models/elearning/project.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/timer';
import * as _ from 'underscore';
import { WebcamImage } from 'ngx-webcam';

@Component({
    moduleId: module.id,
    selector: 'project-submission-dialog',
    templateUrl: 'project-submission.dialog.component.html',
    styleUrls: ['project-submission.dialog.component.css'],
})
export class ProjectSubmissionDialog extends BaseComponent {

    private display: boolean;
    private submit: ProjectSubmission;
    private percentage: number;
    private onConfirmReceiver: Subject<any> = new Subject();
    onConfirm: Observable<any> = this.onConfirmReceiver.asObservable();


    constructor(private ngZone: NgZone) {
        super();
        this.display = false;
        this.submit = new ProjectSubmission();
    }

    show(project: Project, member: CourseMember) {
        this.display = true;
        this.submit = new ProjectSubmission();
        this.submit.member_id = member.id;
        this.submit.project_id = project.id;
    }

    hide() {
        this.display = false;
    }

    confirm() {
        if (!this.submit.file_url)
            this.error('You have not submiited any attachment');
        else {
            this.submit.date_submit = new Date();
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
        this.fileApiService.upload(file, this.authService.LoginToken).subscribe(
            data => {
                if (data["result"]) {
                    this.ngZone.run(() => {
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
