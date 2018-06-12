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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var excel_service_1 = require("../../../shared/services/excel.service");
var UserImportDialog = (function (_super) {
    __extends(UserImportDialog, _super);
    function UserImportDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.onImportCompleteReceiver = new Rx_1.Subject();
        _this.onImportComplete = _this.onImportCompleteReceiver.asObservable();
        _this.display = false;
        _this.records = [];
        _this.total = 0;
        return _this;
    }
    UserImportDialog.prototype.show = function () {
        this.display = true;
    };
    UserImportDialog.prototype.hide = function () {
        this.display = false;
    };
    UserImportDialog.prototype.import = function () {
        var _this = this;
        group_model_1.Group.listUserGroup(this).subscribe(function (groups) {
            var users = _.each(_this.records, function (record) {
                var user = new user_model_1.User();
                Object.assign(user, record);
                user["password"] = constants_1.DEFAULT_PASSWORD;
                var group = _.find(groups, function (obj) {
                    return obj.code == record["group_code"];
                });
                if (group) {
                    user.group_id = group.id;
                }
                return user;
            });
            user_model_1.User.createArray(_this, users).subscribe(function () {
                _this.onImportCompleteReceiver.next();
                _this.hide();
            });
        });
    };
    UserImportDialog.prototype.changeListner = function (event) {
        var _this = this;
        var file = event.files[0];
        this.fileName = file.name;
        this.excelService.importFromExcelFile(file).subscribe(function (data) {
            _this.records = data;
            _this.total = _this.records.length;
        });
    };
    UserImportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-import-dialog',
            templateUrl: 'import-dialog.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], UserImportDialog);
    return UserImportDialog;
}(base_component_1.BaseComponent));
exports.UserImportDialog = UserImportDialog;
//# sourceMappingURL=import-dialog.component.js.map