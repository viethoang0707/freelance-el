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
var CourseSyllabus = (function (_super) {
    __extends(CourseSyllabus, _super);
    function CourseSyllabus() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.course_id = undefined;
        _this.status = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.review_state = undefined;
        _this.unit_count = undefined;
        _this.complete_unit_by_order = undefined;
        return _this;
    }
    CourseSyllabus_1 = CourseSyllabus;
    CourseSyllabus.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseSyllabus_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseSyllabus.listByCourse = function (context, courseId) {
        return CourseSyllabus_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    var CourseSyllabus_1;
    CourseSyllabus = CourseSyllabus_1 = __decorate([
        decorator_1.Model('etraining.syllabus'),
        __metadata("design:paramtypes", [])
    ], CourseSyllabus);
    return CourseSyllabus;
}(base_model_1.BaseModel));
exports.CourseSyllabus = CourseSyllabus;
