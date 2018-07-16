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
