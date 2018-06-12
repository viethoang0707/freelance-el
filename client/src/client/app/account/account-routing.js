"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var user_list_component_1 = require("./user/user-list/user-list.component");
var permission_list_component_1 = require("./permission/permission-list/permission-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
exports.AccountRoutes = [
    {
        path: "account",
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
//# sourceMappingURL=account-routing.js.map