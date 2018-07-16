"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var user_model_1 = require("../../../shared/models/elearning/user.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var MemberPermissionDialog = (function (_super) {
    __extends(MemberPermissionDialog, _super);
    function MemberPermissionDialog() {
        return _super.call(this) || this;
    }
    MemberPermissionDialog.prototype.show = function (permission) {
        this.display = true;
        this.permission = permission;
        this.loadMembers();
    };
    MemberPermissionDialog.prototype.hide = function () {
        this.display = false;
    };
    MemberPermissionDialog.prototype.addMember = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var updateApi = _.map(users, function (user) {
                user.permission_id = _this.permission.id;
                return user.__api__update();
            });
            base_model_1.BaseModel.bulk_update.apply(base_model_1.BaseModel, [_this].concat(updateApi)).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    MemberPermissionDialog.prototype.deleteMember = function () {
        var _this = this;
        if (this.selectedUsers && this.selectedUsers.length)
            this.confirm('Are you sure to remove ?', function () {
                _.each(_this.selectedUsers, function (user) {
                    user.permission_id = null;
                });
                user_model_1.User.updateArray(_this, _this.selectedUsers).subscribe(function () {
                    _this.loadMembers();
                });
            });
    };
    MemberPermissionDialog.prototype.loadMembers = function () {
        var _this = this;
        user_model_1.User.listByPermission(this, this.permission.id).subscribe(function (users) {
            _this.users = users;
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], MemberPermissionDialog.prototype, "usersDialog", void 0);
    MemberPermissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'member-permission-dialog',
            template: "<p-dialog header=\"{{'Permission member'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1200\" height=\"100%\" [responsive]=\"true\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addMember() \"></button>                     <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMember() \" *ngIf=\"selectedUsers && selectedUsers.length \"></button>                 </div>             </p-toolbar>             <p-table #userTable [value]=\"users\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedUsers \" [responsive]=\"true \" sortField=\"name\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th style=\"width: 2.25em\">                             <p-tableHeaderCheckbox></p-tableHeaderCheckbox>                         </th>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'login'\">                             {{'Login'|translate}}                             <p-sortIcon [field]=\"'login'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'email'\">                             {{'Email'|translate}}                             <p-sortIcon [field]=\"'email'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'position'\">                             {{'Position'|translate}}                             <p-sortIcon [field]=\"'position'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'gender'\">                             {{'Gender'|translate}}                             <p-sortIcon [field]=\"'gender'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'dob'\">                             {{'Date of birth'|translate}}                             <p-sortIcon [field]=\"'dob'\"></p-sortIcon>                         </th>                         <th>{{'Phone'|translate}}</th>                         <th [pSortableColumn]=\"'group_id__DESC__'\">                             {{'Department'|translate}}                             <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-user>                     <tr [pSelectableRow]=\"user \">                         <td>                             <p-tableCheckbox [value]=\"user\"></p-tableCheckbox>                         </td>                         <td class=\"showformb\" style=\"text-align: left;\">{{user.name}}</td>                         <td>{{user.login}}</td>                         <td class=\"showformb\" style=\"text-align: left;\">{{user.email}}</td>                         <td class=\"showformb\">{{user.position}}</td>                         <td class=\"showformb\">{{user.gender}}</td>                         <td class=\"showformb\">{{user.dob | date : \"dd/MM/yyyy \"}}}</td>                         <td class=\"showformb\">{{user.phone}}</td>                         <td class=\"showformb\">{{user.group_id__DESC__}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{users?.length}}                 </ng-template>             </p-table>         </div>     </p-scrollPanel>     <select-user-dialog></select-user-dialog>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], MemberPermissionDialog);
    return MemberPermissionDialog;
}(base_component_1.BaseComponent));
exports.MemberPermissionDialog = MemberPermissionDialog;
