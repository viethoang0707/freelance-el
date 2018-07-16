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
var SurveySheet = (function (_super) {
    __extends(SurveySheet, _super);
    function SurveySheet() {
        var _this = _super.call(this) || this;
        _this.survey_id = undefined;
        _this.name = undefined;
        _this.seed = undefined;
        _this.finalized = undefined;
        _this.status = undefined;
        _this.question_count = undefined;
        return _this;
    }
    SurveySheet_1 = SurveySheet;
    SurveySheet.prototype.clone = function () {
        var sheet = new SurveySheet_1();
        sheet.name = this.name;
        sheet.seed = this.seed;
        sheet.finalized = this.finalized;
        return sheet;
    };
    SurveySheet.__api__listTemplate = function () {
        return new search_read_api_1.SearchReadAPI(SurveySheet_1.Model, [], "[('survey_id','=',False)]");
    };
    SurveySheet.listTemplate = function (context) {
        return SurveySheet_1.search(context, [], "[('survey_id','=',False)]");
    };
    var SurveySheet_1;
    SurveySheet = SurveySheet_1 = __decorate([
        decorator_1.Model('etraining.survey_sheet'),
        __metadata("design:paramtypes", [])
    ], SurveySheet);
    return SurveySheet;
}(base_model_1.BaseModel));
exports.SurveySheet = SurveySheet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktc2hlZXQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFtRDtBQUVuRCxzRUFBbUU7QUFHbkU7SUFBaUMsK0JBQVM7SUFHdEM7UUFBQSxZQUNJLGlCQUFPLFNBUWI7UUFOTSxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsTUFBTSxHQUFJLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsY0FBYyxHQUFJLFNBQVMsQ0FBQzs7SUFDeEMsQ0FBQztvQkFaVyxXQUFXO0lBcUJwQiwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFXLEVBQUUsQ0FBQztRQUM5QixLQUFLLENBQUMsSUFBSSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR00sK0JBQW1CLEdBQTFCO1FBQ0ksT0FBTyxJQUFJLCtCQUFhLENBQUMsYUFBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sd0JBQVksR0FBbkIsVUFBcUIsT0FBa0I7UUFDbkMsT0FBTyxhQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN0RSxDQUFDOztJQXBDUSxXQUFXO1FBRHZCLGlCQUFLLENBQUMsd0JBQXdCLENBQUM7O09BQ25CLFdBQVcsQ0FxQ3ZCO0lBQUQsa0JBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ2dDLHNCQUFTLEdBcUN6QztBQXJDWSxrQ0FBVyIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LXNoZWV0Lm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCxGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuc3VydmV5X3NoZWV0JylcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlTaGVldCBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcbiAgICAgICAgdGhpcy5zdXJ2ZXlfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWVkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZpbmFsaXplZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uX2NvdW50ID0gIHVuZGVmaW5lZDtcblx0fVxuXG4gICAgcXVlc3Rpb25fY291bnQ6IG51bWJlcjtcbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc2VlZDpudW1iZXI7XG4gICAgZmluYWxpemVkOmJvb2xlYW47XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHZhciBzaGVldCA9IG5ldyBTdXJ2ZXlTaGVldCgpO1xuICAgICAgICBzaGVldC5uYW1lID0gIHRoaXMubmFtZTtcbiAgICAgICAgc2hlZXQuc2VlZCA9ICB0aGlzLnNlZWQ7XG4gICAgICAgIHNoZWV0LmZpbmFsaXplZCA9ICB0aGlzLmZpbmFsaXplZDtcbiAgICAgICAgcmV0dXJuIHNoZWV0O1xuICAgIH1cblxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0VGVtcGxhdGUoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdXJ2ZXlTaGVldC5Nb2RlbCwgW10sXCJbKCdzdXJ2ZXlfaWQnLCc9JyxGYWxzZSldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0VGVtcGxhdGUoIGNvbnRleHQ6QVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBTdXJ2ZXlTaGVldC5zZWFyY2goY29udGV4dCxbXSxcIlsoJ3N1cnZleV9pZCcsJz0nLEZhbHNlKV1cIik7XG4gICAgfVxufVxuIl19
