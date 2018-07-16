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
var search_count_api_1 = require("../../services/api/search-count.api");
var _ = require("underscore");
var CourseUnit = (function (_super) {
    __extends(CourseUnit, _super);
    function CourseUnit() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.lecture = undefined;
        _this.type = undefined;
        _this.order = undefined;
        _this.parent_id = undefined;
        _this.syllabus_id = undefined;
        _this.icon = undefined;
        _this.status = undefined;
        _this.course_id = undefined;
        return _this;
    }
    CourseUnit_1 = CourseUnit;
    CourseUnit.__api__listBySyllabus = function (sylId) {
        return new search_read_api_1.SearchReadAPI(CourseUnit_1.Model, [], "[('syllabus_id','='," + sylId + ")]");
    };
    CourseUnit.listBySyllabus = function (context, sylId) {
        return CourseUnit_1.search(context, [], "[('syllabus_id','='," + sylId + ")]");
    };
    CourseUnit.__api__listByCourse = function (courseId) {
        return new search_read_api_1.SearchReadAPI(CourseUnit_1.Model, [], "[('course_id','='," + courseId + ")]");
    };
    CourseUnit.listByCourse = function (context, courseId) {
        return CourseUnit_1.search(context, [], "[('course_id','='," + courseId + ")]");
    };
    CourseUnit.__api__countBySyllabus = function (sylId) {
        return new search_count_api_1.SearchCountAPI(CourseUnit_1.Model, "[('syllabus_id','='," + sylId + "),('type','!=','folder')]");
    };
    CourseUnit.countBySyllabus = function (context, sylId) {
        return CourseUnit_1.count(context, "[('syllabus_id','='," + sylId + "),('type','!=','folder')]");
    };
    CourseUnit.countBySyllabusArray = function (context, sylIds) {
        var _this = this;
        var apiList = _.map(sylIds, function (sylId) {
            return _this.__api__countBySyllabus(sylId);
        });
        return base_model_1.BaseModel.bulk_count.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        });
    };
    var CourseUnit_1;
    CourseUnit = CourseUnit_1 = __decorate([
        decorator_1.Model('etraining.course_unit'),
        __metadata("design:paramtypes", [])
    ], CourseUnit);
    return CourseUnit;
}(base_model_1.BaseModel));
exports.CourseUnit = CourseUnit;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFFMUMsMENBQXFDO0FBR3JDLHNFQUFtRTtBQUVuRSx3RUFBcUU7QUFDckUsOEJBQWdDO0FBR2hDO0lBQWdDLDhCQUFTO0lBR3JDO1FBQUEsWUFDSSxpQkFBTyxTQVdiO1FBVEEsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDaEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUM7O0lBQ25DLENBQUM7bUJBZlcsVUFBVTtJQTJCWixnQ0FBcUIsR0FBNUIsVUFBNkIsS0FBYTtRQUN0QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxzQkFBc0IsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLHlCQUFjLEdBQXJCLFVBQXNCLE9BQWtCLEVBQUUsS0FBWTtRQUNsRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSxzQkFBc0IsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLDhCQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLHVCQUFZLEdBQW5CLFVBQW9CLE9BQWtCLEVBQUUsUUFBZTtRQUNuRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLGlDQUFzQixHQUE3QixVQUE4QixLQUFhO1FBQ3ZDLE9BQU8sSUFBSSxpQ0FBYyxDQUFDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLEdBQUMsS0FBSyxHQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVNLDBCQUFlLEdBQXRCLFVBQXVCLE9BQWtCLEVBQUUsS0FBWTtRQUNuRCxPQUFPLFlBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLHNCQUFzQixHQUFDLEtBQUssR0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFTSwrQkFBb0IsR0FBM0IsVUFBNEIsT0FBa0IsRUFBRSxNQUFnQjtRQUFoRSxpQkFPQztRQU5HLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUEsS0FBSztZQUM3QixPQUFPLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sc0JBQVMsQ0FBQyxVQUFVLE9BQXBCLHNCQUFTLEdBQVksT0FBTyxTQUFLLE9BQU8sR0FBRSxHQUFHLENBQUMsVUFBQSxPQUFPO1lBQ3hELE9BQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBMURRLFVBQVU7UUFEdEIsaUJBQUssQ0FBQyx1QkFBdUIsQ0FBQzs7T0FDbEIsVUFBVSxDQTJEdEI7SUFBRCxpQkFBQztDQTNERCxBQTJEQyxDQTNEK0Isc0JBQVMsR0EyRHhDO0FBM0RZLGdDQUFVIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi9sb2cubW9kZWwnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IFNlYXJjaENvdW50QVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1jb3VudC5hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQE1vZGVsKCdldHJhaW5pbmcuY291cnNlX3VuaXQnKVxuZXhwb3J0IGNsYXNzIENvdXJzZVVuaXQgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxlY3R1cmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcmRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wYXJlbnRfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3lsbGFidXNfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaWNvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX2lkID0gIHVuZGVmaW5lZDtcblx0fVxuXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgcGFyZW50X2lkOiBudW1iZXI7XG4gICAgY291cnNlX2lkOiBudW1iZXI7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBpY29uOiBzdHJpbmc7XG4gICAgc3lsbGFidXNfaWQ6IG51bWJlcjtcbiAgICBsZWN0dXJlOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTeWxsYWJ1cyhzeWxJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VVbml0Lk1vZGVsLCBbXSxcIlsoJ3N5bGxhYnVzX2lkJywnPScsXCIrc3lsSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3lsbGFidXMoY29udGV4dDpBUElDb250ZXh0LCBzeWxJZDpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBDb3Vyc2VVbml0LnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ3N5bGxhYnVzX2lkJywnPScsXCIrc3lsSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZShjb3Vyc2VJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb3Vyc2VVbml0Lk1vZGVsLCBbXSxcIlsoJ2NvdXJzZV9pZCcsJz0nLFwiK2NvdXJzZUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUNvdXJzZShjb250ZXh0OkFQSUNvbnRleHQsIGNvdXJzZUlkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZVVuaXQuc2VhcmNoKGNvbnRleHQsW10sIFwiWygnY291cnNlX2lkJywnPScsXCIrY291cnNlSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2NvdW50QnlTeWxsYWJ1cyhzeWxJZDogbnVtYmVyKTogU2VhcmNoQ291bnRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaENvdW50QVBJKENvdXJzZVVuaXQuTW9kZWwsIFwiWygnc3lsbGFidXNfaWQnLCc9JyxcIitzeWxJZCtcIiksKCd0eXBlJywnIT0nLCdmb2xkZXInKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvdW50QnlTeWxsYWJ1cyhjb250ZXh0OkFQSUNvbnRleHQsIHN5bElkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvdXJzZVVuaXQuY291bnQoY29udGV4dCwgXCJbKCdzeWxsYWJ1c19pZCcsJz0nLFwiK3N5bElkK1wiKSwoJ3R5cGUnLCchPScsJ2ZvbGRlcicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY291bnRCeVN5bGxhYnVzQXJyYXkoY29udGV4dDpBUElDb250ZXh0LCBzeWxJZHM6IG51bWJlcltdKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKHN5bElkcywgc3lsSWQ9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2FwaV9fY291bnRCeVN5bGxhYnVzKHN5bElkKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIEJhc2VNb2RlbC5idWxrX2NvdW50KGNvbnRleHQsIC4uLmFwaUxpc3QpLm1hcChqc29uQXJyPT4ge1xuICAgICAgICAgICAgcmV0dXJuICBfLmZsYXR0ZW4oanNvbkFycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
