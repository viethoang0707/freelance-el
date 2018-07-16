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
var lms_module_1 = require("../lms/lms.module");
var user_list_component_1 = require("./user/user-list/user-list.component");
var user_dialog_component_1 = require("./user/user-dialog/user-dialog.component");
var export_dialog_component_1 = require("./user/export-dialog/export-dialog.component");
var import_dialog_component_1 = require("./user/import-dialog/import-dialog.component");
var profile_dialog_component_1 = require("./user/profile-dialog/profile-dialog.component");
var permission_list_component_1 = require("./permission/permission-list/permission-list.component");
var permission_dialog_component_1 = require("./permission/permission-dialog/permission-dialog.component");
var menu_permission_dialog_component_1 = require("./permission/menu-permission-dialog/menu-permission-dialog.component");
var member_permission_dialog_component_1 = require("./permission/member-permission-dialog/member-permission-dialog.component");
var account_routing_1 = require("./account-routing");
var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [account_routing_1.AccountRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule, lms_module_1.LMSModule],
            declarations: [user_list_component_1.UserListComponent,
                user_dialog_component_1.UserDialog,
                export_dialog_component_1.UserExportDialog,
                import_dialog_component_1.UserImportDialog,
                profile_dialog_component_1.UserProfileDialog,
                permission_list_component_1.PermissionListComponent,
                permission_dialog_component_1.PermissionDialog,
                menu_permission_dialog_component_1.MenuPermissionDialog,
                member_permission_dialog_component_1.MemberPermissionDialog,
            ],
            exports: [profile_dialog_component_1.UserProfileDialog],
            providers: []
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L2FjY291bnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQXlDO0FBQ3pDLG1EQUFpRDtBQUNqRCx5REFBMEQ7QUFDMUQsZ0RBQThDO0FBQzlDLDRFQUF5RTtBQUN6RSxrRkFBc0U7QUFDdEUsd0ZBQWdGO0FBQ2hGLHdGQUFnRjtBQUNoRiwyRkFBbUY7QUFDbkYsb0dBQWlHO0FBQ2pHLDBHQUE4RjtBQUM5Rix5SEFBNEc7QUFDNUcsK0hBQWtIO0FBR2xILHFEQUF5RDtBQWlCekQ7SUFBQTtJQUNBLENBQUM7SUFEWSxhQUFhO1FBZnpCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLHNDQUFvQixFQUFFLCtCQUFlLEVBQUUsd0JBQVUsRUFBRSxzQkFBUyxDQUFDO1lBQ3ZFLFlBQVksRUFBRSxDQUFDLHVDQUFpQjtnQkFDNUIsa0NBQVU7Z0JBQ1YsMENBQWdCO2dCQUNoQiwwQ0FBZ0I7Z0JBQ2hCLDRDQUFpQjtnQkFDakIsbURBQXVCO2dCQUN2Qiw4Q0FBZ0I7Z0JBQ2hCLHVEQUFvQjtnQkFDcEIsMkRBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFLENBQUMsNENBQWlCLENBQUM7WUFDNUIsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztPQUNXLGFBQWEsQ0FDekI7SUFBRCxvQkFBQztDQURELEFBQ0MsSUFBQTtBQURZLHNDQUFhIiwiZmlsZSI6ImFwcC9hY2NvdW50L2FjY291bnQubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuLi9hdXRoL2F1dGgubW9kdWxlJztcbmltcG9ydCB7IEVycFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IExNU01vZHVsZSB9IGZyb20gJy4uL2xtcy9sbXMubW9kdWxlJztcbmltcG9ydCB7IFVzZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91c2VyL3VzZXItbGlzdC91c2VyLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJEaWFsb2cgfSBmcm9tICcuL3VzZXIvdXNlci1kaWFsb2cvdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJFeHBvcnREaWFsb2cgfSBmcm9tICcuL3VzZXIvZXhwb3J0LWRpYWxvZy9leHBvcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VySW1wb3J0RGlhbG9nIH0gZnJvbSAnLi91c2VyL2ltcG9ydC1kaWFsb2cvaW1wb3J0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVEaWFsb2cgfSBmcm9tICcuL3VzZXIvcHJvZmlsZS1kaWFsb2cvcHJvZmlsZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1pc3Npb25MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9wZXJtaXNzaW9uL3Blcm1pc3Npb24tbGlzdC9wZXJtaXNzaW9uLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFBlcm1pc3Npb25EaWFsb2cgfSBmcm9tICcuL3Blcm1pc3Npb24vcGVybWlzc2lvbi1kaWFsb2cvcGVybWlzc2lvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVQZXJtaXNzaW9uRGlhbG9nIH0gZnJvbSAnLi9wZXJtaXNzaW9uL21lbnUtcGVybWlzc2lvbi1kaWFsb2cvbWVudS1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVtYmVyUGVybWlzc2lvbkRpYWxvZyB9IGZyb20gJy4vcGVybWlzc2lvbi9tZW1iZXItcGVybWlzc2lvbi1kaWFsb2cvbWVtYmVyLXBlcm1pc3Npb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xuaW1wb3J0IHsgUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3JhZGlvYnV0dG9uJztcbmltcG9ydCB7IEFjY291bnRSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hY2NvdW50LXJvdXRpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtBY2NvdW50Um91dGluZ01vZHVsZSwgRXJwU2hhcmVkTW9kdWxlLCBBdXRoTW9kdWxlLCBMTVNNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1VzZXJMaXN0Q29tcG9uZW50LFxuICAgICAgICBVc2VyRGlhbG9nLFxuICAgICAgICBVc2VyRXhwb3J0RGlhbG9nLFxuICAgICAgICBVc2VySW1wb3J0RGlhbG9nLFxuICAgICAgICBVc2VyUHJvZmlsZURpYWxvZyxcbiAgICAgICAgUGVybWlzc2lvbkxpc3RDb21wb25lbnQsXG4gICAgICAgIFBlcm1pc3Npb25EaWFsb2csXG4gICAgICAgIE1lbnVQZXJtaXNzaW9uRGlhbG9nLFxuICAgICAgICBNZW1iZXJQZXJtaXNzaW9uRGlhbG9nLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1VzZXJQcm9maWxlRGlhbG9nXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFjY291bnRNb2R1bGUge1xufVxuIl19
