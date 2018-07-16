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
var home_manager_service_1 = require("../home-manager.service");
var home_component_1 = require("../home.component");
var base_component_1 = require("../../shared/components/base/base.component");
var menu_service_1 = require("../../shared/services/menu.service");
var SideMenuComponent = (function (_super) {
    __extends(SideMenuComponent, _super);
    function SideMenuComponent(app, menuService, eventManager) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this.menuService = menuService;
        _this.eventManager = eventManager;
        _this.settingService.viewModeEvents.subscribe(function (mode) {
            _this.reset = true;
            if (mode == 'admin')
                _this.setAdminMenu();
            else
                _this.setUserMenu();
        });
        return _this;
    }
    SideMenuComponent.prototype.ngOnInit = function () {
        if (this.settingService.ViewMode == 'admin')
            this.setAdminMenu();
        else
            this.setUserMenu();
    };
    SideMenuComponent.prototype.setAdminMenu = function () {
        this.menu = this.menuService.adminMenu();
    };
    SideMenuComponent.prototype.setUserMenu = function () {
        this.menu = this.menuService.userMenu();
    };
    SideMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layoutMenuScroller = this.layoutMenuScrollerViewChild.nativeElement;
        setTimeout(function () {
            jQuery(_this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    };
    SideMenuComponent.prototype.updateNanoScroll = function () {
        var _this = this;
        setTimeout(function () {
            jQuery(_this.layoutMenuScroller).nanoScroller();
        }, 500);
    };
    SideMenuComponent.prototype.ngOnDestroy = function () {
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SideMenuComponent.prototype, "reset", void 0);
    __decorate([
        core_1.ViewChild('layoutMenuScroller'),
        __metadata("design:type", core_1.ElementRef)
    ], SideMenuComponent.prototype, "layoutMenuScrollerViewChild", void 0);
    SideMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-menu',
            templateUrl: 'side-menu.component.html',
            styleUrls: ['side-menu.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [home_component_1.HomeComponent, menu_service_1.MenuService,
            home_manager_service_1.HomeEventManager])
    ], SideMenuComponent);
    return SideMenuComponent;
}(base_component_1.BaseComponent));
exports.SideMenuComponent = SideMenuComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL3NpZGUtbWVudS9zaWRlLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF1STtBQUt2SSxnRUFBMkQ7QUFDM0Qsb0RBQWtEO0FBQ2xELDhFQUE0RTtBQUc1RSxtRUFBaUU7QUFXakU7SUFBdUMscUNBQWE7SUFPaEQsMkJBQW1CLEdBQWtCLEVBQVUsV0FBd0IsRUFDM0QsWUFBOEI7UUFEMUMsWUFFSSxpQkFBTyxTQVFWO1FBVmtCLFNBQUcsR0FBSCxHQUFHLENBQWU7UUFBVSxpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMzRCxrQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFFdEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUM3QyxLQUFJLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksSUFBRSxPQUFPO2dCQUNiLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7Z0JBRXBCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQzs7SUFDUCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLElBQUcsT0FBTztZQUNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O1lBRXBCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBR0QsMkNBQWUsR0FBZjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGtCQUFrQixHQUFtQixJQUFJLENBQUMsMkJBQTJCLENBQUMsYUFBYSxDQUFDO1FBQ3pGLFVBQVUsQ0FBQztZQUNQLE1BQU0sQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBR0QsNENBQWdCLEdBQWhCO1FBQUEsaUJBSUM7UUFIRyxVQUFVLENBQUM7WUFDUCxNQUFNLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQWpEUTtRQUFSLFlBQUssRUFBRTs7b0RBQWdCO0lBR1M7UUFBaEMsZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FBOEIsaUJBQVU7MEVBQUM7SUFMaEUsaUJBQWlCO1FBUjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUN0QyxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUFDO3lDQVMwQiw4QkFBYSxFQUF1QiwwQkFBVztZQUM3Qyx1Q0FBZ0I7T0FSakMsaUJBQWlCLENBb0Q3QjtJQUFELHdCQUFDO0NBcERELEFBb0RDLENBcERzQyw4QkFBYSxHQW9EbkQ7QUFwRFksOENBQWlCIiwiZmlsZSI6ImFwcC9ob21lL3NpZGUtbWVudS9zaWRlLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBSZW5kZXJlciwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBIb21lRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vaG9tZS1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4uL2hvbWUuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9jbG91ZC90b2tlbi5tb2RlbCc7XG5pbXBvcnQgeyBTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zZXR0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcbmRlY2xhcmUgdmFyIGpRdWVyeTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYXBwLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZS1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc2lkZS1tZW51LmNvbXBvbmVudC5jc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG5leHBvcnQgY2xhc3MgU2lkZU1lbnVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHJlc2V0OiBib29sZWFuO1xuICAgIHByaXZhdGUgbWVudTogYW55W107XG4gICAgcHJpdmF0ZSBsYXlvdXRNZW51U2Nyb2xsZXI6IEhUTUxEaXZFbGVtZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2xheW91dE1lbnVTY3JvbGxlcicpIGxheW91dE1lbnVTY3JvbGxlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhcHA6IEhvbWVDb21wb25lbnQsIHByaXZhdGUgbWVudVNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogSG9tZUV2ZW50TWFuYWdlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNldHRpbmdTZXJ2aWNlLnZpZXdNb2RlRXZlbnRzLnN1YnNjcmliZShtb2RlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQgPSAgdHJ1ZTtcbiAgICAgICAgICAgIGlmIChtb2RlPT0nYWRtaW4nKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRtaW5NZW51KCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyTWVudSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ1NlcnZpY2UuVmlld01vZGUgPT0nYWRtaW4nKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWRtaW5NZW51KCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVc2VyTWVudSgpO1xuICAgIH1cblxuICAgIHNldEFkbWluTWVudSgpIHtcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5tZW51U2VydmljZS5hZG1pbk1lbnUoKTtcbiAgICB9XG5cbiAgICBzZXRVc2VyTWVudSgpIHtcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5tZW51U2VydmljZS51c2VyTWVudSgpO1xuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmxheW91dE1lbnVTY3JvbGxlciA9IDxIVE1MRGl2RWxlbWVudD50aGlzLmxheW91dE1lbnVTY3JvbGxlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzLmxheW91dE1lbnVTY3JvbGxlcikubmFub1Njcm9sbGVyKHsgZmxhc2g6IHRydWUgfSk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZU5hbm9TY3JvbGwoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMubGF5b3V0TWVudVNjcm9sbGVyKS5uYW5vU2Nyb2xsZXIoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMubGF5b3V0TWVudVNjcm9sbGVyKS5uYW5vU2Nyb2xsZXIoeyBmbGFzaDogdHJ1ZSB9KTtcbiAgICB9XG59XG4iXX0=
