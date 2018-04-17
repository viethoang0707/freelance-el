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

    set Lang(lang: string) {
        localStorage.setItem('language', lang);
    }

   get Lang():string {
       return  localStorage.getItem('language');
   }

}
