"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("underscore");
var ByCoursePipe = (function () {
    function ByCoursePipe() {
    }
    ByCoursePipe.prototype.transform = function (records, course) {
        if (course === void 0) { course = null; }
        return _.filter(records, function (obj) {
            if (!course)
                return true;
            return course && obj.course_id == course.id;
        });
    };
    ByCoursePipe = __decorate([
        core_1.Pipe({ name: 'byCourse', pure: false })
    ], ByCoursePipe);
    return ByCoursePipe;
}());
exports.ByCoursePipe = ByCoursePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY291cnNlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFDcEQsOEJBQWdDO0FBR2hDO0lBQUE7SUFRQSxDQUFDO0lBUEMsZ0NBQVMsR0FBVCxVQUFVLE9BQWMsRUFBRSxNQUFrQjtRQUFsQix1QkFBQSxFQUFBLGFBQWtCO1FBQzFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHO1lBQzVCLElBQUksQ0FBQyxNQUFNO2dCQUNWLE9BQU8sSUFBSSxDQUFDO1lBQ2IsT0FBTyxNQUFNLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVBVLFlBQVk7UUFEeEIsV0FBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDNUIsWUFBWSxDQVF4QjtJQUFELG1CQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksb0NBQVkiLCJmaWxlIjoiYXBwL2NvdXJzZS9jb3Vyc2UucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2J5Q291cnNlJywgIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgQnlDb3Vyc2VQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShyZWNvcmRzOiBhbnlbXSwgY291cnNlOiBhbnkgPSBudWxsKTogYW55IHtcbiAgICByZXR1cm4gXy5maWx0ZXIocmVjb3JkcywgKG9iaik9PiB7XG4gICAgXHRpZiAoIWNvdXJzZSlcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHRyZXR1cm4gY291cnNlICYmIG9iai5jb3Vyc2VfaWQgPT0gY291cnNlLmlkO1xuICAgIH0pO1xuICB9XG59Il19
