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
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var RoomMember = (function (_super) {
    __extends(RoomMember, _super);
    function RoomMember() {
        var _this = _super.call(this) || this;
        _this.avatar = undefined;
        _this.name = undefined;
        _this.ref = undefined;
        _this.email = undefined;
        _this.room_id = undefined;
        _this.is_supervisor = undefined;
        return _this;
    }
    RoomMember_1 = RoomMember;
    RoomMember.__api__byRef = function (ref) {
        return new search_read_api_1.SearchReadAPI(RoomMember_1.Model, [], "[('ref','!=','" + ref + "')]");
    };
    RoomMember.byRef = function (context, ref) {
        return RoomMember_1.search(context, [], "[('ref','=','" + ref + "')]")
            .map(function (members) {
            if (members.length)
                return members[0];
            else
                return null;
        });
    };
    RoomMember.createRoomMember = function (context, name, avatar, roomId, role) {
        var roomMember = new RoomMember_1();
        roomMember.room_id = roomId;
        roomMember.name = name;
        roomMember.avatar = avatar;
        roomMember.is_supervisor = role == 'teacher';
        return roomMember.save(context).flatMap(function () {
            return RoomMember_1.get(context, roomMember.id);
        });
    };
    var RoomMember_1;
    RoomMember = RoomMember_1 = __decorate([
        decorator_1.Model('emeeting.member'),
        __metadata("design:paramtypes", [])
    ], RoomMember);
    return RoomMember;
}(base_model_1.BaseModel));
exports.RoomMember = RoomMember;
//# sourceMappingURL=room-member.model.js.map