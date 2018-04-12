import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/elearning/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service';
import { CacheService } from './cache.service'

@Injectable()
export class AuthService {

    constructor(private apiService: APIService, private cacheService: CacheService) {
    }


    login(info: Credential): Observable<User> {
        var cloud_acc = this.cacheService.CloudAcc;
        return this.apiService.login(info.username, info.password, cloud_acc.id, cloud_acc.api_endpoint).map(user => {
            return MapUtils.deserialize(User, user);
        });
    }

    resetPass(email: string): Observable<any> {
        var cloud_acc = this.cacheService.CloudAcc;
        return this.apiService.resetPass(email, cloud_acc.id, cloud_acc.api_endpoint);
    }

    changePass(old_pass: string, new_pass: string): Observable<any> {
        var cloud_acc = this.cacheService.CloudAcc;
        var user = this.cacheService.UserProfile;
        return this.apiService.changePass(user.id, old_pass, new_pass, cloud_acc.id, cloud_acc.api_endpoint);
    }

    logout() {
        this.cacheService.clearCloudAccount();
        this.cacheService.clearUserProfile();
        if (!this.cacheService.Remember)
            this.cacheService.clearStoredCredential();
    }



}
