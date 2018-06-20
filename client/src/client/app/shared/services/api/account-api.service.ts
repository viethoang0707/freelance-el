import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { AppEventManager } from '../app-event-manager.service';

@Injectable()
export class AccountAPIService {
    constructor(private http: Http, private appEvent: AppEventManager) { }

    login(username:string, password: string, cloud_code:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.CLOUD_ENDPOINT + '/account/login';
        var params = {username: username, password: password, code: cloud_code} 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                return Observable.throw(e);
            } );
    }

    resetPass(email:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.CLOUD_ENDPOINT + '/account/reset_pass';
        var params = {email: email} 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                return Observable.throw(e);
            } );
    }

}