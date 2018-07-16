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
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.prototype.firstDateOfMonth = function (now) {
        return new Date(now.getFullYear(), now.getMonth(), 1);
    };
    DateUtils.prototype.lastDateOfMonth = function (now) {
        return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    };
    DateUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DateUtils);
    return DateUtils;
}());
exports.DateUtils = DateUtils;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvaGVscGVycy9kYXRlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0Esc0NBQTJDO0FBRzNDO0lBRUU7SUFDQSxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLEdBQVM7UUFDeEIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxtQ0FBZSxHQUFmLFVBQWdCLEdBQVM7UUFDdkIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBWFUsU0FBUztRQURyQixpQkFBVSxFQUFFOztPQUNBLFNBQVMsQ0FZckI7SUFBRCxnQkFBQztDQVpELEFBWUMsSUFBQTtBQVpZLDhCQUFTIiwiZmlsZSI6ImFwcC9zaGFyZWQvaGVscGVycy9kYXRlLnV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnXG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZVV0aWxzIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGZpcnN0RGF0ZU9mTW9udGgobm93OiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgMSk7XG4gIH1cblxuICBsYXN0RGF0ZU9mTW9udGgobm93OiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSArIDEsIDApO1xuICB9XG59XG4iXX0=
