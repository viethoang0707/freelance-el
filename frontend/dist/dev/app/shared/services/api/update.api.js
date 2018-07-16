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
var UpdateAPI = (function (_super) {
    __extends(UpdateAPI, _super);
    function UpdateAPI(model, id, object) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, values: object, id: id };
        return _this;
    }
    UpdateAPI = __decorate([
        decorator_1.Method('/api/update'),
        __metadata("design:paramtypes", [String, Number, Object])
    ], UpdateAPI);
    return UpdateAPI;
}(base_api_1.BaseAPI));
exports.UpdateAPI = UpdateAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL3VwZGF0ZS5hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXFDO0FBRXJDLHlDQUFxQztBQUdyQztJQUErQiw2QkFBTztJQUVsQyxtQkFBYSxLQUFZLEVBQUUsRUFBUyxFQUFFLE1BQVU7UUFBaEQsWUFDSSxpQkFBTyxTQUViO1FBRE0sS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUMsRUFBRSxFQUFFLENBQUM7O0lBQzNELENBQUM7SUFMVyxTQUFTO1FBRHJCLGtCQUFNLENBQUMsYUFBYSxDQUFDOztPQUNULFNBQVMsQ0FPckI7SUFBRCxnQkFBQztDQVBELEFBT0MsQ0FQOEIsa0JBQU8sR0FPckM7QUFQWSw4QkFBUyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS91cGRhdGUuYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFQSSB9IGZyb20gJy4vYmFzZS5hcGknO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSAnLi9kZWNvcmF0b3InO1xuXG5ATWV0aG9kKCcvYXBpL3VwZGF0ZScpXG5leHBvcnQgY2xhc3MgVXBkYXRlQVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCBtb2RlbDpzdHJpbmcsIGlkOm51bWJlciwgb2JqZWN0OmFueSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge21vZGVsOiBtb2RlbCwgdmFsdWVzOm9iamVjdCwgaWQ6aWQgfTtcblx0fVxuXG59XG4iXX0=
