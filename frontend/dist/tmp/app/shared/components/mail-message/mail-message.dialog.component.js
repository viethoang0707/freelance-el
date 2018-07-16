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
var notification_service_1 = require("../../services/notification.service");
var MailMessageDialog = (function (_super) {
    __extends(MailMessageDialog, _super);
    function MailMessageDialog(mailService) {
        var _this = _super.call(this) || this;
        _this.mailService = mailService;
        return _this;
    }
    MailMessageDialog.prototype.ngOnInit = function () {
    };
    MailMessageDialog.prototype.show = function (recipients) {
        this.display = true;
        recipients = _.filter(recipients, function (email) {
            email = email.trim();
            return (email.length > 0);
        });
        this.recipients = recipients.join();
    };
    MailMessageDialog.prototype.send = function () {
        var _this = this;
        this.mailService.broadcast(this, this.subject, this.body, this.recipients).subscribe(function () {
            _this.success('Mail sent');
            _this.hide();
        });
    };
    MailMessageDialog.prototype.hide = function () {
        this.display = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MailMessageDialog.prototype, "subject", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MailMessageDialog.prototype, "body", void 0);
    MailMessageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mail-message-dialog',
            template: "<p-dialog header=\"{{'Course Message'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"600\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>         <div class=\"ui-g ui-fluid form-group\">             <div class=\"ui-g-6\">                 <label>{{'Subject'|translate}}</label>                  <input type=\"text\" pInputText name=\"subject\"                 [(ngModel)]=\"subject\" >             </div>             <div class=\"ui-g-12 \">                 <label>{{'Message Content'|translate}}</label>                 <textarea pInputTextarea [(ngModel)]=\"body\" name=\"body\"></textarea>             </div>         </div>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Send'|translate}}\" (click)=\"send()\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [notification_service_1.NotificationService])
    ], MailMessageDialog);
    return MailMessageDialog;
}(base_component_1.BaseComponent));
exports.MailMessageDialog = MailMessageDialog;
