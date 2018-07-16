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
var menu_service_1 = require("../../../shared/services/menu.service");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var MenuPermissionDialog = (function (_super) {
    __extends(MenuPermissionDialog, _super);
    function MenuPermissionDialog(menuService) {
        var _this = _super.call(this) || this;
        _this.menuService = menuService;
        return _this;
    }
    MenuPermissionDialog.prototype.nodeSelect = function (event) {
        var menuCodes = _.map(this.selectedMenus, function (menuNode) {
            return menuNode["data"];
        });
        this.object.menu_access = JSON.stringify(menuCodes);
    };
    MenuPermissionDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.menuTree = this.menuService.menuToTree(this.menuService.adminMenu());
        console.log('menuTree:', this.menuTree);
        this.menuTree.forEach(function (tree) {
            tree.label = _this.translateService.instant(tree.label);
            if (tree.children.length > 0) {
                tree.children.forEach(function (child) {
                    child.label = _this.translateService.instant(child.label);
                });
            }
        });
        this.onShow.subscribe(function () {
            _this.selectedMenus = [];
            var menuCodes = _this.object.menu_access;
            if (!menuCodes)
                menuCodes = [];
            else
                menuCodes = JSON.parse(menuCodes);
            _.each(menuCodes, (function (code) {
                var menuNode = _this.menuService.findMenuTreeNode(_this.menuTree, code);
                if (menuNode)
                    _this.selectedMenus.push(menuNode);
            }));
        });
    };
    MenuPermissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-permission-dialog',
            template: "<form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">     <p-dialog header=\"{{'Menu permission'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"600\" [responsive]=\"true\">     \t<div class=\"spinner\" [hidden]=\"!loading\"></div>         <div class=\"ui-g ui-fluid form-group\">             <p-tree [value]=\"menuTree\" selectionMode=\"checkbox\" [(selection)]=\"selectedMenus\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>         </div>         <p-footer>             <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"></button>             <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>         </p-footer>     </p-dialog> </form>",
        }),
        __metadata("design:paramtypes", [menu_service_1.MenuService])
    ], MenuPermissionDialog);
    return MenuPermissionDialog;
}(base_dialog_1.BaseDialog));
exports.MenuPermissionDialog = MenuPermissionDialog;
