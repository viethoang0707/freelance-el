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
var execute_api_1 = require("../../services/api/execute.api");
var search_read_api_1 = require("../../services/api/search-read.api");
var Conference = (function (_super) {
    __extends(Conference, _super);
    function Conference() {
        var _this = _super.call(this) || this;
        _this.class_id = undefined;
        _this.room_ref = undefined;
        _this.name = undefined;
        _this.status = undefined;
        _this.room_pass = undefined;
        return _this;
    }
    Conference_1 = Conference;
    Conference.__api__listOpenConference = function (classId) {
        return new search_read_api_1.SearchReadAPI(Conference_1.Model, [], "[('status','=','open')]");
    };
    Conference.listOpenConference = function (context) {
        return Conference_1.search(context, [], "[('status','=','open')]");
    };
    Conference.prototype.__api__open = function (conferenceId) {
        return new execute_api_1.ExecuteAPI(Conference_1.Model, 'open', { conferenceId: conferenceId }, null);
    };
    Conference.prototype.open = function (context) {
        return context.apiService.execute(this.__api__open(this.id), context.authService.LoginToken);
    };
    Conference.prototype.__api__close = function (conferenceId) {
        return new execute_api_1.ExecuteAPI(Conference_1.Model, 'close', { conferenceId: conferenceId }, null);
    };
    Conference.prototype.close = function (context) {
        return context.apiService.execute(this.__api__close(this.id), context.authService.LoginToken);
    };
    var Conference_1;
    Conference = Conference_1 = __decorate([
        decorator_1.Model('etraining.conference'),
        __metadata("design:paramtypes", [])
    ], Conference);
    return Conference;
}(base_model_1.BaseModel));
exports.Conference = Conference;
