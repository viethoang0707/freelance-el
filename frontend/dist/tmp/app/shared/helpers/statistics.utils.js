"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_model_1 = require("../models/elearning/log.model");
var _ = require("underscore");
var moment = require("moment");
var constants_1 = require("../models/constants");
var achievement_model_1 = require("../models/elearning/achievement.model");
var StatsUtils = (function () {
    function StatsUtils() {
    }
    StatsUtils.prototype.competencyStatistic = function (context, competency, levels) {
        return achievement_model_1.Achivement.listByCompetency(context, competency.id).map(function (skills) {
            var skillsByGroup = _.groupBy(skills, 'user_id');
            var profile = {};
            _.each(levels, function (level) {
                profile[level.id] = 0;
            });
            _.each(skillsByGroup, function (skillList) {
                var skill = _.max(skillList, function (obj) {
                    return obj.date_acquire.getTime();
                });
                profile[skill.competency_level_id] += 1;
            });
            return profile;
        });
    };
    StatsUtils.prototype.competencyStatisticByDate = function (context, competency, levels, startDate, endDate) {
        var startDateStr = moment(startDate).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(endDate).format(constants_1.SERVER_DATETIME_FORMAT);
        return achievement_model_1.Achivement.searchByDateAndCompetency(context, competency.id, startDate, endDate).map(function (skills) {
            var monthLengthMills = 1000 * 60 * 60 * 24 * 30;
            var slots = [];
            var starTimeMillis = startDate.getTime();
            var endTimeMills = endDate.getTime();
            for (var i = 0; starTimeMillis + i * monthLengthMills < endTimeMills; i++)
                slots.push(0);
            var skillsByGroup = _.groupBy(skills, 'user_id');
            _.each(skillsByGroup, function (skillList) {
                var skill = _.max(skillList, function (obj) {
                    return obj.date_acquire.getTime();
                });
                var dateAcquire = new Date(skill.date_acquire);
                var index = Math.floor((dateAcquire.getTime() - starTimeMillis) / monthLengthMills);
                var profile = slots[index];
                if (!profile) {
                    profile = {};
                    _.each(levels, function (level) {
                        profile[level.id] = 0;
                    });
                }
                profile[skill.competency_level_id] += 1;
                slots[index] = profile;
            });
            return slots;
        });
    };
    StatsUtils.prototype.courseStatisticByDate = function (context, startDate, endDate) {
        var startDateStr = moment(startDate).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(endDate).format(constants_1.SERVER_DATETIME_FORMAT);
        return log_model_1.CourseLog.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('res_model','=','etraining.course')]").map(function (logs) {
            var dayLengthMills = 1000 * 60 * 60 * 24;
            var slots = [];
            var starTimeMillis = startDate.getTime();
            var endTimeMills = endDate.getTime();
            for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills; i++)
                slots.push(0);
            _.each(logs, function (log) {
                var start = new Date(log.start);
                var index = Math.floor((start.getTime() - starTimeMillis) / dayLengthMills);
                slots[index]++;
            });
            return slots;
        });
    };
    StatsUtils.prototype.courseMemberStatisticByDate = function (context, memberId, courseId, startDate, endDate) {
        var startDateStr = moment(startDate).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(endDate).format(constants_1.SERVER_DATETIME_FORMAT);
        return log_model_1.CourseLog.search(context, [], "[('member_id','='," + memberId + "),('course_id','='," + courseId + "),('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('res_model','=','etraining.course')]").map(function (logs) {
            var dayLengthMills = 1000 * 60 * 60 * 24;
            var slots = [];
            var starTimeMillis = startDate.getTime();
            var endTimeMills = endDate.getTime();
            for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills; i++)
                slots.push(0);
            _.each(logs, function (log) {
                var start = new Date(log.start);
                var index = Math.floor((start.getTime() - starTimeMillis) / dayLengthMills);
                slots[index]++;
            });
            return slots;
        });
    };
    StatsUtils.prototype.examAnswerStatistics = function (answers) {
        var multichoiceAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'sc' || ans["question_type"] == 'mc';
        });
        var ratingAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'rate';
        });
        var openAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'ext';
        });
        return {
            'multichoice': this.multichoiceAnswerStatistics(answers),
            'rating': this.ratingAnswerStatistics(answers),
            'open': this.openAnswerStatistics(answers)
        };
    };
    StatsUtils.prototype.surveyAnswerStatistics = function (answers) {
        var multichoiceAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'sc' || ans["question_type"] == 'mc';
        });
        var ratingAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'rate';
        });
        var openAnswer = _.filter(answers, function (ans) {
            return ans["question_type"] == 'ext';
        });
        return {
            'multichoice': this.multichoiceAnswerStatistics(answers),
            'rating': this.ratingAnswerStatistics(answers),
            'open': this.openAnswerStatistics(answers)
        };
    };
    StatsUtils.prototype.openAnswerStatistics = function (answers) {
        var questionAttempts = {};
        _.each(answers, function (ans) {
            if (!questionAttempts[ans["question_id"]])
                questionAttempts[ans["question_id"]] = [];
            questionAttempts[ans["question_id"]].push(ans.text);
        });
    };
    StatsUtils.prototype.ratingAnswerStatistics = function (answers) {
        var ratingPercentage = {};
        var questionAttempts = {};
        _.each(answers, function (ans) {
            if (!questionAttempts[ans["question_id"]])
                questionAttempts[ans["question_id"]] = 1;
            else
                questionAttempts[ans["question_id"]]++;
            if (!ratingPercentage[ans["question_id"]])
                ratingPercentage[ans["question_id"]] = 0;
            else
                ratingPercentage[ans["question_id"]]++;
            if (ans.text)
                ratingPercentage[ans["question_id"]] += +ans.text;
        });
        return _.map(ratingPercentage, function (rate, id) {
            return ratingPercentage[id] / questionAttempts[id];
        });
    };
    StatsUtils.prototype.multichoiceAnswerStatistics = function (answers) {
        var option2Question = {};
        var optionIds = [];
        var optionAttempts = {};
        var questionAttempts = {};
        _.each(answers, function (ans) {
            var selectedOptionIds = [];
            if (ans.option_id)
                selectedOptionIds.push(ans.option_id);
            else if (ans.json)
                selectedOptionIds = JSON.parse(ans.json);
            optionIds = optionIds.concat(selectedOptionIds);
            _.each(selectedOptionIds, function (id) {
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
        _.each(optionIds, function (optionId) {
            var questionId = option2Question[optionId];
            var questionAttempt = questionAttempts[questionId];
            var optionAttempt = optionAttempts[optionId];
            if (questionAttempt)
                optionPercentage[optionId] = optionAttempt * 100 / questionAttempt;
            else
                optionPercentage[optionId] = 0;
        });
        return optionPercentage;
    };
    StatsUtils.prototype.userLoginStatisticByDate = function (context, startDate, endDate) {
        var startDateStr = moment(startDate).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(endDate).format(constants_1.SERVER_DATETIME_FORMAT);
        return log_model_1.UserLog.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "'),('res_model','=','res.users'),('code','=','LOGIN')]").map(function (logs) {
            var dayLengthMills = 1000 * 60 * 60 * 24;
            var slots = [];
            var starTimeMillis = startDate.getTime();
            var endTimeMills = endDate.getTime();
            for (var i = 0; starTimeMillis + i * dayLengthMills < endTimeMills; i++)
                slots.push(0);
            _.each(logs, function (log) {
                var start = new Date(log.start);
                var index = Math.floor((start.getTime() - starTimeMillis) / dayLengthMills);
                slots[index]++;
            });
            return slots;
        });
    };
    return StatsUtils;
}());
exports.StatsUtils = StatsUtils;
