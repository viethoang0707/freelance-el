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
        var params = {username: username, password: password, cloud_code: cloud_code} 
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

    resetPasswordRequest(email:string, cloud_code:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.CLOUD_ENDPOINT + '/account/resetpass/request';
        var params = {email: email,  cloud_code: cloud_code} 
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

    resetPasswordExecute(token:string, new_pass:string, cloud_code:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.CLOUD_ENDPOINT + '/account/resetpass/execute';
        var params = {new_pass: new_pass, token: token,  cloud_code: cloud_code} 
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