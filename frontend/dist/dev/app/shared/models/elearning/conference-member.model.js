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
var search_read_api_1 = require("../../services/api/search-read.api");
var list_api_1 = require("../../services/api/list.api");
var _ = require("underscore");
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
    ConferenceMember.__api__listByCourseMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ConferenceMember_1.Model, [], "[('course_member_id','='," + memberId + ")]");
    };
    ConferenceMember.listByCourseMember = function (context, memberId) {
        return ConferenceMember_1.single(context, [], "[('course_member_id','='," + memberId + ")]");
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
    ConferenceMember.populateConferences = function (context, members) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb25mZXJlbmNlLW1lbWJlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFFMUMsdURBQWdEO0FBQ2hELDhCQUE4QztBQUM5QywwQ0FBbUQ7QUFFbkQsc0VBQW1FO0FBSW5FLHdEQUFzRDtBQUV0RCw4QkFBZ0M7QUFHaEM7SUFBc0Msb0NBQVM7SUFFM0M7UUFBQSxZQUNJLGlCQUFPLFNBY1Y7UUFiRyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxLQUFJLENBQUMsVUFBVSxHQUFJLElBQUksNkJBQVUsRUFBRSxDQUFDOztJQUN4QyxDQUFDO3lCQWpCUSxnQkFBZ0I7SUFtQ2xCLDBDQUF5QixHQUFoQyxVQUFpQyxRQUFnQjtRQUM3QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxrQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLDJCQUEyQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJ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SSxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQTNGUSxnQkFBZ0I7UUFENUIsaUJBQUssQ0FBQyw2QkFBNkIsQ0FBQzs7T0FDeEIsZ0JBQWdCLENBNEY1QjtJQUFELHVCQUFDO0NBNUZELEFBNEZDLENBNUZxQyxzQkFBUyxHQTRGOUM7QUE1RlksNENBQWdCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb25mZXJlbmNlLW1lbWJlci5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4vc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25mZXJlbmNlIH0gZnJvbSAnLi9jb25mZXJlbmNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IERlbGV0ZUFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9kZWxldGUuYXBpJztcbmltcG9ydCB7IEJ1bGtEZWxldGVBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvYnVsay1kZWxldGUuYXBpJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvbGlzdC5hcGknO1xuaW1wb3J0IHsgQnVsa0xpc3RBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvYnVsay1saXN0LmFwaSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5jb25mZXJlbmNlX21lbWJlcicpXG5leHBvcnQgY2xhc3MgQ29uZmVyZW5jZU1lbWJlciBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY291cnNlX21lbWJlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbWFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5waG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29uZmVyZW5jZV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yb29tX21lbWJlcl9yZWYgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pc19hY3RpdmUgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNsYXNzX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2Vfc3RhdHVzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2UgPSAgbmV3IENvbmZlcmVuY2UoKTtcbiAgICB9XG5cbiAgICBjb3Vyc2VfbWVtYmVyX2lkOiBudW1iZXI7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBwaG9uZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBncm91cF9uYW1lOiBzdHJpbmc7XG4gICAgcm9vbV9tZW1iZXJfcmVmOnN0cmluZztcbiAgICBpc19hY3RpdmU6IGJvb2xlYW47XG4gICAgY2xhc3NfaWQ6IG51bWJlcjtcbiAgICBncm91cF9pZDogbnVtYmVyO1xuICAgIHVzZXJfaWQ6IG51bWJlcjtcbiAgICBjb25mZXJlbmNlX2lkOiBudW1iZXI7XG4gICAgY29uZmVyZW5jZTogQ29uZmVyZW5jZTtcbiAgICBjb25mZXJlbmNlX3N0YXR1czogc3RyaW5nO1xuICAgIGdyb3VwX2lkX19ERVNDX186IHN0cmluZztcblxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlDb3Vyc2VNZW1iZXIobWVtYmVySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ29uZmVyZW5jZU1lbWJlci5Nb2RlbCwgW10sXCJbKCdjb3Vyc2VfbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q291cnNlTWVtYmVyKGNvbnRleHQ6QVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIENvbmZlcmVuY2VNZW1iZXIuc2luZ2xlKGNvbnRleHQsW10sXCJbKCdjb3Vyc2VfbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVVzZXIodXNlcklkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKENvbmZlcmVuY2VNZW1iZXIuTW9kZWwsIFtdLFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q2xhc3MoY2xhc3NJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDb25mZXJlbmNlTWVtYmVyLk1vZGVsLCBbXSxcIlsoJ2NsYXNzX2lkJywnPScsXCIrY2xhc3NJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q29uZmVyZW5jZShjb25mZXJlbmNlSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ29uZmVyZW5jZU1lbWJlci5Nb2RlbCwgW10sXCJbKCdjb25mZXJlbmNlX2lkJywnPScsXCIrY29uZmVyZW5jZUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVVzZXIoIGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb25mZXJlbmNlTWVtYmVyLnNlYXJjaChjb250ZXh0LFtdLFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDbGFzcyggY29udGV4dDpBUElDb250ZXh0LCBjbGFzc0lkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb25mZXJlbmNlTWVtYmVyLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY2xhc3NfaWQnLCc9JyxcIitjbGFzc0lkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUNvbmZlcmVuY2UoIGNvbnRleHQ6QVBJQ29udGV4dCwgY29uZmVyZW5jZUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBDb25mZXJlbmNlTWVtYmVyLnNlYXJjaChjb250ZXh0LFtdLFwiWygnY29uZmVyZW5jZV9pZCcsJz0nLFwiK2NvbmZlcmVuY2VJZCtcIildXCIpO1xuICAgIH1cblxuICAgIF9fYXBpX19wb3B1bGF0ZUNvbmZlcmVuY2UoKTogTGlzdEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdEFQSShDb25mZXJlbmNlLk1vZGVsLCBbdGhpcy5jb25mZXJlbmNlX2lkXSwgW10pO1xuICAgIH1cblxuICAgIHBvcHVsYXRlQ29uZmVyZW5jZShjb250ZXh0OiBBUElDb250ZXh0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZlcmVuY2VfaWQpXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihudWxsKTtcbiAgICAgICAgcmV0dXJuIENvbmZlcmVuY2UuZ2V0KGNvbnRleHQsIHRoaXMuY29uZmVyZW5jZV9pZCkuZG8oY29uZiA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbmZlcmVuY2UgPSBjb25mO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcG9wdWxhdGVDb25mZXJlbmNlcyhjb250ZXh0OiBBUElDb250ZXh0LCBtZW1iZXJzOiBDb25mZXJlbmNlTWVtYmVyW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgY29uZmVyZW5jZUlkcyA9IF8ucGx1Y2sobWVtYmVycywnY29uZmVyZW5jZV9pZCcpO1xuICAgICAgICBjb25mZXJlbmNlSWRzID0gXy5maWx0ZXIoY29uZmVyZW5jZUlkcywgaWQ9PiB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQ29uZmVyZW5jZS5hcnJheShjb250ZXh0LCBjb25mZXJlbmNlSWRzKS5kbyhjb25mZXJlbmNlcz0+IHtcbiAgICAgICAgICAgIF8uZWFjaChtZW1iZXJzLCAobWVtYmVyOkNvbmZlcmVuY2VNZW1iZXIpPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlci5jb25mZXJlbmNlID0gIF8uZmluZChjb25mZXJlbmNlcywgKGNvbmY6Q29uZmVyZW5jZSk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1iZXIuY29uZmVyZW5jZV9pZCA9PSBjb25mLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=
