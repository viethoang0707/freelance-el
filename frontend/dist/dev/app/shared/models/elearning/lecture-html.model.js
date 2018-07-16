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
var HtmlLecture = (function (_super) {
    __extends(HtmlLecture, _super);
    function HtmlLecture() {
        var _this = _super.call(this) || this;
        _this.content = undefined;
        _this.unit_id = undefined;
        return _this;
    }
    HtmlLecture_1 = HtmlLecture;
    HtmlLecture.__api__byCourseUnit = function (unitId) {
        return new search_read_api_1.SearchReadAPI(HtmlLecture_1.Model, [], "[('unit_id','='," + unitId + ")]");
    };
    HtmlLecture.byCourseUnit = function (context, unitId) {
        return HtmlLecture_1.single(context, [], "[('unit_id','='," + unitId + ")]");
    };
    var HtmlLecture_1;
    HtmlLecture = HtmlLecture_1 = __decorate([
        decorator_1.Model('etraining.html_lecture'),
        __metadata("design:paramtypes", [])
    ], HtmlLecture);
    return HtmlLecture;
}(base_model_1.BaseModel));
exports.HtmlLecture = HtmlLecture;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLWh0bWwubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTBDO0FBRTFDLDBDQUFxQztBQUVyQyxzRUFBbUU7QUFHbkU7SUFBaUMsK0JBQVM7SUFHdEM7UUFBQSxZQUNJLGlCQUFPLFNBSWI7UUFGQSxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNuQixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7SUFDaEMsQ0FBQztvQkFSVyxXQUFXO0lBYWIsK0JBQW1CLEdBQTFCLFVBQTJCLE1BQWE7UUFDcEMsT0FBTyxJQUFJLCtCQUFhLENBQUMsYUFBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFTSx3QkFBWSxHQUFuQixVQUFvQixPQUFrQixFQUFFLE1BQWM7UUFDbEQsT0FBTyxhQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7O0lBbkJRLFdBQVc7UUFEdkIsaUJBQUssQ0FBQyx3QkFBd0IsQ0FBQzs7T0FDbkIsV0FBVyxDQXNCdkI7SUFBRCxrQkFBQztDQXRCRCxBQXNCQyxDQXRCZ0Msc0JBQVMsR0FzQnpDO0FBdEJZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLWh0bWwubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmh0bWxfbGVjdHVyZScpXG5leHBvcnQgY2xhc3MgSHRtbExlY3R1cmUgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVuaXRfaWQgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIGNvbnRlbnQ6c3RyaW5nO1xuICAgIHVuaXRfaWQ6IG51bWJlcjtcblxuICAgIHN0YXRpYyBfX2FwaV9fYnlDb3Vyc2VVbml0KHVuaXRJZDpudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEh0bWxMZWN0dXJlLk1vZGVsLCBbXSxcIlsoJ3VuaXRfaWQnLCc9JyxcIit1bml0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlDb3Vyc2VVbml0KGNvbnRleHQ6QVBJQ29udGV4dCwgdW5pdElkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBIdG1sTGVjdHVyZS5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ3VuaXRfaWQnLCc9JyxcIit1bml0SWQrXCIpXVwiKTtcbiAgICB9XG5cblxufVxuIl19
