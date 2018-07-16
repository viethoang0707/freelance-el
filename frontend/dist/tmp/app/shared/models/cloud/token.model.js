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
var Token = (function (_super) {
    __extends(Token, _super);
    function Token() {
        var _this = _super.call(this) || this;
        _this.code = undefined;
        _this.date_expire = undefined;
        _this.cloud_id = undefined;
        return _this;
    }
    Object.defineProperty(Token.prototype, "IsValid", {
        get: function () {
            var now = new Date();
            var expireDate = new Date(this.date_expire);
            if (expireDate.getTime() > now.getTime())
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Token = __decorate([
        decorator_1.Model('erpcloud.login_token'),
        __metadata("design:paramtypes", [])
    ], Token);
    return Token;
}(base_model_1.BaseModel));
exports.Token = Token;
