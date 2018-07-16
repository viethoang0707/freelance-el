"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value).map(function (key) { return value[key]; });
    };
    ValuesPipe = __decorate([
        core_1.Pipe({ name: 'values', pure: false })
    ], ValuesPipe);
    return ValuesPipe;
}());
exports.ValuesPipe = ValuesPipe;
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    KeysPipe = __decorate([
        core_1.Pipe({ name: 'keys', pure: false })
    ], KeysPipe);
    return KeysPipe;
}());
exports.KeysPipe = KeysPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvbWFwLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFHcEQ7SUFBQTtJQUlBLENBQUM7SUFIQyw4QkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQWtCO1FBQWxCLHFCQUFBLEVBQUEsV0FBa0I7UUFDdEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBVixDQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBSFUsVUFBVTtRQUR0QixXQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztPQUMxQixVQUFVLENBSXRCO0lBQUQsaUJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnQ0FBVTtBQU92QjtJQUFBO0lBSUEsQ0FBQztJQUhDLDRCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBa0I7UUFBbEIscUJBQUEsRUFBQSxXQUFrQjtRQUN0QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUhVLFFBQVE7UUFEcEIsV0FBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDeEIsUUFBUSxDQUlwQjtJQUFELGVBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSw0QkFBUSIsImZpbGUiOiJhcHAvc2hhcmVkL3BpcGVzL21hcC5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICd2YWx1ZXMnLCAgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBWYWx1ZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnlbXSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkubWFwKGtleSA9PiB2YWx1ZVtrZXldKTtcbiAgfVxufVxuXG5AUGlwZSh7IG5hbWU6ICdrZXlzJywgIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgS2V5c1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M6IGFueVtdID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgfVxufSJdfQ==
