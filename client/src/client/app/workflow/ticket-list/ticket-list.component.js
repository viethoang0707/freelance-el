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
var base_component_1 = require("../../shared/components/base/base.component");
var workflow_service_1 = require("../../shared/services/workflow.service");
var socket_service_1 = require("../../shared/services/socket.service");
var constants_1 = require("../../shared/models/constants");
var ticket_model_1 = require("../../shared/models/ticket/ticket.model");
var ticket_dialog_component_1 = require("../ticket-dialog/ticket-dialog.component");
var base_model_1 = require("../../shared/models/base.model");
var TicketListComponent = (function (_super) {
    __extends(TicketListComponent, _super);
    function TicketListComponent(workflowService, socketSerivce) {
        var _this = _super.call(this) || this;
        _this.workflowService = workflowService;
        _this.socketSerivce = socketSerivce;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        _this.submitTickets = [];
        _this.approvalTickets = [];
        return _this;
    }
    TicketListComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_search(this, ticket_model_1.Ticket.__api__listBySubmitUser(this.authService.UserProfile.id), ticket_model_1.Ticket.__api__listByApproveUser(this.authService.UserProfile.id))
            .subscribe(function (jsonArr) {
            _this.submitTickets = ticket_model_1.Ticket.toArray(jsonArr[0]);
            _this.approvalTickets = ticket_model_1.Ticket.toArray(jsonArr[1]);
        });
    };
    TicketListComponent.prototype.ticketDetail = function (ticket) {
        this.ticketDialog.show(ticket);
    };
    TicketListComponent.prototype.approveTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'open') {
            this.workflowService.approveTicket(this, ticket).subscribe(function () {
                _this.info('Ticket approved');
            });
        }
    };
    TicketListComponent.prototype.rejectTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'open') {
            this.workflowService.rejectTicket(this, ticket).subscribe(function () {
                _this.info('Ticket rejected');
            });
        }
    };
    __decorate([
        core_1.ViewChild(ticket_dialog_component_1.TicketDialog),
        __metadata("design:type", ticket_dialog_component_1.TicketDialog)
    ], TicketListComponent.prototype, "ticketDialog", void 0);
    TicketListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ticket-list',
            templateUrl: 'ticket-list.component.html',
            styleUrls: ['ticket-list.component.css'],
        }),
        __metadata("design:paramtypes", [workflow_service_1.WorkflowService, socket_service_1.WebSocketService])
    ], TicketListComponent);
    return TicketListComponent;
}(base_component_1.BaseComponent));
exports.TicketListComponent = TicketListComponent;
//# sourceMappingURL=ticket-list.component.js.map