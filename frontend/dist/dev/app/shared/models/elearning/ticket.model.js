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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy90aWNrZXQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFtRDtBQUduRCxzRUFBbUU7QUFHbkU7SUFBNEIsMEJBQVM7SUFFakM7UUFBQSxZQUNJLGlCQUFPLFNBY1Y7UUFaRyxLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixLQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxLQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxLQUFJLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7UUFDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7O0lBQzFCLENBQUM7ZUFqQlEsTUFBTTtJQWtDUiw4QkFBdUIsR0FBOUIsVUFBK0IsRUFBVSxFQUFFLEtBQWE7UUFDcEQsT0FBTyxJQUFJLCtCQUFhLENBQUMsUUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsaUJBQWlCLEdBQUMsRUFBRSxHQUFDLHNCQUFzQixHQUFDLEtBQUssR0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzdILENBQUM7SUFFTSwrQkFBd0IsR0FBL0IsVUFBZ0MsTUFBYztRQUMxQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxRQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQywwQkFBMEIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLDhCQUF1QixHQUE5QixVQUErQixNQUFjO1FBQ3pDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLHlCQUF5QixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRU0sd0JBQWlCLEdBQXhCLFVBQXlCLE9BQWtCLEVBQUUsTUFBYTtRQUN0RCxPQUFPLFFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSwwQkFBMEIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLHNDQUErQixHQUF0QyxVQUF1QyxNQUFjO1FBQ2pELE9BQU8sSUFBSSwrQkFBYSxDQUFDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLDBCQUEwQixHQUFDLE1BQU0sR0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFFTSwrQkFBd0IsR0FBL0IsVUFBZ0MsT0FBa0IsRUFBRSxNQUFhO1FBQzdELE9BQU8sUUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFFLDBCQUEwQixHQUFDLE1BQU0sR0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFTSxxQ0FBOEIsR0FBckMsVUFBc0MsTUFBYztRQUNoRCxPQUFPLElBQUksK0JBQWEsQ0FBQyxRQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyx5QkFBeUIsR0FBQyxNQUFNLEdBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRU0sOEJBQXVCLEdBQTlCLFVBQStCLE9BQWtCLEVBQUUsTUFBYTtRQUM1RCxPQUFPLFFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSx5QkFBeUIsR0FBQyxNQUFNLEdBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRU0sdUJBQWdCLEdBQXZCLFVBQXdCLE9BQWtCLEVBQUUsTUFBYTtRQUNyRCxPQUFPLFFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSx5QkFBeUIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7SUF0Q0Q7UUFEQyx5QkFBYSxFQUFRO2tDQUNYLElBQUk7NkNBQUM7SUFFaEI7UUFEQyx5QkFBYSxFQUFRO2tDQUNWLElBQUk7OENBQUM7SUFoQ1IsTUFBTTtRQURsQixpQkFBSyxDQUFDLGtCQUFrQixDQUFDOztPQUNiLE1BQU0sQ0F3RWxCO0lBQUQsYUFBQztDQXhFRCxBQXdFQyxDQXhFMkIsc0JBQVMsR0F3RXBDO0FBeEVZLHdCQUFNIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy90aWNrZXQubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcudGlja2V0JylcbmV4cG9ydCBjbGFzcyBUaWNrZXQgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50aXRsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdWJtaXRfdXNlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hcHByb3ZlX3VzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3VibWl0X3VzZXJfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5hcHByb3ZlX3VzZXJfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kYXRlX29wZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZGF0ZV9jbG9zZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZXNfbW9kZWwgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnJlc19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGNvZGU6c3RyaW5nO1xuICAgIHJlc19pZDogbnVtYmVyO1xuICAgIHJlc19tb2RlbDogc3RyaW5nO1xuICAgIHN1Ym1pdF91c2VyX2lkOiBudW1iZXI7XG4gICAgYXBwcm92ZV91c2VyX2lkOiBudW1iZXI7XG4gICAgc3VibWl0X3VzZXJfaWRfX0RFU0NfXzogc3RyaW5nO1xuICAgIGFwcHJvdmVfdXNlcl9pZF9fREVTQ19fOiBzdHJpbmc7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIGRhdGVfb3BlbjogRGF0ZTtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZGF0ZV9jbG9zZTogRGF0ZTtcblxuICAgIHN0YXRpYyBfX2FwaV9fYnlXb3JrZmxvd09iamVjdChpZDogbnVtYmVyLCBtb2RlbDogc3RyaW5nKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShUaWNrZXQuTW9kZWwsIFtdLFwiWygncmVzX2lkJywnPScsXCIraWQrXCIpLCgncmVzX21vZGVsJywnPScsJ1wiK21vZGVsK1wiJyksKCdzdGF0dXMnLCc9Jywnb3BlbicpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUFwcHJvdmVVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShUaWNrZXQuTW9kZWwsIFtdLFwiWygnYXBwcm92ZV91c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTdWJtaXRVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShUaWNrZXQuTW9kZWwsIFtdLFwiWygnc3VibWl0X3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5QXBwcm92ZVVzZXIoY29udGV4dDpBUElDb250ZXh0LCB1c2VySWQ6bnVtYmVyKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gVGlja2V0LnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2FwcHJvdmVfdXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdFBlbmRpbmdCeUFwcHJvdmVVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShUaWNrZXQuTW9kZWwsIFtdLFwiWygnYXBwcm92ZV91c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKSwoJ3N0YXR1cycsJz0nLCdwZW5kaW5nJyldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0UGVuZGluZ0J5QXBwcm92ZVVzZXIoY29udGV4dDpBUElDb250ZXh0LCB1c2VySWQ6bnVtYmVyKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gVGlja2V0LnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2FwcHJvdmVfdXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIiksKCdzdGF0dXMnLCc9JywncGVuZGluZycpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RQZW5kaW5nQnlTdWJtaXRVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShUaWNrZXQuTW9kZWwsIFtdLFwiWygnc3VibWl0X3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpLCgnc3RhdHVzJywnPScsJ3BlbmRpbmcnKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RQZW5kaW5nQnlTdWJtaXRVc2VyKGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkOm51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFRpY2tldC5zZWFyY2goY29udGV4dCxbXSwgXCJbKCdzdWJtaXRfdXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIiksKCdzdGF0dXMnLCc9JywncGVuZGluZycpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VibWl0VXNlcihjb250ZXh0OkFQSUNvbnRleHQsIHVzZXJJZDpudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBUaWNrZXQuc2VhcmNoKGNvbnRleHQsW10sIFwiWygnc3VibWl0X3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cblxuXG59XG4iXX0=
