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
var CourseSyllabus = (function (_super) {
    __extends(CourseSyllabus, _super);
    function CourseSyllabus() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.course_id = undefined;
        _this.status = undefined;
        _this.supervisor_id = undefined;
        _this.supervisor_name = undefined;
        _this.review_state = undefined;
        _this.unit_count = undefined;
        _this.complete_unit_by_order = undefined;
        return _this;
    }
    CourseSyllabus_1 = CourseSyllabus;
    CourseSyllabus.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseSyllabus_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseSyllabus.listByCourse = function (context, courseId) {
        return CourseSyllabus_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    var CourseSyllabus_1;
    CourseSyllabus = CourseSyllabus_1 = __decorate([
        decorator_1.Model('etraining.syllabus'),
        __metadata("design:paramtypes", [])
    ], CourseSyllabus);
    return CourseSyllabus;
}(base_model_1.BaseModel));
exports.CourseSyllabus = CourseSyllabus;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTBDO0FBRTFDLDBDQUFxQztBQUVyQyxzRUFBbUU7QUFJbkU7SUFBb0Msa0NBQVM7SUFHekM7UUFBQSxZQUNJLGlCQUFPLFNBVWI7UUFSQSxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixLQUFJLENBQUMsYUFBYSxHQUFJLFNBQVMsQ0FBQztRQUNoQyxLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxLQUFJLENBQUMsWUFBWSxHQUFJLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixLQUFJLENBQUMsc0JBQXNCLEdBQUksU0FBUyxDQUFDOztJQUNoRCxDQUFDO3VCQWRXLGNBQWM7SUF5QmhCLGtDQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxnQkFBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFTSwyQkFBWSxHQUFuQixVQUFxQixPQUFrQixFQUFFLFFBQWdCO1FBQ3JELE9BQU8sZ0JBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7SUEvQlEsY0FBYztRQUQxQixpQkFBSyxDQUFDLG9CQUFvQixDQUFDOztPQUNmLGNBQWMsQ0FpQzFCO0lBQUQscUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQ21DLHNCQUFTLEdBaUM1QztBQWpDWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQE1vZGVsKCdldHJhaW5pbmcuc3lsbGFidXMnKVxuZXhwb3J0IGNsYXNzIENvdXJzZVN5bGxhYnVzIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvdXJzZV9pZCA9IHVuZGVmaW5lZDsgICAgICAgIFxuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdXBlcnZpc29yX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdXBlcnZpc29yX25hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmV2aWV3X3N0YXRlID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51bml0X2NvdW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBsZXRlX3VuaXRfYnlfb3JkZXIgPSAgdW5kZWZpbmVkO1xuXHR9ICAgIFxuXG4gICAgcmV2aWV3X3N0YXRlOiBzdHJpbmc7XG4gICAgbmFtZTpzdHJpbmc7XG4gICAgc3RhdHVzOnN0cmluZztcbiAgICBjb3Vyc2VfaWQ6IG51bWJlcjtcbiAgICBzdXBlcnZpc29yX2lkOiBudW1iZXI7XG4gICAgc3VwZXJ2aXNvcl9uYW1lOiBzdHJpbmc7XG4gICAgdW5pdF9jb3VudDogbnVtYmVyO1xuICAgIGNvbXBsZXRlX3VuaXRfYnlfb3JkZXI6IGJvb2xlYW47XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VTeWxsYWJ1cy5Nb2RlbCwgW10sXCJbKCdjb3Vyc2VfaWQnLCc9JyxcIitjb3Vyc2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDb3Vyc2UoIGNvbnRleHQ6QVBJQ29udGV4dCwgY291cnNlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZVN5bGxhYnVzLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
