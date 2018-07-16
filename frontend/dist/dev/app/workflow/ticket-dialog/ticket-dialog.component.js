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
            templateUrl: 'ticket-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], TicketDialog);
    return TicketDialog;
}(base_dialog_1.BaseDialog));
exports.TicketDialog = TicketDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC93b3JrZmxvdy90aWNrZXQtZGlhbG9nL3RpY2tldC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRTtBQUtsRSx3RUFBc0U7QUFHdEUsMkRBQW9HO0FBV3BHO0lBQWtDLGdDQUFrQjtJQVFoRDtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQVJELG1CQUFhLEdBQUcseUJBQWEsQ0FBQzs7SUFROUIsQ0FBQztJQUVELCtCQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsb0NBQWEsR0FBYjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVELEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxtQ0FBWSxHQUFaO1FBQUEsaUJBTUM7UUFMRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDM0QsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXZCUTtRQUFSLFlBQUssRUFBRTs7bURBQVc7SUFOVixZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QyxDQUFDOztPQUNXLFlBQVksQ0ErQnhCO0lBQUQsbUJBQUM7Q0EvQkQsQUErQkMsQ0EvQmlDLHdCQUFVLEdBK0IzQztBQS9CWSxvQ0FBWSIsImZpbGUiOiJhcHAvd29ya2Zsb3cvdGlja2V0LWRpYWxvZy90aWNrZXQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCxWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZX0gICAgIGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBXb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvd29ya2Zsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViU29ja2V0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBUaWNrZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy90aWNrZXQubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IERFRkFVTFRfREFURV9MT0NBTEUsIEVYQU1fTUVNQkVSX1JPTEUsIFRJQ0tFVF9TVEFUVVMgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7U2VsZWN0SXRlbSwgTWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3RpY2tldC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAndGlja2V0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFRpY2tldERpYWxvZyBleHRlbmRzIEJhc2VEaWFsb2c8VGlja2V0PiB7XG5cbiAgICBUSUNLRVRfU1RBVFVTID0gVElDS0VUX1NUQVRVUztcblxuICAgIHByaXZhdGUgY29tbWVudHM6IENvbW1lbnRbXTtcblxuICAgIEBJbnB1dCgpIHJlcGx5VGV4dDtcblxuICAgIGNvbnN0cnVjdG9yKCApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBhcHByb3ZlVGlja2V0KCkge1xuICAgICAgICBpZiAodGhpcy5vYmplY3Quc3RhdHVzID09ICdvcGVuJykge1xuICAgICAgICAgICAgdGhpcy53b3JrZmxvd1NlcnZpY2UuYXBwcm92ZVRpY2tldCh0aGlzLCB0aGlzLm9iamVjdCkuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mbyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVGlja2V0IGFwcHJvdmVkJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWplY3RUaWNrZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9iamVjdC5zdGF0dXMgPT0gJ29wZW4nKSB7XG4gICAgICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5yZWplY3RUaWNrZXQodGhpcywgdGhpcy5vYmplY3QpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8odGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RpY2tldCByZWplY3RlZCcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuIl19
