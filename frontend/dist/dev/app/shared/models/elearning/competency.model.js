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
var _ = require("underscore");
var search_read_api_1 = require("../../services/api/search-read.api");
var competency_level_model_1 = require("./competency-level.model");
var Competency = (function (_super) {
    __extends(Competency, _super);
    function Competency() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.group_id = undefined;
        _this.category = undefined;
        _this.group_id__DESC__ = undefined;
        _this.group_name = undefined;
        _this.levels = [];
        return _this;
    }
    Competency_1 = Competency;
    Competency.prototype.levelSummary = function () {
        return _.reduce(this.levels, function (memo, level) { return memo + level["name"] + ','; }, '');
    };
    Competency.__api__listByGroup = function (groupId) {
        return new search_read_api_1.SearchReadAPI(Competency_1.Model, [], "[('group_id','='," + groupId + ")]");
    };
    Competency.listByGroup = function (context, groupId) {
        return Competency_1.search(context, [], "[('group_id','='," + groupId + ")]");
    };
    Competency.__api__listByGroups = function (groupIds) {
        var apiList = [];
        _.each(groupIds, function (groupId) {
            apiList.push(Competency_1.__api__listByGroup(groupId));
        });
        return apiList;
    };
    Competency.listByGroups = function (context, groupIds) {
        var apiList = [];
        _.each(groupIds, function (groupId) {
            apiList.push(Competency_1.__api__listByGroup(groupId));
        });
        return context.apiService.execute(Competency_1.__api__bulk_search(apiList), context.authService.LoginToken).map(function (questionArrs) {
            return _.flatten(questionArrs);
        });
    };
    Competency.prototype.__api__populateLevel = function () {
        return competency_level_model_1.CompetencyLevel.__api__listByCompetency(this.id);
    };
    Competency.prototype.populateLevel = function (context) {
        var _this = this;
        if (this.id)
            return competency_level_model_1.CompetencyLevel.listByCompetency(context, this.id).map(function (levels) {
                _this.levels = levels;
                return _this;
            });
        else
            return Rx_1.Observable.of(this);
    };
    Competency.populateLevels = function (context, competencies) {
        var apiList = _.map(competencies, function (question) {
            return question.__api__populateLevel();
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            return _.flatten(jsonArr);
        })
            .do(function (jsonArr) {
            var levels = competency_level_model_1.CompetencyLevel.toArray(jsonArr);
            _.each(competencies, function (competency) {
                competency.levels = _.filter(levels, function (level) {
                    return level.competency_id == competency.id;
                });
            });
        });
    };
    var Competency_1;
    Competency = Competency_1 = __decorate([
        decorator_1.Model('etraining.competency'),
        __metadata("design:paramtypes", [])
    ], Competency);
    return Competency;
}(base_model_1.BaseModel));
exports.Competency = Competency;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wZXRlbmN5Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUMxQyw4QkFBOEM7QUFDOUMsMENBQXFDO0FBR3JDLDhCQUFnQztBQUNoQyxzRUFBbUU7QUFDbkUsbUVBQTJEO0FBRzNEO0lBQWdDLDhCQUFTO0lBR3JDO1FBQUEsWUFDSSxpQkFBTyxTQVFiO1FBTkEsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUNsQyxLQUFJLENBQUMsVUFBVSxHQUFJLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7SUFDeEIsQ0FBQzttQkFaVyxVQUFVO0lBcUJuQixpQ0FBWSxHQUFaO1FBQ0ksT0FBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBUyxJQUFJLEVBQUUsS0FBSyxJQUFJLE9BQU8sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVNLDZCQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLG1CQUFtQixHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU0sc0JBQVcsR0FBbEIsVUFBbUIsT0FBa0IsRUFBRSxPQUFjO1FBQ2pELE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFDLG1CQUFtQixHQUFD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bGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBDb21wZXRlbmN5TGV2ZWwgfSBmcm9tICcuL2NvbXBldGVuY3ktbGV2ZWwubW9kZWwnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb21wZXRlbmN5JylcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5IGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmdyb3VwX2lkID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY2F0ZWdvcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ncm91cF9uYW1lID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5sZXZlbHMgPSBbXTtcblx0fVxuXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgZ3JvdXBfbmFtZTpzdHJpbmc7XG4gICAgZ3JvdXBfaWQ6IG51bWJlcjtcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuICAgIGdyb3VwX2lkX19ERVNDX186IHN0cmluZztcbiAgICBsZXZlbHM6IENvbXBldGVuY3lMZXZlbFtdO1xuXG4gICAgbGV2ZWxTdW1tYXJ5KCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICBfLnJlZHVjZSh0aGlzLmxldmVscywgZnVuY3Rpb24obWVtbywgbGV2ZWwpIHsgcmV0dXJuIG1lbW8gKyBsZXZlbFtcIm5hbWVcIl0gKyAnLCc7IH0sICcnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUdyb3VwKGdyb3VwSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ29tcGV0ZW5jeS5Nb2RlbCwgW10sXCJbKCdncm91cF9pZCcsJz0nLFwiK2dyb3VwSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5R3JvdXAoY29udGV4dDpBUElDb250ZXh0LCBncm91cElkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvbXBldGVuY3kuc2VhcmNoKGNvbnRleHQsIFtdLFwiWygnZ3JvdXBfaWQnLCc9JyxcIitncm91cElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlHcm91cHMoZ3JvdXBJZHM6IG51bWJlcltdKTogU2VhcmNoUmVhZEFQSVtdIHtcbiAgICAgICAgdmFyIGFwaUxpc3QgPSBbXTtcbiAgICAgICAgXy5lYWNoKGdyb3VwSWRzLCAoZ3JvdXBJZCk9PiB7XG4gICAgICAgICAgICBhcGlMaXN0LnB1c2goQ29tcGV0ZW5jeS5fX2FwaV9fbGlzdEJ5R3JvdXAoZ3JvdXBJZCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFwaUxpc3RcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5R3JvdXBzKGNvbnRleHQ6QVBJQ29udGV4dCwgZ3JvdXBJZHM6bnVtYmVyW10pOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBhcGlMaXN0ID0gW107XG4gICAgICAgIF8uZWFjaChncm91cElkcywgKGdyb3VwSWQpPT4ge1xuICAgICAgICAgICAgYXBpTGlzdC5wdXNoKENvbXBldGVuY3kuX19hcGlfX2xpc3RCeUdyb3VwKGdyb3VwSWQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZShDb21wZXRlbmN5Ll9fYXBpX19idWxrX3NlYXJjaChhcGlMaXN0KSwgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKS5tYXAocXVlc3Rpb25BcnJzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLmZsYXR0ZW4ocXVlc3Rpb25BcnJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBfX2FwaV9fcG9wdWxhdGVMZXZlbCgpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIENvbXBldGVuY3lMZXZlbC5fX2FwaV9fbGlzdEJ5Q29tcGV0ZW5jeSh0aGlzLmlkKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUxldmVsKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICByZXR1cm4gQ29tcGV0ZW5jeUxldmVsLmxpc3RCeUNvbXBldGVuY3koY29udGV4dCx0aGlzLmlkKS5tYXAobGV2ZWxzPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxzID0gIGxldmVscztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9wdWxhdGVMZXZlbHMoY29udGV4dDpBUElDb250ZXh0LCBjb21wZXRlbmNpZXM6IENvbXBldGVuY3lbXSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdmFyIGFwaUxpc3QgPSBfLm1hcChjb21wZXRlbmNpZXMsKHF1ZXN0aW9uOkNvbXBldGVuY3kpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXN0aW9uLl9fYXBpX19wb3B1bGF0ZUxldmVsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKGNvbnRleHQsIC4uLmFwaUxpc3QpXG4gICAgICAgIC5tYXAoanNvbkFyciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKGpzb25BcnIpO1xuICAgICAgICB9KVxuICAgICAgICAuZG8oanNvbkFycj0+IHtcbiAgICAgICAgICAgIHZhciBsZXZlbHMgPSBDb21wZXRlbmN5TGV2ZWwudG9BcnJheShqc29uQXJyKTtcbiAgICAgICAgICAgIF8uZWFjaChjb21wZXRlbmNpZXMsIChjb21wZXRlbmN5OkNvbXBldGVuY3kpPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBldGVuY3kubGV2ZWxzID0gIF8uZmlsdGVyKGxldmVscywgKGxldmVsOkNvbXBldGVuY3lMZXZlbCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbC5jb21wZXRlbmN5X2lkID09IGNvbXBldGVuY3kuaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cbiJdfQ==
