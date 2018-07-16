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
var _ = require("underscore");
var search_read_api_1 = require("../../services/api/search-read.api");
var competency_level_model_1 = require("./competency-level.model");
var Competency = (function (_super) {
    __extends(Competency, _super);
    function Competency() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.group_id = undefined;
        _this.category = undefined;
        _this.group_id__DESC__ = undefined;
        _this.group_name = undefined;
        _this.levels = [];
        return _this;
    }
    Competency_1 = Competency;
    Competency.prototype.levelSummary = function () {
        return _.reduce(this.levels, function (memo, level) { return memo + level["name"] + ','; }, '');
    };
    Competency.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Competency_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    Competency.listByGroup = function (context, groupId) {
        return Competency_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    Competency.__api__listByGroups = function (groupIds) {
        var apiList = [];
        _.each(groupIds, function (groupId) {
            apiList.push(Competency_1.__api__listByGroup(groupId));
        });
        return apiList;
    };
    Competency.listByGroups = function (context, groupIds) {
        var apiList = [];
        _.each(groupIds, function (groupId) {
            apiList.push(Competency_1.__api__listByGroup(groupId));
        });
        return context.apiService.execute(Competency_1.__api__bulk_search(apiList), context.authService.LoginToken).map(function (questionArrs) {
            return _.flatten(questionArrs);
        });
    };
    Competency.prototype.__api__populateLevel = function () {
        return competency_level_model_1.CompetencyLevel.__api__listByCompetency(this.id);
    };
    Competency.prototype.populateLevel = function (context) {
        var _this = this;
        if (this.id)
            return competency_level_model_1.CompetencyLevel.listByCompetency(context, this.id).map(function (levels) {
                _this.levels = levels;
                return _this;
            });
        else
            return Rx_1.Observable.of(this);
    };
    Competency.populateLevels = function (context, competencies) {
        var apiList = _.map(competencies, function (question) {
            return question.__api__populateLevel();
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        })
            .do(function (jsonArr) {
            var levels = competency_level_model_1.CompetencyLevel.toArray(jsonArr);
            _.each(competencies, function (competency) {
                competency.levels = _.filter(levels, function (level) {
                    return level.competency_id == competency.id;
                });
            });
        });
    };
    var Competency_1;
    Competency = Competency_1 = __decorate([
        decorator_1.Model('etraining.competency'),
        __metadata("design:paramtypes", [])
    ], Competency);
    return Competency;
}(base_model_1.BaseModel));
exports.Competency = Competency;
