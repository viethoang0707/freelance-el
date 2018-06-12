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
var base_model_1 = require("../base.model");
var conference_model_1 = require("./conference.model");
var Rx_1 = require("rxjs/Rx");
var decorator_1 = require("../decorator");
var _ = require("underscore");
var search_read_api_1 = require("../../services/api/search-read.api");
var list_api_1 = require("../../services/api/list.api");
var ConferenceMember = (function (_super) {
    __extends(ConferenceMember, _super);
    function ConferenceMember() {
        var _this = _super.call(this) || this;
        _this.course_member_id = undefined;
        _this.email = undefined;
        _this.phone = undefined;
        _this.name = undefined;
        _this.user_id = undefined;
        _this.conference_id = undefined;
        _this.room_member_ref = undefined;
        _this.group_id = undefined;
        _this.group_id__DESC__ = undefined;
        _this.is_active = undefined;
        _this.class_id = undefined;
        _this.conference_status = undefined;
        _this.conference = new conference_model_1.Conference();
        return _this;
    }
    ConferenceMember_1 = ConferenceMember;
    ConferenceMember.__api__byCourseMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ConferenceMember_1.Model, [], "[('course_member_id','='," + memberId + ")]");
    };
    ConferenceMember.byCourseMember = function (context, memberId) {
        return ConferenceMember_1.search(context, [], "[('course_member_id','='," + memberId + ")]")
            .map(function (members) {
            if (members.length)
                return members[0];
            else
                return null;
        });
    };
    ConferenceMember.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ConferenceMember_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ConferenceMember.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(ConferenceMember_1.Model, [], "[('class_id','='," + classId + ")]");
    };
    ConferenceMember.__api__listByConference = function (conferenceId) {
        return new search_read_api_1.SearchReadAPI(ConferenceMember_1.Model, [], "[('conference_id','='," + conferenceId + ")]");
    };
    ConferenceMember.listByUser = function (context, userId) {
        return ConferenceMember_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ConferenceMember.listByClass = function (context, classId) {
        return ConferenceMember_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    ConferenceMember.listByConference = function (context, conferenceId) {
        return ConferenceMember_1.search(context, [], "[('conference_id','='," + conferenceId + ")]");
    };
    ConferenceMember.prototype.__api__populateConference = function () {
        return new list_api_1.ListAPI(conference_model_1.Conference.Model, [this.conference_id], []);
    };
    ConferenceMember.prototype.populateConference = function (context) {
        var _this = this;
        if (!this.conference_id)
            return Rx_1.Observable.of(null);
        return conference_model_1.Conference.get(context, this.conference_id).do(function (conf) {
            _this.conference = conf;
        });
    };
    ConferenceMember.populateConferenceForArray = function (context, members) {
        var conferenceIds = _.pluck(members, 'conference_id');
        conferenceIds = _.filter(conferenceIds, function (id) {
            return id;
        });
        return conference_model_1.Conference.array(context, conferenceIds).do(function (conferences) {
            _.each(members, function (member) {
                member.conference = _.find(conferences, function (conf) {
                    return member.conference_id == conf.id;
                });
            });
        });
    };
    var ConferenceMember_1;
    ConferenceMember = ConferenceMember_1 = __decorate([
        decorator_1.Model('etraining.conference_member'),
        __metadata("design:paramtypes", [])
    ], ConferenceMember);
    return ConferenceMember;
}(base_model_1.BaseModel));
exports.ConferenceMember = ConferenceMember;
//# sourceMappingURL=conference-member.model.js.map