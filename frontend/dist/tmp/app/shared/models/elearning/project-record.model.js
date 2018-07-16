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
var ProjectRecord = (function (_super) {
    __extends(ProjectRecord, _super);
    function ProjectRecord() {
        var _this = _super.call(this) || this;
        _this.score = undefined;
        _this.member_id = undefined;
        _this.user_id = undefined;
        _this.project_id = undefined;
        _this.class_id = undefined;
        _this.course_id = undefined;
        return _this;
    }
    ProjectRecord_1 = ProjectRecord;
    ProjectRecord.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ProjectRecord_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ProjectRecord.listByUser = function (context, userId) {
        return ProjectRecord_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ProjectRecord.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ProjectRecord_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    ProjectRecord.listByMember = function (context, memberId) {
        return ProjectRecord_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var ProjectRecord_1;
    ProjectRecord = ProjectRecord_1 = __decorate([
        decorator_1.Model('etraining.project_record'),
        __metadata("design:paramtypes", [])
    ], ProjectRecord);
    return ProjectRecord;
}(base_model_1.BaseModel));
exports.ProjectRecord = ProjectRecord;
