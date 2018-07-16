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
var Certificate = (function (_super) {
    __extends(Certificate, _super);
    function Certificate() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.course_id = undefined;
        _this.class_id = undefined;
        _this.member_id = undefined;
        _this.date_issue = undefined;
        _this.qualification = undefined;
        _this.summary = undefined;
        _this.user_id = undefined;
        _this.course_name = undefined;
        _this.course_code = undefined;
        _this.course_mode = undefined;
        _this.member_name = undefined;
        _this.member_login = undefined;
        _this.member_image = undefined;
        return _this;
    }
    Certificate_1 = Certificate;
    Certificate.listByUser = function (context, userId) {
        return Certificate_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Certificate.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Certificate_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    Certificate.listByMember = function (context, memberId) {
        return Certificate_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    Certificate.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(Certificate_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    Certificate.listByClass = function (context, classId) {
        return Certificate_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    Certificate.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(Certificate_1.Model, [], "[('class_id','='," + classId + ")]");
    };
    var Certificate_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Certificate.prototype, "date_issue", void 0);
    Certificate = Certificate_1 = __decorate([
        decorator_1.Model('etraining.course_certificate'),
        __metadata("design:paramtypes", [])
    ], Certificate);
    return Certificate;
}(base_model_1.BaseModel));
exports.Certificate = Certificate;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFtRDtBQUVuRCxzRUFBbUU7QUFJbkU7SUFBaUMsK0JBQVM7SUFHdEM7UUFBQSxZQUNJLGlCQUFPLFNBaUJWO1FBZkgsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsS0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7O0lBRWxDLENBQUM7b0JBckJRLFdBQVc7SUF1Q2Isc0JBQVUsR0FBakIsVUFBa0IsT0FBbUIsRUFBRSxNQUFjO1FBQ2pELE9BQU8sYUFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBR00sNkJBQWlCLEdBQXhCLFVBQXlCLE1BQWM7UUFDbkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsYUFBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFTSx3QkFBWSxHQUFuQixVQUFvQixPQUFtQixFQUFFLFFBQWdCO1FBQ3JELE9BQU8sYUFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBR00sK0JBQW1CLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGFBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU0sdUJBQVcsR0FBbEIsVUFBbUIsT0FBbUIsRUFBRSxPQUFlO1FBQ25ELE9BQU8sYUFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBR00sOEJBQWtCLEdBQXpCLFVBQTBCLE9BQWU7UUFDckMsT0FBTyxJQUFJLCtCQUFhLENBQUMsYUFBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsbUJBQW1CLEdBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7O0lBbkNEO1FBREMseUJBQWEsRUFBUTtrQ0FDWCxJQUFJO21EQUFDO0lBN0JQLFdBQVc7UUFEdkIsaUJBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7T0FDekIsV0FBVyxDQWtFdkI7SUFBRCxrQkFBQztDQWxFRCxBQWtFQyxDQWxFZ0Msc0JBQVMsR0FrRXpDO0FBbEVZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcblxuQE1vZGVsKCdldHJhaW5pbmcuY291cnNlX2NlcnRpZmljYXRlJylcbmV4cG9ydCBjbGFzcyBDZXJ0aWZpY2F0ZSBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb3Vyc2VfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2xhc3NfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVtYmVyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRhdGVfaXNzdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucXVhbGlmaWNhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdW1tYXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX25hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX2NvZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX21vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVtYmVyX25hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVtYmVyX2xvZ2luID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lbWJlcl9pbWFnZSA9IHVuZGVmaW5lZDtcblxuICAgIH1cbiAgICBcbiAgICBuYW1lOnN0cmluZztcbiAgICBjb3Vyc2VfaWQ6IG51bWJlcjtcbiAgICBjbGFzc19pZDogbnVtYmVyO1xuICAgIG1lbWJlcl9pZDogbnVtYmVyO1xuICAgIHVzZXJfaWQ6bnVtYmVyO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBkYXRlX2lzc3VlOkRhdGU7XG4gICAgcXVhbGlmaWNhdGlvbjogbnVtYmVyO1xuICAgIHN1bW1hcnk6c3RyaW5nO1xuICAgIG1lbWJlcl9uYW1lOiBzdHJpbmc7XG4gICAgbWVtYmVyX2xvZ2luOiBzdHJpbmc7XG4gICAgbWVtYmVyX2ltYWdlOiBzdHJpbmc7XG4gICAgY291cnNlX25hbWU6IHN0cmluZztcbiAgICBjb3Vyc2VfbW9kZTogc3RyaW5nO1xuICAgIGNvdXJzZV9jb2RlOiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgbGlzdEJ5VXNlcihjb250ZXh0OiBBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIENlcnRpZmljYXRlLnNlYXJjaChjb250ZXh0LCBbXSwgXCJbKCd1c2VyX2lkJywnPScsXCIgKyB1c2VySWQgKyBcIildXCIpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDZXJ0aWZpY2F0ZS5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeU1lbWJlcihjb250ZXh0OiBBUElDb250ZXh0LCBtZW1iZXJJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gQ2VydGlmaWNhdGUuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ21lbWJlcl9pZCcsJz0nLFwiICsgbWVtYmVySWQgKyBcIildXCIpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQ2VydGlmaWNhdGUuTW9kZWwsIFtdLFwiWygnbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5Q2xhc3MoY29udGV4dDogQVBJQ29udGV4dCwgY2xhc3NJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgICAgICByZXR1cm4gQ2VydGlmaWNhdGUuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2NsYXNzX2lkJywnPScsXCIgKyBjbGFzc0lkICsgXCIpXVwiKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5Q2xhc3MoY2xhc3NJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShDZXJ0aWZpY2F0ZS5Nb2RlbCwgW10sXCJbKCdjbGFzc19pZCcsJz0nLFwiK2NsYXNzSWQrXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
