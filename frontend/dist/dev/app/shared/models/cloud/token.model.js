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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUMxQywwQ0FBdUU7QUFLdkU7SUFBMkIseUJBQVM7SUFFaEM7UUFBQSxZQUNJLGlCQUFPLFNBS2I7UUFIQSxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzs7SUFDakMsQ0FBQztJQU1FLHNCQUFJLDBCQUFPO2FBQVg7WUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNwQyxPQUFPLElBQUksQ0FBQztZQUNoQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDOzs7T0FBQTtJQXBCUSxLQUFLO1FBRGpCLGlCQUFLLENBQUMsc0JBQXNCLENBQUM7O09BQ2pCLEtBQUssQ0FzQmpCO0lBQUQsWUFBQztDQXRCRCxBQXNCQyxDQXRCMEIsc0JBQVMsR0FzQm5DO0FBdEJZLHNCQUFLIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBNT0RFTF9NRVRBREFUQV9LRVksIE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuXG5ATW9kZWwoJ2VycGNsb3VkLmxvZ2luX3Rva2VuJylcbmV4cG9ydCBjbGFzcyBUb2tlbiBleHRlbmRzIEJhc2VNb2RlbHtcbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZGF0ZV9leHBpcmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2xvdWRfaWQgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIGNvZGU6c3RyaW5nO1xuICAgIGNsb3VkX2lkOm51bWJlcjtcbiAgICBkYXRlX2V4cGlyZTogbnVtYmVyO1xuXG4gICAgZ2V0IElzVmFsaWQoKTpib29sZWFuIHtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBleHBpcmVEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlX2V4cGlyZSk7XG4gICAgICAgIGlmIChleHBpcmVEYXRlLmdldFRpbWUoKSA+IG5vdy5nZXRUaW1lKCkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufVxuIl19
