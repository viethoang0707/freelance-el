import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import { CacheService } from './cache.service';
import 'rxjs/add/operator/map';
import { Observable, Subject, Observer } from 'rxjs/Rx';

@Injectable()
export class SettingService {
  
  viewMode: string;

  constructor(private cacheService: CacheService) {

  }

  private viewModeEventReceiver: Subject<string> = new Subject();
  viewModeEvents:Observable<string> =  this.viewModeEventReceiver.asObservable();


  get ViewMode() {
  	if (this.viewMode)
  		return this.viewMode;
  	if (this.cacheService.UserProfile) 
  		return this.cacheService.UserProfile.IsAdmin ? 'admin' :'lms';
  	return null;
  }

  set ViewMode(data:string) {
  	this.viewMode = data;
    this.viewModeEventReceiver.next(data);
  }
  	
}