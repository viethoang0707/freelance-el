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
            if (val)
                this.activeIndex = null;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL3NpZGUtbWVudS9zdWItbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0g7QUFDcEgsa0RBQWlGO0FBQ2pGLDBDQUEyQztBQUMzQywwQ0FBeUM7QUFFekMsb0RBQWtEO0FBbUJsRDtJQVNJLDBCQUFtQixHQUFrQixFQUFTLE1BQWMsRUFBUyxRQUFrQjtRQUFwRSxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDdEYsQ0FBQztJQUVGLG9DQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsSUFBYyxFQUFFLEtBQWE7UUFFakQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFLRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ2xFO1FBR0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFHRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO1FBR0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7YUFDckM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFUSxzQkFBSSxtQ0FBSzthQUFUO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFVLEdBQVk7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxHQUFHO2dCQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7OztPQU5BO0lBbERRO1FBQVIsWUFBSyxFQUFFOztrREFBZ0I7SUFDZjtRQUFSLFlBQUssRUFBRTs7a0RBQWU7SUFDZDtRQUFSLFlBQUssRUFBRTs7cURBQWtCO0lBOENqQjtRQUFSLFlBQUssRUFBRTs7O2lEQUVQO0lBcERRLGdCQUFnQjtRQWpCNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFVBQVUsRUFBRTtnQkFDUixvQkFBTyxDQUFDLFVBQVUsRUFBRTtvQkFDaEIsa0JBQUssQ0FBQyxTQUFTLEVBQUUsa0JBQUssQ0FBQzt3QkFDbkIsTUFBTSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQyxDQUFDO29CQUNILGtCQUFLLENBQUMsUUFBUSxFQUFFLGtCQUFLLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxLQUFLO3FCQUNoQixDQUFDLENBQUM7b0JBQ0gsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7b0JBQ2hGLHVCQUFVLENBQUMsbUJBQW1CLEVBQUUsb0JBQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2lCQUNuRixDQUFDO2FBQ0w7U0FDSixDQUFDO3lDQVUwQiw4QkFBYSxFQUFpQixlQUFNLEVBQW1CLGlCQUFRO09BVDlFLGdCQUFnQixDQTJENUI7SUFBRCx1QkFBQztDQTNERCxBQTJEQyxJQUFBO0FBM0RZLDRDQUFnQiIsImZpbGUiOiJhcHAvaG9tZS9zaWRlLW1lbnUvc3ViLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tICcuLi9ob21lLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdbYXBwLXN1Ym1lbnVdJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1Yi1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2NoaWxkcmVuJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMHB4J1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIGFuaW1hdGUoJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKScpKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3ViTWVudUNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHZpc2libGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcmVzZXQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBhY3RpdmVJbmRleDogbnVtYmVyO1xuICAgIHByaXZhdGUgaG92ZXI6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwOiBIb21lQ29tcG9uZW50LCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICAgfVxuXG4gICAgaXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogTWVudUl0ZW0sIGluZGV4OiBudW1iZXIpIMKge1xuICAgICAgICAvLyBhdm9pZCBwcm9jZXNzaW5nIGRpc2FibGVkIGl0ZW1zXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gYWN0aXZhdGUgY3VycmVudCBpdGVtIGFuZCBkZWFjdGl2YXRlIGFjdGl2ZSBzaWJsaW5nIGlmIGFueVxuICAgICAgICBpZiAoaXRlbS5yb3V0ZXJMaW5rIHx8IGl0ZW0uaXRlbXMgfHwgaXRlbS5jb21tYW5kIHx8IGl0ZW0udXJsKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gKHRoaXMuYWN0aXZlSW5kZXggPT09IGluZGV4KSA/IG51bGwgOiBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV4ZWN1dGUgY29tbWFuZFxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaXRlbTogaXRlbSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZXZlbnQgaGFzaCBjaGFuZ2VcbiAgICAgICAgaWYgKGl0ZW0uaXRlbXMgfHwgKCFpdGVtLnVybCAmJiAhaXRlbS5yb3V0ZXJMaW5rKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhpZGUgbWVudVxuICAgICAgICBpZiAoIWl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcC5pc01vYmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAuc2lkZWJhckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLm1vYmlsZU1lbnVBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc0FjdGl2ZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUluZGV4ID09PSBpbmRleDtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgcmVzZXQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNldDtcbiAgICB9XG5cbiAgICBzZXQgcmVzZXQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0ID0gdmFsO1xuICAgICAgICBpZiAodmFsKVxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IG51bGw7XG4gICAgfVxufSJdfQ==
