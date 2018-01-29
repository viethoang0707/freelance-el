import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { Company } from '../models/company.model';
import { CloudAccount } from '../models/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from './auth.service'
import { APIService } from './api.service'

@Injectable()
export class CacheService {


    set UserCompany(comp: Company) {
        localStorage.setItem('userCompany', btoa(JSON.stringify(comp)));
    }

   get UserCompany():Company {
     if (localStorage.getItem('userCompany'))
            return MapUtils.deserialize(Company, JSON.parse(atob(localStorage.getItem('userCompany'))));
        else
            return new Company();
   }



}
