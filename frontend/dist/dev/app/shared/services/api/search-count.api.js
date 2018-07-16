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
var SearchCountAPI = (function (_super) {
    __extends(SearchCountAPI, _super);
    function SearchCountAPI(model, domain) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, domain: domain };
        return _this;
    }
    SearchCountAPI = __decorate([
        decorator_1.Method('/api/search_count'),
        __metadata("design:paramtypes", [String, String])
    ], SearchCountAPI);
    return SearchCountAPI;
}(base_api_1.BaseAPI));
exports.SearchCountAPI = SearchCountAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL3NlYXJjaC1jb3VudC5hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXFDO0FBRXJDLHlDQUFxQztBQUdyQztJQUFvQyxrQ0FBTztJQUV2Qyx3QkFBYSxLQUFZLEVBQUUsTUFBYTtRQUF4QyxZQUNJLGlCQUFPLFNBRWI7UUFETSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7O0lBQ3RELENBQUM7SUFMVyxjQUFjO1FBRDFCLGtCQUFNLENBQUMsbUJBQW1CLENBQUM7O09BQ2YsY0FBYyxDQU8xQjtJQUFELHFCQUFDO0NBUEQsQUFPQyxDQVBtQyxrQkFBTyxHQU8xQztBQVBZLHdDQUFjIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL3NlYXJjaC1jb3VudC5hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQVBJIH0gZnJvbSAnLi9iYXNlLmFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNZXRob2QgfSBmcm9tICcuL2RlY29yYXRvcic7XG5cbkBNZXRob2QoJy9hcGkvc2VhcmNoX2NvdW50JylcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb3VudEFQSSBleHRlbmRzIEJhc2VBUEl7XG5cbiAgICBjb25zdHJ1Y3RvciggbW9kZWw6c3RyaW5nLCBkb21haW46c3RyaW5nKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7IG1vZGVsOiBtb2RlbCwgZG9tYWluOiBkb21haW4gfTtcblx0fVxuXG59XG4iXX0=
