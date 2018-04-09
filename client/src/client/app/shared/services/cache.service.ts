import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from './auth.service'
import { APIService } from './api.service'

@Injectable()
export class CacheService {

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

    set Lang(lang: string) {
        localStorage.setItem('language', lang);
    }

   get Lang():string {
       return  localStorage.getItem('language');
   }

}
