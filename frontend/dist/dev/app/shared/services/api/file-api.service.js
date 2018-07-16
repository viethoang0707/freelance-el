"use strict";
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var env_config_1 = require("../../../env.config");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var app_event_manager_service_1 = require("../app-event-manager.service");
var FileAPIService = (function () {
    function FileAPIService(http, appEvent) {
        this.http = http;
        this.appEvent = appEvent;
    }
    FileAPIService.prototype.upload = function (file, cloudid) {
        var _this = this;
        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/upload', formData, options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error.json());
        });
    };
    FileAPIService.prototype.unzip = function (filename, cloudid) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/unzip', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error);
        });
    };
    FileAPIService.prototype.convert2Pdf = function (filename, cloudid) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.appEvent.startHttpTransaction();
        return this.http.post(env_config_1.Config.CLOUD_ENDPOINT + '/file/convert2pdf', JSON.stringify({ cloudid: cloudid, filename: filename }), options)
            .map(function (res) { return res.json(); })
            .do(function () {
            _this.appEvent.finishHttpTransaction();
        })
            .catch(function (error) {
            _this.appEvent.finishHttpTransaction();
            return Rx_1.Observable.throw(error);
        });
    };
    FileAPIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_event_manager_service_1.AppEventManager])
    ], FileAPIService);
    return FileAPIService;
}());
exports.FileAPIService = FileAPIService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2ZpbGUtYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBQ3hFLGtEQUE2QztBQUM3QyxpQ0FBK0I7QUFDL0IsOEJBQThDO0FBQzlDLDBFQUErRDtBQUcvRDtJQUNJLHdCQUFvQixJQUFVLEVBQVUsUUFBeUI7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWlCO0lBQUksQ0FBQztJQUd0RSwrQkFBTSxHQUFOLFVBQU8sSUFBUyxFQUFFLE9BQWU7UUFBakMsaUJBaUJDO1FBaEJHLElBQUksUUFBUSxHQUFZLElBQUksUUFBUSxFQUFFLENBQUM7UUFDdkMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQU0sQ0FBQyxjQUFjLEdBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDMUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixFQUFFLENBQUM7WUFDQSxLQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNSLEtBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxPQUFPLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFBQSxDQUFDLENBQ3pDLENBQUM7SUFDVixDQUFDO0lBRUQsOEJBQUssR0FBTCxVQUFNLFFBQWEsRUFBRSxPQUFlO1FBQXBDLGlCQWFDO1FBWkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFNLENBQUMsY0FBYyxHQUFHLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUM7YUFDeEgsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixFQUFFLENBQUM7WUFDQSxLQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNSLEtBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxPQUFPLGVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFBQSxDQUFDLENBQ2xDLENBQUM7SUFDVixDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLFFBQWEsRUFBRSxPQUFlO1FBQTFDLGlCQWFDO1FBWkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFNLENBQUMsY0FBYyxHQUFHLG1CQUFtQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQzthQUM5SCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDO2FBQ3RCLEVBQUUsQ0FBQztZQUNBLEtBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLE9BQU8sZUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUFBLENBQUMsQ0FDbEMsQ0FBQztJQUNWLENBQUM7SUFuRFEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUVpQixXQUFJLEVBQW9CLDJDQUFlO09BRHhELGNBQWMsQ0FxRDFCO0lBQUQscUJBQUM7Q0FyREQsQUFxREMsSUFBQTtBQXJEWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS9maWxlLWFwaS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9lbnYuY29uZmlnJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEFwcEV2ZW50TWFuYWdlciB9IGZyb20gJy4uL2FwcC1ldmVudC1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZUFQSVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBhcHBFdmVudDogQXBwRXZlbnRNYW5hZ2VyKSB7IH1cblxuICAgIFxuICAgIHVwbG9hZChmaWxlOiBhbnksIGNsb3VkaWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICBsZXQgZm9ybURhdGE6Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdjbG91ZGlkJywgY2xvdWRpZC50b1N0cmluZygpKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICB0aGlzLmFwcEV2ZW50LnN0YXJ0SHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChDb25maWcuQ0xPVURfRU5EUE9JTlQgKycvZmlsZS91cGxvYWQnLCBmb3JtRGF0YSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAuZG8oKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC5maW5pc2hIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcEV2ZW50LmZpbmlzaEh0dHBUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSl9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHVuemlwKGZpbGVuYW1lOiBhbnksIGNsb3VkaWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICB0aGlzLmFwcEV2ZW50LnN0YXJ0SHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChDb25maWcuQ0xPVURfRU5EUE9JTlQgKyAnL2ZpbGUvdW56aXAnLCBKU09OLnN0cmluZ2lmeSh7Y2xvdWRpZDogY2xvdWRpZCwgZmlsZW5hbWU6ZmlsZW5hbWUgfSksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmRvKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwRXZlbnQuZmluaXNoSHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+ICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC5maW5pc2hIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcil9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnZlcnQyUGRmKGZpbGVuYW1lOiBhbnksIGNsb3VkaWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xuICAgICAgICB0aGlzLmFwcEV2ZW50LnN0YXJ0SHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChDb25maWcuQ0xPVURfRU5EUE9JTlQgKyAnL2ZpbGUvY29udmVydDJwZGYnLCBKU09OLnN0cmluZ2lmeSh7Y2xvdWRpZDogY2xvdWRpZCwgZmlsZW5hbWU6ZmlsZW5hbWUgfSksIG9wdGlvbnMpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLmRvKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwRXZlbnQuZmluaXNoSHR0cFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+ICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBFdmVudC5maW5pc2hIdHRwVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcil9XG4gICAgICAgICAgICApO1xuICAgIH1cblxufSJdfQ==
