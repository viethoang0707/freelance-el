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
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var home_component_1 = require("../home.component");
var SubMenuComponent = (function () {
    function SubMenuComponent(app, router, location) {
        this.app = app;
        this.router = router;
        this.location = location;
    }
    SubMenuComponent.prototype.itemClick = function (event, item, index) {
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }
        if (!item.items) {
            if (this.app.isMobile()) {
                this.app.sidebarActive = false;
                this.app.mobileMenuActive = false;
            }
        }
        return true;
    };
    SubMenuComponent.prototype.isActive = function (index) {
        return this.activeIndex === index;
    };
    Object.defineProperty(SubMenuComponent.prototype, "reset", {
        get: function () {
            return this._reset;
        },
        set: function (val) {
            this._reset = val;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SubMenuComponent.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SubMenuComponent.prototype, "root", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SubMenuComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SubMenuComponent.prototype, "reset", null);
    SubMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '[app-submenu]',
            templateUrl: 'sub-menu.component.html',
            animations: [
                animations_1.trigger('children', [
                    animations_1.state('visible', animations_1.style({
                        height: '*'
                    })),
                    animations_1.state('hidden', animations_1.style({
                        height: '0px'
                    })),
                    animations_1.transition('visible => hidden', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                    animations_1.transition('hidden => visible', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [home_component_1.HomeComponent, router_1.Router, common_1.Location])
    ], SubMenuComponent);
    return SubMenuComponent;
}());
exports.SubMenuComponent = SubMenuComponent;
//# sourceMappingURL=sub-menu.component.js.map