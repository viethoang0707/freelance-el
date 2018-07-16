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
require("rxjs/add/operator/map");
var model_api_service_1 = require("./api/model-api.service");
var execute_api_1 = require("../services/api/execute.api");
var NotificationService = (function () {
    function NotificationService(apiService) {
        this.apiService = apiService;
    }
    NotificationService.prototype.broadcast = function (context, subject, body, recipients) {
        var params = { subject: subject, body: body, recipients: recipients };
        var executeApi = new execute_api_1.ExecuteAPI('etraining.notification_service', 'broadcastMail', params, null);
        return this.apiService.execute(executeApi, context.authService.LoginToken);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [model_api_service_1.ModelAPIService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFHM0MsaUNBQStCO0FBRS9CLDZEQUEwRDtBQUMxRCwyREFBeUQ7QUFJekQ7SUFDSSw2QkFBb0IsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7SUFBSSxDQUFDO0lBR3BELHVDQUFTLEdBQVQsVUFBVSxPQUFtQixFQUFFLE9BQWUsRUFBRSxJQUFXLEVBQUUsVUFBaUI7UUFDMUUsSUFBSSxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDO1FBQ3BFLElBQUksVUFBVSxHQUFHLElBQUksd0JBQVUsQ0FBQyxnQ0FBZ0MsRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQy9GLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQVJRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQUV1QixtQ0FBZTtPQUR0QyxtQkFBbUIsQ0FXL0I7SUFBRCwwQkFBQztDQVhELEFBV0MsSUFBQTtBQVhZLGtEQUFtQiIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9lbnYuY29uZmlnJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4vYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEV4ZWN1dGVBUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkvZXhlY3V0ZS5hcGknO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL21vZGVscy9jb250ZXh0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogTW9kZWxBUElTZXJ2aWNlKSB7IH1cblxuXG4gICAgYnJvYWRjYXN0KGNvbnRleHQ6IEFQSUNvbnRleHQsIHN1YmplY3Q6IHN0cmluZywgYm9keTpzdHJpbmcsIHJlY2lwaWVudHM6c3RyaW5nKSA6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHZhciBwYXJhbXMgPSB7c3ViamVjdDogc3ViamVjdCwgYm9keTogYm9keSwgcmVjaXBpZW50czogcmVjaXBpZW50c307XG4gICAgICAgIHZhciBleGVjdXRlQXBpID0gbmV3IEV4ZWN1dGVBUEkoJ2V0cmFpbmluZy5ub3RpZmljYXRpb25fc2VydmljZScsJ2Jyb2FkY2FzdE1haWwnLCBwYXJhbXMsIG51bGwpXG4gICAgICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZXhlY3V0ZShleGVjdXRlQXBpLGNvbnRleHQuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbik7XG4gICAgfSAgXG5cblxufVxuIl19
