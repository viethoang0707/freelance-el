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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvdGltZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBR3BEO0lBQUE7SUFZQSxDQUFDO0lBWEcsbUNBQVMsR0FBVCxVQUFVLEVBQVUsRUFBRSxLQUFhO1FBQy9CLElBQUksS0FBSyxJQUFJLEtBQUs7WUFDZCxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLElBQUksS0FBSztZQUNkLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxLQUFLLElBQUksTUFBTTtZQUNmLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksS0FBSyxJQUFJLEtBQUs7WUFDZCxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUMsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBWFEsZUFBZTtRQUQzQixXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztPQUM5QixlQUFlLENBWTNCO0lBQUQsc0JBQUM7Q0FaRCxBQVlDLElBQUE7QUFaWSwwQ0FBZTtBQWU1QjtJQUFBO0lBV0EsQ0FBQztJQVZHLDZCQUFTLEdBQVQsVUFBVSxFQUFVO1FBQ2hCLElBQUksQ0FBQyxFQUFFO1lBQ0gsT0FBTyxFQUFFLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMvQixHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksTUFBTSxHQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDNUMsSUFBSSxNQUFNLEdBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxHQUFDLEdBQUcsQ0FBQztRQUM1QyxPQUFPLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFBO0lBQ2hDLENBQUM7SUFWUSxTQUFTO1FBRHJCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO09BQ3hCLFNBQVMsQ0FXckI7SUFBRCxnQkFBQztDQVhELEFBV0MsSUFBQTtBQVhZLDhCQUFTIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvdGltZS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICd0aW1lQ29udmVydCcsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgVGltZUNvbnZlcnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKG1zOiBudW1iZXIsIHNjYWxlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBpZiAoc2NhbGUgPT0gJ3NlYycpXG4gICAgICAgICAgICBtcyA9IE1hdGguZmxvb3IobXMgLyAxMDAwKTtcbiAgICAgICAgaWYgKHNjYWxlID09ICdtaW4nKVxuICAgICAgICAgICAgbXMgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwKTtcbiAgICAgICAgaWYgKHNjYWxlID09ICdob3VyJylcbiAgICAgICAgICAgIG1zID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyA2MCAvIDYwKTtcbiAgICAgICAgaWYgKHNjYWxlID09ICdkYXknKVxuICAgICAgICAgICAgbXMgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCk7XG4gICAgICAgIHJldHVybiBtcztcbiAgICB9XG59XG5cbkBQaXBlKHsgbmFtZTogJ2Nsb2NrJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBDbG9ja1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0obXM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICghbXMpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3IobXMgLyAxMDAwKTtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc2VjIC8gNjApO1xuICAgICAgICBzZWMgPSBzZWMgJSA2MDtcbiAgICAgICAgdmFyIG1pblN0ciA9ICBtaW4gPCAxMCA/ICBcIjBcIiArIG1pbiA6JycrbWluOyBcbiAgICAgICAgdmFyIHNlY1N0ciA9ICBzZWMgPCAxMCA/ICBcIjBcIiArIHNlYyA6Jycrc2VjOyBcbiAgICAgICAgcmV0dXJuIG1pblN0ciArICc6JyArIHNlY1N0clxuICAgIH1cbn0iXX0=
