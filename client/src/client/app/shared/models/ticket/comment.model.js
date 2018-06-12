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
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        var _this = _super.call(this) || this;
        _this.content = undefined;
        _this.submit_user_id = undefined;
        _this.submit_user_id__DESC__ = undefined;
        _this.date_submit = undefined;
        _this.ticket_id = undefined;
        return _this;
    }
    Comment_1 = Comment;
    Comment.__api__listByTicket = function (ticketId) {
        return new search_read_api_1.SearchReadAPI(Comment_1.Model, [], "[('ticket_id','='," + ticketId + ")]");
    };
    Comment.listByTicket = function (context, ticketId) {
        return Comment_1.search(context, [], "[('ticket_id','='," + ticketId + ")]");
    };
    var Comment_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Comment.prototype, "date_submit", void 0);
    Comment = Comment_1 = __decorate([
        decorator_1.Model('eticket.comment'),
        __metadata("design:paramtypes", [])
    ], Comment);
    return Comment;
}(base_model_1.BaseModel));
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map