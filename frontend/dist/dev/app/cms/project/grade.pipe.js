"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidateGradePipe = (function () {
    function ValidateGradePipe() {
    }
    ValidateGradePipe.prototype.transform = function (grades, scale) {
        if (scale === void 0) { scale = null; }
        if (!scale || !grades || !grades.length)
            return false;
        for (var i = 0; i < grades.length; i++) {
            var grade = grades[i];
            if (grade.min_score == null || grade.max_score == null)
                return true;
            if (+grade.min_score < 0)
                return true;
            if (+grade.max_score > +scale)
                return true;
            if (+grade.max_score < +grade.min_score)
                return true;
            var prevGrade = i > 0 ? grades[i - 1] : null;
            if (prevGrade && +prevGrade.max_score + 1 != +grade.min_score)
                return true;
        }
        return false;
    };
    ValidateGradePipe = __decorate([
        core_1.Pipe({ name: 'validateGrade', pure: false })
    ], ValidateGradePipe);
    return ValidateGradePipe;
}());
exports.ValidateGradePipe = ValidateGradePipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvcHJvamVjdC9ncmFkZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBSXBEO0lBQUE7SUFxQkEsQ0FBQztJQW5CQyxxQ0FBUyxHQUFULFVBQVUsTUFBYSxFQUFFLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7UUFDekMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFFLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJO2dCQUNyRCxPQUFPLElBQUksQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFFLENBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLO2dCQUM1QixPQUFPLElBQUksQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDO1lBQ2IsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsTUFBTSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO1lBQ3JDLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztnQkFDMUQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQXBCVSxpQkFBaUI7UUFEN0IsV0FBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7T0FDakMsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBckJELEFBcUJDLElBQUE7QUFyQlksOENBQWlCIiwiZmlsZSI6ImFwcC9jbXMvcHJvamVjdC9ncmFkZS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQFBpcGUoeyBuYW1lOiAndmFsaWRhdGVHcmFkZScsICBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlR3JhZGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cdC8vIHJldHVybiB0cnVlIGlmIHZhbGlkYXRpb24gZmFpbGVkXG4gIHRyYW5zZm9ybShncmFkZXM6IGFueVtdLCBzY2FsZTogYW55ID0gbnVsbCk6IGFueSB7XG4gIFx0aWYgKCFzY2FsZSB8fCAhIGdyYWRlcyB8fCAhZ3JhZGVzLmxlbmd0aClcbiAgXHRcdHJldHVybiBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0wO2k8Z3JhZGVzLmxlbmd0aDtpKyspIHtcbiAgICBcdHZhciBncmFkZSA9IGdyYWRlc1tpXTtcbiAgICBcdGlmIChncmFkZS5taW5fc2NvcmUgPT0gbnVsbCB8fCBncmFkZS5tYXhfc2NvcmUgPT0gbnVsbClcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHRpZiAoK2dyYWRlLm1pbl9zY29yZSA8MClcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHRpZiAoK2dyYWRlLm1heF9zY29yZSA+ICtzY2FsZSlcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHRpZiAoK2dyYWRlLm1heF9zY29yZSA8ICtncmFkZS5taW5fc2NvcmUpXG4gICAgXHRcdHJldHVybiB0cnVlO1xuICAgIFx0dmFyIHByZXZHcmFkZSA9IGk+MD9ncmFkZXNbaS0xXTpudWxsO1xuICAgIFx0aWYgKHByZXZHcmFkZSAmJiArcHJldkdyYWRlLm1heF9zY29yZSsxICE9ICtncmFkZS5taW5fc2NvcmUpXG4gICAgXHRcdHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0iXX0=
