import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { CacheService } from './cache.service'
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LangService {

    constructor(private translationService: TranslateService, private cacheService:CacheService) {
    }

    initSetting() {
        this.translationService.setDefaultLang('vn');
        var defaultLang = this.cacheService.Lang?this.cacheService.Lang:'vn';
        this.translationService.use(defaultLang);
    }

     set Lang(lang: string) {
        localStorage.setItem('language', lang);
         this.translationService.use(lang);
    }

   get Lang():string {
       return  localStorage.getItem('language');
   }
}
