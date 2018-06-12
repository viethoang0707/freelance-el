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
var workflow_service_1 = require("../../shared/services/workflow.service");
var socket_service_1 = require("../../shared/services/socket.service");
var base_dialog_1 = require("../../shared/components/base/base.dialog");
var comment_model_1 = require("../../shared/models/ticket/comment.model");
var constants_1 = require("../../shared/models/constants");
var TicketDialog = (function (_super) {
    __extends(TicketDialog, _super);
    function TicketDialog(workflowService, socketService) {
        var _this = _super.call(this) || this;
        _this.workflowService = workflowService;
        _this.socketService = socketService;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        _this.user = _this.authService.UserProfile;
        return _this;
    }
    TicketDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            comment_model_1.Comment.listByTicket(_this, object.id).subscribe(function (comments) {
                _this.comments = comments;
            });
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.workflowService.updateTicket(_this, object).subscribe(function () {
            });
        });
    };
    TicketDialog.prototype.approveTicket = function () {
        var _this = this;
        if (this.object.status == 'open') {
            this.workflowService.approveTicket(this, this.object).subscribe(function () {
                _this.info('Ticket approved');
            });
        }
    };
    TicketDialog.prototype.rejectTicket = function () {
        var _this = this;
        if (this.object.status == 'open') {
            this.workflowService.rejectTicket(this, this.object).subscribe(function () {
                _this.info('Ticket rejected');
            });
        }
    };
    TicketDialog.prototype.commentTicket = function () {
        var _this = this;
        var comment = new comment_model_1.Comment();
        comment.submit_user_id = this.authService.UserProfile.id;
        comment.content = this.replyText;
        comment.date_submit = new Date();
        comment.ticket_id = this.object.id;
        comment.save(this).subscribe(function () {
            _this.workflowService.updateTicket(_this, _this.object).subscribe(function () {
                _this.comments.push(comment);
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TicketDialog.prototype, "replyText", void 0);
    TicketDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ticket-dialog',
            templateUrl: 'ticket-dialog.component.html',
        }),
        __metadata("design:paramtypes", [workflow_service_1.WorkflowService, socket_service_1.WebSocketService])
    ], TicketDialog);
    return TicketDialog;
}(base_dialog_1.BaseDialog));
exports.TicketDialog = TicketDialog;
//# sourceMappingURL=ticket-dialog.component.js.map