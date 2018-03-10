import { Observable, Subject } from 'rxjs/Rx'
import { DatePipe } from "@angular/common";
import { Group } from '../models/group.model';
import { UserLog } from '../models/log.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT} from '../models/constants';
import { Injectable } from '@angular/core';
import { APIContext } from '../models/context';

@Injectable()
export class StatsUtils {

	constructor() {
	}

	courseStatisticByDate(context: APIContext, startDate: Date, endDate: Date):Observable<any> {
		var cloud_acc = context.authService.StoredCredential.cloud_account;
		var startDateStr = moment(startDate).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(endDate).format(SERVER_DATETIME_FORMAT);
		return context.apiService.search(UserLog.Model,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('res_model','=','etraining.course')]",
		 cloud_acc.id, cloud_acc.api_endpoint).map(logs => {
		 	var dayLengthMills = 1000 * 60 * 60 * 24;
		 	var slots = [];
		 	var starTimeMillis = startDate.getTime();
		 	var endTimeMills = endDate.getTime();
		 	for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills;i++)
		 		slots.push(0);
		 	_.each(logs, (log:UserLog)=> {
		 		var start = new Date(log.start);
		 		var index = Math.floor((start.getTime() -  starTimeMillis)/ dayLengthMills);
		 		slots[index]++;
		 	});
		 	return slots;
		 });
	}



}
