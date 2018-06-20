import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from './api.service';
import { ExecuteAPI } from '../services/api/execute.api';

@Injectable()
export class NotificationService {
    constructor(private apiService: APIService) { }


    broadcast(subject: string, body:string, recipients:string[], cloudid: number) : Observable<any> {
        var params = {subject: subject, body: body, recipients: recipients};
        var executeApi = new ExecuteAPI('etraining.notification_service','sendAnnoucement', params, null)
        return this.apiService.execute(executeApi,cloudid);
    }

    notifyCourseRegistration(courseId: number recipients:string[], cloudid: number) : Observable<any> {
        var params = {courseId: courseId};
        return this.apiService.execute('sendCourseRegistrationNotification',recipients, params);
    }

    notifyExamRegistration(examId: number recipients:string[], cloudid: number) : Observable<any> {
        var params = {examId: examId};
        return this.apiService.execute('sendExamRegistrationNotification',recipients, params);
    }    

}
