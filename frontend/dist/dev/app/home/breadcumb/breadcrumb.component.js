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
var router_1 = require("@angular/router");
var BreadcrumbComponent = (function () {
    function BreadcrumbComponent(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            var root = _this.activatedRoute.root;
            _this.items = _this.getBreadcrumbs(root);
        });
    };
    BreadcrumbComponent.prototype.getBreadcrumbs = function (route, url, breadcrumbs) {
        if (url === void 0) { url = ""; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        var ROUTE_DATA_BREADCRUMB = "breadcrumb";
        var children = route.children;
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child.outlet !== router_1.PRIMARY_OUTLET) {
                continue;
            }
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            var routeURL = child.snapshot.url.map(function (segment) { return segment.path; }).join("/");
            url += "/" + routeURL;
            var breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                queryParams: child.snapshot.params,
                routerLink: url
            };
            breadcrumbs.push(breadcrumb);
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    };
    BreadcrumbComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-breadcrumb',
            templateUrl: 'breadcrumb.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());
exports.BreadcrumbComponent = BreadcrumbComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2JyZWFkY3VtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBZ0c7QUFlaEc7SUFLSSw2QkFBb0IsY0FBOEIsRUFBVSxNQUFjO1FBQXRELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDMUUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxzQkFBYSxFQUE5QixDQUE4QixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUU5RSxJQUFJLElBQUksR0FBbUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDcEQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFjLEdBQXRCLFVBQXVCLEtBQXFCLEVBQUUsR0FBZ0IsRUFBRSxXQUErQjtRQUFqRCxvQkFBQSxFQUFBLFFBQWdCO1FBQUUsNEJBQUEsRUFBQSxnQkFBK0I7UUFDM0YsSUFBTSxxQkFBcUIsR0FBVyxZQUFZLENBQUM7UUFHbkQsSUFBSSxRQUFRLEdBQXFCLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFHaEQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLFdBQVcsQ0FBQztTQUN0QjtRQUdELEtBQWtCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO1lBQXZCLElBQUksS0FBSyxpQkFBQTtZQUVWLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyx1QkFBYyxFQUFFO2dCQUNqQyxTQUFTO2FBQ1o7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQzVELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsSUFBSSxRQUFRLEdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksRUFBWixDQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFHakYsR0FBRyxJQUFJLE1BQUksUUFBVSxDQUFDO1lBR3RCLElBQUksVUFBVSxHQUFHO2dCQUNiLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDakQsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtnQkFDbEMsVUFBVSxFQUFFLEdBQUc7YUFDbEIsQ0FBQztZQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFHN0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBdkRRLG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDJCQUEyQjtTQUMzQyxDQUFDO3lDQU1zQyx1QkFBYyxFQUFrQixlQUFNO09BTGpFLG1CQUFtQixDQXdEL0I7SUFBRCwwQkFBQztDQXhERCxBQXdEQyxJQUFBO0FBeERZLGtEQUFtQiIsImZpbGUiOiJhcHAvaG9tZS9icmVhZGN1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBOYXZpZ2F0aW9uRW5kLCBQYXJhbXMsIFBSSU1BUllfT1VUTEVUIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBJQnJlYWRjcnVtYiB7XG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBxdWVyeVBhcmFtczogYW55LFxuICAgIHJvdXRlckxpbms6IHN0cmluZ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnYXBwLWJyZWFkY3J1bWInLFxuICAgIHRlbXBsYXRlVXJsOiAnYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnJlYWRjcnVtYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vc2V0IGJyZWFkY3J1bWJzXG4gICAgICAgICAgICBsZXQgcm9vdDogQWN0aXZhdGVkUm91dGUgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnJvb3Q7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5nZXRCcmVhZGNydW1icyhyb290KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCcmVhZGNydW1icyhyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHVybDogc3RyaW5nID0gXCJcIiwgYnJlYWRjcnVtYnM6IElCcmVhZGNydW1iW10gPSBbXSk6IElCcmVhZGNydW1iW10ge1xuICAgICAgICBjb25zdCBST1VURV9EQVRBX0JSRUFEQ1JVTUI6IHN0cmluZyA9IFwiYnJlYWRjcnVtYlwiO1xuXG4gICAgICAgIC8vZ2V0IHRoZSBjaGlsZCByb3V0ZXNcbiAgICAgICAgbGV0IGNoaWxkcmVuOiBBY3RpdmF0ZWRSb3V0ZVtdID0gcm91dGUuY2hpbGRyZW47XG5cbiAgICAgICAgLy9yZXR1cm4gaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2hpbGRyZW5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pdGVyYXRlIG92ZXIgZWFjaCBjaGlsZHJlblxuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgLy92ZXJpZnkgcHJpbWFyeSByb3V0ZVxuICAgICAgICAgICAgaWYgKGNoaWxkLm91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdmVyaWZ5IHRoZSBjdXN0b20gZGF0YSBwcm9wZXJ0eSBcImJyZWFkY3J1bWJcIiBpcyBzcGVjaWZpZWQgb24gdGhlIHJvdXRlXG4gICAgICAgICAgICBpZiAoIWNoaWxkLnNuYXBzaG90LmRhdGEuaGFzT3duUHJvcGVydHkoUk9VVEVfREFUQV9CUkVBRENSVU1CKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJyZWFkY3J1bWJzKGNoaWxkLCB1cmwsIGJyZWFkY3J1bWJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZ2V0IHRoZSByb3V0ZSdzIFVSTCBzZWdtZW50XG4gICAgICAgICAgICBsZXQgcm91dGVVUkw6IHN0cmluZyA9IGNoaWxkLnNuYXBzaG90LnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnBhdGgpLmpvaW4oXCIvXCIpO1xuXG4gICAgICAgICAgICAvL2FwcGVuZCByb3V0ZSBVUkwgdG8gVVJMXG4gICAgICAgICAgICB1cmwgKz0gYC8ke3JvdXRlVVJMfWA7XG5cbiAgICAgICAgICAgIC8vYWRkIGJyZWFkY3J1bWJcbiAgICAgICAgICAgIGxldCBicmVhZGNydW1iID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZC5zbmFwc2hvdC5kYXRhW1JPVVRFX0RBVEFfQlJFQURDUlVNQl0sXG4gICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IGNoaWxkLnNuYXBzaG90LnBhcmFtcyxcbiAgICAgICAgICAgICAgICByb3V0ZXJMaW5rOiB1cmxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhZGNydW1icy5wdXNoKGJyZWFkY3J1bWIpO1xuXG4gICAgICAgICAgICAvL3JlY3Vyc2l2ZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnJlYWRjcnVtYnMoY2hpbGQsIHVybCwgYnJlYWRjcnVtYnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicmVhZGNydW1icztcbiAgICB9XG59XG4iXX0=
