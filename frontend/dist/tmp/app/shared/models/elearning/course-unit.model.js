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
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var search_count_api_1 = require("../../services/api/search-count.api");
var _ = require("underscore");
var CourseUnit = (function (_super) {
    __extends(CourseUnit, _super);
    function CourseUnit() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.lecture = undefined;
        _this.type = undefined;
        _this.order = undefined;
        _this.parent_id = undefined;
        _this.syllabus_id = undefined;
        _this.icon = undefined;
        _this.status = undefined;
        _this.course_id = undefined;
        return _this;
    }
    CourseUnit_1 = CourseUnit;
    CourseUnit.__api__listBySyllabus = function (sylId) {
        return new search_read_api_1.SearchReadAPI(CourseUnit_1.Model, [], "[('syllabus_id','='," + sylId + ")]");
    };
    CourseUnit.listBySyllabus = function (context, sylId) {
        return CourseUnit_1.search(context, [], "[('syllabus_id','='," + sylId + ")]");
    };
    CourseUnit.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseUnit_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseUnit.listByCourse = function (context, courseId) {
        return CourseUnit_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseUnit.__api__countBySyllabus = function (sylId) {
        return new search_count_api_1.SearchCountAPI(CourseUnit_1.Model, "[('syllabus_id','='," + sylId + "),('type','!=','folder')]");
    };
    CourseUnit.countBySyllabus = function (context, sylId) {
        return CourseUnit_1.count(context, "[('syllabus_id','='," + sylId + "),('type','!=','folder')]");
    };
    CourseUnit.countBySyllabusArray = function (context, sylIds) {
        var _this = this;
        var apiList = _.map(sylIds, function (sylId) {
            return _this.__api__countBySyllabus(sylId);
        });
        return base_model_1.BaseModel.bulk_count.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        });
    };
    var CourseUnit_1;
    CourseUnit = CourseUnit_1 = __decorate([
        decorator_1.Model('etraining.course_unit'),
        __metadata("design:paramtypes", [])
    ], CourseUnit);
    return CourseUnit;
}(base_model_1.BaseModel));
exports.CourseUnit = CourseUnit;
