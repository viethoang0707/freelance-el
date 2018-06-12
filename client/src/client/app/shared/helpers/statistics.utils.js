"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_model_1 = require("../models/elearning/log.model");
var _ = require("underscore");
var moment = require("moment");
var constants_1 = require("../models/constants");
var StatsUtils = (function () {
    function StatsUtils() {
    }
    StatsUtils.prototype.courseStatisticByDate = function (context, startDate, endDate) {
        var cloud_acc = context.authService.CloudAcc;
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
    StatsUtils.prototype.examAnswerStatistics = function (answers) {
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
        var cloud_acc = context.authService.CloudAcc;
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
//# sourceMappingURL=statistics.utils.js.map