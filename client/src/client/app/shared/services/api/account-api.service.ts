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
        var endpoint = Config.CLOUD_ENDPOINT + '/login';
        var params = {username: username, password: password, code: cloud_code} 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            });
    }

    resetPass(email:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.CLOUD_ENDPOINT + '/reset_pass';
        var params = {email: email} 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            });
    }

    upload(file: any, cloudid: number):Observable<any>{
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT +'/cloud/file', formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }

    unzip(filename: any, cloudid: number):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT + '/cloud/unzip', JSON.stringify({cloudid: cloudid, filename:filename }), options)
            .map((response: Response) => response.json());
    }

    convert2Pdf(filename: any, cloudid: number):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT + '/cloud/convert2pdf', JSON.stringify({cloudid: cloudid, filename:filename }), options)
            .map((response: Response) => response.json());
    }
}