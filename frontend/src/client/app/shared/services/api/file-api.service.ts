import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { AppEventManager } from '../app-event-manager.service';
import { Token } from '../../models/cloud/token.model';

@Injectable()
export class FileAPIService {

    constructor(private http: Http, private appEvent: AppEventManager) { }

    upload(file: any, token:Token):Observable<any>{
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        formData.append('token', token.code);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(Config.API_ENDPOINT +'/file/upload', formData, options)
            .map(res => res.json())
            .do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch(error =>  {
                this.appEvent.finishHttpTransaction();
                return Observable.throw(error.json())}
            );
    }

    unzip(filename: any, token:Token):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        var params = {filename:filename };
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        params['token'] = token.code;
        return this.http.post(Config.API_ENDPOINT + '/file/unzip', JSON.stringify({token: token.code, filename:filename }), options)
            .map(res => res.json())
            .do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch(error =>  {
                this.appEvent.finishHttpTransaction();
                return Observable.throw(error)}
            );
    }

    convert2Pdf(filename: any, token:Token):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        var params = {filename:filename };
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        params['token'] = token.code;
        return this.http.post(Config.API_ENDPOINT + '/file/convert2pdf', JSON.stringify({token: token.code }), options)
            .map(res => res.json())
            .do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch(error =>  {
                this.appEvent.finishHttpTransaction();
                return Observable.throw(error)}
            );
    }

}