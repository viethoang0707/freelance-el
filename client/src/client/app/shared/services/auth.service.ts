import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Permission } from '../models/elearning/permission.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service';
import { Cache } from '../helpers/cache.utils';
import { LoginAPI } from './api/login.api';
import { ChangePassAPI } from './api/change-pass.api';
import { ResetPassAPI } from './api/reset-pass.api';

declare function escape(s:string): string;
declare function unescape(s:string): string;

@Injectable()
export class AuthService {

    constructor(private apiService: APIService) {
    }

   get StoredCredential(): Credential {
        if (localStorage.getItem('credential'))
            return MapUtils.deserialize(Credential, JSON.parse(atob(localStorage.getItem('credential'))));
        return null;
    }

    set StoredCredential(credential: Credential) {
        localStorage.setItem('credential', btoa(JSON.stringify(credential)));
    }

    clearStoredCredential() {
        localStorage.removeItem('credential');
    }

    get UserProfile(): User {
        if (localStorage.getItem('currentUser'))
            return MapUtils.deserialize(User, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('currentUser'))))));
        return null;
    }

    set UserProfile(user: User) {
        localStorage.setItem('currentUser', btoa(unescape(encodeURIComponent(JSON.stringify(user)))));
    }

    clearUserProfile() {
        localStorage.removeItem('currentUser');
    }

    get UserPermission(): Permission {
        if (localStorage.getItem('userPerm'))
            return MapUtils.deserialize(Permission, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('userPerm'))))));
        return null;
    }

    set UserPermission(perm: Permission) {
        localStorage.setItem('userPerm', btoa(unescape(encodeURIComponent(JSON.stringify(perm)))));
    }

    clearUserPermission() {
        localStorage.removeItem('userPerm');
    }

    set CloudAcc(acc: CloudAccount) {
        localStorage.setItem('cloudAccount', btoa(unescape(encodeURIComponent(JSON.stringify(acc)))));
    }

    get CloudAcc():CloudAccount {
         if (localStorage.getItem('cloudAccount'))
            return MapUtils.deserialize(CloudAccount, 
                JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('cloudAccount'))))));
        return null;
    }

    clearCloudAccount() {
        localStorage.removeItem('cloudAccount');
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

    login(info: Credential): Observable<User> {
        var cloud_acc = this.CloudAcc;
        var api = new LoginAPI(info.username, info.password);
        return this.apiService.execute(api,  cloud_acc.id, cloud_acc.api_endpoint).map(user => {
           this.UserProfile = MapUtils.deserialize(User, user);
            return this.UserProfile;
        });
    }

    resetPass(email: string): Observable<any> {
        var cloud_acc = this.CloudAcc;
        var api = new ResetPassAPI(email);
        return this.apiService.execute(api, cloud_acc.id,cloud_acc.api_endpoint);
    }

    changePass(old_pass: string, new_pass: string): Observable<any> {
        var cloud_acc = this.CloudAcc;
        var api = new ChangePassAPI(this.UserProfile.id, old_pass, new_pass);
        return this.apiService.execute(api, cloud_acc.id, cloud_acc.api_endpoint);
    }

    logout() {
        Cache.invalidateAll();
        this.clearUserProfile();
        this.clearCloudAccount();
        this.clearUserPermission();
        if (!this.Remember)
            this.clearStoredCredential();
    }



}
