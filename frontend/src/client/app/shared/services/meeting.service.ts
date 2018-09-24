import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { WindowRef } from '../helpers/windonw.ref';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class MeetingService {

	private nativeWindow: any;

	constructor(private winRef: WindowRef, private authService: AuthService, private apiService: APIService) {
		this.nativeWindow =  this.winRef.getNativeWindow();
	}

	join(room_ref: string, member_ref: string) {
		this.apiService.ssoLogin(this.authService.LoginToken, Config.CONFERENCE_CLOUDID).subscribe(resp=> {
			var ssoToken = resp["token"];
			this.nativeWindow.open(`${Config.CONFERENCE_ENDPOINT}?room=${room_ref}&member=${member_ref}&sso_token=${ssoToken.code}`);
		});
	}


}
