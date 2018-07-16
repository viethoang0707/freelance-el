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
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var moment = require("moment");
var constants_1 = require("../constants");
var _ = require("underscore");
var cache_utils_1 = require("../../helpers/cache.utils");
var Achivement = (function (_super) {
    __extends(Achivement, _super);
    function Achivement() {
        var _this = _super.call(this) || this;
        _this.course_id = undefined;
        _this.user_group_id = undefined;
        _this.exam_id = undefined;
        _this.user_id = undefined;
        _this.date_acquire = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        _this.competency_level_id = undefined;
        _this.competency_level_name = undefined;
        return _this;
    }
    Achivement_1 = Achivement;
    Achivement.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    Achivement.listByUser = function (context, userId) {
        return Achivement_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Achivement.__api__listByCompetency = function (competencyId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('competency_id','='," + competencyId + ")]");
    };
    Achivement.listByCompetency = function (context, competencyId) {
        return Achivement_1.search(context, [], "[('competency_id','='," + competencyId + ")]");
    };
    Achivement.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('user_group_id','='," + groupId + ")]");
    };
    Achivement.listByGroup = function (context, groupId) {
        return Achivement_1.search(context, [], "[('user_group_id','='," + groupId + ")]");
    };
    Achivement.__api__searchByDate = function (start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "')]");
    };
    Achivement.searchByDate = function (context, start, end) {
        if (cache_utils_1.Cache.hit(Achivement_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Achivement_1.Model)).map(function (skills) {
                return _.filter(skills, function (skill) {
                    return skill.date_acquire.getTime() >= start.getTime() && skill.date_acquire.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Achivement_1.search(context, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "')]");
    };
    Achivement.__api__searchByDateAndCompetency = function (competencyId, start, end) {
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return new search_read_api_1.SearchReadAPI(Achivement_1.Model, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
    };
    Achivement.searchByDateAndCompetency = function (context, competencyId, start, end) {
        if (cache_utils_1.Cache.hit(Achivement_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Achivement_1.Model)).map(function (skills) {
                return _.filter(skills, function (skill) {
                    return skill.date_acquire.getTime() >= start.getTime() && skill.date_acquire.getTime() <= end.getTime() && skill.competency_id == competencyId;
                });
            });
        var startDateStr = moment(start).format(constants_1.SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(constants_1.SERVER_DATETIME_FORMAT);
        return Achivement_1.search(context, [], "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
    };
    var Achivement_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Achivement.prototype, "date_acquire", void 0);
    Achivement = Achivement_1 = __decorate([
        decorator_1.Model('etraining.achivement'),
        __metadata("design:paramtypes", [])
    ], Achivement);
    return Achivement;
}(base_model_1.BaseModel));
exports.Achivement = Achivement;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hY2hpZXZlbWVudC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFDMUMsOEJBQThDO0FBQzlDLDBDQUFtRDtBQUVuRCxzRUFBbUU7QUFDbkUsK0JBQWlDO0FBQ2pDLDBDQUFvRDtBQUdwRCw4QkFBZ0M7QUFDaEMseURBQWtEO0FBR2xEO0lBQWdDLDhCQUFTO0lBR3JDO1FBQUEsWUFDSSxpQkFBTyxTQWFiO1FBWEEsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsS0FBSSxDQUFDLG1CQUFtQixHQUFJLFNBQVMsQ0FBQztRQUN0QyxLQUFJLENBQUMscUJBQXFCLEdBQUksU0FBUyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxtQkFBbUIsR0FBSSxTQUFTLENBQUM7UUFDdEMsS0FBSSxDQUFDLHFCQUFxQixHQUFJLFNBQVMsQ0FBQzs7SUFDekMsQ0FBQzttQkFqQlcsVUFBVTtJQWdDZiw0QkFBaUIsR0FBeEIsVUFBeUIsTUFBYztRQUNoQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLHFCQUFVLEdBQWpCLFVBQW1CLE9BQWtCLEVBQUUsTUFBYztRQUNqRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMs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QyxJQUFJLENBQUMsQ0FBQztJQUNySyxDQUFDOztJQWxFSjtRQURDLHlCQUFhLEVBQVE7a0NBQ1IsSUFBSTtvREFBQztJQXhCUCxVQUFVO1FBRHRCLGlCQUFLLENBQUMsc0JBQXNCLENBQUM7O09BQ2pCLFVBQVUsQ0E2RnRCO0lBQUQsaUJBQUM7Q0E3RkQsQUE2RkMsQ0E3RitCLHNCQUFTLEdBNkZ4QztBQTdGWSxnQ0FBVSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYWNoaWV2ZW1lbnQubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1NFUlZFUl9EQVRFVElNRV9GT1JNQVR9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uL2Nsb3VkL3Rva2VuLm1vZGVsJztcbmltcG9ydCB7IE1hcFV0aWxzIH0gZnJvbSAnLi4vLi4vaGVscGVycy9tYXAudXRpbHMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmFjaGl2ZW1lbnQnKVxuZXhwb3J0IGNsYXNzIEFjaGl2ZW1lbnQgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5jb3Vyc2VfaWQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy51c2VyX2dyb3VwX2lkID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZXhhbV9pZCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5kYXRlX2FjcXVpcmUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb21wZXRlbmN5X2lkID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY29tcGV0ZW5jeV9uYW1lID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY29tcGV0ZW5jeV9ncm91cF9pZCA9ICB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb21wZXRlbmN5X2dyb3VwX25hbWUgPSAgdW5kZWZpbmVkO1xuXHRcdHRoaXMuY29tcGV0ZW5jeV9sZXZlbF9pZCA9ICB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb21wZXRlbmN5X2xldmVsX25hbWUgPSAgdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBjb3Vyc2VfaWQ6bnVtYmVyO1xuICAgIGV4YW1faWQ6IG51bWJlcjtcblx0dXNlcl9pZDogbnVtYmVyO1xuXHR1c2VyX2dyb3VwX2lkOiBudW1iZXI7XG5cdEBGaWVsZFByb3BlcnR5PERhdGU+KClcblx0ZGF0ZV9hY3F1aXJlOiBEYXRlO1xuXHRjb21wZXRlbmN5X2lkOiBudW1iZXI7XG5cdGNvbXBldGVuY3lfbmFtZTogc3RyaW5nO1xuXHRjb21wZXRlbmN5X2dyb3VwX2lkOiBudW1iZXI7XG5cdGNvbXBldGVuY3lfZ3JvdXBfbmFtZTogc3RyaW5nO1xuXHRjb21wZXRlbmN5X2xldmVsX2lkOiBudW1iZXI7XG5cdGNvbXBldGVuY3lfbGV2ZWxfbmFtZTogc3RyaW5nO1xuXG5cdHN0YXRpYyBfX2FwaV9fbGlzdEJ5VXNlcih1c2VySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQWNoaXZlbWVudC5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVVzZXIoIGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBBY2hpdmVtZW50LnNlYXJjaChjb250ZXh0LFtdLFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q29tcGV0ZW5jeShjb21wZXRlbmN5SWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQWNoaXZlbWVudC5Nb2RlbCwgW10sXCJbKCdjb21wZXRlbmN5X2lkJywnPScsXCIrY29tcGV0ZW5jeUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUNvbXBldGVuY3koIGNvbnRleHQ6QVBJQ29udGV4dCwgY29tcGV0ZW5jeUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBBY2hpdmVtZW50LnNlYXJjaChjb250ZXh0LFtdLFwiWygnY29tcGV0ZW5jeV9pZCcsJz0nLFwiK2NvbXBldGVuY3lJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5R3JvdXAoZ3JvdXBJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShBY2hpdmVtZW50Lk1vZGVsLCBbXSxcIlsoJ3VzZXJfZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUdyb3VwKCBjb250ZXh0OkFQSUNvbnRleHQsIGdyb3VwSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEFjaGl2ZW1lbnQuc2VhcmNoKGNvbnRleHQsW10sXCJbKCd1c2VyX2dyb3VwX2lkJywnPScsXCIrZ3JvdXBJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fc2VhcmNoQnlEYXRlKHN0YXJ0OkRhdGUsIGVuZDpEYXRlKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHZhciBzdGFydERhdGVTdHIgPSBtb21lbnQoc3RhcnQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgdmFyIGVuZERhdGVTdHIgPSBtb21lbnQoZW5kKS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShBY2hpdmVtZW50Lk1vZGVsLCBbXSxcIlsoJ2RhdGVfYWNxdWlyZScsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdkYXRlX2FjcXVpcmUnLCc8PScsJ1wiK2VuZERhdGVTdHIrXCInKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlYXJjaEJ5RGF0ZShjb250ZXh0OkFQSUNvbnRleHQsIHN0YXJ0OkRhdGUsIGVuZDpEYXRlKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KEFjaGl2ZW1lbnQuTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChBY2hpdmVtZW50Lk1vZGVsKSkubWFwKHNraWxscz0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoc2tpbGxzLCAoc2tpbGw6QWNoaXZlbWVudCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBza2lsbC5kYXRlX2FjcXVpcmUuZ2V0VGltZSgpID49ICBzdGFydC5nZXRUaW1lKCkgJiYgc2tpbGwuZGF0ZV9hY3F1aXJlLmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBzdGFydERhdGVTdHIgPSBtb21lbnQoc3RhcnQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgdmFyIGVuZERhdGVTdHIgPSBtb21lbnQoZW5kKS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHJldHVybiBBY2hpdmVtZW50LnNlYXJjaChjb250ZXh0LFtdLFwiWygnZGF0ZV9hY3F1aXJlJywnPj0nLCdcIitzdGFydERhdGVTdHIrXCInKSwoJ2RhdGVfYWNxdWlyZScsJzw9JywnXCIrZW5kRGF0ZVN0citcIicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX3NlYXJjaEJ5RGF0ZUFuZENvbXBldGVuY3koY29tcGV0ZW5jeUlkOiBudW1iZXIsIHN0YXJ0OkRhdGUsIGVuZDpEYXRlKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHZhciBzdGFydERhdGVTdHIgPSBtb21lbnQoc3RhcnQpLmZvcm1hdChTRVJWRVJfREFURVRJTUVfRk9STUFUKTtcbiAgICAgICAgdmFyIGVuZERhdGVTdHIgPSBtb21lbnQoZW5kKS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShBY2hpdmVtZW50Lk1vZGVsLCBbXSxcIlsoJ2RhdGVfYWNxdWlyZScsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdkYXRlX2FjcXVpcmUnLCc8PScsJ1wiK2VuZERhdGVTdHIrXCInKSwoJ2NvbXBldGVuY3lfaWQnLCc8PScsXCIrY29tcGV0ZW5jeUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIHNlYXJjaEJ5RGF0ZUFuZENvbXBldGVuY3koY29udGV4dDpBUElDb250ZXh0LCBjb21wZXRlbmN5SWQ6bnVtYmVyLCBzdGFydDpEYXRlLCBlbmQ6RGF0ZSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChBY2hpdmVtZW50Lk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoQWNoaXZlbWVudC5Nb2RlbCkpLm1hcChza2lsbHM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHNraWxscywgKHNraWxsOkFjaGl2ZW1lbnQpPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2tpbGwuZGF0ZV9hY3F1aXJlLmdldFRpbWUoKSA+PSAgc3RhcnQuZ2V0VGltZSgpICYmIHNraWxsLmRhdGVfYWNxdWlyZS5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSAmJiBza2lsbC5jb21wZXRlbmN5X2lkID09IGNvbXBldGVuY3lJZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgc3RhcnREYXRlU3RyID0gbW9tZW50KHN0YXJ0KS5mb3JtYXQoU0VSVkVSX0RBVEVUSU1FX0ZPUk1BVCk7XG4gICAgICAgIHZhciBlbmREYXRlU3RyID0gbW9tZW50KGVuZCkuZm9ybWF0KFNFUlZFUl9EQVRFVElNRV9GT1JNQVQpO1xuICAgICAgICByZXR1cm4gQWNoaXZlbWVudC5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2RhdGVfYWNxdWlyZScsJz49JywnXCIrc3RhcnREYXRlU3RyK1wiJyksKCdkYXRlX2FjcXVpcmUnLCc8PScsJ1wiK2VuZERhdGVTdHIrXCInKSwoJ2NvbXBldGVuY3lfaWQnLCc8PScsXCIrY29tcGV0ZW5jeUlkK1wiKV1cIik7XG4gICAgfVxuXG5cbn0iXX0=
