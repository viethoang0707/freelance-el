import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseAPI } from '../api/base.api';
import { AppEventManager } from '../app-event-manager.service';
import { Token } from '../../models/cloud/token.model';

@Injectable()
export class ModelAPIService {
    constructor(private http: Http, private appEvent: AppEventManager) { }

    execute(api: BaseAPI,token:Token):Observable<any> {
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var params = api.params;
        console.log(params);
        params["token"] = token.code;
        var endpoint = Config.API_ENDPOINT + api.Method;
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                if (e["status"]==401)
                    this.appEvent.accessDenied();
                return Observable.throw(e.json());
            } );
    }


}
