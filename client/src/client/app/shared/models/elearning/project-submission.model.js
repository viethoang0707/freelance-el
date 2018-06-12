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
var ProjectSubmission = (function (_super) {
    __extends(ProjectSubmission, _super);
    function ProjectSubmission() {
        var _this = _super.call(this) || this;
        _this.filename = undefined;
        _this.file_url = undefined;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.class_id = undefined;
        _this.course_id = undefined;
        _this.project_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.score = undefined;
        _this.date_submit = undefined;
        return _this;
    }
    ProjectSubmission_1 = ProjectSubmission;
    ProjectSubmission.__api__byMemberAndProject = function (member_id, projectId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('member_id','='," + member_id + "),('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.byMemberAndProject = function (context, member_id, projectId) {
        return ProjectSubmission_1.search(context, [], "[('member_id','='," + member_id + "),('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ProjectSubmission.listByUser = function (context, userId) {
        return ProjectSubmission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ProjectSubmission.__api__listByProject = function (projectId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.listByProject = function (context, projectId) {
        return ProjectSubmission_1.search(context, [], "[('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    ProjectSubmission.listByMember = function (context, memberId) {
        return ProjectSubmission_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var ProjectSubmission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "date_submit", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "start", void 0);
    ProjectSubmission = ProjectSubmission_1 = __decorate([
        decorator_1.Model('etraining.project_submission'),
        __metadata("design:paramtypes", [])
    ], ProjectSubmission);
    return ProjectSubmission;
}(base_model_1.BaseModel));
exports.ProjectSubmission = ProjectSubmission;
//# sourceMappingURL=project-submission.model.js.map