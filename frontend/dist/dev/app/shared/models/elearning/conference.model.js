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
var execute_api_1 = require("../../services/api/execute.api");
var search_read_api_1 = require("../../services/api/search-read.api");
var Conference = (function (_super) {
    __extends(Conference, _super);
    function Conference() {
        var _this = _super.call(this) || this;
        _this.class_id = undefined;
        _this.room_ref = undefined;
        _this.name = undefined;
        _this.status = undefined;
        _this.room_pass = undefined;
        return _this;
    }
    Conference_1 = Conference;
    Conference.__api__listOpenConference = function (classId) {
        return new search_read_api_1.SearchReadAPI(Conference_1.Model, [], "[('status','=','open')]");
    };
    Conference.listOpenConference = function (context) {
        return Conference_1.search(context, [], "[('status','=','open')]");
    };
    Conference.prototype.__api__open = function (conferenceId) {
        return new execute_api_1.ExecuteAPI(Conference_1.Model, 'open', { conferenceId: conferenceId }, null);
    };
    Conference.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    Conference.prototype.__api__close = function (conferenceId) {
        return new execute_api_1.ExecuteAPI(Conference_1.Model, 'close', { conferenceId: conferenceId }, null);
    };
    Conference.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    var Conference_1;
    Conference = Conference_1 = __decorate([
        decorator_1.Model('etraining.conference'),
        __metadata("design:paramtypes", [])
    ], Conference);
    return Conference;
}(base_model_1.BaseModel));
exports.Conference = Conference;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb25mZXJlbmNlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUkxQywwQ0FBbUQ7QUFHbkQsOERBQTREO0FBQzVELHNFQUFtRTtBQUluRTtJQUFnQyw4QkFBUztJQUVyQztRQUFBLFlBQ0ksaUJBQU8sU0FNVjtRQUxHLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztJQUMvQixDQUFDO21CQVRRLFVBQVU7SUFpQlosb0NBQXlCLEdBQWhDLFVBQWlDLE9BQWU7UUFDNUMsT0FBTyxJQUFJLCtCQUFhLENBQUMsWUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sNkJBQWtCLEdBQXpCLFVBQTBCLE9BQWtCO1FBQ3hDLE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxZQUFvQjtRQUM1QixPQUFPLElBQUksd0JBQVUsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQseUJBQUksR0FBSixVQUFLLE9BQWtCO1FBQ25CLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3ZELE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGlDQUFZLEdBQVosVUFBYSxZQUFvQjtRQUM3QixPQUFPLElBQUksd0JBQVUsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsMEJBQUssR0FBTCxVQUFNLE9BQWtCO1FBQ3BCLE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3hELE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7SUF6Q1EsVUFBVTtRQUR0QixpQkFBSyxDQUFDLHNCQUFzQixDQUFDOztPQUNqQixVQUFVLENBMEN0QjtJQUFELGlCQUFDO0NBMUNELEFBMENDLENBMUMrQixzQkFBUyxHQTBDeEM7QUExQ1ksZ0NBQVUiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwsRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgRXhlY3V0ZUFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9leGVjdXRlLmFwaSc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb25mZXJlbmNlJylcbmV4cG9ydCBjbGFzcyBDb25mZXJlbmNlIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jbGFzc19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yb29tX3JlZiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yb29tX3Bhc3MgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY2xhc3NfaWQ6IG51bWJlcjtcbiAgICByb29tX3JlZjogc3RyaW5nO1xuICAgIHJvb21fcGFzczogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdE9wZW5Db25mZXJlbmNlKGNsYXNzSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ29uZmVyZW5jZS5Nb2RlbCwgW10sXCJbKCdzdGF0dXMnLCc9Jywnb3BlbicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdE9wZW5Db25mZXJlbmNlKGNvbnRleHQ6QVBJQ29udGV4dCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvbmZlcmVuY2Uuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdGF0dXMnLCc9Jywnb3BlbicpXVwiKTtcbiAgICB9XG5cbiAgICBfX2FwaV9fb3Blbihjb25mZXJlbmNlSWQ6IG51bWJlcik6IEV4ZWN1dGVBUEkge1xuICAgICAgICByZXR1cm4gbmV3IEV4ZWN1dGVBUEkoQ29uZmVyZW5jZS5Nb2RlbCwgJ29wZW4nLHtjb25mZXJlbmNlSWQ6Y29uZmVyZW5jZUlkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgb3Blbihjb250ZXh0OkFQSUNvbnRleHQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmFwaVNlcnZpY2UuZXhlY3V0ZSh0aGlzLl9fYXBpX19vcGVuKHRoaXMuaWQpLCBcbiAgICAgICAgICAgIGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfVxuXG4gICAgX19hcGlfX2Nsb3NlKGNvbmZlcmVuY2VJZDogbnVtYmVyKTogRXhlY3V0ZUFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhlY3V0ZUFQSShDb25mZXJlbmNlLk1vZGVsLCAnY2xvc2UnLHtjb25mZXJlbmNlSWQ6Y29uZmVyZW5jZUlkfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgY2xvc2UoY29udGV4dDpBUElDb250ZXh0KTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gY29udGV4dC5hcGlTZXJ2aWNlLmV4ZWN1dGUodGhpcy5fX2FwaV9fY2xvc2UodGhpcy5pZCksIFxuICAgICAgICAgICAgY29udGV4dC5hdXRoU2VydmljZS5Mb2dpblRva2VuKTtcbiAgICB9XG59Il19
