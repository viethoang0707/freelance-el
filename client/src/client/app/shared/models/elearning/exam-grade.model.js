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
var _ = require("underscore");
var ExamGrade = (function (_super) {
    __extends(ExamGrade, _super);
    function ExamGrade() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.min_score = undefined;
        _this.max_score = undefined;
        return _this;
    }
    ExamGrade.gradeScore = function (grades, score) {
        return _.find(grades, function (obj) {
            return obj.min_score <= score && obj.max_score >= score;
        });
    };
    ExamGrade = __decorate([
        decorator_1.Model('etraining.exam_grade'),
        __metadata("design:paramtypes", [])
    ], ExamGrade);
    return ExamGrade;
}(base_model_1.BaseModel));
exports.ExamGrade = ExamGrade;
//# sourceMappingURL=exam-grade.model.js.map