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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var conference_model_1 = require("../../../shared/models/elearning/conference.model");
var conference_member_model_1 = require("../../../shared/models/elearning/conference-member.model");
var ClassConferenceDialog = (function (_super) {
    __extends(ClassConferenceDialog, _super);
    function ClassConferenceDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.courseClass = new course_class_model_1.CourseClass();
        _this.members = [];
        _this.conference = new conference_model_1.Conference();
        return _this;
    }
    ClassConferenceDialog.prototype.show = function (courseClass) {
        var _this = this;
        this.display = true;
        this.courseClass = courseClass;
        if (courseClass.status == 'open') {
            conference_model_1.Conference.get(this, courseClass.conference_id).subscribe(function (confernece) {
                _this.conference = confernece;
                conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                    _this.members = members;
                });
            });
        }
        else {
            this.members = [];
            this.conference = new conference_model_1.Conference();
        }
    };
    ClassConferenceDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassConferenceDialog.prototype.openConference = function () {
        var _this = this;
        this.conference.open(this).subscribe(function () {
            _this.info(_this.translateService.instant('Conference open'));
            conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                _this.members = members;
            });
        });
    };
    ClassConferenceDialog.prototype.closeConference = function () {
        var _this = this;
        this.conference.close(this).subscribe(function () {
            _this.info(_this.translateService.instant('Conference closed'));
            conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                _this.members = members;
            });
        });
    };
    ClassConferenceDialog.prototype.activateMember = function (member) {
        member.is_active = true;
        member.save(this).subscribe();
    };
    ClassConferenceDialog.prototype.deactivateMember = function (member) {
        member.is_active = false;
        member.save(this).subscribe();
    };
    ClassConferenceDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-conference-dialog',
            templateUrl: 'class-conference.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ClassConferenceDialog);
    return ClassConferenceDialog;
}(base_component_1.BaseComponent));
exports.ClassConferenceDialog = ClassConferenceDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY2xhc3MvY2xhc3MtY29uZmVyZW5jZS9jbGFzcy1jb25mZXJlbmNlLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUsvRSwwRkFBa0Y7QUFFbEYsc0ZBQStFO0FBQy9FLG9HQUE0RjtBQVU1RjtJQUEyQyx5Q0FBYTtJQU92RDtRQUFBLFlBQ0MsaUJBQU8sU0FLUDtRQUpBLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFDckMsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQzs7SUFDcEMsQ0FBQztJQUVELG9DQUFJLEdBQUosVUFBSyxXQUF3QjtRQUE3QixpQkFjQztRQWJBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDakMsNkJBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVO2dCQUNuRSxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsMENBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztvQkFDNUUsS0FBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSDthQUFNO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFVLEVBQUUsQ0FBQztTQUNuQztJQUNGLENBQUM7SUFFRCxvQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFBQSxpQkFPQztRQU5BLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzVELDBDQUFnQixDQUFDLGdCQUFnQixDQUFDLEtBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87Z0JBQzNFLEtBQUksQ0FBQyxPQUFPLEdBQUksT0FBTyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBR0QsK0NBQWUsR0FBZjtRQUFBLGlCQU9DO1FBTkEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDOUQsMENBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztnQkFDM0UsS0FBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCw4Q0FBYyxHQUFkLFVBQWUsTUFBdUI7UUFDckMsTUFBTSxDQUFDLFNBQVMsR0FBSSxJQUFJLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCLFVBQWlCLE1BQXVCO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLEdBQUksS0FBSyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQTlEVyxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFdBQVcsRUFBRSx3Q0FBd0M7U0FDckQsQ0FBQzs7T0FDVyxxQkFBcUIsQ0ErRGpDO0lBQUQsNEJBQUM7Q0EvREQsQUErREMsQ0EvRDBDLDhCQUFhLEdBK0R2RDtBQS9EWSxzREFBcUIiLCJmaWxlIjoiYXBwL2xtcy9jbGFzcy9jbGFzcy1jb25mZXJlbmNlL2NsYXNzLWNvbmZlcmVuY2UuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENvdXJzZUNsYXNzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNsYXNzLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY2xhc3MtY29uZmVyZW5jZS1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2NsYXNzLWNvbmZlcmVuY2UuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xhc3NDb25mZXJlbmNlRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIGNvdXJzZUNsYXNzOiBDb3Vyc2VDbGFzcztcblx0cHJpdmF0ZSBtZW1iZXJzOiBDb25mZXJlbmNlTWVtYmVyW107XG5cdHByaXZhdGUgY29uZmVyZW5jZTogQ29uZmVyZW5jZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuY291cnNlQ2xhc3MgPSBuZXcgQ291cnNlQ2xhc3MoKTtcblx0XHR0aGlzLm1lbWJlcnMgPSBbXTtcblx0XHR0aGlzLmNvbmZlcmVuY2UgPSBuZXcgQ29uZmVyZW5jZSgpO1xuXHR9XG5cblx0c2hvdyhjb3Vyc2VDbGFzczogQ291cnNlQ2xhc3MpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuY291cnNlQ2xhc3MgPSBjb3Vyc2VDbGFzcztcblx0XHRpZiAoY291cnNlQ2xhc3Muc3RhdHVzID09ICdvcGVuJykge1xuXHRcdFx0Q29uZmVyZW5jZS5nZXQodGhpcywgY291cnNlQ2xhc3MuY29uZmVyZW5jZV9pZCkuc3Vic2NyaWJlKGNvbmZlcm5lY2UgPT4ge1xuXHRcdFx0XHR0aGlzLmNvbmZlcmVuY2UgPSBjb25mZXJuZWNlO1xuXHRcdFx0XHRDb25mZXJlbmNlTWVtYmVyLmxpc3RCeUNvbmZlcmVuY2UodGhpcywgdGhpcy5jb25mZXJlbmNlLmlkKS5zdWJzY3JpYmUobWVtYmVycz0+IHtcblx0XHRcdFx0XHR0aGlzLm1lbWJlcnMgPSAgbWVtYmVycztcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5tZW1iZXJzID0gW107XG5cdFx0XHR0aGlzLmNvbmZlcmVuY2UgPSBuZXcgQ29uZmVyZW5jZSgpO1xuXHRcdH1cblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRvcGVuQ29uZmVyZW5jZSgpIHtcblx0XHR0aGlzLmNvbmZlcmVuY2Uub3Blbih0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0dGhpcy5pbmZvKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdDb25mZXJlbmNlIG9wZW4nKSk7XG5cdFx0XHRDb25mZXJlbmNlTWVtYmVyLmxpc3RCeUNvbmZlcmVuY2UodGhpcywgdGhpcy5jb25mZXJlbmNlLmlkKS5zdWJzY3JpYmUobWVtYmVycz0+IHtcblx0XHRcdFx0XHR0aGlzLm1lbWJlcnMgPSAgbWVtYmVycztcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdGNsb3NlQ29uZmVyZW5jZSgpIHtcblx0XHR0aGlzLmNvbmZlcmVuY2UuY2xvc2UodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMuaW5mbyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnQ29uZmVyZW5jZSBjbG9zZWQnKSk7XG5cdFx0XHRDb25mZXJlbmNlTWVtYmVyLmxpc3RCeUNvbmZlcmVuY2UodGhpcywgdGhpcy5jb25mZXJlbmNlLmlkKS5zdWJzY3JpYmUobWVtYmVycz0+IHtcblx0XHRcdFx0XHR0aGlzLm1lbWJlcnMgPSAgbWVtYmVycztcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhY3RpdmF0ZU1lbWJlcihtZW1iZXI6Q29uZmVyZW5jZU1lbWJlcikge1xuXHRcdG1lbWJlci5pc19hY3RpdmUgPSAgdHJ1ZTtcblx0XHRtZW1iZXIuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcblx0fVxuXG5cdGRlYWN0aXZhdGVNZW1iZXIobWVtYmVyOkNvbmZlcmVuY2VNZW1iZXIpIHtcblx0XHRtZW1iZXIuaXNfYWN0aXZlID0gIGZhbHNlO1xuXHRcdG1lbWJlci5zYXZlKHRoaXMpLnN1YnNjcmliZSgpO1xuXHR9XG59XG5cbiJdfQ==
