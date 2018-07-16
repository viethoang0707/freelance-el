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
var env_config_1 = require("./env.config");
require("./operators");
var base_component_1 = require("./shared/components/base/base.component");
var constants_1 = require("./shared/models/constants");
var router_1 = require("@angular/router");
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.translateService.setDefaultLang(constants_1.DEFAULT_LANG);
        _this.translateService.use(_this.settingService.Lang);
        console.log('Environment config', env_config_1.Config);
        return _this;
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            template: "<div class=\"spinner\" [hidden]=\"!loading\"></div>\n\t\t\t\t<router-outlet></router-outlet>"
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppComponent);
    return AppComponent;
}(base_component_1.BaseComponent));
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwyQ0FBc0M7QUFDdEMsdUJBQXFCO0FBQ3JCLDBFQUF3RTtBQUN4RSx1REFBeUQ7QUFHekQsMENBQXlEO0FBUXpEO0lBQWtDLGdDQUFhO0lBRTlDLHNCQUFvQixNQUFjO1FBQWxDLFlBQ0MsaUJBQU8sU0FJUDtRQUxtQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBRWpDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsd0JBQVksQ0FBQyxDQUFDO1FBQzdDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLG1CQUFNLENBQUMsQ0FBQzs7SUFDM0MsQ0FBQztJQVBXLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSw4RkFDeUI7U0FDbkMsQ0FBQzt5Q0FHMkIsZUFBTTtPQUZ0QixZQUFZLENBVXhCO0lBQUQsbUJBQUM7Q0FWRCxBQVVDLENBVmlDLDhCQUFhLEdBVTlDO0FBVlksb0NBQVkiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9lbnYuY29uZmlnJztcbmltcG9ydCAnLi9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBERUZBVUxUX0xBTkcgfSBmcm9tICcuL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IEFwcEV2ZW50TWFuYWdlciB9IGZyb20gJy4vc2hhcmVkL3NlcnZpY2VzL2FwcC1ldmVudC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckxvZyB9IGZyb20gJy4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdhcHAnLFxuXHR0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzcGlubmVyXCIgW2hpZGRlbl09XCIhbG9hZGluZ1wiPjwvZGl2PlxuXHRcdFx0XHQ8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+YFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50e1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudHJhbnNsYXRlU2VydmljZS5zZXREZWZhdWx0TGFuZyhERUZBVUxUX0xBTkcpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UudXNlKHRoaXMuc2V0dGluZ1NlcnZpY2UuTGFuZyk7XG5cdFx0Y29uc29sZS5sb2coJ0Vudmlyb25tZW50IGNvbmZpZycsIENvbmZpZyk7XG5cdH1cblxuXG59XG4iXX0=
