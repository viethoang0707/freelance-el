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
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var ExamEnrollDialog = (function (_super) {
    __extends(ExamEnrollDialog, _super);
    function ExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.EXAM_MEMBER_ROLE = constants_1.EXAM_MEMBER_ROLE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.EXAM_MEMBER_STATUS = constants_1.EXAM_MEMBER_STATUS;
        return _this;
    }
    ExamEnrollDialog.prototype.enroll = function (exam) {
        this.display = true;
        this.exam = exam;
        this.selectedCandidates = [];
        this.selectedSupervisors = [];
        this.loadMembers();
    };
    ExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamEnrollDialog.prototype.addCandidate = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.exam.enroll(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    ExamEnrollDialog.prototype.addSupervisor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.exam.enrollSupervisor(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    ExamEnrollDialog.prototype.deleteMember = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                exam_member_model_1.ExamMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedCandidates = [];
                    _this.selectedSupervisors = [];
                    _this.loadMembers();
                });
            });
    };
    ExamEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        exam_member_model_1.ExamMember.listByExam(this, this.exam.id).subscribe(function (members) {
            _this.candidates = _.filter(members, function (member) {
                return member.role == 'candidate';
            });
            _this.supervisors = _.filter(members, function (member) {
                return member.role == 'supervisor';
            });
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], ExamEnrollDialog.prototype, "usersDialog", void 0);
    ExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-enrollment-dialog',
            templateUrl: 'enrollment-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ExamEnrollDialog);
    return ExamEnrollDialog;
}(base_component_1.BaseComponent));
exports.ExamEnrollDialog = ExamEnrollDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L2V4YW0vZW5yb2xsbWVudC1kaWFsb2cvZW5yb2xsbWVudC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQU1wRSxpRkFBK0U7QUFHL0Usd0ZBQWdGO0FBRWhGLDhEQUF5SDtBQUV6SCw4QkFBZ0M7QUFDaEMsMkhBQStHO0FBUS9HO0lBQXNDLG9DQUFhO0lBaUJsRDtRQUFBLFlBQ0MsaUJBQU8sU0FDUDtRQWpCRSxzQkFBZ0IsR0FBRyw0QkFBZ0IsQ0FBQztRQUNwQyxpQkFBVyxHQUFHLHVCQUFXLENBQUM7UUFDMUIsd0JBQWtCLEdBQUcsOEJBQWtCLENBQUM7O0lBZTNDLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sSUFBVTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNYLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELCtCQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUUsdUNBQVksR0FBWjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ2xELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUNsRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUFZLEdBQVosVUFBYSxPQUFPO1FBQXBCLGlCQVNDO1FBUkcsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ25FLDhCQUFVLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQzVDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQUEsaUJBU0M7UUFSRyw4QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3ZELEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFNO2dCQUN2QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU07Z0JBQ3hDLE9BQU8sTUFBTSxDQUFDLElBQUksSUFBSSxZQUFZLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUExRDZCO1FBQTdCLGdCQUFTLENBQUMsZ0RBQWlCLENBQUM7a0NBQWMsZ0RBQWlCO3lEQUFDO0lBZnBELGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLGtDQUFrQztTQUMvQyxDQUFDOztPQUNXLGdCQUFnQixDQTBFNUI7SUFBRCx1QkFBQztDQTFFRCxBQTBFQyxDQTFFcUMsOEJBQWEsR0EwRWxEO0FBMUVZLDRDQUFnQiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9leGFtL2Vucm9sbG1lbnQtZGlhbG9nL2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgREVGQVVMVF9EQVRFX0xPQ0FMRSwgRVhBTV9TVEFUVVMsIEVYQU1fTUVNQkVSX1JPTEUsIEVYQU1fTUVNQkVSX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2V4YW0tZW5yb2xsbWVudC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2Vucm9sbG1lbnQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbUVucm9sbERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgRVhBTV9NRU1CRVJfUk9MRSA9IEVYQU1fTUVNQkVSX1JPTEU7XG4gICAgRVhBTV9TVEFUVVMgPSBFWEFNX1NUQVRVUztcbiAgICBFWEFNX01FTUJFUl9TVEFUVVMgPSBFWEFNX01FTUJFUl9TVEFUVVM7XG5cblxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSBleGFtOiBFeGFtO1xuICAgIHByaXZhdGUgY2FuZGlkYXRlczogRXhhbU1lbWJlcltdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRDYW5kaWRhdGVzOiBhbnk7XG4gICAgcHJpdmF0ZSBzdXBlcnZpc29yczogRXhhbU1lbWJlcltdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRTdXBlcnZpc29yczogYW55O1xuXG5cbiAgICBAVmlld0NoaWxkKFNlbGVjdFVzZXJzRGlhbG9nKSB1c2Vyc0RpYWxvZzogU2VsZWN0VXNlcnNEaWFsb2c7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGVucm9sbChleGFtOiBFeGFtKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLmV4YW0gPSBleGFtO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FuZGlkYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdGVkU3VwZXJ2aXNvcnMgPSBbXTtcblx0XHR0aGlzLmxvYWRNZW1iZXJzKCk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHR9XG5cbiAgICBhZGRDYW5kaWRhdGUoKSB7XG4gICAgICAgIHRoaXMudXNlcnNEaWFsb2cuc2hvdygpO1xuICAgICAgICB0aGlzLnVzZXJzRGlhbG9nLm9uU2VsZWN0VXNlcnMuZmlyc3QoKS5zdWJzY3JpYmUodXNlcnMgPT4ge1xuICAgICAgICAgICAgdmFyIHVzZXJJZHMgPSBfLnBsdWNrKHVzZXJzLCAnaWQnKTtcbiAgICAgICAgICAgIHRoaXMuZXhhbS5lbnJvbGwodGhpcywgdXNlcklkcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkU3VwZXJ2aXNvcigpIHtcbiAgICAgICAgdGhpcy51c2Vyc0RpYWxvZy5zaG93KCk7XG4gICAgICAgIHRoaXMudXNlcnNEaWFsb2cub25TZWxlY3RVc2Vycy5maXJzdCgpLnN1YnNjcmliZSh1c2VycyA9PiB7XG4gICAgICAgICAgICB2YXIgdXNlcklkcyA9IF8ucGx1Y2sodXNlcnMsICdpZCcpO1xuICAgICAgICAgICAgdGhpcy5leGFtLmVucm9sbFN1cGVydmlzb3IodGhpcywgdXNlcklkcykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTWVtYmVyKG1lbWJlcnMpIHtcbiAgICAgICAgaWYgKG1lbWJlcnMgJiYgbWVtYmVycy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm0odGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0FyZSB5b3Ugc3VyZSB0byBkZWxldGU/JyksICgpID0+IHtcbiAgICAgICAgICAgICAgICBFeGFtTWVtYmVyLmRlbGV0ZUFycmF5KHRoaXMsIG1lbWJlcnMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYW5kaWRhdGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdXBlcnZpc29ycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZW1iZXJzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkTWVtYmVycygpIHtcbiAgICAgICAgRXhhbU1lbWJlci5saXN0QnlFeGFtKHRoaXMsIHRoaXMuZXhhbS5pZCkuc3Vic2NyaWJlKG1lbWJlcnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW5kaWRhdGVzID0gXy5maWx0ZXIobWVtYmVycywgKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW1iZXIucm9sZSA9PSAnY2FuZGlkYXRlJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdXBlcnZpc29ycyA9IF8uZmlsdGVyKG1lbWJlcnMsIChtZW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVtYmVyLnJvbGUgPT0gJ3N1cGVydmlzb3InO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl19
