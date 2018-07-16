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
var constants_1 = require("../../../shared/models/constants");
var meeting_service_1 = require("../../../shared/services/meeting.service");
var ConferenceListComponent = (function (_super) {
    __extends(ConferenceListComponent, _super);
    function ConferenceListComponent(meetingSerivce) {
        var _this = _super.call(this) || this;
        _this.meetingSerivce = meetingSerivce;
        _this.CONFERENCE_STATUS = constants_1.CONFERENCE_STATUS;
        return _this;
    }
    ConferenceListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var conferenceMembers = _this.lmsProfileService.MyConferenceMembers;
            _this.displayConferences(conferenceMembers);
        });
    };
    ConferenceListComponent.prototype.displayConferences = function (conferenceMembers) {
        var _this = this;
        conferenceMembers = _.sortBy(conferenceMembers, function (member) {
            return -_this.lmsProfileService.getLastConferenceTimestamp(member);
        });
        this.conferenceMembers = conferenceMembers;
    };
    ConferenceListComponent.prototype.joinConference = function (conference, member) {
        if (member.is_active)
            this.meetingSerivce.join(conference.room_ref, member.room_member_ref);
        else
            this.error('You are  not allowed to join the conference');
    };
    ConferenceListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'conference-list',
            templateUrl: 'conference-list.component.html',
            styleUrls: ['conference-list.component.css'],
        }),
        __metadata("design:paramtypes", [meeting_service_1.MeetingService])
    ], ConferenceListComponent);
    return ConferenceListComponent;
}(base_component_1.BaseComponent));
exports.ConferenceListComponent = ConferenceListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY29uZmVyZW5jZS9jb25mZXJlbmNlLWxpc3QvY29uZmVyZW5jZS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsaUZBQStFO0FBRy9FLDhCQUFnQztBQUNoQyw4REFBb0Y7QUFNcEYsNEVBQTBFO0FBVTFFO0lBQTZDLDJDQUFhO0lBTXpELGlDQUFvQixjQUE4QjtRQUFsRCxZQUNPLGlCQUFPLFNBQ1Y7UUFGZ0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBRmxELHVCQUFpQixHQUFHLDZCQUFpQixDQUFDOztJQUluQyxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEMsSUFBSSxpQkFBaUIsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUM7WUFDbkUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0RBQWtCLEdBQWxCLFVBQW1CLGlCQUFxQztRQUF4RCxpQkFLQztRQUpHLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxNQUF3QjtZQUNyRSxPQUFPLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQy9DLENBQUM7SUFFRCxnREFBYyxHQUFkLFVBQWUsVUFBVSxFQUFFLE1BQU07UUFDN0IsSUFBSSxNQUFNLENBQUMsU0FBUztZQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7WUFFdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUE3QlEsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBT21DLGdDQUFjO09BTnRDLHVCQUF1QixDQStCbkM7SUFBRCw4QkFBQztDQS9CRCxBQStCQyxDQS9CNEMsOEJBQWEsR0ErQnpEO0FBL0JZLDBEQUF1QiIsImZpbGUiOiJhcHAvbG1zL2NvbmZlcmVuY2UvY29uZmVyZW5jZS1saXN0L2NvbmZlcmVuY2UtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPTkZFUkVOQ0VfU1RBVFVTIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb25mZXJlbmNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29uZmVyZW5jZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwnO1xuaW1wb3J0IHsgTWVldGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbWVldGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvbmZlcmVuY2UtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb25mZXJlbmNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjb25mZXJlbmNlLWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb25mZXJlbmNlTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHByaXZhdGUgY29uZmVyZW5jZU1lbWJlcnM6IENvbmZlcmVuY2VNZW1iZXJbXTtcblxuXHRDT05GRVJFTkNFX1NUQVRVUyA9IENPTkZFUkVOQ0VfU1RBVFVTO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbWVldGluZ1Nlcml2Y2U6IE1lZXRpbmdTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuaW5pdCh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbmZlcmVuY2VNZW1iZXJzID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5NeUNvbmZlcmVuY2VNZW1iZXJzO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Q29uZmVyZW5jZXMoY29uZmVyZW5jZU1lbWJlcnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5Q29uZmVyZW5jZXMoY29uZmVyZW5jZU1lbWJlcnM6IENvbmZlcmVuY2VNZW1iZXJbXSkge1xuICAgICAgICBjb25mZXJlbmNlTWVtYmVycyA9IF8uc29ydEJ5KGNvbmZlcmVuY2VNZW1iZXJzLCAobWVtYmVyOiBDb25mZXJlbmNlTWVtYmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0TGFzdENvbmZlcmVuY2VUaW1lc3RhbXAobWVtYmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29uZmVyZW5jZU1lbWJlcnMgPSBjb25mZXJlbmNlTWVtYmVycztcbiAgICB9XG5cbiAgICBqb2luQ29uZmVyZW5jZShjb25mZXJlbmNlLCBtZW1iZXIpIHtcbiAgICAgICAgaWYgKG1lbWJlci5pc19hY3RpdmUpXG4gICAgICAgICAgICB0aGlzLm1lZXRpbmdTZXJpdmNlLmpvaW4oY29uZmVyZW5jZS5yb29tX3JlZiwgbWVtYmVyLnJvb21fbWVtYmVyX3JlZik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1lvdSBhcmUgIG5vdCBhbGxvd2VkIHRvIGpvaW4gdGhlIGNvbmZlcmVuY2UnKTtcbiAgICB9XG5cbn1cbiJdfQ==
