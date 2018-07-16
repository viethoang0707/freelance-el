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
var VarDirective = (function () {
    function VarDirective(vcRef, templateRef) {
        this.vcRef = vcRef;
        this.templateRef = templateRef;
        this.context = {};
    }
    Object.defineProperty(VarDirective.prototype, "ngVar", {
        set: function (context) {
            this.context.$implicit = this.context.ngVar = context;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    VarDirective.prototype.updateView = function () {
        this.vcRef.clear();
        this.vcRef.createEmbeddedView(this.templateRef, this.context);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], VarDirective.prototype, "ngVar", null);
    VarDirective = __decorate([
        core_1.Directive({
            selector: '[ngVar]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.TemplateRef])
    ], VarDirective);
    return VarDirective;
}());
exports.VarDirective = VarDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvaGVscGVycy9uZy12YXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdGO0FBTWhGO0lBU0Usc0JBQW9CLEtBQXVCLEVBQVUsV0FBNkI7UUFBOUQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFGbEYsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQUVtRSxDQUFDO0lBUHRGLHNCQUFJLCtCQUFLO2FBQVQsVUFBVSxPQUFZO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUN0RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFNRCxpQ0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFaRDtRQURDLFlBQUssRUFBRTs7OzZDQUlQO0lBTFUsWUFBWTtRQUh4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7U0FDdEIsQ0FBQzt5Q0FVMkIsdUJBQWdCLEVBQXVCLGtCQUFXO09BVGxFLFlBQVksQ0FleEI7SUFBRCxtQkFBQztDQWZELEFBZUMsSUFBQTtBQWZZLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvaGVscGVycy9uZy12YXIuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ1Zhcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBWYXJEaXJlY3RpdmUge1xuICBASW5wdXQoKVxuICBzZXQgbmdWYXIoY29udGV4dDogYW55KSB7XG4gICAgdGhpcy5jb250ZXh0LiRpbXBsaWNpdCA9IHRoaXMuY29udGV4dC5uZ1ZhciA9IGNvbnRleHQ7XG4gICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gIH1cblxuICBjb250ZXh0OiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxuXG4gIHVwZGF0ZVZpZXcoKSB7XG4gICAgdGhpcy52Y1JlZi5jbGVhcigpO1xuICAgIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYsIHRoaXMuY29udGV4dCk7XG4gIH1cbn0iXX0=
