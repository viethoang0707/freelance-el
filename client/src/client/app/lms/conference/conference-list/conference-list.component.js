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
var conference_member_model_1 = require("../../../shared/models/elearning/conference-member.model");
var conference_model_1 = require("../../../shared/models/elearning/conference.model");
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
        this.loadConference();
    };
    ConferenceListComponent.prototype.loadConference = function () {
        var _this = this;
        conference_member_model_1.ConferenceMember.listByUser(this, this.authService.UserProfile.id)
            .subscribe(function (members) {
            members = _.filter(members, (function (member) {
                return member.conference_id && member.conference_status == 'open';
            }));
            var confIds = _.pluck(members, 'conference_id');
            conference_model_1.Conference.array(_this, confIds).subscribe(function (conferences) {
                _.each(members, function (member) {
                    member.conference = _.find(conferences, function (conference) {
                        return conference.id == member.conference_id;
                    });
                });
                _this.members = members;
            });
        });
    };
    ConferenceListComponent.prototype.joinConference = function (member) {
        if (member.is_active)
            this.meetingSerivce.join(member.conference.room_ref, member.room_member_ref);
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
//# sourceMappingURL=conference-list.component.js.map