"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_model_1 = require("../base.model");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var CourseFaq = (function (_super) {
    __extends(CourseFaq, _super);
    function CourseFaq() {
        var _this = _super.call(this) || this;
        _this.question = undefined;
        _this.course_id = undefined;
        _this.answer = undefined;
        return _this;
    }
    CourseFaq_1 = CourseFaq;
    CourseFaq.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseFaq_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseFaq.listByCourse = function (context, courseId) {
        return CourseFaq_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    var CourseFaq_1;
    CourseFaq = CourseFaq_1 = __decorate([
        decorator_1.Model('etraining.course_faq'),
        __metadata("design:paramtypes", [])
    ], CourseFaq);
    return CourseFaq;
}(base_model_1.BaseModel));
exports.CourseFaq = CourseFaq;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtZmFxLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUUxQywwQ0FBcUM7QUFFckMsc0VBQW1FO0FBSW5FO0lBQStCLDZCQUFTO0lBR3BDO1FBQUEsWUFDSSxpQkFBTyxTQUtWO1FBSEgsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7O0lBQzVCLENBQUM7a0JBVFEsU0FBUztJQWVYLDZCQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxXQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLHNCQUFZLEdBQW5CLFVBQW9CLE9BQWtCLEVBQUUsUUFBUTtRQUM1QyxPQUFPLFdBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7SUFyQlEsU0FBUztRQURyQixpQkFBSyxDQUFDLHNCQUFzQixDQUFDOztPQUNqQixTQUFTLENBc0JyQjtJQUFELGdCQUFDO0NBdEJELEFBc0JDLENBdEI4QixzQkFBUyxHQXNCdkM7QUF0QlksOEJBQVMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmNvdXJzZV9mYXEnKVxuZXhwb3J0IGNsYXNzIENvdXJzZUZhcSBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLnF1ZXN0aW9uID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY291cnNlX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmFuc3dlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgXG4gICAgcXVlc3Rpb246c3RyaW5nO1xuICAgIGNvdXJzZV9pZDogbnVtYmVyO1xuICAgIGFuc3dlcjpzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VGYXEuTW9kZWwsIFtdLFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q291cnNlKGNvbnRleHQ6QVBJQ29udGV4dCwgY291cnNlSWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VGYXEuc2VhcmNoKGNvbnRleHQsW10sIFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG59XG4iXX0=
