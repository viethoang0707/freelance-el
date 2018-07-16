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
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var select_competency_level_dialog_component_1 = require("../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component");
var ExamDialog = (function (_super) {
    __extends(ExamDialog, _super);
    function ExamDialog(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.editor = new exam_member_model_1.ExamMember();
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    ExamDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.IsNew) {
                _this.editor = new exam_member_model_1.ExamMember();
                object.supervisor_id = _this.ContextUser.id;
                object.review_state = _this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            }
            else {
                exam_member_model_1.ExamMember.examEditor(_this, object.id).subscribe(function (member) {
                    if (!member) {
                        _this.editor = new exam_member_model_1.ExamMember();
                        _this.editor.role = 'editor';
                        _this.editor.exam_id = object.id;
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
            ;
        });
        this.onCreateComplete.subscribe(function (object) {
            _this.editor.role = 'editor';
            _this.editor.exam_id = object.id;
            _this.editor.save(_this).subscribe();
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.editor.save(_this).subscribe();
        });
    };
    ExamDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    ExamDialog.prototype.selectCompetencyLevel = function () {
        var _this = this;
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.first().subscribe(function (level) {
            _this.object.competency_level_id = level.id;
            _this.object.competency_level_name = level.name;
            _this.object.competency_id = level.competency_id;
            _this.object.competency_name = level.competency_name;
        });
    };
    ExamDialog.prototype.selectEditor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(function (users) {
            if (users.length > 1) {
                _this.error('You can select only one editor.');
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
        core_1.ViewChild(select_competency_level_dialog_component_1.SelectCompetencyLevelDialog),
        __metadata("design:type", select_competency_level_dialog_component_1.SelectCompetencyLevelDialog)
    ], ExamDialog.prototype, "competencyLevelDialog", void 0);
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], ExamDialog.prototype, "usersDialog", void 0);
    ExamDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-dialog',
            templateUrl: 'exam-dialog.component.html',
            styleUrls: ['exam-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], ExamDialog);
    return ExamDialog;
}(base_dialog_1.BaseDialog));
exports.ExamDialog = ExamDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L2V4YW0vZXhhbS1kaWFsb2cvZXhhbS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQU1wRSwyRUFBeUU7QUFFekUsd0ZBQWdGO0FBQ2hGLHNDQUErQztBQUMvQyw4REFBeUg7QUFHekgsMkhBQStHO0FBQy9HLCtKQUFpSjtBQVdqSjtJQUFnQyw4QkFBZ0I7SUFVNUMsb0JBQW9CLElBQVU7UUFBOUIsWUFDSSxpQkFBTyxTQUlWO1FBTG1CLFVBQUksR0FBSixJQUFJLENBQU07UUFFMUIsS0FBSSxDQUFDLE1BQU0sR0FBRywrQkFBbUIsQ0FBQztRQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFJLElBQUksOEJBQVUsRUFBRSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUM1QyxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUFBLGlCQWlDQztRQWhDRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDeEIsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFHO2dCQUNmLEtBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSw4QkFBVSxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLFVBQVUsQ0FBQSxDQUFDLENBQUEsU0FBUyxDQUFDO2FBQzdFO2lCQUFNO2dCQUNILDhCQUFVLENBQUMsVUFBVSxDQUFDLEtBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDVCxL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O2dCQUNsQixLQUFJLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQzlDLE9BQU87YUFDVjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUMxQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDaEM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUExRXVDO1FBQXZDLGdCQUFTLENBQUMsc0VBQTJCLENBQUM7a0NBQXdCLHNFQUEyQjs2REFBQztJQUM3RDtRQUE3QixnQkFBUyxDQUFDLGdEQUFpQixDQUFDO2tDQUFjLGdEQUFpQjttREFBQztJQVJwRCxVQUFVO1FBTnRCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDO3lDQVc0QixXQUFJO09BVnJCLFVBQVUsQ0FvRnRCO0lBQUQsaUJBQUM7Q0FwRkQsQUFvRkMsQ0FwRitCLHdCQUFVLEdBb0Z6QztBQXBGWSxnQ0FBVSIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9leGFtL2V4YW0tZGlhbG9nL2V4YW0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBERUZBVUxUX0RBVEVfTE9DQUxFLCBFWEFNX1NUQVRVUywgRVhBTV9NRU1CRVJfUk9MRSwgRVhBTV9NRU1CRVJfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdENvbXBldGVuY3lMZXZlbERpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1jb21wZXRlbmN5LWxldmVsLWRpYWxvZy9zZWxlY3QtY29tcGV0ZW5jeS1sZXZlbC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3dpbmRvbncucmVmJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZXhhbS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnZXhhbS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydleGFtLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEV4YW1EaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPEV4YW0+IHtcblxuICAgIFdJTkRPV19IRUlHSFQ6IGFueTtcbiAgICBwcml2YXRlIGxvY2FsZTogYW55O1xuICAgIHByaXZhdGUgcmFuZ2VEYXRlczogRGF0ZVtdO1xuICAgIHByaXZhdGUgZWRpdG9yOiBFeGFtTWVtYmVyO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoU2VsZWN0Q29tcGV0ZW5jeUxldmVsRGlhbG9nKSBjb21wZXRlbmN5TGV2ZWxEaWFsb2c6IFNlbGVjdENvbXBldGVuY3lMZXZlbERpYWxvZztcbiAgICBAVmlld0NoaWxkKFNlbGVjdFVzZXJzRGlhbG9nKSB1c2Vyc0RpYWxvZzogU2VsZWN0VXNlcnNEaWFsb2c7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSBERUZBVUxUX0RBVEVfTE9DQUxFO1xuICAgICAgICB0aGlzLmVkaXRvciA9ICBuZXcgRXhhbU1lbWJlcigpO1xuICAgICAgICB0aGlzLldJTkRPV19IRUlHSFQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub25TaG93LnN1YnNjcmliZShvYmplY3QgPT4ge1xuICAgICAgICAgICAgaWYgKG9iamVjdC5Jc05ldykgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvciA9ICBuZXcgRXhhbU1lbWJlcigpO1xuICAgICAgICAgICAgICAgIG9iamVjdC5zdXBlcnZpc29yX2lkID0gdGhpcy5Db250ZXh0VXNlci5pZDtcbiAgICAgICAgICAgICAgICBvYmplY3QucmV2aWV3X3N0YXRlID0gdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gPydhcHByb3ZlZCc6J2luaXRpYWwnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBFeGFtTWVtYmVyLmV4YW1FZGl0b3IodGhpcywgb2JqZWN0LmlkKS5zdWJzY3JpYmUobWVtYmVyPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1lbWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSAgbmV3IEV4YW1NZW1iZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJvbGUgPSAnZWRpdG9yJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmV4YW1faWQgPSBvYmplY3QuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSAgbWVtYmVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9iamVjdC5zdGFydCAmJiBvYmplY3QuZW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZURhdGVzID0gW29iamVjdC5zdGFydCwgb2JqZWN0LmVuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGFuZyA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZztcbiAgICAgICAgICAgIHRoaXMuaHR0cC5nZXQoYC9hc3NldHMvaTE4bi9jYWxlbmRhci4ke2xhbmd9Lmpzb25gKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlczogUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbGUgPSByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pOztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0PT4ge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iucm9sZSA9J2VkaXRvcic7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5leGFtX2lkID0gIG9iamVjdC5pZDtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uVXBkYXRlQ29tcGxldGUuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zYXZlKHRoaXMpLnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRhdGVTZWxlY3QoJGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlRGF0ZXNbMF0gJiYgdGhpcy5yYW5nZURhdGVzWzFdKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdC5zdGFydCA9IHRoaXMucmFuZ2VEYXRlc1swXTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LmVuZCA9IHRoaXMucmFuZ2VEYXRlc1sxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdENvbXBldGVuY3lMZXZlbCgpIHtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5TGV2ZWxEaWFsb2cuc2hvdygpO1xuICAgICAgICB0aGlzLmNvbXBldGVuY3lMZXZlbERpYWxvZy5vblNlbGVjdENvbXBldGVuY3lMZXZlbC5maXJzdCgpLnN1YnNjcmliZShsZXZlbCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QuY29tcGV0ZW5jeV9sZXZlbF9pZCA9IGxldmVsLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LmNvbXBldGVuY3lfbGV2ZWxfbmFtZSA9IGxldmVsLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QuY29tcGV0ZW5jeV9pZCA9IGxldmVsLmNvbXBldGVuY3lfaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QuY29tcGV0ZW5jeV9uYW1lID0gbGV2ZWwuY29tcGV0ZW5jeV9uYW1lO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RFZGl0b3IoKSB7XG4gICAgICAgIHRoaXMudXNlcnNEaWFsb2cuc2hvdygpO1xuICAgICAgICB0aGlzLnVzZXJzRGlhbG9nLm9uU2VsZWN0VXNlcnMuc3Vic2NyaWJlKHVzZXJzID0+IHtcbiAgICAgICAgICAgIGlmICh1c2Vycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignWW91IGNhbiBzZWxlY3Qgb25seSBvbmUgZWRpdG9yLicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlcnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHVzZXJzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnVzZXJfaWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuIl19
