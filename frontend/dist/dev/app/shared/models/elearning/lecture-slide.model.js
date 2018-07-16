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
var search_read_api_1 = require("../../services/api/search-read.api");
var SlideLecture = (function (_super) {
    __extends(SlideLecture, _super);
    function SlideLecture() {
        var _this = _super.call(this) || this;
        _this.filename = undefined;
        _this.slide_url = undefined;
        _this.unit_id = undefined;
        return _this;
    }
    SlideLecture_1 = SlideLecture;
    SlideLecture.__api__byCourseUnit = function (unitId) {
        return new search_read_api_1.SearchReadAPI(SlideLecture_1.Model, [], "[('unit_id','='," + unitId + ")]");
    };
    SlideLecture.byCourseUnit = function (context, unitId) {
        return SlideLecture_1.single(context, [], "[('unit_id','='," + unitId + ")]");
    };
    var SlideLecture_1;
    SlideLecture = SlideLecture_1 = __decorate([
        decorator_1.Model('etraining.slide_lecture'),
        __metadata("design:paramtypes", [])
    ], SlideLecture);
    return SlideLecture;
}(base_model_1.BaseModel));
exports.SlideLecture = SlideLecture;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLXNsaWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwQztBQUUxQywwQ0FBcUM7QUFFckMsc0VBQW1FO0FBR25FO0lBQWtDLGdDQUFTO0lBR3ZDO1FBQUEsWUFDSSxpQkFBTyxTQUtiO1FBSEEsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7O0lBQ2hDLENBQUM7cUJBVFcsWUFBWTtJQWVkLGdDQUFtQixHQUExQixVQUEyQixNQUFhO1FBQ3BDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGNBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU0seUJBQVksR0FBbkIsVUFBb0IsT0FBa0IsRUFBRSxNQUFjO1FBQ2xELE9BQU8sY0FBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRSxDQUFDOztJQXJCUSxZQUFZO1FBRHhCLGlCQUFLLENBQUMseUJBQXlCLENBQUM7O09BQ3BCLFlBQVksQ0F3QnhCO0lBQUQsbUJBQUM7Q0F4QkQsQUF3QkMsQ0F4QmlDLHNCQUFTLEdBd0IxQztBQXhCWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbGVjdHVyZS1zbGlkZS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuc2xpZGVfbGVjdHVyZScpXG5leHBvcnQgY2xhc3MgU2xpZGVMZWN0dXJlIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMuZmlsZW5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2xpZGVfdXJsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVuaXRfaWQgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIGZpbGVuYW1lOnN0cmluZztcbiAgICBzbGlkZV91cmw6c3RyaW5nO1xuICAgIHVuaXRfaWQ6IG51bWJlcjtcblxuICAgIHN0YXRpYyBfX2FwaV9fYnlDb3Vyc2VVbml0KHVuaXRJZDpudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFNsaWRlTGVjdHVyZS5Nb2RlbCwgW10sXCJbKCd1bml0X2lkJywnPScsXCIrdW5pdElkK1wiKV1cIik7XG4gICAgfVxuICAgIFxuICAgIHN0YXRpYyBieUNvdXJzZVVuaXQoY29udGV4dDpBUElDb250ZXh0LCB1bml0SWQ6IG51bWJlcik6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFNsaWRlTGVjdHVyZS5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ3VuaXRfaWQnLCc9JyxcIit1bml0SWQrXCIpXVwiKTtcbiAgICB9XG5cblxufVxuIl19
