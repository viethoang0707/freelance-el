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
var FooterComponent = (function () {
    function FooterComponent() {
        this.version = env_config_1.Config.VERSION;
    }
    FooterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-footer',
            template: "<div class=\"layout-footer clearfix\"> \t<span class=\"footer-text-left\"> \t\t<span>{{'Version'|translate}}: {{version}}</span> \t</span> \t<span class=\"footer-text-right\"> \t\t<span class=\"material-icons\">copyright</span> \t\t<span>Thanh Cong A Chau, All Rights Reserved</span> \t</span> </div>",
            styles: [".layout-wrapper .layout-main .layout-footer .footer-text-left span{vertical-align:middle}.layout-wrapper .layout-main .layout-footer .footer-text-left{margin-top:10px}.layout-footer{position:absolute;bottom:0;width:100%;height:60px}"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
