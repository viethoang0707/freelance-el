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
var ClassExam = (function (_super) {
    __extends(ClassExam, _super);
    function ClassExam() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.status = undefined;
        _this.course_id = undefined;
        _this.class_id = undefined;
        _this.exam_id = undefined;
        _this.start = undefined;
        _this.end = undefined;
        _this.summary = undefined;
        _this.instruction = undefined;
        return _this;
    }
    ClassExam_1 = ClassExam;
    ClassExam.listByClass = function (context, classId) {
        return ClassExam_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    ClassExam.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(ClassExam_1.Model, [], "[('class_id','='," + classId + ")]");
    };
    var ClassExam_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ClassExam.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ClassExam.prototype, "end", void 0);
    ClassExam = ClassExam_1 = __decorate([
        decorator_1.Model('etraining.class_exam'),
        __metadata("design:paramtypes", [])
    ], ClassExam);
    return ClassExam;
}(base_model_1.BaseModel));
exports.ClassExam = ClassExam;
//# sourceMappingURL=class-exam.model.js.map