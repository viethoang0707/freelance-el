import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from './api/model-api.service';
import { ExecuteAPI } from '../services/api/execute.api';
import { Token } from '../models/cloud/token.model';

@Injectable()
export class NotificationService {
    constructor(private apiService: ModelAPIService) { }


    broadcast(subject: string, body:string, recipients:string[], token: Token) : Observable<any> {
        var params = {subject: subject, body: body, recipients: recipients};
        var executeApi = new ExecuteAPI('etraining.notification_service','sendAnnoucement', params, null)
        return this.apiService.execute(executeApi,token);
    }  


}
