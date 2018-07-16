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
var env_config_1 = require("../../env.config");
require("rxjs/add/operator/map");
var windonw_ref_1 = require("../helpers/windonw.ref");
var auth_service_1 = require("../services/auth.service");
var MeetingService = (function () {
    function MeetingService(winRef, authService) {
        this.winRef = winRef;
        this.authService = authService;
        this.nativeWindow = winRef.getNativeWindow();
    }
    MeetingService.prototype.join = function (room_ref, member_ref) {
        this.nativeWindow.open(env_config_1.Config.CONFERENCE_ENDPOINT + "?room=" + room_ref + "&member=" + member_ref + "&cloudid=" + this.authService.LoginToken.cloud_id);
    };
    MeetingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [windonw_ref_1.WindowRef, auth_service_1.AuthService])
    ], MeetingService);
    return MeetingService;
}());
exports.MeetingService = MeetingService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvbWVldGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLCtDQUEwQztBQUMxQyxpQ0FBK0I7QUFDL0Isc0RBQW1EO0FBQ25ELHlEQUF1RDtBQUl2RDtJQUlDLHdCQUFvQixNQUFpQixFQUFVLFdBQXdCO1FBQW5ELFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN0RSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFFBQWdCLEVBQUUsVUFBa0I7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUksbUJBQU0sQ0FBQyxtQkFBbUIsY0FBUyxRQUFRLGdCQUFXLFVBQVUsaUJBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBVSxDQUFDLENBQUM7SUFDL0ksQ0FBQztJQVZXLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FLZ0IsdUJBQVMsRUFBdUIsMEJBQVc7T0FKM0QsY0FBYyxDQWExQjtJQUFELHFCQUFDO0NBYkQsQUFhQyxJQUFBO0FBYlksd0NBQWMiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9tZWV0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL2Vudi5jb25maWcnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vaGVscGVycy93aW5kb253LnJlZic7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZWV0aW5nU2VydmljZSB7XG5cblx0cHJpdmF0ZSBuYXRpdmVXaW5kb3c6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHdpblJlZjogV2luZG93UmVmLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xuXHRcdHRoaXMubmF0aXZlV2luZG93ID0gd2luUmVmLmdldE5hdGl2ZVdpbmRvdygpO1xuXHR9XG5cblx0am9pbihyb29tX3JlZjogc3RyaW5nLCBtZW1iZXJfcmVmOiBzdHJpbmcpIHtcblx0XHR0aGlzLm5hdGl2ZVdpbmRvdy5vcGVuKGAke0NvbmZpZy5DT05GRVJFTkNFX0VORFBPSU5UfT9yb29tPSR7cm9vbV9yZWZ9Jm1lbWJlcj0ke21lbWJlcl9yZWZ9JmNsb3VkaWQ9JHt0aGlzLmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4uY2xvdWRfaWR9YCk7XG5cdH1cblxuXG59XG4iXX0=
