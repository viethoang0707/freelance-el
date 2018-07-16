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
            template: "<div class=\"card card-w-title ui-g\"> \t<div class=\"ui-g-12 ui-lg-12\">   \t\t<h1>{{'Dashboard'|translate}}</h1>   \t</div> \t<div class=\"ui-g-12 ui-lg-12\">   \t<admin-dashboard *ngIf=\"viewMode=='admin'\"></admin-dashboard>   \t<user-dashboard *ngIf=\"viewMode=='lms'\"></user-dashboard>   \t</div> </div>",
        }),
        __metadata("design:paramtypes", [home_manager_service_1.HomeEventManager])
    ], DashboardComponent);
    return DashboardComponent;
}(base_component_1.BaseComponent));
exports.DashboardComponent = DashboardComponent;
