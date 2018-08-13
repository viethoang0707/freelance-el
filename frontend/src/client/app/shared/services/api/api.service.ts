import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { AppEventManager } from '../app-event-manager.service';
import { Token } from '../../models/cloud/token.model';

@Injectable()
export class APIService {
    private buildMode: string = "<%= BUILD_TYPE %>";
    private cloudId: string = "<%= CLOUD_ID %>";
    constructor(private http: Http, private appEvent: AppEventManager) { }

    login(username:string, password: string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.AUTHEN_SERVER_URL + '/account/login';
        var params = {username: username, password: password} 
        if (this.buildMode != 'prod')
            params["cloud_code"] = this.cloudId;
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                this.appEvent.finishHttpTransaction();
                return Observable.throw(e.json());
            } );
    }

    resetPasswordRequest(email:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.AUTHEN_SERVER_URL + '/account/resetpass/request';
        var params = {email: email}
        if (this.buildMode != 'prod')
            params["cloud_code"] = this.cloudId; 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                this.appEvent.finishHttpTransaction();
                return Observable.throw(e.json());
            } );
    }

    resetPasswordExecute(token:string, new_pass:string):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.AUTHEN_SERVER_URL + '/account/resetpass/execute';
        var params = {new_pass: new_pass, token: token}
        if (this.buildMode != 'prod')
            params["cloud_code"] = this.cloudId; 
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.appEvent.finishHttpTransaction();
            })
            .catch( (e) => {
                console.log(e);
                this.appEvent.finishHttpTransaction();
                return Observable.throw(e.json());
            } );
    }

    upload(file: any, token: Token): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        formData.append('token', token.code);
        this.appEvent.startHttpTransaction();

        return Observable.create(observer => {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                    this.appEvent.finishHttpTransaction();
                }
            };

            xhr.upload.onprogress = (event) => {
                console.log(event);
                var progress = Math.round(event.loaded / event.total * 100);
                observer.next(progress);
            };

            xhr.open('POST',Config.AUTHEN_SERVER_URL + '/file/upload', true);
            xhr.send(formData);
        });
    }

    unzip(filename: any, token: Token): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        var params = { filename: filename };
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        params['token'] = token.code;
        return this.http.post(Config.AUTHEN_SERVER_URL + '/file/unzip', JSON.stringify({ token: token.code, filename: filename }), options)
            .map(res => res.json())
            .do(() => {
                this.appEvent.finishHttpTransaction();
            })
            .catch(error => {
                this.appEvent.finishHttpTransaction();
                return Observable.throw(error)
            }
            );
    }

    convert2Pdf(filename: any, token: Token): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        var params = { filename: filename };
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        params['token'] = token.code;
        return this.http.post(Config.AUTHEN_SERVER_URL + '/file/convert2pdf', JSON.stringify({ token: token.code, filename: filename }), options)
            .map(res => res.json())
            .do(() => {
                this.appEvent.finishHttpTransaction();
            })
            .catch(error => {
                this.appEvent.finishHttpTransaction();
                return Observable.throw(error)
            }
            );
    }

    execute(api: BaseAPI, token: Token): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var params = api.params;
        if (!token || !token.IsValid) {
            this.appEvent.tokenExpired();
            return Observable.throw('Token expired')
        }
        params["token"] = token.code;
        params["cloud_code"] = this.cloudId;
        var endpoint = Config.AUTHEN_SERVER_URL + api.Method;
        this.appEvent.startHttpTransaction();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(() => {
                this.appEvent.finishHttpTransaction();
            })
            .catch((e) => {
                console.log(e);
                this.appEvent.finishHttpTransaction();
                if (e["status"] == 401)
                    this.appEvent.accessDenied();
                return Observable.throw(e.json());
            });
    }

}