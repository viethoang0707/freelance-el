import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Permission } from '../models/elearning/permission.model';
import { Token } from '../models/cloud/token.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service';


declare function escape(s: string): string;
declare function unescape(s: string): string;

@Injectable()
export class AuthService {

    constructor(private apiService: APIService) {
    }

    get StoredCredential(): Credential {
        if (localStorage.getItem('credential'))
            return MapUtils.deserialize(Credential, JSON.parse(atob(localStorage.getItem('credential'))));
        return new Credential();
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
        return new User();
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

    set LoginToken(token: Token) {
        localStorage.setItem('token', btoa(unescape(encodeURIComponent(JSON.stringify(token)))));
    }

    get LoginToken(): Token {
        if (localStorage.getItem('token'))
            return MapUtils.deserialize(Token,
                JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('token'))))));
        return null;
    }

    clearToken() {
        localStorage.removeItem('token');
    }


    get Remember(): boolean {
        if (localStorage.getItem('remember'))
            return localStorage.getItem('remember') == 'true';
        else
            return false;
    }

    set Remember(val: boolean) {
        localStorage.setItem('remember', val.toString());
    }

    login(info: Credential): Observable<any> {
        return this.apiService.login(info.username, info.password).map(resp => {
            this.UserProfile = MapUtils.deserialize(User, resp["user"]);
            this.LoginToken = MapUtils.deserialize(Token, resp["token"]);
            return { user: this.UserProfile, token: this.LoginToken };
        });
    }

    logout() {
        this.clearUserProfile();
        this.clearToken();
        this.clearUserPermission();
        if (!this.Remember)
            this.clearStoredCredential();
    }



}
