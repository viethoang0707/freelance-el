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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var conference_model_1 = require("../../../shared/models/elearning/conference.model");
var conference_member_model_1 = require("../../../shared/models/elearning/conference-member.model");
var room_model_1 = require("../../../shared/models/meeting/room.model");
var room_member_model_1 = require("../../../shared/models/meeting/room-member.model");
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
        conference_model_1.Conference.byClass(this, courseClass.id).subscribe(function (conference) {
            if (conference) {
                _this.conference = conference;
                room_model_1.Room.byRef(_this, conference.room_ref).subscribe(function (room) {
                    _this.room = room;
                });
            }
            course_member_model_1.CourseMember.listByClass(_this, courseClass.id).subscribe(function (members) {
                _this.members = members;
                if (_this.conference) {
                    conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (confMembers) {
                        _.each(members, function (member) {
                            member["conferenceMember"] = _.find(confMembers, function (confMember) {
                                return confMember.course_member_id == member.id;
                            });
                            member["is_active"] = member["conferenceMember"] && member["conferenceMember"].is_active;
                        });
                    });
                }
            });
        });
    };
    ClassConferenceDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassConferenceDialog.prototype.openConference = function () {
        var _this = this;
        if (this.conference.id && this.conference.status != 'open') {
            this.conference.status = 'open';
            this.conference.save(this).subscribe(function () {
                _this.info(_this.translateService.instant('Conference open'));
            });
        }
        if (!this.conference.id) {
            room_model_1.Room.createWebminarRoom(this, this.courseClass.name).subscribe(function (room) {
                _this.room = room;
                _this.conference.room_ref = room.ref;
                _this.conference.room_pass = room.password;
                _this.conference.class_id = _this.courseClass.id;
                _this.conference.status = 'open';
                _this.conference.save(_this).subscribe(function () {
                    _this.info(_this.translateService.instant('Conference open'));
                    _.each(_this.members, function (member) {
                        room_member_model_1.RoomMember.createRoomMember(_this, member.name, member.image, room.id, member.role).subscribe(function (roomMember) {
                            var conferenceMember = new conference_member_model_1.ConferenceMember();
                            conferenceMember.conference_id = _this.conference.id;
                            conferenceMember.room_member_ref = roomMember.ref;
                            conferenceMember.course_member_id = member.id;
                            conferenceMember.save(_this).subscribe(function () {
                                member["conferenceMember"] = conferenceMember;
                                member["is_active"] = true;
                            });
                        });
                    });
                });
            });
        }
    };
    ClassConferenceDialog.prototype.closeConference = function () {
        var _this = this;
        if (this.conference.id && this.conference.status != 'closed') {
            this.conference.status = 'closed';
            this.conference.save(this).subscribe(function () {
                _this.info('Conference closed');
            });
        }
    };
    ClassConferenceDialog.prototype.accessControl = function (event, member) {
        var _this = this;
        var conferenceMember = member.conferenceMember;
        if (event.checked) {
            if (conferenceMember) {
                conferenceMember.is_active = true;
                conferenceMember.save(this).subscribe(function () {
                });
            }
            else {
                room_member_model_1.RoomMember.createRoomMember(this, member.name, member.image, this.room.id, member.role).subscribe(function (roomMember) {
                    var conferenceMember = new conference_member_model_1.ConferenceMember();
                    conferenceMember.conference_id = _this.conference.id;
                    conferenceMember.room_member_ref = roomMember.ref;
                    conferenceMember.course_member_id = member.id;
                    conferenceMember.is_active = true;
                    conferenceMember.save(_this).subscribe(function () {
                        member.conferenceMember = conferenceMember;
                    });
                });
            }
        }
        else {
            if (conferenceMember) {
                conferenceMember.is_active = false;
                conferenceMember.save(this).subscribe(function () {
                });
            }
        }
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
//# sourceMappingURL=class-conference.dialog.component.js.map