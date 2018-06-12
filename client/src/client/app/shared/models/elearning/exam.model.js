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
var moment = require("moment");
var constants_1 = require("../constants");
var execute_api_1 = require("../../services/api/execute.api");
var Exam = (function (_super) {
    __extends(Exam, _super);
    function Exam() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.summary = undefined;
        _this.instruction = undefined;
        _this.start = undefined;
        _this.end = undefined;
        _this.selector_id = undefined;
        _this.status = undefined;
        _this.duration = undefined;
        _this.publish_score = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.competency_level_id = undefined;
        _this.competency_level_name = undefined;
        return _this;
    }
    Exam_1 = Exam;
    Object.defineProperty(Exam.prototype, "IsAvailable", {
        get: function () {
            if (this.status != 'open')
                return false;
            var now = new Date();
            if (this.end.getTime() < now.getTime())
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Exam.__api__searchByDate = function (start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Exam_1.Model, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "')]");
    };
    Exam.searchByDate = function (context, start, end) {
        if (cache_utils_1.Cache.hit(Exam_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Exam_1.Model)).map(function (exams) {
                return _.filter(exams, function (exam) {
                    return exam.start.getTime() >= start.getTime() && exam.start.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Exam_1.search(context, [], "[('start','>=','" + startDateStr + "'),('start','<=','" + endDateStr + "')]");
    };
    Exam.__api__enroll = function (examId, userIds) {
        return new execute_api_1.ExecuteAPI(Exam_1.Model, 'enroll', userIds, { examId: examId });
    };
    Exam.enroll = function (context, examId, userIds) {
        return context.apiService.execute(this.__api__enroll(classId, userIds), context.authService.CloudAcc.id, context.authService.CloudAcc.api_endpoint);
    };
    var Exam_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Exam.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Exam.prototype, "end", void 0);
    Exam = Exam_1 = __decorate([
        decorator_1.Model('etraining.exam'),
        __metadata("design:paramtypes", [])
    ], Exam);
    return Exam;
}(base_model_1.BaseModel));
exports.Exam = Exam;
//# sourceMappingURL=exam.model.js.map