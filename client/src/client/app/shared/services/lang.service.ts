import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/user.model';
import { CloudAccount } from '../models/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { APIService } from './api.service'
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LangService {

    constructor(private translationService: TranslateService) {
    }

    initSetting() {
        this.translationService.setDefaultLang('vn');
        var defaultLang = localStorage.getItem('language')? localStorage.getItem('language'):'vn';
        this.translationService.use(defaultLang);
    }

    set Lang(lang: string) {
        localStorage.setItem('language', lang);
        this.translationService.use(lang);
    }

   get Lang():string {
       return  localStorage.getItem('language')? localStorage.getItem('language'):'vi';
   }



}
