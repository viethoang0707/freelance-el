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
var cache_utils_1 = require("../../helpers/cache.utils");
var search_read_api_1 = require("../../services/api/search-read.api");
var Group = (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.category = undefined;
        _this.order = undefined;
        _this.code = undefined;
        _this.parent_id = undefined;
        return _this;
    }
    Group_1 = Group;
    Group.__api__listUserGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','organization')]");
    };
    Group.listUserGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'organization';
                });
            });
        return Group_1.search(context, [], "[('category','=','organization')]");
    };
    Group.__api__listQuestionGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','question')]");
    };
    Group.listQuestionGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'question';
                });
            });
        return Group_1.search(context, [], "[('category','=','question')]");
    };
    Group.__api__listCourseGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','course')]");
    };
    Group.listCourseGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'course';
                });
            });
        return Group_1.search(context, [], "[('category','=','course')]");
    };
    Group.__api__listCompetencyGroup = function () {
        return new search_read_api_1.SearchReadAPI(Group_1.Model, [], "[('category','=','competency')]");
    };
    Group.listCompetencyGroup = function (context) {
        if (cache_utils_1.Cache.hit(Group_1.Model))
            return Rx_1.Observable.of(cache_utils_1.Cache.load(Group_1.Model)).map(function (groups) {
                return _.filter(groups, function (group) {
                    return group.category == 'competency';
                });
            });
        return Group_1.search(context, [], "[('category','=','competency')]");
    };
    var Group_1;
    Group = Group_1 = __decorate([
        decorator_1.Model('res.groups'),
        __metadata("design:paramtypes", [])
    ], Group);
    return Group;
}(base_model_1.BaseModel));
exports.Group = Group;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFDMUMsOEJBQThDO0FBQzlDLDBDQUFxQztBQUdyQyw4QkFBZ0M7QUFDaEMseURBQWtEO0FBQ2xELHNFQUFtRTtBQUduRTtJQUEyQix5QkFBUztJQUdoQztRQUFBLFlBQ0ksaUJBQU8sU0FPYjtRQUxBLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztJQUNsQyxDQUFDO2NBWFcsS0FBSztJQW1CUCwwQkFBb0IsR0FBM0I7UUFDSSxPQUFPLElBQUksK0JBQWEsQ0FBQyxPQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSxtQkFBYSxHQUFwQixVQUFxQixPQUFrQjtRQUNuQyxJQUFJLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxLQUFLLENBQUM7WUFDdEIsT0FBTyxlQUFVLENBQUMsRUFBRSxDQUFDLG1CQUFLLENBQUMsSUFBSSxDQUFDLE9BQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0JBQ3BELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFXO29CQUNoQyxPQUFPLEtBQUssQ0FBQyxRQUFRLElBQUksY0FBYyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxPQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sOEJBQXdCLEdBQS9CO1FBQ0ksT0FBTyxJQUFJLCtCQUFhLENBQUMsT0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsK0JBQStCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sdUJBQWlCLEdBQXhCLFVBQXlCLE9BQWtCO1FBQ3ZDLElBQUksbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLEtBQUssQ0FBQztZQUN0QixPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsbUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTTtnQkFDcEQsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVc7b0JBQ2hDLE9BQU8sS0FBSyxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxPQUFPLE9BQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSw0QkFBc0IsR0FBN0I7UUFDSSxPQUFPLElBQUksK0JBQWEsQ0FBQyxPQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxxQkFBZSxHQUF0QixVQUF1QixPQUFrQjtRQUNyQyxJQUFJLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxLQUFLLENBQUM7WUFDdEIsT0FBTyxlQUFVLENBQUMsRUFBRSxDQUFDLG1CQUFLLENBQUMsSUFBSSxDQUFDLE9BQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0JBQ3BELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFXO29CQUNoQyxPQUFPLEtBQUssQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxPQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sZ0NBQTBCLEdBQWpDO1FBQ0ksT0FBTyxJQUFJLCtCQUFhLENBQUMsT0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0seUJBQW1CLEdBQTFCLFVBQTJCLE9BQWtCO1FBQ3pDLElBQUksbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLEtBQUssQ0FBQztZQUN0QixPQUFPLGVBQVUsQ0FBQyxFQUFFLENBQUMsbUJBQUssQ0FBQyxJQUFJLENBQUMsT0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTTtnQkFDcEQsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVc7b0JBQ2hDLE9BQU8sS0FBSyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxPQUFPLE9BQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O0lBekVRLEtBQUs7UUFEakIsaUJBQUssQ0FBQyxZQUFZLENBQUM7O09BQ1AsS0FBSyxDQTJFakI7SUFBRCxZQUFDO0NBM0VELEFBMkVDLENBM0UwQixzQkFBUyxHQTJFbkM7QUEzRVksc0JBQUsiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdyZXMuZ3JvdXBzJylcbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jYXRlZ29yeSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm9yZGVyID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY29kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wYXJlbnRfaWQgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIG5hbWU6c3RyaW5nO1xuICAgIGNhdGVnb3J5OiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIG9yZGVyOiBzdHJpbmc7XG4gICAgcGFyZW50X2lkOiBudW1iZXI7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RVc2VyR3JvdXAoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShHcm91cC5Nb2RlbCwgW10sXCJbKCdjYXRlZ29yeScsJz0nLCdvcmdhbml6YXRpb24nKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RVc2VyR3JvdXAoY29udGV4dDpBUElDb250ZXh0KTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBpZiAoQ2FjaGUuaGl0KEdyb3VwLk1vZGVsKSlcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKENhY2hlLmxvYWQoR3JvdXAuTW9kZWwpKS5tYXAoZ3JvdXBzPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihncm91cHMsIChncm91cDpHcm91cCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cC5jYXRlZ29yeSA9PSAnb3JnYW5pemF0aW9uJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gR3JvdXAuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdjYXRlZ29yeScsJz0nLCdvcmdhbml6YXRpb24nKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0UXVlc3Rpb25Hcm91cCgpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEdyb3VwLk1vZGVsLCBbXSxcIlsoJ2NhdGVnb3J5JywnPScsJ3F1ZXN0aW9uJyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0UXVlc3Rpb25Hcm91cChjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoR3JvdXAuTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChHcm91cC5Nb2RlbCkpLm1hcChncm91cHM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGdyb3VwcywgKGdyb3VwOkdyb3VwKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmNhdGVnb3J5ID09ICdxdWVzdGlvbic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEdyb3VwLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY2F0ZWdvcnknLCc9JywncXVlc3Rpb24nKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0Q291cnNlR3JvdXAoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShHcm91cC5Nb2RlbCwgW10sXCJbKCdjYXRlZ29yeScsJz0nLCdjb3Vyc2UnKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RDb3Vyc2VHcm91cChjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChDYWNoZS5oaXQoR3JvdXAuTW9kZWwpKVxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YoQ2FjaGUubG9hZChHcm91cC5Nb2RlbCkpLm1hcChncm91cHM9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGdyb3VwcywgKGdyb3VwOkdyb3VwKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmNhdGVnb3J5ID09ICdjb3Vyc2UnO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBHcm91cC5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2NhdGVnb3J5JywnPScsJ2NvdXJzZScpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RDb21wZXRlbmN5R3JvdXAoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShHcm91cC5Nb2RlbCwgW10sXCJbKCdjYXRlZ29yeScsJz0nLCdjb21wZXRlbmN5JyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0Q29tcGV0ZW5jeUdyb3VwKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKENhY2hlLmhpdChHcm91cC5Nb2RlbCkpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihDYWNoZS5sb2FkKEdyb3VwLk1vZGVsKSkubWFwKGdyb3Vwcz0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoZ3JvdXBzLCAoZ3JvdXA6R3JvdXApPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXAuY2F0ZWdvcnkgPT0gJ2NvbXBldGVuY3knO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBHcm91cC5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2NhdGVnb3J5JywnPScsJ2NvbXBldGVuY3knKV1cIik7XG4gICAgfVxuXG59XG4iXX0=
