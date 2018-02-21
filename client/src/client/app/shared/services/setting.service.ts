import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject, Observer } from 'rxjs/Rx';

@Injectable()
export class SettingService {
  adminMode: boolean;
  private adminModeEventReceiver: Subject<boolean> = new Subject();
  adminModeEvents:Observable<boolean> =  this.adminModeEventReceiver.asObservable();

  setAdminMode(data:boolean) {
    this.adminMode = data;
    this.adminModeEventReceiver.next(this.adminMode);
  }
}