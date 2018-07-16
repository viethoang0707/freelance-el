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
var BulkSearchCountAPI = (function (_super) {
    __extends(BulkSearchCountAPI, _super);
    function BulkSearchCountAPI() {
        var _this = _super.call(this) || this;
        _this.params = { stacks: [] };
        return _this;
    }
    BulkSearchCountAPI.prototype.add = function (api) {
        var stacks = this.params["stacks"];
        stacks.push(api.params);
    };
    BulkSearchCountAPI = __decorate([
        decorator_1.Method('/api/bulk_search_count'),
        __metadata("design:paramtypes", [])
    ], BulkSearchCountAPI);
    return BulkSearchCountAPI;
}(base_api_1.BaseAPI));
exports.BulkSearchCountAPI = BulkSearchCountAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2J1bGstc2VhcmNoLWNvdW50LmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBcUM7QUFFckMseUNBQXFDO0FBSXJDO0lBQXdDLHNDQUFPO0lBRTNDO1FBQUEsWUFDSSxpQkFBTyxTQUViO1FBRE0sS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsQ0FBQzs7SUFDakMsQ0FBQztJQUVELGdDQUFHLEdBQUgsVUFBSSxHQUFtQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFWVyxrQkFBa0I7UUFEOUIsa0JBQU0sQ0FBQyx3QkFBd0IsQ0FBQzs7T0FDcEIsa0JBQWtCLENBWTlCO0lBQUQseUJBQUM7Q0FaRCxBQVlDLENBWnVDLGtCQUFPLEdBWTlDO0FBWlksZ0RBQWtCIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2J1bGstc2VhcmNoLWNvdW50LmFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VBUEkgfSBmcm9tICcuL2Jhc2UuYXBpJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1ldGhvZCB9IGZyb20gJy4vZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaENvdW50QVBJIH0gZnJvbSAnLi9zZWFyY2gtY291bnQuYXBpJztcblxuQE1ldGhvZCgnL2FwaS9idWxrX3NlYXJjaF9jb3VudCcpXG5leHBvcnQgY2xhc3MgQnVsa1NlYXJjaENvdW50QVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge3N0YWNrczpbXX07XG5cdH1cblxuXHRhZGQoYXBpOiBTZWFyY2hDb3VudEFQSSkge1xuXHRcdHZhciBzdGFja3MgPSB0aGlzLnBhcmFtc1tcInN0YWNrc1wiXTtcblx0XHRzdGFja3MucHVzaChhcGkucGFyYW1zKTtcblx0fVxuXG59Il19
