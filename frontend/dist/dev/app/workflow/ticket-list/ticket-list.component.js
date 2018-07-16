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
            templateUrl: 'ticket-list.component.html',
            styleUrls: ['ticket-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], TicketListComponent);
    return TicketListComponent;
}(base_component_1.BaseComponent));
exports.TicketListComponent = TicketListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93b3JrZmxvdy90aWNrZXQtbGlzdC90aWNrZXQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLDhFQUE0RTtBQUk1RSwyREFBNkU7QUFDN0UsMkVBQW9FO0FBQ3BFLG9GQUF3RTtBQUV4RSw2REFBMkQ7QUFRM0Q7SUFBeUMsdUNBQWE7SUFRbEQ7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFSRCxtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFNMUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7O0lBQzlCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxzQkFBUzthQUNSLFdBQVcsQ0FBQyxJQUFJLEVBQ2IscUJBQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUNuRCxxQkFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEQsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUNkLEtBQUksQ0FBQyxhQUFhLEdBQUkscUJBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLGVBQWUsR0FBSSxxQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsTUFBYztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLE1BQWM7UUFBNUIsaUJBTUM7UUFMRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxRCxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBTUM7UUFMRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN6RCxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBckN3QjtRQUF4QixnQkFBUyxDQUFDLHNDQUFZLENBQUM7a0NBQWUsc0NBQVk7NkRBQUM7SUFOM0MsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDOztPQUNXLG1CQUFtQixDQThDL0I7SUFBRCwwQkFBQztDQTlDRCxBQThDQyxDQTlDd0MsOEJBQWEsR0E4Q3JEO0FBOUNZLGtEQUFtQiIsImZpbGUiOiJhcHAvd29ya2Zsb3cvdGlja2V0LWxpc3QvdGlja2V0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgV29ya2Zsb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3dvcmtmbG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViU29ja2V0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIFRJQ0tFVF9TVEFUVVMgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IFRpY2tldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3RpY2tldC5tb2RlbCc7XG5pbXBvcnQgeyBUaWNrZXREaWFsb2cgfSBmcm9tICcuLi90aWNrZXQtZGlhbG9nL3RpY2tldC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAndGlja2V0LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAndGlja2V0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWyd0aWNrZXQtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRpY2tldExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgc3VibWl0VGlja2V0czogVGlja2V0W107XG4gICAgcHJpdmF0ZSBhcHByb3ZhbFRpY2tldHM6IFRpY2tldFtdO1xuICAgIFRJQ0tFVF9TVEFUVVMgPSBUSUNLRVRfU1RBVFVTO1xuXG4gICAgQFZpZXdDaGlsZChUaWNrZXREaWFsb2cpIHRpY2tldERpYWxvZzogVGlja2V0RGlhbG9nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3VibWl0VGlja2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmFwcHJvdmFsVGlja2V0cyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBCYXNlTW9kZWxcbiAgICAgICAgLmJ1bGtfc2VhcmNoKHRoaXMsXG4gICAgICAgICAgICBUaWNrZXQuX19hcGlfX2xpc3RCeVN1Ym1pdFVzZXIodGhpcy5Db250ZXh0VXNlci5pZCksXG4gICAgICAgICAgICBUaWNrZXQuX19hcGlfX2xpc3RCeUFwcHJvdmVVc2VyKHRoaXMuQ29udGV4dFVzZXIuaWQpKVxuICAgICAgICAuc3Vic2NyaWJlKGpzb25BcnI9PiB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdFRpY2tldHMgPSAgVGlja2V0LnRvQXJyYXkoanNvbkFyclswXSk7XG4gICAgICAgICAgICB0aGlzLmFwcHJvdmFsVGlja2V0cyA9ICBUaWNrZXQudG9BcnJheShqc29uQXJyWzFdKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aWNrZXREZXRhaWwodGlja2V0OiBUaWNrZXQpIHtcbiAgICAgICAgdGhpcy50aWNrZXREaWFsb2cuc2hvdyh0aWNrZXQpO1xuICAgIH1cblxuICAgIGFwcHJvdmVUaWNrZXQodGlja2V0OiBUaWNrZXQpIHtcbiAgICAgICAgaWYgKHRpY2tldC5zdGF0dXMgPT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5hcHByb3ZlVGlja2V0KHRoaXMsIHRpY2tldC5pZCkuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mbyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVGlja2V0IGFwcHJvdmVkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWplY3RUaWNrZXQodGlja2V0OiBUaWNrZXQpIHtcbiAgICAgICAgaWYgKHRpY2tldC5zdGF0dXMgPT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5yZWplY3RUaWNrZXQodGhpcywgdGlja2V0LmlkKS5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdUaWNrZXQgcmVqZWN0ZWQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59Il19
