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
var QuestionOption = (function (_super) {
    __extends(QuestionOption, _super);
    function QuestionOption() {
        var _this = _super.call(this) || this;
        _this.question_id = undefined;
        _this.content = undefined;
        _this.is_correct = undefined;
        return _this;
    }
    QuestionOption_1 = QuestionOption;
    QuestionOption.__api__listByQuestion = function (questionId) {
        return new search_read_api_1.SearchReadAPI(QuestionOption_1.Model, [], "[('question_id','='," + questionId + ")]");
    };
    QuestionOption.listByQuestion = function (context, questionId) {
        return QuestionOption_1.search(context, [], "[('question_id','='," + questionId + ")]");
    };
    var QuestionOption_1;
    QuestionOption = QuestionOption_1 = __decorate([
        decorator_1.Model('etraining.option'),
        __metadata("design:paramtypes", [])
    ], QuestionOption);
    return QuestionOption;
}(base_model_1.BaseModel));
exports.QuestionOption = QuestionOption;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9vcHRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTBDO0FBRTFDLDBDQUFxQztBQUVyQyxzRUFBbUU7QUFHbkU7SUFBb0Msa0NBQVM7SUFHekM7UUFBQSxZQUNJLGlCQUFPLFNBS2I7UUFIQSxLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzs7SUFDN0IsQ0FBQzt1QkFUVyxjQUFjO0lBZWhCLG9DQUFxQixHQUE1QixVQUE2QixVQUFrQjtRQUMzQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxnQkFBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsc0JBQXNCLEdBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSw2QkFBYyxHQUFyQixVQUFzQixPQUFrQixFQUFFLFVBQVU7UUFDaEQsT0FBTyxnQkFBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFFLHNCQUFzQixHQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDOztJQXJCUSxjQUFjO1FBRDFCLGlCQUFLLENBQUMsa0JBQWtCLENBQUM7O09BQ2IsY0FBYyxDQXVCMUI7SUFBRCxxQkFBQztDQXZCRCxBQXVCQyxDQXZCbUMsc0JBQVMsR0F1QjVDO0FBdkJZLHdDQUFjIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9vcHRpb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLm9wdGlvbicpXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25PcHRpb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5xdWVzdGlvbl9pZCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5pc19jb3JyZWN0ID0gdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBpc19jb3JyZWN0OmJvb2xlYW47XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIHF1ZXN0aW9uX2lkOiBudW1iZXI7XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeVF1ZXN0aW9uKHF1ZXN0aW9uSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUXVlc3Rpb25PcHRpb24uTW9kZWwsIFtdLFwiWygncXVlc3Rpb25faWQnLCc9JyxcIitxdWVzdGlvbklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVF1ZXN0aW9uKGNvbnRleHQ6QVBJQ29udGV4dCwgcXVlc3Rpb25JZCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uT3B0aW9uLnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ3F1ZXN0aW9uX2lkJywnPScsXCIrcXVlc3Rpb25JZCtcIildXCIpO1xuICAgIH1cblxufVxuIl19
