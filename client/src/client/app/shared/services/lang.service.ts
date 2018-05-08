import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { SettingService } from '../../shared/services/setting.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class LangService {

    constructor(private translationService: TranslateService, private settingService:SettingService) {
    }

    initSetting() {
        this.translationService.setDefaultLang('vn');
        var defaultLang = this.settingService.Lang?this.settingService.Lang:'vn';
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
