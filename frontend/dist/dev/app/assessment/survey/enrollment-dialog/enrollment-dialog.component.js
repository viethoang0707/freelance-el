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
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var SurveyEnrollDialog = (function (_super) {
    __extends(SurveyEnrollDialog, _super);
    function SurveyEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.SURVEY_MEMBER_ENROLL_STATUS = constants_1.SURVEY_MEMBER_ENROLL_STATUS;
        return _this;
    }
    SurveyEnrollDialog.prototype.enroll = function (survey) {
        this.display = true;
        this.survey = survey;
        this.selectedMembers = [];
        this.loadMembers();
    };
    SurveyEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveyEnrollDialog.prototype.addMember = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.survey.enroll(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    SurveyEnrollDialog.prototype.deleteMember = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                survey_member_model_1.SurveyMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedMembers = [];
                    _this.loadMembers();
                });
            });
    };
    SurveyEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        survey_member_model_1.SurveyMember.listBySurvey(this, this.survey.id).subscribe(function (members) {
            _this.members = members;
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], SurveyEnrollDialog.prototype, "usersDialog", void 0);
    SurveyEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-enrollment-dialog',
            templateUrl: 'enrollment-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], SurveyEnrollDialog);
    return SurveyEnrollDialog;
}(base_component_1.BaseComponent));
exports.SurveyEnrollDialog = SurveyEnrollDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3N1cnZleS9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBTXBFLGlGQUErRTtBQUcvRSw0RkFBb0Y7QUFFcEYsOERBQW9JO0FBRXBJLDhCQUFnQztBQUNoQywySEFBK0c7QUFRL0c7SUFBd0Msc0NBQWE7SUFhcEQ7UUFBQSxZQUNDLGlCQUFPLFNBQ1A7UUFiRSxtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFDOUIsaUNBQTJCLEdBQUcsdUNBQTJCLENBQUM7O0lBWTdELENBQUM7SUFFRCxtQ0FBTSxHQUFOLFVBQU8sTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFJRSxzQ0FBUyxHQUFUO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDbEQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLE9BQU87UUFBcEIsaUJBUUM7UUFQRyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTTtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTtnQkFDbkUsa0NBQVksQ0FBQyxXQUFXLENBQUMsS0FBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7b0JBQzFCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQUEsaUJBSUM7UUFIRyxrQ0FBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQzdELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTNDNkI7UUFBN0IsZ0JBQVMsQ0FBQyxnREFBaUIsQ0FBQztrQ0FBYyxnREFBaUI7MkRBQUM7SUFYcEQsa0JBQWtCO1FBTDlCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUsa0NBQWtDO1NBQy9DLENBQUM7O09BQ1csa0JBQWtCLENBdUQ5QjtJQUFELHlCQUFDO0NBdkRELEFBdURDLENBdkR1Qyw4QkFBYSxHQXVEcEQ7QUF2RFksZ0RBQWtCIiwiZmlsZSI6ImFwcC9hc3Nlc3NtZW50L3N1cnZleS9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFN1cnZleSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1cnZleS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgREVGQVVMVF9EQVRFX0xPQ0FMRSwgU1VSVkVZX1NUQVRVUywgRVhBTV9NRU1CRVJfUk9MRSwgU1VSVkVZX01FTUJFUl9FTlJPTExfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnc3VydmV5LWVucm9sbG1lbnQtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdlbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFN1cnZleUVucm9sbERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgU1VSVkVZX1NUQVRVUyA9IFNVUlZFWV9TVEFUVVM7XG4gICAgU1VSVkVZX01FTUJFUl9FTlJPTExfU1RBVFVTID0gU1VSVkVZX01FTUJFUl9FTlJPTExfU1RBVFVTO1xuXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHN1cnZleTogU3VydmV5O1xuICAgIHByaXZhdGUgbWVtYmVyczogU3VydmV5TWVtYmVyW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZE1lbWJlcnM6IGFueTtcblxuXG4gICAgQFZpZXdDaGlsZChTZWxlY3RVc2Vyc0RpYWxvZykgdXNlcnNEaWFsb2c6IFNlbGVjdFVzZXJzRGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRlbnJvbGwoc3VydmV5OiBTdXJ2ZXkpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuc3VydmV5ID0gc3VydmV5O1xuICAgICAgICB0aGlzLnNlbGVjdGVkTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMubG9hZE1lbWJlcnMoKTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXG5cbiAgICBhZGRNZW1iZXIoKSB7XG4gICAgICAgIHRoaXMudXNlcnNEaWFsb2cuc2hvdygpO1xuICAgICAgICB0aGlzLnVzZXJzRGlhbG9nLm9uU2VsZWN0VXNlcnMuZmlyc3QoKS5zdWJzY3JpYmUodXNlcnMgPT4ge1xuICAgICAgICAgICAgdmFyIHVzZXJJZHMgPSBfLnBsdWNrKHVzZXJzLCAnaWQnKTtcbiAgICAgICAgICAgIHRoaXMuc3VydmV5LmVucm9sbCh0aGlzLCB1c2VySWRzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZE1lbWJlcnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVNZW1iZXIobWVtYmVycykge1xuICAgICAgICBpZiAobWVtYmVycyAmJiBtZW1iZXJzLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuY29uZmlybSh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZT8nKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFN1cnZleU1lbWJlci5kZWxldGVBcnJheSh0aGlzLCBtZW1iZXJzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTWVtYmVycygpIHtcbiAgICAgICAgU3VydmV5TWVtYmVyLmxpc3RCeVN1cnZleSh0aGlzLCB0aGlzLnN1cnZleS5pZCkuc3Vic2NyaWJlKG1lbWJlcnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iXX0=
