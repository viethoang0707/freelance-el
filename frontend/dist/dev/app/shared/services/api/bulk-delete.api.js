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
var BulkDeleteAPI = (function (_super) {
    __extends(BulkDeleteAPI, _super);
    function BulkDeleteAPI() {
        var _this = _super.call(this) || this;
        _this.params = { stacks: [] };
        return _this;
    }
    BulkDeleteAPI.prototype.add = function (api) {
        var stacks = this.params["stacks"];
        stacks.push(api.params);
    };
    BulkDeleteAPI = __decorate([
        decorator_1.Method('/api/bulk_delete'),
        __metadata("design:paramtypes", [])
    ], BulkDeleteAPI);
    return BulkDeleteAPI;
}(base_api_1.BaseAPI));
exports.BulkDeleteAPI = BulkDeleteAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2J1bGstZGVsZXRlLmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBcUM7QUFFckMseUNBQXFDO0FBSXJDO0lBQW1DLGlDQUFPO0lBRXRDO1FBQUEsWUFDSSxpQkFBTyxTQUViO1FBRE0sS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsQ0FBQzs7SUFDakMsQ0FBQztJQUVELDJCQUFHLEdBQUgsVUFBSSxHQUFjO1FBQ2pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVZXLGFBQWE7UUFEekIsa0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7T0FDZCxhQUFhLENBWXpCO0lBQUQsb0JBQUM7Q0FaRCxBQVlDLENBWmtDLGtCQUFPLEdBWXpDO0FBWlksc0NBQWEiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvYnVsay1kZWxldGUuYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFQSSB9IGZyb20gJy4vYmFzZS5hcGknO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSAnLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgRGVsZXRlQVBJIH0gZnJvbSAnLi9kZWxldGUuYXBpJztcblxuQE1ldGhvZCgnL2FwaS9idWxrX2RlbGV0ZScpXG5leHBvcnQgY2xhc3MgQnVsa0RlbGV0ZUFQSSBleHRlbmRzIEJhc2VBUEl7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHtzdGFja3M6W119O1xuXHR9XG5cblx0YWRkKGFwaTogRGVsZXRlQVBJKSB7XG5cdFx0dmFyIHN0YWNrcyA9IHRoaXMucGFyYW1zW1wic3RhY2tzXCJdO1xuXHRcdHN0YWNrcy5wdXNoKGFwaS5wYXJhbXMpO1xuXHR9XG5cbn0iXX0=
