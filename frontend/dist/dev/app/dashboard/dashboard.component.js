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
var base_component_1 = require("../shared/components/base/base.component");
var home_manager_service_1 = require("../home/home-manager.service");
var DashboardComponent = (function (_super) {
    __extends(DashboardComponent, _super);
    function DashboardComponent(eventManager) {
        var _this = _super.call(this) || this;
        _this.eventManager = eventManager;
        _this.settingService.viewModeEvents.subscribe(function (mode) {
            _this.viewMode = mode;
        });
        return _this;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.viewMode = this.settingService.ViewMode;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.component.html',
        }),
        __metadata("design:paramtypes", [home_manager_service_1.HomeEventManager])
    ], DashboardComponent);
    return DashboardComponent;
}(base_component_1.BaseComponent));
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFDMUUsMkVBQXlFO0FBQ3pFLHFFQUFnRTtBQU9oRTtJQUF3QyxzQ0FBYTtJQUlqRCw0QkFBb0IsWUFBOEI7UUFBbEQsWUFDSSxpQkFBTyxTQUlWO1FBTG1CLGtCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUU5QyxLQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFXO1lBQ3JELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDOztJQUNQLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBYlEsa0JBQWtCO1FBTDlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDO3lDQUtvQyx1Q0FBZ0I7T0FKekMsa0JBQWtCLENBZTlCO0lBQUQseUJBQUM7Q0FmRCxBQWVDLENBZnVDLDhCQUFhLEdBZXBEO0FBZlksZ0RBQWtCIiwiZmlsZSI6ImFwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIb21lRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vaG9tZS9ob21lLW1hbmFnZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcblxuICAgIHByaXZhdGUgdmlld01vZGU6c3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEhvbWVFdmVudE1hbmFnZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nU2VydmljZS52aWV3TW9kZUV2ZW50cy5zdWJzY3JpYmUoKG1vZGU6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdNb2RlID0gbW9kZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgXHR0aGlzLnZpZXdNb2RlID0gdGhpcy5zZXR0aW5nU2VydmljZS5WaWV3TW9kZTtcbiAgICB9XG5cbn1cblxuIl19
