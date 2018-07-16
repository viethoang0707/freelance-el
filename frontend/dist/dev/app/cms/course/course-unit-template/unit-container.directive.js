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
var CourseUnitContainerDirective = (function () {
    function CourseUnitContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    CourseUnitContainerDirective = __decorate([
        core_1.Directive({
            selector: '[course-unit-container]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], CourseUnitContainerDirective);
    return CourseUnitContainerDirective;
}());
exports.CourseUnitContainerDirective = CourseUnitContainerDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQtY29udGFpbmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE0RDtBQUs1RDtJQUNFLHNDQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFEL0MsNEJBQTRCO1FBSHhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUseUJBQXlCO1NBQ3BDLENBQUM7eUNBRXFDLHVCQUFnQjtPQUQxQyw0QkFBNEIsQ0FFeEM7SUFBRCxtQ0FBQztDQUZELEFBRUMsSUFBQTtBQUZZLG9FQUE0QiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LWNvbnRhaW5lci5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NvdXJzZS11bml0LWNvbnRhaW5lcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxufSJdfQ==
