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
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var _ = require("underscore");
var CompetencyLevel = (function (_super) {
    __extends(CompetencyLevel, _super);
    function CompetencyLevel() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.order = undefined;
        _this.competency_id = undefined;
        _this.competency_name = undefined;
        _this.competency_group_id = undefined;
        _this.competency_group_name = undefined;
        return _this;
    }
    CompetencyLevel_1 = CompetencyLevel;
    CompetencyLevel.__api__listByCompetency = function (competencyId) {
        return new search_read_api_1.SearchReadAPI(CompetencyLevel_1.Model, [], "[('competency_id','='," + competencyId + ")]");
    };
    CompetencyLevel.listByCompetency = function (context, competencyId) {
        if (cache_utils_1.Cache.hit(CompetencyLevel_1.Model)) {
            var levels = cache_utils_1.Cache.load(CompetencyLevel_1.Model);
            levels = _.filter(levels, function (level) {
                return level.competency_id == competencyId;
            });
            return Rx_1.Observable.of(levels);
        }
        return CompetencyLevel_1.search(context, [], "[('competency_id','='," + competencyId + ")]");
    };
    var CompetencyLevel_1;
    CompetencyLevel = CompetencyLevel_1 = __decorate([
        decorator_1.Model('etraining.competency_level'),
        __metadata("design:paramtypes", [])
    ], CompetencyLevel);
    return CompetencyLevel;
}(base_model_1.BaseModel));
exports.CompetencyLevel = CompetencyLevel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wZXRlbmN5LWxldmVsLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQXFDO0FBRXJDLHlEQUFrRDtBQUNsRCxzRUFBbUU7QUFDbkUsOEJBQWdDO0FBR2hDO0lBQXFDLG1DQUFTO0lBRzFDO1FBQUEsWUFDSSxpQkFBTyxTQVFiO1FBTkEsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztRQUNyQyxLQUFJLENBQUMscUJBQXFCLEdBQUcsU0FBUyxDQUFDOztJQUM5QyxDQUFDO3dCQVpXLGVBQWU7SUFxQmpCLHVDQUF1QixHQUE5QixVQUErQixZQUFvQjtRQUMvQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxpQkFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsd0JBQXdCLEdBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTSxnQ0FBZ0IsR0FBdkIsVUFBd0IsT0FBa0IsRUFBRSxZQUFtQjtRQUMzRCxJQUFJLG1CQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxNQUFNLEdBQUcsbUJBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxNQUFNLEdBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFxQjtnQkFDN0MsT0FBTyxLQUFLLENBQUMsYUFBYSxJQUFLLFlBQVksQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sZUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8saUJBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSx3QkFBd0IsR0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7SUFsQ1EsZUFBZTtRQUQzQixpQkFBSyxDQUFDLDRCQUE0QixDQUFDOztPQUN2QixlQUFlLENBb0MzQjtJQUFELHNCQUFDO0NBcENELEFBb0NDLENBcENvQyxzQkFBUyxHQW9DN0M7QUFwQ1ksMENBQWUiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3ktbGV2ZWwubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb21wZXRlbmN5X2xldmVsJylcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5TGV2ZWwgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMub3JkZXIgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb21wZXRlbmN5X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5X2dyb3VwX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lfZ3JvdXBfbmFtZSA9IHVuZGVmaW5lZDtcblx0fVxuXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgb3JkZXI6IG51bWJlcjtcbiAgICBjb21wZXRlbmN5X2lkOiBudW1iZXI7XG4gICAgY29tcGV0ZW5jeV9uYW1lOiBzdHJpbmc7XG4gICAgY29tcGV0ZW5jeV9ncm91cF9pZDogbnVtYmVyO1xuICAgIGNvbXBldGVuY3lfZ3JvdXBfbmFtZTogc3RyaW5nO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlDb21wZXRlbmN5KGNvbXBldGVuY3lJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb21wZXRlbmN5TGV2ZWwuTW9kZWwsIFtdLFwiWygnY29tcGV0ZW5jeV9pZCcsJz0nLFwiK2NvbXBldGVuY3lJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDb21wZXRlbmN5KGNvbnRleHQ6QVBJQ29udGV4dCwgY29tcGV0ZW5jeUlkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChDb21wZXRlbmN5TGV2ZWwuTW9kZWwpKSB7XG4gICAgICAgICAgICB2YXIgbGV2ZWxzID0gQ2FjaGUubG9hZChDb21wZXRlbmN5TGV2ZWwuTW9kZWwpO1xuICAgICAgICAgICAgbGV2ZWxzID0gIF8uZmlsdGVyKGxldmVscywgKGxldmVsOkNvbXBldGVuY3lMZXZlbCk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsLmNvbXBldGVuY3lfaWQgPT0gIGNvbXBldGVuY3lJZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YobGV2ZWxzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tcGV0ZW5jeUxldmVsLnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2NvbXBldGVuY3lfaWQnLCc9JyxcIitjb21wZXRlbmN5SWQrXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
