"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_component_1 = require("./home.component");
var home_routing_module_1 = require("./home-routing.module");
var shared_module_1 = require("../shared/shared.module");
var side_menu_component_1 = require("./side-menu/side-menu.component");
var sub_menu_component_1 = require("./side-menu/sub-menu.component");
var footer_component_1 = require("./footer/footer.component");
var navbar_component_1 = require("./navbar/navbar.component");
var breadcrumb_component_1 = require("./breadcumb/breadcrumb.component");
var home_manager_service_1 = require("./home-manager.service");
var account_module_1 = require("../account/account.module");
var workflow_module_1 = require("../workflow/workflow.module");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule_1 = HomeModule;
    HomeModule.forRoot = function () {
        return {
            ngModule: HomeModule_1,
            providers: [home_manager_service_1.HomeEventManager]
        };
    };
    var HomeModule_1;
    HomeModule = HomeModule_1 = __decorate([
        core_1.NgModule({
            imports: [home_routing_module_1.HomeRoutingModule, shared_module_1.ErpSharedModule, account_module_1.AccountModule, workflow_module_1.WorkflowModule],
            declarations: [home_component_1.HomeComponent, navbar_component_1.NavbarComponent, side_menu_component_1.SideMenuComponent,
                footer_component_1.FooterComponent, sub_menu_component_1.SubMenuComponent, breadcrumb_component_1.BreadcrumbComponent],
            exports: [],
            providers: []
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9ob21lL2hvbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQThEO0FBQzlELG1EQUFpRDtBQUNqRCw2REFBMEQ7QUFDMUQseURBQTBEO0FBRzFELHVFQUFvRTtBQUNwRSxxRUFBa0U7QUFDbEUsOERBQTREO0FBQzVELDhEQUE0RDtBQUM1RCx5RUFBdUU7QUFDdkUsK0RBQTBEO0FBQzFELDREQUEwRDtBQUMxRCwrREFBNkQ7QUFVN0Q7SUFBQTtJQU9BLENBQUM7bUJBUFksVUFBVTtJQUNaLGtCQUFPLEdBQWQ7UUFDSSxPQUFPO1lBQ04sUUFBUSxFQUFFLFlBQVU7WUFDakIsU0FBUyxFQUFFLENBQUMsdUNBQWdCLENBQUM7U0FDaEMsQ0FBQTtJQUNMLENBQUM7O0lBTlEsVUFBVTtRQVJ0QixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBRSx1Q0FBaUIsRUFBRSwrQkFBZSxFQUFFLDhCQUFhLEVBQUMsZ0NBQWMsQ0FBRTtZQUM3RSxZQUFZLEVBQUUsQ0FBRSw4QkFBYSxFQUFFLGtDQUFlLEVBQUUsdUNBQWlCO2dCQUNqRSxrQ0FBZSxFQUFDLHFDQUFnQixFQUFDLDBDQUFtQixDQUFFO1lBQ3RELE9BQU8sRUFBRSxFQUFFO1lBQ1gsU0FBUyxFQUFFLEVBQUc7U0FDZixDQUFDO09BRVcsVUFBVSxDQU90QjtJQUFELGlCQUFDO0NBUEQsQUFPQyxJQUFBO0FBUFksZ0NBQVUiLCJmaWxlIjoiYXBwL2hvbWUvaG9tZS5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2hvbWUtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgRXJwU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9hdXRoLmd1YXJkJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBTaWRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vc2lkZS1tZW51L3NpZGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViTWVudUNvbXBvbmVudCB9IGZyb20gJy4vc2lkZS1tZW51L3N1Yi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdmJhckNvbXBvbmVudCB9IGZyb20gJy4vbmF2YmFyL25hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjdW1iL2JyZWFkY3J1bWIuY29tcG9uZW50JztcbmltcG9ydCB7IEhvbWVFdmVudE1hbmFnZXIgfSBmcm9tICcuL2hvbWUtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY291bnRNb2R1bGUgfSBmcm9tICcuLi9hY2NvdW50L2FjY291bnQubW9kdWxlJztcbmltcG9ydCB7IFdvcmtmbG93TW9kdWxlIH0gZnJvbSAnLi4vd29ya2Zsb3cvd29ya2Zsb3cubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBIb21lUm91dGluZ01vZHVsZSwgRXJwU2hhcmVkTW9kdWxlLCBBY2NvdW50TW9kdWxlLFdvcmtmbG93TW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBIb21lQ29tcG9uZW50LCBOYXZiYXJDb21wb25lbnQsIFNpZGVNZW51Q29tcG9uZW50LCBcbiAgRm9vdGVyQ29tcG9uZW50LFN1Yk1lbnVDb21wb25lbnQsQnJlYWRjcnVtYkNvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgXHRuZ01vZHVsZTogSG9tZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW0hvbWVFdmVudE1hbmFnZXJdXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuIl19
