import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { AppEventManager } from './app-event-manager.service';
import { Token } from '../models/cloud/token.model';
import { BaseAPI } from './api/base.api';

@Injectable()
export class APIService {
    private apiEndpoint: string;
    private cloudId: string = "<%= CLOUD_ID %>";
    constructor(private http: Http, private appEvent: AppEventManager) { }


    init(): Observable<any> {
        if (this.apiEndpoint)
            return Observable.of(this.apiEndpoint);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
        let options = new RequestOptions({ headers: headers });
        var endpoint = Config.AUTHEN_SERVER_URL + '/account/cloud';
        var params = {};
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => {
                var resp = response.json();
                this.apiEndpoint = resp["api_endpoint"];
                return this.apiEndpoint;
            })
            .catch((e) => {
                console.log(e);
                return Observable.throw(e.json());
            });
    }

    register(user: any): Observable<any> {
        return this.init().flatMap(() => {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
            let options = new RequestOptions({ headers: headers });
            var endpoint = this.apiEndpoint + '/account/register';
            var params = { user: user }
            this.appEvent.startHttpTransaction();
            return this.http.post(endpoint, JSON.stringify(params), options)
                .map((response: Response) => response.json()).do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch((e) => {
                    console.log(e);
                    this.appEvent.finishHttpTransaction();
                    return Observable.throw(e.json());
                });
        });
    }


    login(username: string, password: string): Observable<any> {
        return this.init().flatMap(() => {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
            let options = new RequestOptions({ headers: headers });
            var endpoint = this.apiEndpoint + '/account/login';
            var params = { username: username, password: password }
            this.appEvent.startHttpTransaction();
            return this.http.post(endpoint, JSON.stringify(params), options)
                .map((response: Response) => response.json()).do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch((e) => {
                    console.log(e);
                    this.appEvent.finishHttpTransaction();
                    return Observable.throw(e.json());
                });
        });
    }

    logout(token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `${token.cloud_code} ${token.code}` });
            let options = new RequestOptions({ headers: headers });
            var endpoint = this.apiEndpoint + '/account/logout';
            var params = {};
            this.appEvent.startHttpTransaction();
            return this.http.post(endpoint, JSON.stringify(params), options)
                .do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch((e) => {
                    console.log(e);
                    this.appEvent.finishHttpTransaction();
                    return Observable.of(null);
                });
        });
    }

    upload_S3(file: any, token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
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
                xhr.open('POST', this.apiEndpoint + '/file/upload_s3', true);
                xhr.setRequestHeader('Authorization', `${token.cloud_code} ${token.code}`)
                xhr.send(formData);
            });
        });
    }

    upload(file: any, token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
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
                xhr.open('POST', this.apiEndpoint + '/file/upload', true);
                if (token)
                    xhr.setRequestHeader('Authorization', `${token.cloud_code} ${token.code}`)
                else
                    xhr.setRequestHeader('Authorization', `${this.cloudId}`);
                xhr.send(formData);
            });
        });
    }

    unzip(filename: any, token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let headers = token ? new Headers({ 'Content-Type': 'application/json', 'Authorization': `${token.cloud_code} ${token.code}` })
                : new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
            let options = new RequestOptions({ headers: headers });
            this.appEvent.startHttpTransaction();
            var params = { filename: filename };
            return this.http.post(this.apiEndpoint + '/file/unzip', JSON.stringify({ filename: filename }), options)
                .map(res => res.json())
                .do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch(error => {
                    this.appEvent.finishHttpTransaction();
                    return Observable.throw(error)
                }
                );
        });
    }

    convert2Pdf(filename: any, token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let headers = token ? new Headers({ 'Content-Type': 'application/json', 'Authorization': `${token.cloud_code} ${token.code}` })
                : new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` }); let options = new RequestOptions({ headers: headers });
            this.appEvent.startHttpTransaction();
            var params = { filename: filename };
            return this.http.post(this.apiEndpoint + '/file/convert2pdf', JSON.stringify({ filename: filename }), options)
                .map(res => res.json())
                .do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch(error => {
                    this.appEvent.finishHttpTransaction();
                    return Observable.throw(error)
                }
                );
        });
    }

    ssoLogin(token: Token, cloudid: string): Observable<any> {
        return this.init().flatMap(() => {
            let headers = token ? new Headers({ 'Content-Type': 'application/json', 'Authorization': `${token.cloud_code} ${token.code}` })
                : new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
            let options = new RequestOptions({ headers: headers });
            var endpoint = this.apiEndpoint + '/account/sso_login';
            var params = { cloudid: cloudid }
            this.appEvent.startHttpTransaction();
            return this.http.post(endpoint, JSON.stringify(params), options)
                .map((response: Response) => response.json()).do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch((e) => {
                    console.log(e);
                    this.appEvent.finishHttpTransaction();
                    return Observable.throw(e.json());
                });
        });
    }

    execute(api: BaseAPI, token: Token): Observable<any> {
        return this.init().flatMap(() => {
            let headers = token ? new Headers({ 'Content-Type': 'application/json', 'Authorization': `${token.cloud_code} ${token.code}` })
                : new Headers({ 'Content-Type': 'application/json', 'Authorization': `${this.cloudId}` });
            let options = new RequestOptions({ headers: headers });
            var params = api.params;
            var endpoint = this.apiEndpoint + api.Method;
            this.appEvent.startHttpTransaction();
            return this.http.post(endpoint, JSON.stringify(params), options)
                .map((response: Response) => response.json()).do(() => {
                    this.appEvent.finishHttpTransaction();
                })
                .catch((e) => {
                    console.log(e);
                    this.appEvent.finishHttpTransaction();
                    if (e["status"] == 400)
                        this.appEvent.accessDenied();
                    if (e["status"] == 401)
                        this.appEvent.tokenExpired();
                    return Observable.throw(e.json());
                });
        });
    }

}