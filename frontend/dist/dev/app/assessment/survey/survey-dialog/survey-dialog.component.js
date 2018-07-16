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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var SurveyDialog = (function (_super) {
    __extends(SurveyDialog, _super);
    function SurveyDialog(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.editor = new survey_member_model_1.SurveyMember();
        return _this;
    }
    SurveyDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.IsNew) {
                _this.editor = new survey_member_model_1.SurveyMember();
                object.supervisor_id = _this.ContextUser.id;
                object.review_state = _this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            }
            else {
                survey_member_model_1.SurveyMember.surveyEditor(_this, object.id).subscribe(function (member) {
                    if (!member) {
                        _this.editor = new survey_member_model_1.SurveyMember();
                        _this.editor.role = 'editor';
                        _this.editor.survey_id = object.id;
                    }
                    else
                        _this.editor = member;
                });
            }
            if (object.start && object.end) {
                _this.rangeDates = [object.start, object.end];
            }
            var lang = _this.translateService.currentLang;
            _this.http.get("/assets/i18n/calendar." + lang + ".json")
                .subscribe(function (res) {
                _this.locale = res.json();
            });
        });
        this.onCreateComplete.subscribe(function (object) {
            _this.editor.role = 'editor';
            _this.editor.survey_id = object.id;
            _this.editor.save(_this).subscribe();
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.editor.save(_this).subscribe();
        });
    };
    SurveyDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    SurveyDialog.prototype.selectEditor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            if (users.length > 1) {
                _this.error(_this.translateService.instant('You can select only one editor.'));
                return;
            }
            else if (users.length == 1) {
                var user = users[0];
                _this.editor.user_id = user.id;
                _this.editor.name = user.name;
            }
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], SurveyDialog.prototype, "usersDialog", void 0);
    SurveyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-dialog',
            templateUrl: 'survey-dialog.component.html',
            styleUrls: ['survey-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SurveyDialog);
    return SurveyDialog;
}(base_dialog_1.BaseDialog));
exports.SurveyDialog = SurveyDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3N1cnZleS9zdXJ2ZXktZGlhbG9nL3N1cnZleS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRTtBQU1sRSwyRUFBeUU7QUFFekUsNEZBQW9GO0FBQ3BGLHNDQUErQztBQUMvQyw4REFBMkg7QUFHM0gsMkhBQStHO0FBUS9HO0lBQWtDLGdDQUFrQjtJQVNoRCxzQkFBb0IsSUFBVTtRQUE5QixZQUNJLGlCQUFPLFNBR1Y7UUFKbUIsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUUxQixLQUFJLENBQUMsTUFBTSxHQUFHLCtCQUFtQixDQUFDO1FBQ2xDLEtBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxrQ0FBWSxFQUFFLENBQUM7O0lBQ3RDLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBb0NDO1FBbkNHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN4QixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUc7Z0JBQ2YsS0FBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLGtDQUFZLEVBQUUsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUEsVUFBVSxDQUFBLENBQUMsQ0FBQSxTQUFTLENBQUM7YUFDN0U7aUJBQU07Z0JBQ0gsa0NBQVksQ0FBQyxZQUFZLENBQUMsS0FBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO29CQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNULEtBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxrQ0FBWSxFQUFFLENBQUM7d0JBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxH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Q3pCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FVNEIsV0FBSTtPQVRyQixZQUFZLENBMEV4QjtJQUFELG1CQUFDO0NBMUVELEFBMEVDLENBMUVpQyx3QkFBVSxHQTBFM0M7QUExRVksb0NBQVkiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvc3VydmV5L3N1cnZleS1kaWFsb2cvc3VydmV5LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGV9ICAgICBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgREVGQVVMVF9EQVRFX0xPQ0FMRSwgU1VSVkVZX1NUQVRVUywgRVhBTV9NRU1CRVJfUk9MRSwgRVhBTV9NRU1CRVJfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQge1NlbGVjdEl0ZW0sIE1lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzdXJ2ZXktZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdXJ2ZXktZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU3VydmV5RGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxTdXJ2ZXk+IHtcblxuICAgIHByaXZhdGUgbG9jYWxlOmFueTtcbiAgICBwcml2YXRlIHJhbmdlRGF0ZXM6IERhdGVbXTsgXG4gICAgcHJpdmF0ZSBhbGxvd1RvQ2hhbmdlU3RhdGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBlZGl0b3I6IFN1cnZleU1lbWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0VXNlcnNEaWFsb2cpIHVzZXJzRGlhbG9nOiBTZWxlY3RVc2Vyc0RpYWxvZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxvY2FsZSA9IERFRkFVTFRfREFURV9MT0NBTEU7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gIG5ldyBTdXJ2ZXlNZW1iZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG4gICAgICAgICAgICBpZiAob2JqZWN0LklzTmV3KSAge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yID0gIG5ldyBTdXJ2ZXlNZW1iZXIoKTtcbiAgICAgICAgICAgICAgICBvYmplY3Quc3VwZXJ2aXNvcl9pZCA9IHRoaXMuQ29udGV4dFVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJldmlld19zdGF0ZSA9IHRoaXMuQ29udGV4dFVzZXIuSXNTdXBlckFkbWluID8nYXBwcm92ZWQnOidpbml0aWFsJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgU3VydmV5TWVtYmVyLnN1cnZleUVkaXRvcih0aGlzLCBvYmplY3QuaWQpLnN1YnNjcmliZShtZW1iZXI9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvciA9ICBuZXcgU3VydmV5TWVtYmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5yb2xlID0gJ2VkaXRvcic7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zdXJ2ZXlfaWQgPSBvYmplY3QuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSAgbWVtYmVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2JqZWN0LnN0YXJ0ICYmIG9iamVjdC5lbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlRGF0ZXMgPSBbb2JqZWN0LnN0YXJ0LG9iamVjdC5lbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxhbmcgPSB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuY3VycmVudExhbmc7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0KGAvYXNzZXRzL2kxOG4vY2FsZW5kYXIuJHtsYW5nfS5qc29uYClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZSA9IHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTsgIFxuXG4gICAgICAgIHRoaXMub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0PT4ge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iucm9sZSA9J2VkaXRvcic7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zdXJ2ZXlfaWQgPSAgb2JqZWN0LmlkO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25VcGRhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VEYXRlc1swXSAmJiB0aGlzLnJhbmdlRGF0ZXNbMV0pIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnN0YXJ0ID0gdGhpcy5yYW5nZURhdGVzWzBdO1xuICAgICAgICAgICAgdGhpcy5vYmplY3QuZW5kID0gdGhpcy5yYW5nZURhdGVzWzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWRpdG9yKCkge1xuICAgICAgICB0aGlzLnVzZXJzRGlhbG9nLnNob3coKTtcbiAgICAgICAgdGhpcy51c2Vyc0RpYWxvZy5vblNlbGVjdFVzZXJzLmZpcnN0KCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgIGlmICh1c2Vycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcih0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnWW91IGNhbiBzZWxlY3Qgb25seSBvbmUgZWRpdG9yLicpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXJzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB1c2Vyc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci51c2VyX2lkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuXG4iXX0=
