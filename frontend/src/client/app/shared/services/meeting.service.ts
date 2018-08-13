import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { WindowRef } from '../helpers/windonw.ref';
import { AuthService } from '../services/auth.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class MeetingService {

	private nativeWindow: any;
	private cloud_code: string;

	constructor(private winRef: WindowRef, private authService: AuthService) {
		this.cloud_code =  this.authService.LoginToken.cloud_code;
	}

	join(room_ref: string, member_ref: string) {
		this.nativeWindow.open(`${Config.CONFERENCE_ENDPOINT}?room=${room_ref}&member=${member_ref}&cloudid=${this.cloud_code}`);
	}


}
