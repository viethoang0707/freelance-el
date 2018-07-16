"use strict";
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
var core_1 = require("@angular/core");
var QuestionContainerDirective = (function () {
    function QuestionContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    QuestionContainerDirective = __decorate([
        core_1.Directive({
            selector: '[question-container]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], QuestionContainerDirective);
    return QuestionContainerDirective;
}());
exports.QuestionContainerDirective = QuestionContainerDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNEQ7QUFLNUQ7SUFDRSxvQ0FBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBSSxDQUFDO0lBRC9DLDBCQUEwQjtRQUh0QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtTQUNqQyxDQUFDO3lDQUVxQyx1QkFBZ0I7T0FEMUMsMEJBQTBCLENBRXRDO0lBQUQsaUNBQUM7Q0FGRCxBQUVDLElBQUE7QUFGWSxnRUFBMEIiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcXVlc3Rpb24tY29udGFpbmVyXScsXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxufSJdfQ==
