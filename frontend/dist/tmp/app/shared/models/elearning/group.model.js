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
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.category = undefined;
        _this.order = undefined;
        _this.code = undefined;
        _this.parent_id = undefined;
        return _this;
    }
    Group_1 = Group;
    Group.__api__listUserGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','organization')]");
    };
    Group.listUserGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'organization';
                });
            });
        return Group_1.search(context, [], "[('category','=','organization')]");
    };
    Group.__api__listQuestionGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','question')]");
    };
    Group.listQuestionGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'question';
                });
            });
        return Group_1.search(context, [], "[('category','=','question')]");
    };
    Group.__api__listCourseGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','course')]");
    };
    Group.listCourseGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'course';
                });
            });
        return Group_1.search(context, [], "[('category','=','course')]");
    };
    Group.__api__listCompetencyGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','competency')]");
    };
    Group.listCompetencyGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'competency';
                });
            });
        return Group_1.search(context, [], "[('category','=','competency')]");
    };
    var Group_1;
    Group = Group_1 = __decorate([
        decorator_1.Model('res.groups'),
        __metadata("design:paramtypes", [])
    ], Group);
    return Group;
}(base_model_1.BaseModel));
exports.Group = Group;
