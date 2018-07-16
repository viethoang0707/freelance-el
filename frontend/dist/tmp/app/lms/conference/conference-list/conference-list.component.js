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
            template: "<div class=\"card card-w-title lms-conference-list-item ui-g\">   <div class=\"ui-lg-12 ui-md-12 ui-g-12\"><h1>{{'My conferences'|translate}}</h1></div>   <div class=\"ui-lg-12 ui-md-12 ui-g-12\">   <p-dataGrid [value]=\"conferenceMembers\" [paginator]=\"true\" [rows]=\"12\">       <ng-template let-member pTemplate=\"item\">         <div class=\"ui-lg-4 ui-md-6 ui-g-12 lms-conference-item\">           <p-panel>             <p-header>               <h3 class=\"heading-conference\">{{member.conference.name}}</h3>               <span class=\"task-status\">{{CONFERENCE_STATUS[member.conference.status] | translate}}</span>             </p-header>             <div>               <p>{{'Room password'|translate}}: {{member.conference.room_pass}}</p>             </div>             <p-footer>               <button pButton type=\"button \" label=\"{{ 'Join'|translate}} \" class=\"green-btn\" icon=\"ui-icon-call \" (click)=\"joinConference(member.conference,member) \" [disabled]=\"member.conference.status!='open'\"></button>             </p-footer>           </p-panel>         </div>       </ng-template>     </p-dataGrid>   </div> </div>",
            styles: [".task-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff;float:right}.heading-conference{font-weight:600;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0;float:left}"],
        }),
        __metadata("design:paramtypes", [meeting_service_1.MeetingService])
    ], ConferenceListComponent);
    return ConferenceListComponent;
}(base_component_1.BaseComponent));
exports.ConferenceListComponent = ConferenceListComponent;
