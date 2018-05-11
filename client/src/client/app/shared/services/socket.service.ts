import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Config } from '../../env.config';
import * as io from 'socket.io-client';

Injectable()
export class WebSocketService {
	private socket;
	
	
	private onNotifyReceiver: Subject<any> = new Subject();
	onNotify: Observable<any> = this.onNotifyReceiver.asObservable();
	

	constructor() {
		this.socket = io(Config.SOCKET_ENDPOINT + '/notification');

		this.socket.on('notify', (data) => {
			console.log('notify', data);
			this.onNotifyReceiver.next(data);
		});
		
	}

	sendMessage(event, message) {
		this.socket.emit(event, JSON.stringify({ data: message }));
	}

	close() {
		this.leave();
		this.socket.disconnect();
	}

	join(user: string, cloudid: number) {
		var message = {
			user: user,
			cloudid: cloudid
		}
		this.sendMessage('join', message);
	}

	leave() {
		this.sendMessage('leave', {});
	}

	notify(title: string,user: string, cloudid: number) {
		var message = {
			title: title,
			user: user,
			cloudid: cloudid
		}
		this.sendMessage('notify', message);
	}

	

}