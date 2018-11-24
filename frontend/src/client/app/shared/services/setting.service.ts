import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable, Subject, Observer } from 'rxjs/Rx';
import { DEFAULT_LANG } from '../models/constants';

@Injectable()
export class SettingService {

  private viewMode: string;

  constructor(private authService: AuthService) {
  }

  private viewModeEventReceiver: Subject<string> = new Subject();
  viewModeEvents: Observable<string> = this.viewModeEventReceiver.asObservable();


  get ViewMode() {
    if (this.viewMode) {
      if (this.authService.UserProfile && this.authService.UserProfile.IsAdmin)
        return this.viewMode;
      else
        return 'lms';
    }
    if (this.authService.UserProfile)
      return this.authService.UserProfile.IsAdmin ? 'admin' : 'lms';
    return null;
  }

  set ViewMode(data: string) {
    if (data != this.viewMode) {
      this.viewMode = data;
      this.viewModeEventReceiver.next(data);
    }
  }

  set Lang(lang: string) {
    localStorage.setItem('language', lang);
  }

  get Lang(): string {
    if (localStorage.getItem('language'))
      return localStorage.getItem('language');
    else
      return DEFAULT_LANG;
  }

}