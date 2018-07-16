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
var QuestionSheet = (function (_super) {
    __extends(QuestionSheet, _super);
    function QuestionSheet() {
        var _this = _super.call(this) || this;
        _this.exam_id = undefined;
        _this.exercise_id = undefined;
        _this.seed = undefined;
        _this.finalized = undefined;
        _this.name = undefined;
        _this.status = undefined;
        _this.question_count = undefined;
        return _this;
    }
    QuestionSheet_1 = QuestionSheet;
    QuestionSheet.__api__byExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(QuestionSheet_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    QuestionSheet.prototype.clone = function () {
        var sheet = new QuestionSheet_1();
        sheet.name = this.name;
        sheet.exam_id = this.exam_id;
        sheet.exercise_id = this.exercise_id;
        sheet.finalized = this.finalized;
        sheet.seed = this.seed;
        return sheet;
    };
    QuestionSheet.__api__listTemplate = function () {
        return new search_read_api_1.SearchReadAPI(QuestionSheet_1.Model, [], "[('exam_id','=',False)]");
    };
    QuestionSheet.listTemplate = function (context) {
        return QuestionSheet_1.search(context, [], "[('exam_id','=',False)]");
    };
    var QuestionSheet_1;
    QuestionSheet = QuestionSheet_1 = __decorate([
        decorator_1.Model('etraining.question_sheet'),
        __metadata("design:paramtypes", [])
    ], QuestionSheet);
    return QuestionSheet;
}(base_model_1.BaseModel));
exports.QuestionSheet = QuestionSheet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFFMUMsMENBQW1EO0FBRW5ELHNFQUFtRTtBQUluRTtJQUFtQyxpQ0FBUztJQUd4QztRQUFBLFlBQ0ksaUJBQU8sU0FTYjtRQVBNLEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUksU0FBUyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxjQUFjLEdBQUksU0FBUyxDQUFDOztJQUN4QyxDQUFDO3NCQWJXLGFBQWE7SUF1QmYsMkJBQWEsR0FBcEIsVUFBcUIsTUFBYztRQUMvQixPQUFPLElBQUksK0JBQWEsQ0FBQyxlQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLGVBQWEsRUFBRSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLGlDQUFtQixHQUExQjtRQUNJLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGVBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVNLDBCQUFZLEdBQW5CLFVBQXFCLE9BQWtCO1FBQ25DLE9BQU8sZUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdEUsQ0FBQzs7SUEzQ1EsYUFBYTtRQUR6QixpQkFBSyxDQUFDLDBCQUEwQixDQUFDOztPQUNyQixhQUFhLENBNEN6QjtJQUFELG9CQUFDO0NBNUNELEFBNENDLENBNUNrQyxzQkFBUyxHQTRDM0M7QUE1Q1ksc0NBQWEiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCxGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnF1ZXN0aW9uX3NoZWV0JylcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNoZWV0IGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuICAgICAgICB0aGlzLmV4YW1faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXhlcmNpc2VfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5maW5hbGl6ZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uX2NvdW50ID0gIHVuZGVmaW5lZDtcblx0fVxuXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHF1ZXN0aW9uX2NvdW50OiBudW1iZXI7XG4gICAgZXhhbV9pZDogbnVtYmVyO1xuICAgIGV4ZXJjaXNlX2lkOiBudW1iZXI7XG4gICAgc2VlZDpudW1iZXI7XG4gICAgZmluYWxpemVkOmJvb2xlYW47XG4gICAgc3RhdHVzOiBzdHJpbmc7XG5cbiAgICBzdGF0aWMgX19hcGlfX2J5RXhhbShleGFtSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUXVlc3Rpb25TaGVldC5Nb2RlbCwgW10sXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKV1cIik7XG4gICAgfVxuICAgIFxuICAgIGNsb25lKCk6UXVlc3Rpb25TaGVldCB7XG4gICAgICAgIHZhciBzaGVldCA9IG5ldyBRdWVzdGlvblNoZWV0KCk7XG4gICAgICAgIHNoZWV0Lm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIHNoZWV0LmV4YW1faWQgPSB0aGlzLmV4YW1faWQ7XG4gICAgICAgIHNoZWV0LmV4ZXJjaXNlX2lkID0gdGhpcy5leGVyY2lzZV9pZDtcbiAgICAgICAgc2hlZXQuZmluYWxpemVkID0gdGhpcy5maW5hbGl6ZWQ7XG4gICAgICAgIHNoZWV0LnNlZWQgPSB0aGlzLnNlZWQ7XG4gICAgICAgIHJldHVybiBzaGVldDtcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIF9fYXBpX19saXN0VGVtcGxhdGUoKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShRdWVzdGlvblNoZWV0Lk1vZGVsLCBbXSxcIlsoJ2V4YW1faWQnLCc9JyxGYWxzZSldXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0VGVtcGxhdGUoIGNvbnRleHQ6QVBJQ29udGV4dCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBRdWVzdGlvblNoZWV0LnNlYXJjaChjb250ZXh0LFtdLFwiWygnZXhhbV9pZCcsJz0nLEZhbHNlKV1cIik7XG4gICAgfVxufVxuIl19
