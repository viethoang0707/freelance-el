"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TimeConvertPipe = (function () {
    function TimeConvertPipe() {
    }
    TimeConvertPipe.prototype.transform = function (ms, scale) {
        if (scale == 'sec')
            ms = Math.floor(ms / 1000);
        if (scale == 'min')
            ms = Math.floor(ms / 1000 / 60);
        if (scale == 'hour')
            ms = Math.floor(ms / 1000 / 60 / 60);
        if (scale == 'day')
            ms = Math.floor(ms / 1000 / 60 / 60 / 24);
        return ms;
    };
    TimeConvertPipe = __decorate([
        core_1.Pipe({ name: 'timeConvert', pure: false })
    ], TimeConvertPipe);
    return TimeConvertPipe;
}());
exports.TimeConvertPipe = TimeConvertPipe;
var ClockPipe = (function () {
    function ClockPipe() {
    }
    ClockPipe.prototype.transform = function (ms) {
        if (!ms)
            return "";
        var sec = Math.floor(ms / 1000);
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        var minStr = min < 10 ? "0" + min : '' + min;
        var secStr = sec < 10 ? "0" + sec : '' + sec;
        return minStr + ':' + secStr;
    };
    ClockPipe = __decorate([
        core_1.Pipe({ name: 'clock', pure: false })
    ], ClockPipe);
    return ClockPipe;
}());
exports.ClockPipe = ClockPipe;
