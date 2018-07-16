"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var user_list_component_1 = require("./user/user-list/user-list.component");
var permission_list_component_1 = require("./permission/permission-list/permission-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var router_1 = require("@angular/router");
exports.AccountRoutes = [
    {
        path: 'account',
        data: {
            breadcrumb: 'Account'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "groups",
                component: group_list_component_1.GroupListComponent,
                data: {
                    breadcrumb: 'User groups',
                    category: 'organization'
                },
            },
            {
                path: "users",
                component: user_list_component_1.UserListComponent,
                data: {
                    breadcrumb: 'Users'
                },
            },
            {
                path: "permissions",
                component: permission_list_component_1.PermissionListComponent,
                data: {
                    breadcrumb: 'Permission'
                },
            },
        ]
    }
];
var AccountRoutingModule = (function () {
    function AccountRoutingModule() {
    }
    AccountRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.AccountRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AccountRoutingModule);
    return AccountRoutingModule;
}());
exports.AccountRoutingModule = AccountRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L2FjY291bnQtcm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUV6Qyw2RkFBMEY7QUFDMUYsNEVBQXlFO0FBQ3pFLG9HQUFpRztBQUNqRyw0REFBMEQ7QUFDMUQsMENBQStDO0FBRWxDLFFBQUEsYUFBYSxHQUFXO0lBQ25DO1FBQ0UsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUU7WUFDSixVQUFVLEVBQUUsU0FBUztTQUN0QjtRQUNELFdBQVcsRUFBRSxDQUFDLHdCQUFVLENBQUM7UUFDekIsUUFBUSxFQUNSO1lBQ0U7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLHlDQUFrQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxhQUFhO29CQUN6QixRQUFRLEVBQUMsY0FBYztpQkFDeEI7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLFNBQVMsRUFBRSx1Q0FBaUI7Z0JBQzVCLElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUUsT0FBTztpQkFDcEI7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxhQUFhO2dCQUNuQixTQUFTLEVBQUUsbURBQXVCO2dCQUNsQyxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLFlBQVk7aUJBQ3pCO2FBQ0Y7U0FFRjtLQUNGO0NBRUYsQ0FBQTtBQU1EO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixvQkFBb0I7UUFKaEMsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMscUJBQWEsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7U0FDeEIsQ0FBQztPQUNXLG9CQUFvQixDQUFHO0lBQUQsMkJBQUM7Q0FBcEMsQUFBb0MsSUFBQTtBQUF2QixvREFBb0IiLCJmaWxlIjoiYXBwL2FjY291bnQvYWNjb3VudC1yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBHcm91cExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1saXN0L2dyb3VwLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91c2VyL3VzZXItbGlzdC91c2VyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9uL3Blcm1pc3Npb24tbGlzdC9wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEFkbWluR3VhcmQgfSBmcm9tICcuLi9zaGFyZWQvZ3VhcmRzL2FkbWluLmd1YXJkJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50Um91dGVzOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnYWNjb3VudCcsXG4gICAgZGF0YToge1xuICAgICAgYnJlYWRjcnVtYjogJ0FjY291bnQnXG4gICAgfSxcbiAgICBjYW5BY3RpdmF0ZTogW0FkbWluR3VhcmRdLFxuICAgIGNoaWxkcmVuOlxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCJncm91cHNcIixcbiAgICAgICAgY29tcG9uZW50OiBHcm91cExpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnVXNlciBncm91cHMnLFxuICAgICAgICAgIGNhdGVnb3J5Oidvcmdhbml6YXRpb24nXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInVzZXJzXCIsXG4gICAgICAgIGNvbXBvbmVudDogVXNlckxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnVXNlcnMnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcInBlcm1pc3Npb25zXCIsXG4gICAgICAgIGNvbXBvbmVudDogUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnUGVybWlzc2lvbidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBcbiAgICBdXG4gIH1cblxuXVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKEFjY291bnRSb3V0ZXMpXSxcbiAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudFJvdXRpbmdNb2R1bGUge30iXX0=
