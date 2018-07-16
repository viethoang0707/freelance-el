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
var Ticket = (function (_super) {
    __extends(Ticket, _super);
    function Ticket() {
        var _this = _super.call(this) || this;
        _this.title = undefined;
        _this.content = undefined;
        _this.status = undefined;
        _this.submit_user_id = undefined;
        _this.approve_user_id = undefined;
        _this.submit_user_id__DESC__ = undefined;
        _this.approve_user_id__DESC__ = undefined;
        _this.date_open = undefined;
        _this.date_close = undefined;
        _this.res_model = undefined;
        _this.res_id = undefined;
        _this.code = undefined;
        return _this;
    }
    Ticket_1 = Ticket;
    Ticket.__api__byWorkflowObject = function (id, model) {
        return new search_read_api_1.SearchReadAPI(Ticket_1.Model, [], "[('res_id','='," + id + "),('res_model','=','" + model + "'),('status','=','open')]");
    };
    Ticket.__api__listByApproveUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Ticket_1.Model, [], "[('approve_user_id','='," + userId + ")]");
    };
    Ticket.__api__listBySubmitUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Ticket_1.Model, [], "[('submit_user_id','='," + userId + ")]");
    };
    Ticket.listByApproveUser = function (context, userId) {
        return Ticket_1.search(context, [], "[('approve_user_id','='," + userId + ")]");
    };
    Ticket.__api__listPendingByApproveUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Ticket_1.Model, [], "[('approve_user_id','='," + userId + "),('status','=','pending')]");
    };
    Ticket.listPendingByApproveUser = function (context, userId) {
        return Ticket_1.search(context, [], "[('approve_user_id','='," + userId + "),('status','=','pending')]");
    };
    Ticket.__api__listPendingBySubmitUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Ticket_1.Model, [], "[('submit_user_id','='," + userId + "),('status','=','pending')]");
    };
    Ticket.listPendingBySubmitUser = function (context, userId) {
        return Ticket_1.search(context, [], "[('submit_user_id','='," + userId + "),('status','=','pending')]");
    };
    Ticket.listBySubmitUser = function (context, userId) {
        return Ticket_1.search(context, [], "[('submit_user_id','='," + userId + ")]");
    };
    var Ticket_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Ticket.prototype, "date_open", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Ticket.prototype, "date_close", void 0);
    Ticket = Ticket_1 = __decorate([
        decorator_1.Model('etraining.ticket'),
        __metadata("design:paramtypes", [])
    ], Ticket);
    return Ticket;
}(base_model_1.BaseModel));
exports.Ticket = Ticket;
