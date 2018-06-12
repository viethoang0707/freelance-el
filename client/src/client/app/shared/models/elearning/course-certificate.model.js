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
    Certificate.byMember = function (context, memberId) {
        return Certificate_1.search(context, [], "[('member_id','!='," + memberId + ")]")
            .map(function (certificates) {
            return certificates[0];
        });
    };
    Certificate.listByUser = function (context, userId) {
        return Certificate_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Certificate.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Certificate_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    Certificate.__api__byMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(Certificate_1.Model, [], "[('member_id','='," + memberId + ")]");
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
//# sourceMappingURL=course-certificate.model.js.map