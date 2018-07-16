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
var ReportContainerDirective = (function () {
    function ReportContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ReportContainerDirective = __decorate([
        core_1.Directive({
            selector: '[report-container]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], ReportContainerDirective);
    return ReportContainerDirective;
}());
exports.ReportContainerDirective = ReportContainerDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvcmVwb3J0LWNvbnRhaW5lci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBNEQ7QUFLNUQ7SUFDRSxrQ0FBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBSSxDQUFDO0lBRC9DLHdCQUF3QjtRQUhwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO3lDQUVxQyx1QkFBZ0I7T0FEMUMsd0JBQXdCLENBRXBDO0lBQUQsK0JBQUM7Q0FGRCxBQUVDLElBQUE7QUFGWSw0REFBd0IiLCJmaWxlIjoiYXBwL2FuYWx5c2lzL3JlcG9ydC9yZXBvcnQtY29udGFpbmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcmVwb3J0LWNvbnRhaW5lcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBSZXBvcnRDb250YWluZXJEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XG59Il19
