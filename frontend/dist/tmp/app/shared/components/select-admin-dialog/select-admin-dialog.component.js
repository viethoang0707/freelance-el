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
var Rx_1 = require("rxjs/Rx");
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectAdminDialog = (function (_super) {
    __extends(SelectAdminDialog, _super);
    function SelectAdminDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectUsersReceiver = new Rx_1.Subject();
        _this.onSelectUsers = _this.onSelectUsersReceiver.asObservable();
        _this.display = false;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectAdminDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectAdminDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedNode) {
            user_model_1.User.listByGroup(this, this.selectedNode.data.id).subscribe(function (users) {
                _this.users = _.filter(users, (function (user) {
                    return user.is_admin;
                }));
            });
        }
    };
    SelectAdminDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedNode = null;
        this.selectedAdmin = null;
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectAdminDialog.prototype.select = function () {
        this.onSelectUsersReceiver.next(this.selectedAdmin);
        this.hide();
    };
    SelectAdminDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-admin-dialog',
            template: "<p-dialog header=\"{{'Select users'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\" positionTop=\"50\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g ui-fluid form-group\">     <div class=\"ui-g-5\">       <p-tree [value]=\"tree\" selectionMode=\"single\" (onNodeSelect)=\"nodeSelect($event)\" [(selection)]=\"selectedNode\" ></p-tree>     </div>     <div class=\"ui-g-7\">       <p-table  [value]=\"users\" [(selection)]=\"selectedAdmin\" >         <ng-template pTemplate=\"header\" >           <tr>              <th style=\"width: 2.25em\">                 <p-tableRadioButton></p-tableRadioButton>             </th>             <th >               {{'Name'|translate}}             </th>             <th>               {{'Group'|translate}}             </th>           </tr>         </ng-template>         <ng-template pTemplate=\"body\" let-rowData>           <tr [pSelectableRow]=\"rowData\">             <td>               <p-tableRadioButton [value]=\"rowData\"></p-tableRadioButton>             </td>             <td >               {{rowData.name}}             </td>             <td >               {{rowData.group_id__DESC__}}             </td>           </tr>         </ng-template>       </p-table>     </div>   </div>   <p-footer>     <button type=\"button\" [disabled]=\"!selectedAdmin\" pButton icon=\"fa-check\" label=\"{{'OK'|translate}}\" (click)=\"select()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], SelectAdminDialog);
    return SelectAdminDialog;
}(base_component_1.BaseComponent));
exports.SelectAdminDialog = SelectAdminDialog;
