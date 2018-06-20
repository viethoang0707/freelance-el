import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { AppEventManager } from '../app-event-manager.service';

@Injectable()
export class FileAPIService {
    constructor(private http: Http, private appEvent: AppEventManager) { }

    
    upload(file: any, cloudid: number):Observable<any>{
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT +'/file/upload', formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }

    unzip(filename: any, cloudid: number):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT + '/file/unzip', JSON.stringify({cloudid: cloudid, filename:filename }), options)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }

    convert2Pdf(filename: any, cloudid: number):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT + '/file/convert2pdf', JSON.stringify({cloudid: cloudid, filename:filename }), options)
            .map((response: Response) => response.json())
            .catch(error => Observable.throw(error));
    }
}