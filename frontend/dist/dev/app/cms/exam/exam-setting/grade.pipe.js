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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvZXhhbS9leGFtLXNldHRpbmcvZ3JhZGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUlwRDtJQUFBO0lBcUJBLENBQUM7SUFuQkMscUNBQVMsR0FBVCxVQUFVLE1BQWEsRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFlBQWlCO1FBQ3pDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBRSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUN2QyxPQUFPLEtBQUssQ0FBQztRQUNiLEtBQUssSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSTtnQkFDckQsT0FBTyxJQUFJLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRSxDQUFDO2dCQUN0QixPQUFPLElBQUksQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSztnQkFDNUIsT0FBTyxJQUFJLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTO2dCQUN0QyxPQUFPLElBQUksQ0FBQztZQUNiLElBQUksU0FBUyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQztZQUNyQyxJQUFJLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQzFELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFwQlUsaUJBQWlCO1FBRDdCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO09BQ2pDLGlCQUFpQixDQXFCN0I7SUFBRCx3QkFBQztDQXJCRCxBQXFCQyxJQUFBO0FBckJZLDhDQUFpQiIsImZpbGUiOiJhcHAvY21zL2V4YW0vZXhhbS1zZXR0aW5nL2dyYWRlLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICd2YWxpZGF0ZUdyYWRlJywgIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdGVHcmFkZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblx0Ly8gcmV0dXJuIHRydWUgaWYgdmFsaWRhdGlvbiBmYWlsZWRcbiAgdHJhbnNmb3JtKGdyYWRlczogYW55W10sIHNjYWxlOiBhbnkgPSBudWxsKTogYW55IHtcbiAgXHRpZiAoIXNjYWxlIHx8ICEgZ3JhZGVzIHx8ICFncmFkZXMubGVuZ3RoKVxuICBcdFx0cmV0dXJuIGZhbHNlO1xuICAgIGZvciAodmFyIGkgPTA7aTxncmFkZXMubGVuZ3RoO2krKykge1xuICAgIFx0dmFyIGdyYWRlID0gZ3JhZGVzW2ldO1xuICAgIFx0aWYgKGdyYWRlLm1pbl9zY29yZSA9PSBudWxsIHx8IGdyYWRlLm1heF9zY29yZSA9PSBudWxsKVxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICBcdGlmICgrZ3JhZGUubWluX3Njb3JlIDwwKVxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICBcdGlmICgrZ3JhZGUubWF4X3Njb3JlID4gK3NjYWxlKVxuICAgIFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICBcdGlmICgrZ3JhZGUubWF4X3Njb3JlIDwgK2dyYWRlLm1pbl9zY29yZSlcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgXHR2YXIgcHJldkdyYWRlID0gaT4wP2dyYWRlc1tpLTFdOm51bGw7XG4gICAgXHRpZiAocHJldkdyYWRlICYmICtwcmV2R3JhZGUubWF4X3Njb3JlKzEgIT0gK2dyYWRlLm1pbl9zY29yZSlcbiAgICBcdFx0cmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSJdfQ==
