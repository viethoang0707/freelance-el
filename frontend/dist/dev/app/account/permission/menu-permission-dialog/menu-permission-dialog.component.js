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
            templateUrl: 'menu-permission-dialog.component.html',
        }),
        __metadata("design:paramtypes", [menu_service_1.MenuService])
    ], MenuPermissionDialog);
    return MenuPermissionDialog;
}(base_dialog_1.BaseDialog));
exports.MenuPermissionDialog = MenuPermissionDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3Blcm1pc3Npb24vbWVudS1wZXJtaXNzaW9uLWRpYWxvZy9tZW51LXBlcm1pc3Npb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFJekQsc0VBQW9FO0FBRXBFLDJFQUF5RTtBQUV6RSw4QkFBZ0M7QUFXaEM7SUFBMEMsd0NBQXNCO0lBSy9ELDhCQUFvQixXQUF3QjtRQUE1QyxZQUNDLGlCQUFPLFNBQ1A7UUFGbUIsaUJBQVcsR0FBWCxXQUFXLENBQWE7O0lBRTVDLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQSxRQUFRO1lBQ2pELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQXdCQztRQXZCQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBVTtvQkFDaEMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDckIsS0FBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVM7Z0JBQ2IsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7Z0JBRWYsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFDLElBQVk7Z0JBQy9CLElBQUksUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxRQUFRO29CQUNYLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUF4Q1csb0JBQW9CO1FBTGhDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxXQUFXLEVBQUUsdUNBQXVDO1NBQ3BELENBQUM7eUNBTWdDLDBCQUFXO09BTGhDLG9CQUFvQixDQTJDaEM7SUFBRCwyQkFBQztDQTNDRCxBQTJDQyxDQTNDeUMsd0JBQVUsR0EyQ25EO0FBM0NZLG9EQUFvQiIsImZpbGUiOiJhcHAvYWNjb3VudC9wZXJtaXNzaW9uL21lbnUtcGVybWlzc2lvbi1kaWFsb2cvbWVudS1wZXJtaXNzaW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Blcm1pc3Npb24ubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcblxuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdtZW51LXBlcm1pc3Npb24tZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdtZW51LXBlcm1pc3Npb24tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudVBlcm1pc3Npb25EaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPFBlcm1pc3Npb24+IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwcml2YXRlIG1lbnVUcmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHNlbGVjdGVkTWVudXM6IFRyZWVOb2RlW107XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBtZW51U2VydmljZTogTWVudVNlcnZpY2UpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cdFx0dmFyIG1lbnVDb2RlcyA9IF8ubWFwKHRoaXMuc2VsZWN0ZWRNZW51cywgbWVudU5vZGUgPT4ge1xuXHRcdFx0cmV0dXJuIG1lbnVOb2RlW1wiZGF0YVwiXTtcblx0XHR9KTtcblx0XHR0aGlzLm9iamVjdC5tZW51X2FjY2VzcyA9IEpTT04uc3RyaW5naWZ5KG1lbnVDb2Rlcyk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLm1lbnVUcmVlID0gdGhpcy5tZW51U2VydmljZS5tZW51VG9UcmVlKHRoaXMubWVudVNlcnZpY2UuYWRtaW5NZW51KCkpO1xuXHRcdGNvbnNvbGUubG9nKCdtZW51VHJlZTonLCB0aGlzLm1lbnVUcmVlKTtcblx0XHR0aGlzLm1lbnVUcmVlLmZvckVhY2goKHRyZWU6IGFueSkgPT4ge1xuXHRcdFx0dHJlZS5sYWJlbCA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHRyZWUubGFiZWwpO1xuXHRcdFx0aWYgKHRyZWUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0cmVlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcblx0XHRcdFx0XHRjaGlsZC5sYWJlbCA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KGNoaWxkLmxhYmVsKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRNZW51cyA9IFtdO1xuXHRcdFx0dmFyIG1lbnVDb2RlcyA9IHRoaXMub2JqZWN0Lm1lbnVfYWNjZXNzO1xuXHRcdFx0aWYgKCFtZW51Q29kZXMpXG5cdFx0XHRcdG1lbnVDb2RlcyA9IFtdO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRtZW51Q29kZXMgPSBKU09OLnBhcnNlKG1lbnVDb2Rlcyk7XG5cdFx0XHRfLmVhY2gobWVudUNvZGVzLCAoKGNvZGU6IHN0cmluZykgPT4ge1xuXHRcdFx0XHR2YXIgbWVudU5vZGUgPSB0aGlzLm1lbnVTZXJ2aWNlLmZpbmRNZW51VHJlZU5vZGUodGhpcy5tZW51VHJlZSwgY29kZSk7XG5cdFx0XHRcdGlmIChtZW51Tm9kZSlcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkTWVudXMucHVzaChtZW51Tm9kZSk7XG5cdFx0XHR9KSk7XG5cdFx0fSk7XG5cdH1cblxuXG59XG5cbiJdfQ==
