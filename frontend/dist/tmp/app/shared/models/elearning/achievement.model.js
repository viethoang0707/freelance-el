"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_model_1 = require("../base.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var moment = require("moment");
var constants_1 = require("../constants");
var _ = require("underscore");
var cache_utils_1 = require("../../helpers/cache.utils");
var Achivement = (function (_super) {
    __extends(Achivement, _super);
    function Achivement() {
        var _this = _super.call(this) || this;
        _this.course_id = undefined;
        _this.user_group_id = undefined;
        _this.exam_id = undefined;
        _this.user_id = undefined;
        _this.date_acquire = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.competency_level_id = undefined;
        _this.competency_level_name = undefined;
        return _this;
    }
    Achivement_1 = Achivement;
    Achivement.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    Achivement.listByUser = function (context, userId) {
        return Achivement_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Achivement.__api__listByCompetency = function (competencyId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('competency_id','='," + competencyId + ")]");
    };
    Achivement.listByCompetency = function (context, competencyId) {
        return Achivement_1.search(context, [], "[('competency_id','='," + competencyId + ")]");
    };
    Achivement.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('user_group_id','='," + groupId + ")]");
    };
    Achivement.listByGroup = function (context, groupId) {
        return Achivement_1.search(context, [], "[('user_group_id','='," + groupId + ")]");
    };
    Achivement.__api__searchByDate = function (start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "')]");
    };
    Achivement.searchByDate = function (context, start, end) {
        if (cache_utils_1.Cache.hit(Achivement_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Achivement_1.Model)).map(function (skills) {
                return _.filter(skills, function (skill) {
                    return skill.date_acquire.getTime() >= start.getTime() && skill.date_acquire.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Achivement_1.search(context, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "')]");
    };
    Achivement.__api__searchByDateAndCompetency = function (competencyId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
    };
    Achivement.searchByDateAndCompetency = function (context, competencyId, start, end) {
        if (cache_utils_1.Cache.hit(Achivement_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Achivement_1.Model)).map(function (skills) {
                return _.filter(skills, function (skill) {
                    return skill.date_acquire.getTime() >= start.getTime() && skill.date_acquire.getTime() <= end.getTime() && skill.competency_id == competencyId;
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Achivement_1.search(context, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
    };
    var Achivement_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Achivement.prototype, "date_acquire", void 0);
    Achivement = Achivement_1 = __decorate([
        decorator_1.Model('etraining.achivement'),
        __metadata("design:paramtypes", [])
    ], Achivement);
    return Achivement;
}(base_model_1.BaseModel));
exports.Achivement = Achivement;
