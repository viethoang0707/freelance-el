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
var ByClassPipe = (function () {
    function ByClassPipe() {
    }
    ByClassPipe.prototype.transform = function (records, clazz) {
        if (clazz === void 0) { clazz = null; }
        var ar = _.filter(records, function (obj) {
            if (!clazz)
                return true;
            return clazz && obj.class_id == clazz.id;
        });
        console.log(ar);
        return ar;
    };
    ByClassPipe = __decorate([
        core_1.Pipe({ name: 'byClass', pure: false })
    ], ByClassPipe);
    return ByClassPipe;
}());
exports.ByClassPipe = ByClassPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY2xhc3MucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUNwRCw4QkFBZ0M7QUFHaEM7SUFBQTtJQVVBLENBQUM7SUFUQywrQkFBUyxHQUFULFVBQVUsT0FBYyxFQUFFLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7UUFDekMsSUFBSSxFQUFFLEdBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHO1lBQy9CLElBQUksQ0FBQyxLQUFLO2dCQUNULE9BQU8sSUFBSSxDQUFDO1lBQ2IsT0FBTyxLQUFLLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFUVSxXQUFXO1FBRHZCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO09BQzNCLFdBQVcsQ0FVdkI7SUFBRCxrQkFBQztDQVZELEFBVUMsSUFBQTtBQVZZLGtDQUFXIiwiZmlsZSI6ImFwcC9jb3Vyc2UvY2xhc3MucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIFBpcGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2J5Q2xhc3MnLCAgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBCeUNsYXNzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0ocmVjb3JkczogYW55W10sIGNsYXp6OiBhbnkgPSBudWxsKTogYW55IHtcbiAgICB2YXIgYXIgPSAgXy5maWx0ZXIocmVjb3JkcywgKG9iaik9PiB7XG4gICAgXHRpZiAoIWNsYXp6KVxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICBcdHJldHVybiBjbGF6eiAmJiBvYmouY2xhc3NfaWQgPT0gY2xhenouaWQ7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coYXIpO1xuICAgIHJldHVybiBhcjtcbiAgfVxufSJdfQ==
