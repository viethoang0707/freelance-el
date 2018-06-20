import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Token } from '../models/cloud/token.model';
import { MapUtils } from '../helpers/map.utils';
import { SettingService } from '../../shared/services/setting.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AppEventManager {

    private onStartHTTPReceiver: Subject<any> = new Subject();
    private onFinishHTTPReceiver: Subject<any> = new Subject();
    private onLoginReceiver: Subject<any> = new Subject();
    private onLogoutReceiver: Subject<any> = new Subject();
    private onTokenExpiredReceiver: Subject<any> = new Subject();
    onStartHTTP: Observable<any> = this.onStartHTTPReceiver.asObservable();
    onFinishHTTP: Observable<any> = this.onFinishHTTPReceiver.asObservable();
    onLogin: Observable<any> = this.onLoginReceiver.asObservable();
    onLogout: Observable<any> = this.onLogoutReceiver.asObservable();
    onTokenExpired: Observable<any> = this.onTokenExpiredReceiver.asObservable();

    constructor() {
    }

    startHttpTransaction() {
        this.onStartHTTPReceiver.next();
    }

    finishHttpTransaction() {
        this.onFinishHTTPReceiver.next();
    }

    userLogin() {
        this.onLoginReceiver.next();
    }

    userLogout() {
        this.onLogoutReceiver.next();
    }

    tokenExpired() {
        this.onTokenExpiredReceiver.next();
    }

}
