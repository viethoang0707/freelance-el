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
var core_1 = require("@angular/core");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var notification_service_1 = require("../../services/notification.service");
var MailMessageDialog = (function (_super) {
    __extends(MailMessageDialog, _super);
    function MailMessageDialog(mailService) {
        var _this = _super.call(this) || this;
        _this.mailService = mailService;
        return _this;
    }
    MailMessageDialog.prototype.ngOnInit = function () {
    };
    MailMessageDialog.prototype.show = function (recipients) {
        this.display = true;
        recipients = _.filter(recipients, function (email) {
            email = email.trim();
            return (email.length > 0);
        });
        this.recipients = recipients.join();
    };
    MailMessageDialog.prototype.send = function () {
        var _this = this;
        this.mailService.broadcast(this, this.subject, this.body, this.recipients).subscribe(function () {
            _this.success('Mail sent');
            _this.hide();
        });
    };
    MailMessageDialog.prototype.hide = function () {
        this.display = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MailMessageDialog.prototype, "subject", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MailMessageDialog.prototype, "body", void 0);
    MailMessageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mail-message-dialog',
            templateUrl: 'mail-message.dialog.component.html',
        }),
        __metadata("design:paramtypes", [notification_service_1.NotificationService])
    ], MailMessageDialog);
    return MailMessageDialog;
}(base_component_1.BaseComponent));
exports.MailMessageDialog = MailMessageDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9tYWlsLW1lc3NhZ2UvbWFpbC1tZXNzYWdlLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlFO0FBR2pFLGlGQUErRTtBQUUvRSw4QkFBZ0M7QUFDaEMsNEVBQTBFO0FBUTFFO0lBQXVDLHFDQUFhO0lBVWhELDJCQUFvQixXQUFnQztRQUFwRCxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsaUJBQVcsR0FBWCxXQUFXLENBQXFCOztJQUVwRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxnQ0FBSSxHQUFKLFVBQUssVUFBb0I7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakIsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBWTtZQUMzQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRixLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQTlCUTtRQUFSLFlBQUssRUFBRTs7c0RBQWlCO0lBQ25CO1FBQVIsWUFBSyxFQUFFOzttREFBYztJQU5WLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsV0FBVyxFQUFFLG9DQUFvQztTQUNwRCxDQUFDO3lDQVdtQywwQ0FBbUI7T0FWM0MsaUJBQWlCLENBdUM3QjtJQUFELHdCQUFDO0NBdkNELEFBdUNDLENBdkNzQyw4QkFBYSxHQXVDbkQ7QUF2Q1ksOENBQWlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy9tYWlsLW1lc3NhZ2UvbWFpbC1tZXNzYWdlLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUZhcSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ21haWwtbWVzc2FnZS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnbWFpbC1tZXNzYWdlLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1haWxNZXNzYWdlRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHJlY2lwaWVudHM6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN1YmplY3Q6IHN0cmluZztcblx0QElucHV0KCkgYm9keTogc3RyaW5nO1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFpbFNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBzaG93KHJlY2lwaWVudHM6IHN0cmluZ1tdKSB7XG4gICAgXHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuICAgICAgICByZWNpcGllbnRzID0gXy5maWx0ZXIocmVjaXBpZW50cywgKGVtYWlsOnN0cmluZyk9PiB7XG4gICAgICAgICAgICBlbWFpbCA9IGVtYWlsLnRyaW0oKTtcbiAgICAgICAgICAgIHJldHVybiAoZW1haWwubGVuZ3RoID4gMClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVjaXBpZW50cyA9IHJlY2lwaWVudHMuam9pbigpO1xuICAgIH1cblxuICAgIHNlbmQoKSB7XG4gICAgICAgIHRoaXMubWFpbFNlcnZpY2UuYnJvYWRjYXN0KHRoaXMsIHRoaXMuc3ViamVjdCwgdGhpcy5ib2R5LCB0aGlzLnJlY2lwaWVudHMpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnTWFpbCBzZW50Jyk7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgIFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgfVxuXG5cblxufVxuXG4iXX0=
