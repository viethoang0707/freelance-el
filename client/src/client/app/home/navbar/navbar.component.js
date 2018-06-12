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
var socket_service_1 = require("../../shared/services/socket.service");
var router_1 = require("@angular/router");
var constants_1 = require("../../shared/models/constants");
var home_manager_service_1 = require("../home-manager.service");
var home_component_1 = require("../home.component");
var base_component_1 = require("../../shared/components/base/base.component");
var notification_model_1 = require("../../shared/models/ticket/notification.model");
var ticket_model_1 = require("../../shared/models/ticket/ticket.model");
var ticket_dialog_component_1 = require("../../workflow/ticket-dialog/ticket-dialog.component");
var _ = require("underscore");
var NavbarComponent = (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent(router, parent, eventManager, socketService) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.parent = parent;
        _this.eventManager = eventManager;
        _this.socketService = socketService;
        _this.langs = _.map(constants_1.LANGS, function (val, key) {
            return { label: val, value: key };
        });
        _this.selectedLang = _this.translateService.currentLang;
        _this.notifs = [];
        return _this;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.authService.UserProfile;
        this.viewMode = this.settingService.ViewMode;
        this.loadNotification();
        this.socketService.join(this.user.id, this.authService.CloudAcc.id);
        this.socketService.onNotify.subscribe(function (data) {
            _this.loadNotification();
        });
    };
    NavbarComponent.prototype.loadNotification = function () {
        var _this = this;
        notification_model_1.Notification.listByUser(this, this.user.id).subscribe(function (notifs) {
            _this.notifs = notifs;
        });
    };
    NavbarComponent.prototype.showTicket = function (notif) {
        var _this = this;
        ticket_model_1.Ticket.get(this, notif.ticket_id).subscribe(function (ticket) {
            _this.ticketDialog.show(ticket);
            notif.delete(_this).subscribe(function () {
                _this.loadNotification();
            });
        });
    };
    NavbarComponent.prototype.selectLang = function ($event) {
        this.settingService.Lang = $event.value;
        this.translateService.use($event.value);
    };
    NavbarComponent.prototype.setViewMode = function (mode) {
        this.viewMode = mode;
        this.settingService.ViewMode = mode;
        this.router.navigate(['/dashboard']);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "selectedLang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NavbarComponent.prototype, "adminMode", void 0);
    __decorate([
        core_1.ViewChild(ticket_dialog_component_1.TicketDialog),
        __metadata("design:type", ticket_dialog_component_1.TicketDialog)
    ], NavbarComponent.prototype, "ticketDialog", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-navbar',
            templateUrl: 'navbar.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, home_component_1.HomeComponent,
            home_manager_service_1.HomeEventManager, socket_service_1.WebSocketService])
    ], NavbarComponent);
    return NavbarComponent;
}(base_component_1.BaseComponent));
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map