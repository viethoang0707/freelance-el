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
var ListAPI = (function (_super) {
    __extends(ListAPI, _super);
    function ListAPI(model, ids, fields) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, fields: fields, ids: ids };
        return _this;
    }
    ListAPI = __decorate([
        decorator_1.Method('/api/read'),
        __metadata("design:paramtypes", [String, Array, Array])
    ], ListAPI);
    return ListAPI;
}(base_api_1.BaseAPI));
exports.ListAPI = ListAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2xpc3QuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFxQztBQUVyQyx5Q0FBcUM7QUFHckM7SUFBNkIsMkJBQU87SUFFaEMsaUJBQWEsS0FBWSxFQUFFLEdBQVksRUFBRSxNQUFlO1FBQXhELFlBQ0ksaUJBQU8sU0FFYjtRQURNLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxDQUFDOztJQUM3RCxDQUFDO0lBTFcsT0FBTztRQURuQixrQkFBTSxDQUFDLFdBQVcsQ0FBQzs7T0FDUCxPQUFPLENBT25CO0lBQUQsY0FBQztDQVBELEFBT0MsQ0FQNEIsa0JBQU8sR0FPbkM7QUFQWSwwQkFBTyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS9saXN0LmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VBUEkgfSBmcm9tICcuL2Jhc2UuYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1ldGhvZCB9IGZyb20gJy4vZGVjb3JhdG9yJztcblxuQE1ldGhvZCgnL2FwaS9yZWFkJylcbmV4cG9ydCBjbGFzcyBMaXN0QVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCBtb2RlbDpzdHJpbmcsIGlkczpudW1iZXJbXSwgZmllbGRzOnN0cmluZ1tdKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7IG1vZGVsOiBtb2RlbCxmaWVsZHM6ZmllbGRzLCBpZHM6aWRzIH07XG5cdH1cblxufVxuIl19
