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
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var excel_service_1 = require("../../../shared/services/excel.service");
var UserExportDialog = (function (_super) {
    __extends(UserExportDialog, _super);
    function UserExportDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.users = [];
        _this.fields = [
            { value: 'name', label: _this.translateService.instant('Name') },
            { value: 'email', label: _this.translateService.instant('Email') },
            { value: 'login', label: _this.translateService.instant('Login') },
            { value: 'group_code', label: _this.translateService.instant('Group') }
        ];
        _this.display = false;
        return _this;
    }
    UserExportDialog.prototype.show = function (users) {
        this.selectedFields = [];
        this.users = users;
        this.display = true;
    };
    UserExportDialog.prototype.hide = function () {
        this.display = false;
    };
    UserExportDialog.prototype.export = function () {
        var _this = this;
        var data = _.map(this.users, function (user) {
            var userData = {};
            _.each(_this.selectedFields, function (field) {
                userData[field] = user[field];
            });
            return userData;
        });
        this.excelService.exportAsExcelFile(data, 'user_export');
        this.hide();
    };
    UserExportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-export-dialog',
            template: "<p-dialog header=\"{{'Export to Excel'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"300\" [responsive]=\"true\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g form-group\">     <div class=\"ui-g-12\">       <label> {{'Exported fields' | translate}}</label>       <p-listbox [options]=\"fields\" [(ngModel)]=\"selectedFields\"  multiple=\"multiple\" checkbox=\"checkbox\">       </p-listbox>     </div>   </div>   <p-footer>     <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Export'|translate}}\" (click)=\"export()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], UserExportDialog);
    return UserExportDialog;
}(base_component_1.BaseComponent));
exports.UserExportDialog = UserExportDialog;
