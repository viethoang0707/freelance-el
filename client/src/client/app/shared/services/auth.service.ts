import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/user.model';
import { CloudAccount } from '../models/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service'
import {SettingService} from './setting.service';

@Injectable()
export class AuthService {

    constructor(private apiService: APIService, private settingService: SettingService) {
    }

    get StoredCredential(): Credential {
        if (localStorage.getItem('credential'))
            return MapUtils.deserialize(Credential, JSON.parse(atob(localStorage.getItem('credential'))));
        else
            return new Credential();
    }

    set StoredCredential(credential: Credential) {
        localStorage.setItem('credential', btoa(JSON.stringify(credential)));
    }

    get CurrentUser(): User {
        if (localStorage.getItem('currentUser'))
            return MapUtils.deserialize(User, JSON.parse(atob(localStorage.getItem('currentUser'))));
        else
            return new User();
    }

    set CurrentUser(user: User) {
        localStorage.setItem('currentUser', btoa(JSON.stringify(user)));
        if (user.is_admin || user.login =='admin')
            this.settingService.setAdminMode(true);
    }

    get Remember(): boolean {
        if (localStorage.getItem('remember'))
            return localStorage.getItem('remember')=='true';
        else
            return false;
    }

    set Remember(val: boolean) {
        localStorage.setItem('remember', val.toString());
    }

    saveCredential(info: Credential, remember: boolean) {
        this.StoredCredential =  info;
        this.Remember = remember;
    }

    login(info: Credential, code: string): Observable<User> {
        return this.apiService.cloudInfo(code).mergeMap(acc => {
            info.cloud_account = acc;
            return this.apiService.login(info.username, info.password, info.cloud_account.id, info.cloud_account.api_endpoint).map(user => {
                this.CurrentUser = MapUtils.deserialize(User, user);
                return this.CurrentUser;
            });
        });
    }

    resetPass(email: string, code: string): Observable<any> {
        return this.apiService.cloudInfo(code).flatMap(acc => {
            return this.apiService.resetPass(email, acc.id, acc.api_endpoint);
        });
    }

    changePass(old_pass: string, new_pass: string): Observable<any> {
        var cloud_acc = this.StoredCredential.cloud_account;
        return this.apiService.changePass(this.CurrentUser.id, old_pass, new_pass, cloud_acc.id, cloud_acc.api_endpoint);
    }

    logout() {
        localStorage.removeItem('currentUser');
        if (!this.Remember)
            this.StoredCredential = new Credential();
    }



}
