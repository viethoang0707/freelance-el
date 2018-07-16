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
var ExecuteAPI = (function (_super) {
    __extends(ExecuteAPI, _super);
    function ExecuteAPI(model, method, paramList, paramdDict) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, method: method, paramList: paramList, paramdDict: paramdDict };
        return _this;
    }
    ExecuteAPI = __decorate([
        decorator_1.Method('/api/execute'),
        __metadata("design:paramtypes", [String, String, Object, Object])
    ], ExecuteAPI);
    return ExecuteAPI;
}(base_api_1.BaseAPI));
exports.ExecuteAPI = ExecuteAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2V4ZWN1dGUuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFxQztBQUVyQyx5Q0FBcUM7QUFHckM7SUFBZ0MsOEJBQU87SUFFbkMsb0JBQWEsS0FBWSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUUsVUFBZTtRQUExRSxZQUNJLGlCQUFPLFNBRWI7UUFETSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDOztJQUNsRyxDQUFDO0lBTFcsVUFBVTtRQUR0QixrQkFBTSxDQUFDLGNBQWMsQ0FBQzs7T0FDVixVQUFVLENBT3RCO0lBQUQsaUJBQUM7Q0FQRCxBQU9DLENBUCtCLGtCQUFPLEdBT3RDO0FBUFksZ0NBQVUiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvZXhlY3V0ZS5hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQVBJIH0gZnJvbSAnLi9iYXNlLmFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNZXRob2QgfSBmcm9tICcuL2RlY29yYXRvcic7XG5cbkBNZXRob2QoJy9hcGkvZXhlY3V0ZScpXG5leHBvcnQgY2xhc3MgRXhlY3V0ZUFQSSBleHRlbmRzIEJhc2VBUEl7XG5cbiAgICBjb25zdHJ1Y3RvciggbW9kZWw6c3RyaW5nLCBtZXRob2QgOnN0cmluZywgcGFyYW1MaXN0OiBhbnksIHBhcmFtZERpY3Q6IGFueSApe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHttb2RlbDogbW9kZWwsIG1ldGhvZDogbWV0aG9kLCBwYXJhbUxpc3Q6IHBhcmFtTGlzdCwgcGFyYW1kRGljdDogcGFyYW1kRGljdH07XG5cdH1cblxufVxuIl19
