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
var ChartContainerDirective = (function () {
    function ChartContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ChartContainerDirective = __decorate([
        core_1.Directive({
            selector: '[chart-container]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], ChartContainerDirective);
    return ChartContainerDirective;
}());
exports.ChartContainerDirective = ChartContainerDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jaGFydC1jb250YWluZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTREO0FBSzVEO0lBQ0UsaUNBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUksQ0FBQztJQUQvQyx1QkFBdUI7UUFIbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQzt5Q0FFcUMsdUJBQWdCO09BRDFDLHVCQUF1QixDQUVuQztJQUFELDhCQUFDO0NBRkQsQUFFQyxJQUFBO0FBRlksMERBQXVCIiwiZmlsZSI6ImFwcC9hbmFseXNpcy9jaGFydC9jaGFydC1jb250YWluZXIuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjaGFydC1jb250YWluZXJdJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnRDb250YWluZXJEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XG59Il19
