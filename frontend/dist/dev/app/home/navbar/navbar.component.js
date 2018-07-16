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
var router_1 = require("@angular/router");
var user_model_1 = require("../../shared/models/elearning/user.model");
var home_manager_service_1 = require("../home-manager.service");
var home_component_1 = require("../home.component");
var base_component_1 = require("../../shared/components/base/base.component");
var ticket_dialog_component_1 = require("../../workflow/ticket-dialog/ticket-dialog.component");
var _ = require("underscore");
var course_model_1 = require("../../shared/models/elearning/course.model");
var course_member_model_1 = require("../../shared/models/elearning/course-member.model");
var base_model_1 = require("../../shared/models/base.model");
var NavbarComponent = (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent(router, parent, eventManager) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.parent = parent;
        _this.eventManager = eventManager;
        _this.lang = _this.translateService.currentLang;
        _this.notifs = [];
        _this.viewMode = _this.ContextUser.IsAdmin ? 'admin' : 'lms';
        return _this;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.viewMode = this.settingService.ViewMode;
        if (this.viewMode == 'admin')
            this.loadStats();
    };
    NavbarComponent.prototype.loadStats = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_count(this, user_model_1.User.__api__countAll(), course_model_1.Course.__api__countAll(), course_member_model_1.CourseMember.__api__countTeacher(), course_member_model_1.CourseMember.__api__countStudent())
            .map(function (jsonArray) {
            return _.flatten(jsonArray);
        })
            .subscribe(function (counts) {
            _this.userCount = counts[0];
            _this.courseCount = counts[1];
            _this.teacherCount = counts[2];
            _this.studentCount = counts[3];
        });
    };
    NavbarComponent.prototype.setLang = function (lang) {
        this.lang = lang;
        this.settingService.Lang = lang;
        this.translateService.use(lang);
    };
    NavbarComponent.prototype.setViewMode = function (mode) {
        this.viewMode = mode;
        this.settingService.ViewMode = mode;
        this.router.navigate(['/dashboard']);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "viewMode", void 0);
    __decorate([
        core_1.ViewChild(ticket_dialog_component_1.TicketDialog),
        __metadata("design:type", ticket_dialog_component_1.TicketDialog)
    ], NavbarComponent.prototype, "ticketDialog", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-navbar',
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, home_component_1.HomeComponent,
            home_manager_service_1.HomeEventManager])
    ], NavbarComponent);
    return NavbarComponent;
}(base_component_1.BaseComponent));
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUdwRSwwQ0FBeUM7QUFDekMsdUVBQWdFO0FBR2hFLGdFQUEyRDtBQUMzRCxvREFBa0Q7QUFHbEQsOEVBQTRFO0FBQzVFLGdHQUFvRjtBQUNwRiw4QkFBK0I7QUFDL0IsMkVBQW9FO0FBRXBFLHlGQUFpRjtBQUNqRiw2REFBMkQ7QUFRM0Q7SUFBcUMsbUNBQWE7SUFXakQseUJBQW9CLE1BQWEsRUFBVSxNQUFvQixFQUN0RCxZQUE4QjtRQUR2QyxZQUVDLGlCQUFPLFNBSVA7UUFObUIsWUFBTSxHQUFOLE1BQU0sQ0FBTztRQUFVLFlBQU0sR0FBTixNQUFNLENBQWM7UUFDdEQsa0JBQVksR0FBWixZQUFZLENBQWtCO1FBRXRDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUM5QyxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7SUFDM0QsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBRyxPQUFPO1lBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUFBLGlCQWdCQztRQWZBLHNCQUFTO2FBQ0QsVUFBVSxDQUFDLElBQUksRUFDWixpQkFBSSxDQUFDLGVBQWUsRUFBRSxFQUN0QixxQkFBTSxDQUFDLGVBQWUsRUFBRSxFQUN4QixrQ0FBWSxDQUFDLG1CQUFtQixFQUFFLEVBQ2xDLGtDQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUN0QyxHQUFHLENBQUMsVUFBQSxTQUFTO1lBQ1YsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxpQ0FBTyxHQUFQLFVBQVEsSUFBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUE5Q1E7UUFBUixZQUFLLEVBQUU7O2lEQUFjO0lBQ2I7UUFBUixZQUFLLEVBQUU7O3FEQUFrQjtJQUNEO1FBQXhCLGdCQUFTLENBQUMsc0NBQVksQ0FBQztrQ0FBZSxzQ0FBWTt5REFBQztJQVR4QyxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO3lDQVkwQixlQUFNLEVBQWlCLDhCQUFhO1lBQ3hDLHVDQUFnQjtPQVozQixlQUFlLENBc0QzQjtJQUFELHNCQUFDO0NBdERELEFBc0RDLENBdERvQyw4QkFBYSxHQXNEakQ7QUF0RFksMENBQWUiLCJmaWxlIjoiYXBwL2hvbWUvbmF2YmFyL25hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTb2NrZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgTEFOR1MgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBIb21lRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vaG9tZS1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4uL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IFNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NldHRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFRpY2tldERpYWxvZyB9IGZyb20gJy4uLy4uL3dvcmtmbG93L3RpY2tldC1kaWFsb2cvdGlja2V0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZURpYWxvZyB9IGZyb20gJy4uLy4uL2NvdXJzZS9jb3Vyc2UvY291cnNlLWRpYWxvZy9jb3Vyc2UtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2FwcC1uYXZiYXInLFxuXHR0ZW1wbGF0ZVVybDogJ25hdmJhci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWyduYXZiYXIuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZiYXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwcml2YXRlIG5vdGlmczogTm90aWZpY2F0aW9uW107XG5cdHByaXZhdGUgdXNlckNvdW50OiBhbnk7XG4gICAgcHJpdmF0ZSBzdHVkZW50Q291bnQ6IGFueTtcbiAgICBwcml2YXRlIHRlYWNoZXJDb3VudDogYW55O1xuICAgIHByaXZhdGUgY291cnNlQ291bnQ6IGFueTtcblx0QElucHV0KCkgbGFuZzogc3RyaW5nO1xuXHRASW5wdXQoKSB2aWV3TW9kZTogc3RyaW5nO1xuXHRAVmlld0NoaWxkKFRpY2tldERpYWxvZykgdGlja2V0RGlhbG9nOiBUaWNrZXREaWFsb2c7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6Um91dGVyLCBwcml2YXRlIHBhcmVudDpIb21lQ29tcG9uZW50LCBcblx0XHRwcml2YXRlIGV2ZW50TWFuYWdlcjogSG9tZUV2ZW50TWFuYWdlcikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5sYW5nID0gdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmN1cnJlbnRMYW5nO1xuXHRcdHRoaXMubm90aWZzID0gW107XG5cdFx0dGhpcy52aWV3TW9kZSA9IHRoaXMuQ29udGV4dFVzZXIuSXNBZG1pbiA/ICdhZG1pbic6ICdsbXMnO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy52aWV3TW9kZSA9IHRoaXMuc2V0dGluZ1NlcnZpY2UuVmlld01vZGU7XG5cdFx0aWYgKHRoaXMudmlld01vZGUgPT0nYWRtaW4nKVxuXHRcdFx0dGhpcy5sb2FkU3RhdHMoKTtcblx0fVxuXG5cdGxvYWRTdGF0cygpIHtcblx0XHRCYXNlTW9kZWxcblx0ICAgICAgICAuYnVsa19jb3VudCh0aGlzLFxuXHQgICAgICAgICAgICBVc2VyLl9fYXBpX19jb3VudEFsbCgpLFxuXHQgICAgICAgICAgICBDb3Vyc2UuX19hcGlfX2NvdW50QWxsKCksXG5cdCAgICAgICAgICAgIENvdXJzZU1lbWJlci5fX2FwaV9fY291bnRUZWFjaGVyKCksXG5cdCAgICAgICAgICAgIENvdXJzZU1lbWJlci5fX2FwaV9fY291bnRTdHVkZW50KCkpXG5cdCAgICAgICAgLm1hcChqc29uQXJyYXkgPT4ge1xuXHQgICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKGpzb25BcnJheSk7XG5cdCAgICAgICAgfSlcblx0ICAgICAgICAuc3Vic2NyaWJlKChjb3VudHMpPT4ge1xuXHQgICAgICAgICAgICB0aGlzLnVzZXJDb3VudCA9IGNvdW50c1swXTtcblx0ICAgICAgICAgICAgdGhpcy5jb3Vyc2VDb3VudCA9IGNvdW50c1sxXTtcblx0ICAgICAgICAgICAgdGhpcy50ZWFjaGVyQ291bnQgPSBjb3VudHNbMl07XG5cdCAgICAgICAgICAgIHRoaXMuc3R1ZGVudENvdW50ID0gY291bnRzWzNdO1xuXHQgICAgICAgIH0pO1xuXHR9XG5cblx0c2V0TGFuZyhsYW5nOiBzdHJpbmcpIHtcblx0XHR0aGlzLmxhbmcgPSBsYW5nO1xuXHRcdHRoaXMuc2V0dGluZ1NlcnZpY2UuTGFuZyA9IGxhbmc7XG5cdFx0dGhpcy50cmFuc2xhdGVTZXJ2aWNlLnVzZShsYW5nKTtcblx0fVxuXG5cdHNldFZpZXdNb2RlKG1vZGUpIHtcblx0XHR0aGlzLnZpZXdNb2RlID0gbW9kZTtcblx0XHR0aGlzLnNldHRpbmdTZXJ2aWNlLlZpZXdNb2RlID0gbW9kZTtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XG5cdH1cbn1cblxuXG4iXX0=
