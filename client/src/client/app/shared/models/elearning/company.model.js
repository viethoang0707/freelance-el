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
//# sourceMappingURL=company.model.js.map