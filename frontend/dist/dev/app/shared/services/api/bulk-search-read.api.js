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
var BulkSearchReadAPI = (function (_super) {
    __extends(BulkSearchReadAPI, _super);
    function BulkSearchReadAPI() {
        var _this = _super.call(this) || this;
        _this.params = { stacks: [] };
        return _this;
    }
    BulkSearchReadAPI.prototype.add = function (api) {
        var stacks = this.params["stacks"];
        stacks.push(api.params);
    };
    BulkSearchReadAPI = __decorate([
        decorator_1.Method('/api/bulk_search_read'),
        __metadata("design:paramtypes", [])
    ], BulkSearchReadAPI);
    return BulkSearchReadAPI;
}(base_api_1.BaseAPI));
exports.BulkSearchReadAPI = BulkSearchReadAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2J1bGstc2VhcmNoLXJlYWQuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFxQztBQUVyQyx5Q0FBcUM7QUFJckM7SUFBdUMscUNBQU87SUFFMUM7UUFBQSxZQUNJLGlCQUFPLFNBRWI7UUFETSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxDQUFDOztJQUNqQyxDQUFDO0lBRUQsK0JBQUcsR0FBSCxVQUFJLEdBQWtCO1FBQ3JCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVZXLGlCQUFpQjtRQUQ3QixrQkFBTSxDQUFDLHVCQUF1QixDQUFDOztPQUNuQixpQkFBaUIsQ0FZN0I7SUFBRCx3QkFBQztDQVpELEFBWUMsQ0Fac0Msa0JBQU8sR0FZN0M7QUFaWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvYnVsay1zZWFyY2gtcmVhZC5hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQVBJIH0gZnJvbSAnLi9iYXNlLmFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNZXRob2QgfSBmcm9tICcuL2RlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi9zZWFyY2gtcmVhZC5hcGknO1xuXG5ATWV0aG9kKCcvYXBpL2J1bGtfc2VhcmNoX3JlYWQnKVxuZXhwb3J0IGNsYXNzIEJ1bGtTZWFyY2hSZWFkQVBJIGV4dGVuZHMgQmFzZUFQSXtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge3N0YWNrczpbXX07XG5cdH1cblxuXHRhZGQoYXBpOiBTZWFyY2hSZWFkQVBJKSB7XG5cdFx0dmFyIHN0YWNrcyA9IHRoaXMucGFyYW1zW1wic3RhY2tzXCJdO1xuXHRcdHN0YWNrcy5wdXNoKGFwaS5wYXJhbXMpO1xuXHR9XG5cbn0iXX0=
