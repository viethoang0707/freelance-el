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
            var users = _.map(_this.records, function (record) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3VzZXIvaW1wb3J0LWRpYWxvZy9pbXBvcnQtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOEJBQThDO0FBRzlDLDRFQUFxRTtBQUNyRSxpRkFBK0U7QUFDL0UsMEVBQW1FO0FBQ25FLDhCQUFnQztBQUNoQyw4REFBb0Y7QUFFcEYsd0VBQXNFO0FBUXRFO0lBQXNDLG9DQUFhO0lBU2xELDBCQUFvQixZQUEwQjtRQUE5QyxZQUNDLGlCQUFPLFNBSVA7UUFMbUIsa0JBQVksR0FBWixZQUFZLENBQWM7UUFIdEMsOEJBQXdCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDL0Qsc0JBQWdCLEdBQW9CLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUloRixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs7SUFDaEIsQ0FBQztJQUVELCtCQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpQ0FBTSxHQUFOO1FBQUEsaUJBbUJDO1FBbEJBLG1CQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTTtnQkFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsNEJBQWdCLENBQUM7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBVTtvQkFDckMsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUN6QjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1lBQ0gsaUJBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxLQUFVO1FBQXhCLGlCQU9DO1FBTkEsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3pELEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBcERXLGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLDhCQUE4QjtTQUMzQyxDQUFDO3lDQVVpQyw0QkFBWTtPQVRsQyxnQkFBZ0IsQ0F1RDVCO0lBQUQsdUJBQUM7Q0F2REQsQUF1REMsQ0F2RHFDLDhCQUFhLEdBdURsRDtBQXZEWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL2FjY291bnQvdXNlci9pbXBvcnQtZGlhbG9nL2ltcG9ydC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3VzZXItaW1wb3J0LWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnaW1wb3J0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJJbXBvcnREaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgZmlsZU5hbWU6IHN0cmluZztcblx0cHJpdmF0ZSByZWNvcmRzOiBhbnlbXTtcblx0cHJpdmF0ZSB0b3RhbDogbnVtYmVyO1xuXHRwcml2YXRlIG9uSW1wb3J0Q29tcGxldGVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25JbXBvcnRDb21wbGV0ZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vbkltcG9ydENvbXBsZXRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5yZWNvcmRzID0gW107XG5cdFx0dGhpcy50b3RhbCA9IDA7XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cblx0aW1wb3J0KCkge1xuXHRcdEdyb3VwLmxpc3RVc2VyR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG5cdFx0XHR2YXIgdXNlcnMgPSBfLm1hcCh0aGlzLnJlY29yZHMsIChyZWNvcmQpID0+IHtcblx0XHRcdFx0dmFyIHVzZXIgPSBuZXcgVXNlcigpO1xuXHRcdFx0XHRPYmplY3QuYXNzaWduKHVzZXIsIHJlY29yZCk7XG5cdFx0XHRcdHVzZXJbXCJwYXNzd29yZFwiXSA9IERFRkFVTFRfUEFTU1dPUkQ7XG5cdFx0XHRcdHZhciBncm91cCA9IF8uZmluZChncm91cHMsIChvYmo6IEdyb3VwKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iai5jb2RlID09IHJlY29yZFtcImdyb3VwX2NvZGVcIl07XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoZ3JvdXApIHtcblx0XHRcdFx0XHR1c2VyLmdyb3VwX2lkID0gZ3JvdXAuaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHVzZXI7XG5cdFx0XHR9KTtcblx0XHRcdFVzZXIuY3JlYXRlQXJyYXkodGhpcywgdXNlcnMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMub25JbXBvcnRDb21wbGV0ZVJlY2VpdmVyLm5leHQoKTtcblx0XHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGNoYW5nZUxpc3RuZXIoZXZlbnQ6IGFueSkge1xuXHRcdHZhciBmaWxlID0gZXZlbnQuZmlsZXNbMF07XG5cdFx0dGhpcy5maWxlTmFtZSA9IGZpbGUubmFtZTtcblx0XHR0aGlzLmV4Y2VsU2VydmljZS5pbXBvcnRGcm9tRXhjZWxGaWxlKGZpbGUpLnN1YnNjcmliZShkYXRhID0+IHtcblx0XHRcdHRoaXMucmVjb3JkcyA9IGRhdGE7XG5cdFx0XHR0aGlzLnRvdGFsID0gdGhpcy5yZWNvcmRzLmxlbmd0aDtcblx0XHR9KTtcblx0fVxuXG5cbn1cblxuIl19
