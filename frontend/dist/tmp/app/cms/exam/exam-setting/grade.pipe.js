"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateGradePipe = (function () {
    function ValidateGradePipe() {
    }
    ValidateGradePipe.prototype.transform = function (grades, scale) {
        if (scale === void 0) { scale = null; }
        if (!scale || !grades || !grades.length)
            return false;
        for (var i = 0; i < grades.length; i++) {
            var grade = grades[i];
            if (grade.min_score == null || grade.max_score == null)
                return true;
            if (+grade.min_score < 0)
                return true;
            if (+grade.max_score > +scale)
                return true;
            if (+grade.max_score < +grade.min_score)
                return true;
            var prevGrade = i > 0 ? grades[i - 1] : null;
            if (prevGrade && +prevGrade.max_score + 1 != +grade.min_score)
                return true;
        }
        return false;
    };
    ValidateGradePipe = __decorate([
        core_1.Pipe({ name: 'validateGrade', pure: false })
    ], ValidateGradePipe);
    return ValidateGradePipe;
}());
exports.ValidateGradePipe = ValidateGradePipe;
