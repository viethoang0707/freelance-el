import { Observable, Subject } from 'rxjs/Rx'
import { DatePipe } from "@angular/common";
import { Group } from '../models/elearning/group.model';
import { CourseLog, ExamLog, UserLog } from '../models/elearning/log.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT} from '../models/constants';
import { Injectable } from '@angular/core';
import { APIContext } from '../models/context';
import { QuestionOption } from '../models/elearning/option.model';
import { Answer } from '../models/elearning/answer.model';

export class StatsUtils {

	constructor() {
	}

	courseStatisticByDate(context: APIContext, startDate: Date, endDate: Date):Observable<any> {
		var cloud_acc = context.authService.CloudAcc;
		var startDateStr = moment(startDate).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(endDate).format(SERVER_DATETIME_FORMAT);
		return context.apiService.search(CourseLog.Model,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('res_model','=','etraining.course')]",
		 cloud_acc.id, cloud_acc.api_endpoint).map(logs => {
		 	var dayLengthMills = 1000 * 60 * 60 * 24;
		 	var slots = [];
		 	var starTimeMillis = startDate.getTime();
		 	var endTimeMills = endDate.getTime();
		 	for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills;i++)
		 		slots.push(0);
		 	_.each(logs, (log:CourseLog)=> {
		 		var start = new Date(log.start);
		 		var index = Math.floor((start.getTime() -  starTimeMillis)/ dayLengthMills);
		 		slots[index]++;
		 	});
		 	return slots;
		 });
	}

	examAnswerStatistics(answers: Answer[]): any {
		var option2Question = {};
		var optionIds = [];
		var optionAttempts = {};
		var questionAttempts = {};
		_.each(answers, (ans:Answer)=> {
			var selectedOptionIds = [];
			if (ans.option_id) 
				selectedOptionIds.push(ans.option_id);
			else if (ans.json) 
				selectedOptionIds = JSON.parse(ans.json);
			optionIds =  optionIds.concat(selectedOptionIds);
			_.each(selectedOptionIds, id=> {
				option2Question[id] = ans.question_id;
				if (!optionAttempts[id])
					optionAttempts[id] = 1;
				else
					optionAttempts[id]++;
			});
			if (!questionAttempts[ans.question_id])
				questionAttempts[ans.question_id] = 1;
			else
				questionAttempts[ans.question_id]++;
		});
		optionIds = _.uniq(optionIds);
		var optionPercentage  = {};
		_.each(optionIds, optionId=> {
			var questionId = option2Question[optionId];
			var questionAttempt = questionAttempts[questionId];
			var optionAttempt = optionAttempts[optionId];
			if (questionAttempt) 
				optionPercentage[optionId] = optionAttempt * 100 /questionAttempt;
			else
				optionPercentage[optionId] = 0;
			
		});
		return optionPercentage;
	}

	userLoginStatisticByDate(context: APIContext, startDate: Date, endDate: Date):Observable<any> {
		var cloud_acc = context.authService.CloudAcc;
		var startDateStr = moment(startDate).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(endDate).format(SERVER_DATETIME_FORMAT);
		return context.apiService.search(UserLog.Model,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('res_model','=','res.users'),('code','=','LOGIN')]",
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
