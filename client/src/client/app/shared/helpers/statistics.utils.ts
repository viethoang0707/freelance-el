import { Observable, Subject } from 'rxjs/Rx'
import { DatePipe } from "@angular/common";
import { Group } from '../models/elearning/group.model';
import { CourseLog, ExamLog, UserLog } from '../models/elearning/log.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT } from '../models/constants';
import { Injectable } from '@angular/core';
import { APIContext } from '../models/context';
import { QuestionOption } from '../models/elearning/option.model';
import { Answer } from '../models/elearning/answer.model';
import { SurveyAnswer } from '../models/elearning/survey-answer.model';

export class StatsUtils {

	constructor() {
	}

	courseStatisticByDate(context: APIContext, startDate: Date, endDate: Date): Observable<any> {
		var cloud_acc = context.authService.CloudAcc;
		var startDateStr = moment(startDate).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(endDate).format(SERVER_DATETIME_FORMAT);
		return CourseLog.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('res_model','=','etraining.course')]").map(logs => {
			var dayLengthMills = 1000 * 60 * 60 * 24;
			var slots = [];
			var starTimeMillis = startDate.getTime();
			var endTimeMills = endDate.getTime();
			for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills; i++)
				slots.push(0);
			_.each(logs, (log: CourseLog) => {
				var start = new Date(log.start);
				var index = Math.floor((start.getTime() - starTimeMillis) / dayLengthMills);
				slots[index]++;
			});
			return slots;
		});
	}

	examAnswerStatistics(answers: any[]): any {
		var multichoiceAnswer = _.filter(answers, ans => {
			return ans["question_type"] == 'sc' || ans["question_type"] == 'mc';
		});
		var ratingAnswer = _.filter(answers, ans => {
			return ans["question_type"] == 'rate';
		});
		var openAnswer = _.filter(answers, ans=> {
			return ans["question_type"] == 'ext';
		});
		return {
			'multichoice': this.multichoiceAnswerStatistics(answers),
			'rating': this.ratingAnswerStatistics(answers),
			'open': this.openAnswerStatistics(answers)
		}
	}

	surveyAnswerStatistics(answers: any[]): any {
		var multichoiceAnswer = _.filter(answers, ans => {
			return ans["question_type"] == 'sc' || ans["question_type"] == 'mc';
		});
		var ratingAnswer = _.filter(answers, ans => {
			return ans["question_type"] == 'rate';
		});
		var openAnswer = _.filter(answers, ans => {
			return ans["question_type"] == 'ext';
		});
		return {
			'multichoice': this.multichoiceAnswerStatistics(answers),
			'rating': this.ratingAnswerStatistics(answers),
			'open': this.openAnswerStatistics(answers)
		}
	}

	openAnswerStatistics(answers: any[]): any {
		var questionAttempts = {};
		_.each(answers, ans => {
			if (!questionAttempts[ans["question_id"]])
				questionAttempts[ans["question_id"]] = [];
			questionAttempts[ans["question_id"]].push(ans.text);
		});
	}

	ratingAnswerStatistics(answers: any[]): any {
		var ratingPercentage = {};
		var questionAttempts = {};
		_.each(answers, ans => {
			if (!questionAttempts[ans["question_id"]])
				questionAttempts[ans["question_id"]] = 1;
			else
				questionAttempts[ans["question_id"]]++;
			if (!ratingPercentage[ans["question_id"]])
				ratingPercentage[ans["question_id"]] = 0;
			if (ans.text)
				ratingPercentage[ans["question_id"]] += +ans.text;
		});
		return _.map(ratingPercentage, (rate, id) => {
			return ratingPercentage[id] / questionAttempts[id];
		});
	}

	multichoiceAnswerStatistics(answers: any[]): any {
		var option2Question = {};
		var optionIds = [];
		var optionAttempts = {};
		var questionAttempts = {};
		_.each(answers, (ans: Answer) => {
			var selectedOptionIds = [];
			if (ans.option_id)
				selectedOptionIds.push(ans.option_id);
			else if (ans.json)
				selectedOptionIds = JSON.parse(ans.json);
			optionIds = optionIds.concat(selectedOptionIds);
			_.each(selectedOptionIds, id => {
				option2Question[id] = ans["question_id"];
				if (!optionAttempts[id])
					optionAttempts[id] = 1;
				else
					optionAttempts[id]++;
			});
			if (!questionAttempts[ans["question_id"]])
				questionAttempts[ans["question_id"]] = 1;
			else
				questionAttempts[ans["question_id"]]++;
		});
		optionIds = _.uniq(optionIds);
		var optionPercentage = {};
		_.each(optionIds, optionId => {
			var questionId = option2Question[optionId];
			var questionAttempt = questionAttempts[questionId];
			var optionAttempt = optionAttempts[optionId];
			if (questionAttempt)
				optionPercentage[optionId] = optionAttempt * 100 / questionAttempt;
			else
				optionPercentage[optionId] = 0;

		});
		return optionPercentage;
	}

	userLoginStatisticByDate(context: APIContext, startDate: Date, endDate: Date): Observable<any> {
		var cloud_acc = context.authService.CloudAcc;
		var startDateStr = moment(startDate).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(endDate).format(SERVER_DATETIME_FORMAT);
		return UserLog.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('res_model','=','res.users'),('code','=','LOGIN')]").map(logs => {
			var dayLengthMills = 1000 * 60 * 60 * 24;
			var slots = [];
			var starTimeMillis = startDate.getTime();
			var endTimeMills = endDate.getTime();
			for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills; i++)
				slots.push(0);
			_.each(logs, (log: UserLog) => {
				var start = new Date(log.start);
				var index = Math.floor((start.getTime() - starTimeMillis) / dayLengthMills);
				slots[index]++;
			});
			return slots;
		});
	}

}
