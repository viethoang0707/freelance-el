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
