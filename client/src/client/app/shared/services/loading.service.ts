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
export class LoadingService {

    private onStartReceiver: Subject<any> = new Subject();
    private onFinishReceiver: Subject<any> = new Subject();
    onStart: Observable<any> = this.onStartReceiver.asObservable();
    onFinish: Observable<any> = this.onFinishReceiver.asObservable();

    constructor() {
    }

    start() {
        this.onStartReceiver.next();
    }

    finish() {
        this.onFinishReceiver.next();
    }

}
