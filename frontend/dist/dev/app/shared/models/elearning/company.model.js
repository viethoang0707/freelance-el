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
var Company = (function (_super) {
    __extends(Company, _super);
    function Company() {
        var _this = _super.call(this) || this;
        _this.logo = undefined;
        _this.bank_account = undefined;
        _this.email = undefined;
        _this.name = undefined;
        _this.country_id = undefined;
        _this.currency_id = undefined;
        _this.fax = undefined;
        _this.phone = undefined;
        _this.street = undefined;
        _this.state_id = undefined;
        _this.city = undefined;
        _this.vat = undefined;
        _this.website = undefined;
        _this.registry = undefined;
        _this.mobile = undefined;
        return _this;
    }
    Company = __decorate([
        decorator_1.Model('res.company'),
        __metadata("design:paramtypes", [])
    ], Company);
    return Company;
}(base_model_1.BaseModel));
exports.Company = Company;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wYW55Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwQztBQUMxQywwQ0FBeUQ7QUFNekQ7SUFBNkIsMkJBQVM7SUFJbEM7UUFBQSxZQUNJLGlCQUFPLFNBaUJiO1FBZkEsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7O0lBQ3pCLENBQUM7SUF0QlcsT0FBTztRQURuQixpQkFBSyxDQUFDLGFBQWEsQ0FBQzs7T0FDUixPQUFPLENBeUNuQjtJQUFELGNBQUM7Q0F6Q0QsQUF5Q0MsQ0F6QzRCLHNCQUFTLEdBeUNyQztBQXpDWSwwQkFBTyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGFueS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgTU9ERUxfTUVUQURBVEFfS0VZLCBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBNYXBVdGlscyB9ICBmcm9tICcuLi8uLi9oZWxwZXJzL21hcC51dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5cbkBNb2RlbCgncmVzLmNvbXBhbnknKVxuZXhwb3J0IGNsYXNzIENvbXBhbnkgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLmxvZ28gPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5iYW5rX2FjY291bnQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5lbWFpbCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jb3VudHJ5X2lkID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY3VycmVuY3lfaWQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mYXggPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5waG9uZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnN0cmVldCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnN0YXRlX2lkID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuY2l0eSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnZhdCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLndlYnNpdGUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5yZWdpc3RyeSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm1vYmlsZSA9IHVuZGVmaW5lZDtcblx0fVxuXG4gICAgbG9nbzpzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBiYW5rX2FjY291bnQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY291bnRyeV9pZDogbnVtYmVyO1xuICAgIGN1cnJlbmN5X2lkOiBudW1iZXI7XG4gICAgZmF4OnN0cmluZztcbiAgICBwaG9uZTogc3RyaW5nO1xuICAgIHN0YXRlX2lkOiBudW1iZXI7XG4gICAgY2l0eTpzdHJpbmc7XG4gICAgc3RyZWV0OiBzdHJpbmc7XG4gICAgdmF0OiBzdHJpbmc7XG4gICAgd2Vic2l0ZTogc3RyaW5nO1xuICAgIHJlZ2lzdHJ5OiBzdHJpbmc7XG4gICAgbW9iaWxlOiBzdHJpbmc7XG5cbiAgICBcbn1cbiJdfQ==
