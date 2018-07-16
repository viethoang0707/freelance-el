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
var CourseMaterial = (function (_super) {
    __extends(CourseMaterial, _super);
    function CourseMaterial() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.course_id = undefined;
        _this.filename = undefined;
        _this.type = undefined;
        _this.url = undefined;
        return _this;
    }
    CourseMaterial_1 = CourseMaterial;
    CourseMaterial.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseMaterial_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseMaterial.listByCourse = function (context, courseId) {
        return CourseMaterial_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    var CourseMaterial_1;
    CourseMaterial = CourseMaterial_1 = __decorate([
        decorator_1.Model('etraining.course_material'),
        __metadata("design:paramtypes", [])
    ], CourseMaterial);
    return CourseMaterial;
}(base_model_1.BaseModel));
exports.CourseMaterial = CourseMaterial;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWF0ZXJpYWwubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTBDO0FBRTFDLDBDQUFxQztBQUVyQyxzRUFBbUU7QUFHbkU7SUFBb0Msa0NBQVM7SUFHekM7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUFMSCxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQzs7SUFDekIsQ0FBQzt1QkFYUSxjQUFjO0lBbUJoQixrQ0FBbUIsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDdkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsZ0JBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRU0sMkJBQVksR0FBbkIsVUFBb0IsT0FBa0IsRUFBRSxRQUFRO1FBQzVDLE9BQU8sZ0JBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQzs7SUF6QlEsY0FBYztRQUQxQixpQkFBSyxDQUFDLDJCQUEyQixDQUFDOztPQUN0QixjQUFjLENBMEIxQjtJQUFELHFCQUFDO0NBMUJELEFBMEJDLENBMUJtQyxzQkFBUyxHQTBCNUM7QUExQlksd0NBQWMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tYXRlcmlhbC5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuY291cnNlX21hdGVyaWFsJylcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNYXRlcmlhbCBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb3Vyc2VfaWQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5maWxlbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50eXBlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVybCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgY291cnNlX2lkOiBudW1iZXI7XG4gICAgZmlsZW5hbWU6c3RyaW5nO1xuICAgIHR5cGU6c3RyaW5nO1xuICAgIHVybDpzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VNYXRlcmlhbC5Nb2RlbCwgW10sXCJbKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDb3Vyc2UoY29udGV4dDpBUElDb250ZXh0LCBjb3Vyc2VJZCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZU1hdGVyaWFsLnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiK2NvdXJzZUlkK1wiKV1cIik7XG4gICAgfVxufVxuIl19
