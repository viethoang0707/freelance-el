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
var Answer = (function (_super) {
    __extends(Answer, _super);
    function Answer() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.option_id = undefined;
        _this.is_correct = undefined;
        _this.submission_id = undefined;
        _this.question_type = undefined;
        _this.question_level = undefined;
        _this.text = undefined;
        _this.score = undefined;
        _this.exam_id = undefined;
        _this.json = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    Answer_1 = Answer;
    Answer.__api__listBySubmit = function (submitId) {
        return new search_read_api_1.SearchReadAPI(Answer_1.Model, [], "[('submission_id','='," + submitId + ")]");
    };
    Answer.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(Answer_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    Answer.listBySubmit = function (context, submitId) {
        return Answer_1.search(context, [], "[('submission_id','='," + submitId + ")]");
    };
    Answer.listByExam = function (context, examId) {
        return Answer_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    var Answer_1;
    Answer = Answer_1 = __decorate([
        decorator_1.Model('etraining.answer'),
        __metadata("design:paramtypes", [])
    ], Answer);
    return Answer;
}(base_model_1.BaseModel));
exports.Answer = Answer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFtRDtBQUVuRCxzRUFBbUU7QUFHbkU7SUFBNEIsMEJBQVM7SUFHakM7UUFBQSxZQUNJLGlCQUFPLFNBYWI7UUFYTSxLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsT0FBTyxHQUFJLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsU0FBUyxHQUFJLFNBQVMsQ0FBQzs7SUFDbkMsQ0FBQztlQWpCVyxNQUFNO0lBOEJSLDBCQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxRQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyx3QkFBd0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLHdCQUFpQixHQUF4QixVQUF5QixNQUFjO1FBQ25DLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFFBQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sbUJBQVksR0FBbkIsVUFBcUIsT0FBa0IsRUFBRSxRQUFnQjtRQUNyRCxPQUFPLFFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyx3QkFBd0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVNLGlCQUFVLEdBQWpCLFVBQW1CLE9BQWtCLEVBQUUsTUFBYztRQUNqRCxPQUFPLFFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7SUE1Q1EsTUFBTTtRQURsQixpQkFBSyxDQUFDLGtCQUFrQixDQUFDOztPQUNiLE1BQU0sQ0E4Q2xCO0lBQUQsYUFBQztDQTlDRCxBQThDQyxDQTlDMkIsc0JBQVMsR0E4Q3BDO0FBOUNZLHdCQUFNIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuXG5ATW9kZWwoJ2V0cmFpbmluZy5hbnN3ZXInKVxuZXhwb3J0IGNsYXNzIEFuc3dlciBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcbiAgICAgICAgdGhpcy5xdWVzdGlvbl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaXNfY29ycmVjdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdWJtaXNzaW9uX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uX3R5cGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb25fbGV2ZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5leGFtX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5qc29uID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN1cnZleV9pZCA9ICB1bmRlZmluZWQ7XG5cdH1cbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICBleGFtX2lkOiBudW1iZXI7XG4gICAgcXVlc3Rpb25faWQ6IG51bWJlcjtcbiAgICBvcHRpb25faWQ6IG51bWJlcjtcbiAgICBzY29yZTogbnVtYmVyO1xuICAgIGlzX2NvcnJlY3Q6IGJvb2xlYW47XG4gICAgc3VibWlzc2lvbl9pZDogbnVtYmVyO1xuICAgIHRleHQ6c3RyaW5nO1xuICAgIGpzb246c3RyaW5nO1xuICAgIHF1ZXN0aW9uX2xldmVsOiBzdHJpbmc7XG4gICAgcXVlc3Rpb25fdHlwZTogc3RyaW5nO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlTdWJtaXQoc3VibWl0SWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQW5zd2VyLk1vZGVsLCBbXSxcIlsoJ3N1Ym1pc3Npb25faWQnLCc9JyxcIitzdWJtaXRJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5RXhhbShleGFtSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoQW5zd2VyLk1vZGVsLCBbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5U3VibWl0KCBjb250ZXh0OkFQSUNvbnRleHQsIHN1Ym1pdElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBBbnN3ZXIuc2VhcmNoKGNvbnRleHQsW10sXCJbKCdzdWJtaXNzaW9uX2lkJywnPScsXCIrc3VibWl0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5RXhhbSggY29udGV4dDpBUElDb250ZXh0LCBleGFtSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEFuc3dlci5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
