"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var setting_component_1 = require("./setting.component");
var setting_routing_1 = require("./setting-routing");
var SettingModule = (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            imports: [setting_routing_1.SettingRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [setting_component_1.SettingComponent],
            exports: [],
            providers: []
        })
    ], SettingModule);
    return SettingModule;
}());
exports.SettingModule = SettingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zZXR0aW5nL3NldHRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLG1EQUFpRDtBQUNqRCx5REFBMEQ7QUFDMUQseURBQXVEO0FBQ3ZELHFEQUF5RDtBQVF6RDtJQUFBO0lBQ0EsQ0FBQztJQURZLGFBQWE7UUFOekIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsc0NBQW9CLEVBQUMsK0JBQWUsRUFBRSx3QkFBVSxDQUFDO1lBQzNELFlBQVksRUFBRSxDQUFFLG9DQUFnQixDQUFDO1lBQ2pDLE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztPQUNXLGFBQWEsQ0FDekI7SUFBRCxvQkFBQztDQURELEFBQ0MsSUFBQTtBQURZLHNDQUFhIiwiZmlsZSI6ImFwcC9zZXR0aW5nL3NldHRpbmcubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuLi9hdXRoL2F1dGgubW9kdWxlJztcbmltcG9ydCB7IEVycFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFNldHRpbmdDb21wb25lbnQgfSBmcm9tICcuL3NldHRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFNldHRpbmdSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9zZXR0aW5nLXJvdXRpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXR0aW5nUm91dGluZ01vZHVsZSxFcnBTaGFyZWRNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogWyBTZXR0aW5nQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdNb2R1bGUge1xufVxuIl19
