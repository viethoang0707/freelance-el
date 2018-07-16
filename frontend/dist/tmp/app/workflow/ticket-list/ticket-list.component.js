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
var constants_1 = require("../../shared/models/constants");
var ticket_model_1 = require("../../shared/models/elearning/ticket.model");
var ticket_dialog_component_1 = require("../ticket-dialog/ticket-dialog.component");
var base_model_1 = require("../../shared/models/base.model");
var TicketListComponent = (function (_super) {
    __extends(TicketListComponent, _super);
    function TicketListComponent() {
        var _this = _super.call(this) || this;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        _this.submitTickets = [];
        _this.approvalTickets = [];
        return _this;
    }
    TicketListComponent.prototype.ngOnInit = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_search(this, ticket_model_1.Ticket.__api__listBySubmitUser(this.ContextUser.id), ticket_model_1.Ticket.__api__listByApproveUser(this.ContextUser.id))
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
            this.workflowService.approveTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket approved'));
            });
        }
    };
    TicketListComponent.prototype.rejectTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'open') {
            this.workflowService.rejectTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket rejected'));
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
            template: "<div class=\"card card-w-title\">     <h1>{{'Tickets'|translate}}</h1>     <p-tabView>         <p-tabPanel header=\"{{'My tickets'|translate}}\">             <p-dataList [value]=\"submitTickets\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-ticket-list\">                 <ng-template let-ticket pTemplate=\"item\">                     <p-card styleClass=\"lms-course-list-item\">                         <div class=\"ui-g\">                             <div class=\"ui-g-9\">                                 <div class=\"ui-g-12 border\">                                 </div>                                 <div class=\"ui-g-12\">                                     <h4 class=\"heading-course\">                 <span>{{ticket.title}}</span>               </h4>                                     <span class=\"c-status\">                 {{TICKET_STATUS[ticket.status]|translate}}               </span>                                     <div class=\"clearfix\"></div>                                     <p-accordion styleClass=\"cont\">                                         <p-accordionTab header=\"{{'Content' | translate}}\">                                            <p [innerHTML]= \"ticket.content\" ></p>                                         </p-accordionTab>                                     </p-accordion>                                 </div>                             </div>                             <div class=\"ui-g-3\">                                 <p-card styleClass=\"lms-course-detail\">                                     <ul class=\"list-cmt\">                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Open date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_open | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Close date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_close | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">people</i>                                             <span class=\"cmt-title\">{{'Submit by)'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.submit_user_id__DESC__}}</span>                                         </li>                                         <li class=\"clearfix\" style=\"border-bottom: none;\">                                             <i class=\"material-icons\">done</i>                                             <span class=\"cmt-title\">{{'Approve by'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.approve_user_id__DESC__}}</span>                                         </li>                                     </ul>                                 </p-card>                             </div>                         </div>                     </p-card>                 </ng-template>             </p-dataList>         </p-tabPanel>         <p-tabPanel header=\"{{'Waiting for my approval'|translate}}\">             <p-dataList [value]=\"approvalTickets\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-ticket-list\">                 <ng-template let-ticket pTemplate=\"item\">                     <p-card styleClass=\"lms-course-list-item\">                         <div class=\"ui-g\">                             <div class=\"ui-g-9\">                                 <div class=\"ui-g-12 border\">                                     <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Approve'| translate}}\" label=\"{{'Approve'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"approveTicket(ticket)\" [disabled]=\"ticket.status=='approved'\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-block\" title=\"{{'Reject'| translate}}\" label=\"{{'Reject'|translate}}\" class=\" red-btn\" style=\"margin-right:4px;\" (click)=\"rejectTicket(ticket)\" [disabled]=\"ticket.status=='rejected'\"></button>                                 </div>                                 <div class=\"ui-g-12\">                                     <h4 class=\"heading-course\">                 <span>{{ticket.title}}</span>               </h4>                                     <span class=\"c-status\">                 {{TICKET_STATUS[ticket.status]|translate}}               </span>                                     <div class=\"clearfix\"></div>                                     <p-accordion styleClass=\"cont\">                                         <p-accordionTab header=\"{{'Content' | translate}}\">                                             <p [innerHTML]= \"ticket.content\" ></p>                                         </p-accordionTab>                                     </p-accordion>                                 </div>                             </div>                             <div class=\"ui-g-3\">                                 <p-card styleClass=\"lms-course-detail\">                                     <ul class=\"list-cmt\">                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Open date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_open | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">date_range</i>                                             <span class=\"cmt-title\">{{'Close date'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.date_close | date : \"dd/MM/yyyy\"}}</span>                                         </li>                                         <li class=\"clearfix\">                                             <i class=\"material-icons\">people</i>                                             <span class=\"cmt-title\">{{'Submit by)'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.submit_user_id__DESC__}}</span>                                         </li>                                         <li class=\"clearfix\" style=\"border-bottom: none;\">                                             <i class=\"material-icons\">done</i>                                             <span class=\"cmt-title\">{{'Approve by'|translate}}</span>                                             <span class=\"cmt-detail\">{{ticket.approve_user_id__DESC__}}</span>                                         </li>                                     </ul>                                 </p-card>                             </div>                         </div>                     </p-card>                 </ng-template>             </p-dataList>         </p-tabPanel>     </p-tabView>     <ticket-dialog></ticket-dialog> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}.search input{border:1px solid #bdbdbd;width:400px;border-bottom-left-radius:3px;border-top-left-radius:3px}.search button{border-bottom-left-radius:0;border-top-left-radius:0}"],
        }),
        __metadata("design:paramtypes", [])
    ], TicketListComponent);
    return TicketListComponent;
}(base_component_1.BaseComponent));
exports.TicketListComponent = TicketListComponent;
