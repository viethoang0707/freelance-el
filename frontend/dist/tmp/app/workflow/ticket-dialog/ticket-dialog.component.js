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
var base_dialog_1 = require("../../shared/components/base/base.dialog");
var constants_1 = require("../../shared/models/constants");
var TicketDialog = (function (_super) {
    __extends(TicketDialog, _super);
    function TicketDialog() {
        var _this = _super.call(this) || this;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        return _this;
    }
    TicketDialog.prototype.ngOnInit = function () {
    };
    TicketDialog.prototype.approveTicket = function () {
        var _this = this;
        if (this.object.status == 'open') {
            this.workflowService.approveTicket(this, this.object).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket approved'));
            });
        }
    };
    TicketDialog.prototype.rejectTicket = function () {
        var _this = this;
        if (this.object.status == 'open') {
            this.workflowService.rejectTicket(this, this.object).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket rejected'));
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TicketDialog.prototype, "replyText", void 0);
    TicketDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ticket-dialog',
            template: "<p-dialog header=\"{{'Ticket'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"960\" [responsive]=\"true\" appendTo=\"body\">   <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">       <div class=\"ui-g ui-fluid form-group\">         <div class=\"ui-g-12\">           <span>{{'Status'|translate}}:{{TICKET_STATUS[object.status]}}</span>           <button pButton type=\"button\" icon=\"ui-icon-check\" title=\"{{'Approve'| translate}}\" label=\"{{'Approve'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"approveTicket()\" [disabled]=\"object.status!='open' && ContextUser.id != object.approve_user_id\"></button>           <button pButton type=\"button\" icon=\"ui-icon-block\" title=\"{{'Reject'| translate}}\" label=\"{{'Reject'|translate}}\" class=\" red-btn\" style=\"margin-right:4px;\" (click)=\"rejectTicket()\" [disabled]=\"object.status!='open'  && ContextUser.id != object.approve_user_id\"></button>         </div>         <div class=\"ui-g-12\">           <ul class=\"list-cmt\">             <li class=\"clearfix\">               <i class=\"material-icons\">date_range</i>               <span class=\"cmt-title\">{{'Open date'|translate}}</span>               <span class=\"cmt-detail\">{{object.date_open | date : \"dd/MM/yyyy\"}}</span>             </li>             <li class=\"clearfix\">               <i class=\"material-icons\">date_range</i>               <span class=\"cmt-title\">{{'Close date'|translate}}</span>               <span class=\"cmt-detail\">{{object.date_close | date : \"dd/MM/yyyy\"}}</span>             </li>           </ul>         </div>         <div class=\"ui-g-6\">           <span class=\"md-inputfield\">               <input type=\"text\" pInputText [(ngModel)]=\"object.title\" #title=\"ngModel\" name=\"title\" required [disabled]=\"ContextUser.id==object.approve_user_id\">               <label>{{'Title'|translate}}</label>               <div *ngIf=\"title.invalid && (title.dirty || title.touched)\"                  class=\"ui-message ui-messages-error ui-corner-all\">                 <div *ngIf=\"title.errors.required\">                     {{'Title is required' | translate}}                 </div>               </div>           </span>         </div>         <div class=\"ui-g-6\">           <span class=\"md-inputfield\">               <input type=\"text\" pInputText [(ngModel)]=\"object.content\" name=\"summary\"  [disabled]=\"ContextUser.id==object.approve_user_id\">               <label>{{'Content'|translate}}</label>           </span>         </div>       </div>   </form>   <p-footer>     <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\" *ngIf=\"ContextUser.id == object.submit_user_id\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], TicketDialog);
    return TicketDialog;
}(base_dialog_1.BaseDialog));
exports.TicketDialog = TicketDialog;
