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
var base_api_1 = require("./base.api");
var decorator_1 = require("./decorator");
var ChangePassAPI = (function (_super) {
    __extends(ChangePassAPI, _super);
    function ChangePassAPI(user_id, old_pass, new_pass) {
        var _this = _super.call(this) || this;
        _this.params = { user_id: user_id, old_pass: old_pass, new_pass: new_pass };
        return _this;
    }
    ChangePassAPI = __decorate([
        decorator_1.Method('/api/changepass'),
        __metadata("design:paramtypes", [Number, String, String])
    ], ChangePassAPI);
    return ChangePassAPI;
}(base_api_1.BaseAPI));
exports.ChangePassAPI = ChangePassAPI;
//# sourceMappingURL=change-pass.api.js.map