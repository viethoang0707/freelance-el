import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service';
import { CacheService } from './cache.service'

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
        return this.apiService.login(info.username, info.password, cloud_acc.id,  cloud_acc.api_endpoint).map(user => {
           this.UserProfile = MapUtils.deserialize(User, user);
            return this.UserProfile;
        });
    }

    resetPass(email: string): Observable<any> {
        var cloud_acc = this.CloudAcc;
        return this.apiService.resetPass(email, cloud_acc.id, cloud_acc.api_endpoint);
    }

    changePass(old_pass: string, new_pass: string): Observable<any> {
        var cloud_acc = this.CloudAcc;
        return this.apiService.changePass(this.UserProfile.id, old_pass, new_pass, cloud_acc.id, cloud_acc.api_endpoint);
    }

    logout() {
        localStorage.removeItem('currentUser');
        if (!this.Remember)
            this.StoredCredential = new Credential();
    }



}
