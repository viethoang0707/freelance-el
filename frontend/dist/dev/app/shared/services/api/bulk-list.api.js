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
var BulkListAPI = (function (_super) {
    __extends(BulkListAPI, _super);
    function BulkListAPI() {
        var _this = _super.call(this) || this;
        _this.params = { stacks: [] };
        return _this;
    }
    BulkListAPI.prototype.add = function (api) {
        var stacks = this.params["stacks"];
        stacks.push(api.params);
    };
    BulkListAPI = __decorate([
        decorator_1.Method('/api/bulk_read'),
        __metadata("design:paramtypes", [])
    ], BulkListAPI);
    return BulkListAPI;
}(base_api_1.BaseAPI));
exports.BulkListAPI = BulkListAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2J1bGstbGlzdC5hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXFDO0FBRXJDLHlDQUFxQztBQUlyQztJQUFpQywrQkFBTztJQUVwQztRQUFBLFlBQ0ksaUJBQU8sU0FFYjtRQURNLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLENBQUM7O0lBQ2pDLENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQUksR0FBWTtRQUNmLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVZXLFdBQVc7UUFEdkIsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7T0FDWixXQUFXLENBWXZCO0lBQUQsa0JBQUM7Q0FaRCxBQVlDLENBWmdDLGtCQUFPLEdBWXZDO0FBWlksa0NBQVciLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvYnVsay1saXN0LmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VBUEkgfSBmcm9tICcuL2Jhc2UuYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1ldGhvZCB9IGZyb20gJy4vZGVjb3JhdG9yJztcbmltcG9ydCB7IExpc3RBUEkgfSBmcm9tICcuL2xpc3QuYXBpJztcblxuQE1ldGhvZCgnL2FwaS9idWxrX3JlYWQnKVxuZXhwb3J0IGNsYXNzIEJ1bGtMaXN0QVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCApe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHtzdGFja3M6W119O1xuXHR9XG5cblx0YWRkKGFwaTogTGlzdEFQSSkge1xuXHRcdHZhciBzdGFja3MgPSB0aGlzLnBhcmFtc1tcInN0YWNrc1wiXTtcblx0XHRzdGFja3MucHVzaChhcGkucGFyYW1zKTtcblx0fVxuXG59XG4iXX0=
