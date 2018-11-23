import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Permission } from '../models/elearning/permission.model';
import { Token } from '../models/cloud/token.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service';
import { ExecuteAPI } from '../../shared/services/api/execute.api';


declare function escape(s: string): string;
declare function unescape(s: string): string;

@Injectable()
export class AuthService {

    private APP_ID = '<%= APP_ID %>';

    constructor(private apiService: APIService) {
    }

    get StoredCredential(): Credential {
        if (localStorage.getItem(this.APP_ID+':'+'credential'))
            return MapUtils.deserialize(Credential, JSON.parse(atob(localStorage.getItem(this.APP_ID+':'+'credential'))));
        return new Credential();
    }

    set StoredCredential(credential: Credential) {
        localStorage.setItem(this.APP_ID+':'+'credential', btoa(JSON.stringify(credential)));
    }

    clearStoredCredential() {
        localStorage.removeItem(this.APP_ID+':'+'credential');
    }

    get UserProfile(): User {
        if (localStorage.getItem(this.APP_ID+':'+'currentUser'))
            return MapUtils.deserialize(User, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem(this.APP_ID+':'+'currentUser'))))));
        return new User();
    }

    set UserProfile(user: User) {
        localStorage.setItem(this.APP_ID+':'+'currentUser', btoa(unescape(encodeURIComponent(JSON.stringify(MapUtils.serialize(user))))));
    }

    clearUserProfile() {
        localStorage.removeItem(this.APP_ID+':'+'currentUser');
    }

    get UserPermission(): Permission {
        if (localStorage.getItem(this.APP_ID+':'+'userPerm'))
            return MapUtils.deserialize(Permission, JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem(this.APP_ID+':'+'userPerm'))))));
        return null;
    }

    set UserPermission(perm: Permission) {
        localStorage.setItem(this.APP_ID+':'+'userPerm', btoa(unescape(encodeURIComponent(JSON.stringify(MapUtils.serialize(perm))))));
    }

    clearUserPermission() {
        localStorage.removeItem(this.APP_ID+':'+'userPerm');
    }

    set LoginToken(token: Token) {
        localStorage.setItem(this.APP_ID+':'+'token', btoa(unescape(encodeURIComponent(JSON.stringify(token)))));
    }

    get LoginToken(): Token {
        if (localStorage.getItem(this.APP_ID+':'+'token'))
            return MapUtils.deserialize(Token,
                JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem(this.APP_ID+':'+'token'))))));
        return null;
    }

    clearToken() {
        localStorage.removeItem(this.APP_ID+':'+'token');
    }


    get Remember(): boolean {
        if (localStorage.getItem(this.APP_ID+':'+'remember'))
            return localStorage.getItem(this.APP_ID+':'+'remember') == 'true';
        else
            return false;
    }

    set Remember(val: boolean) {
        localStorage.setItem(this.APP_ID+':'+'remember', val.toString());
    }

    login(info: Credential): Observable<any> {
        return this.apiService.login(info.username, info.password).map(resp => {
            this.UserProfile = MapUtils.deserialize(User, resp["user"]);
            this.LoginToken = MapUtils.deserialize(Token, resp["token"]);
            return { user: this.UserProfile, token: this.LoginToken };
        });
    }

    requestResetPassword(login:string): Observable<any> {
        var executeApi = new ExecuteAPI('etraining.account_service', 'request_reset_password',{login:login}, null);
        return this.apiService.execute(executeApi, null);
    }

    applyResetPassword(token:string, pass:string): Observable<any> {
        var executeApi = new ExecuteAPI('etraining.account_service', 'apply_reset_password',{token:token, new_pass:pass}, null);
        return this.apiService.execute(executeApi, null);
    }

    logout() {
        this.apiService.logout(this.LoginToken);
        this.clearUserProfile();
        this.clearToken();
        this.clearUserPermission();
        if (!this.Remember)
            this.clearStoredCredential();
    }



}
