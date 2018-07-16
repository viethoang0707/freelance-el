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
var SearchReadAPI = (function (_super) {
    __extends(SearchReadAPI, _super);
    function SearchReadAPI(model, fields, domain) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, fields: fields, domain: domain };
        return _this;
    }
    SearchReadAPI = __decorate([
        decorator_1.Method('/api/search_read'),
        __metadata("design:paramtypes", [String, Array, String])
    ], SearchReadAPI);
    return SearchReadAPI;
}(base_api_1.BaseAPI));
exports.SearchReadAPI = SearchReadAPI;
var SearchAllAPI = (function (_super) {
    __extends(SearchAllAPI, _super);
    function SearchAllAPI(model) {
        var _this = _super.call(this, model, [], "[]") || this;
        _this.params = { model: model, fields: [], domain: "[]" };
        return _this;
    }
    SearchAllAPI = __decorate([
        decorator_1.Method('/api/search_read'),
        __metadata("design:paramtypes", [String])
    ], SearchAllAPI);
    return SearchAllAPI;
}(SearchReadAPI));
exports.SearchAllAPI = SearchAllAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBcUM7QUFFckMseUNBQXFDO0FBR3JDO0lBQW1DLGlDQUFPO0lBRXRDLHVCQUFhLEtBQVksRUFBRSxNQUFlLEVBQUUsTUFBYTtRQUF6RCxZQUNJLGlCQUFPLFNBRWI7UUFETSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQzs7SUFDbkUsQ0FBQztJQUxXLGFBQWE7UUFEekIsa0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7T0FDZCxhQUFhLENBT3pCO0lBQUQsb0JBQUM7Q0FQRCxBQU9DLENBUGtDLGtCQUFPLEdBT3pDO0FBUFksc0NBQWE7QUFVMUI7SUFBa0MsZ0NBQWE7SUFFM0Msc0JBQWEsS0FBWTtRQUF6QixZQUNJLGtCQUFNLEtBQUssRUFBRSxFQUFFLEVBQUMsSUFBSSxDQUFDLFNBRTNCO1FBRE0sS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7O0lBQzdELENBQUM7SUFMVyxZQUFZO1FBRHhCLGtCQUFNLENBQUMsa0JBQWtCLENBQUM7O09BQ2QsWUFBWSxDQU94QjtJQUFELG1CQUFDO0NBUEQsQUFPQyxDQVBpQyxhQUFhLEdBTzlDO0FBUFksb0NBQVkiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFQSSB9IGZyb20gJy4vYmFzZS5hcGknO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSAnLi9kZWNvcmF0b3InO1xuXG5ATWV0aG9kKCcvYXBpL3NlYXJjaF9yZWFkJylcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZWFkQVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCBtb2RlbDpzdHJpbmcsIGZpZWxkczpzdHJpbmdbXSwgZG9tYWluOnN0cmluZyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyYW1zID0geyBtb2RlbDogbW9kZWwsZmllbGRzOmZpZWxkcywgZG9tYWluOiBkb21haW59O1xuXHR9XG5cbn1cblxuQE1ldGhvZCgnL2FwaS9zZWFyY2hfcmVhZCcpXG5leHBvcnQgY2xhc3MgU2VhcmNoQWxsQVBJIGV4dGVuZHMgU2VhcmNoUmVhZEFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCBtb2RlbDpzdHJpbmcpe1xuICAgICAgICBzdXBlcihtb2RlbCwgW10sXCJbXVwiKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7IG1vZGVsOiBtb2RlbCxmaWVsZHM6W10sIGRvbWFpbjogXCJbXVwifTtcblx0fVxuXG59XG5cbiJdfQ==
