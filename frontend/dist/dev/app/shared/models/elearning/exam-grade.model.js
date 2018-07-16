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
var _ = require("underscore");
var ExamGrade = (function (_super) {
    __extends(ExamGrade, _super);
    function ExamGrade() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.min_score = undefined;
        _this.max_score = undefined;
        _this.exam_id = undefined;
        return _this;
    }
    ExamGrade_1 = ExamGrade;
    ExamGrade.gradeScore = function (grades, score) {
        return _.find(grades, function (obj) {
            return obj.min_score <= score && obj.max_score >= score;
        });
    };
    ExamGrade.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamGrade_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamGrade.listByExam = function (context, examId) {
        return ExamGrade_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    ExamGrade.listByExams = function (context, examIds) {
        var apiList = _.map(examIds, function (id) {
            return ExamGrade_1.__api__listByExam(id);
        });
        return base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [context].concat(apiList)).map(function (jsonArr) {
            jsonArr = _.flatten(jsonArr);
            return ExamGrade_1.toArray(jsonArr);
        });
    };
    var ExamGrade_1;
    ExamGrade = ExamGrade_1 = __decorate([
        decorator_1.Model('etraining.exam_grade'),
        __metadata("design:paramtypes", [])
    ], ExamGrade);
    return ExamGrade;
}(base_model_1.BaseModel));
exports.ExamGrade = ExamGrade;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUUxQywwQ0FBcUM7QUFHckMsc0VBQW1FO0FBQ25FLDhCQUFnQztBQUloQztJQUErQiw2QkFBUztJQUdwQztRQUFBLFlBQ0ksaUJBQU8sU0FNVjtRQUpHLEtBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUksU0FBUyxDQUFDOztJQUM5QixDQUFDO2tCQVZRLFNBQVM7SUFpQlgsb0JBQVUsR0FBakIsVUFBa0IsTUFBa0IsRUFBRSxLQUFZO1FBQzlDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLFNBQVMsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkJBQWlCLEdBQXhCLFVBQXlCLE1BQWM7UUFDbkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsV0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFHTSxvQkFBVSxHQUFqQixVQUFtQixPQUFrQixFQUFFLE1BQWM7UUFDakQsT0FBTyxXQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSxxQkFBVyxHQUFsQixVQUFvQixPQUFrQixFQUFFLE9BQWlCO1FBQ3JELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQUEsRUFBRTtZQUMzQixPQUFPLFdBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sc0JBQVMsQ0FBQyxXQUFXLE9BQXJCLHNCQUFTLEdBQWEsT0FBTyxTQUFLLE9BQU8sR0FBRSxHQUFHLENBQUMsVUFBQSxPQUFPO1lBQ3pELE9BQU8sR0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLE9BQU8sV0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBeENRLFNBQVM7UUFEckIsaUJBQUssQ0FBQyxzQkFBc0IsQ0FBQzs7T0FDakIsU0FBUyxDQTBDckI7SUFBRCxnQkFBQztDQTFDRCxBQTBDQyxDQTFDOEIsc0JBQVMsR0EwQ3ZDO0FBMUNZLDhCQUFTIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgU2VhcmNoUmVhZEFQSSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9zZWFyY2gtcmVhZC5hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuXG5ATW9kZWwoJ2V0cmFpbmluZy5leGFtX2dyYWRlJylcbmV4cG9ydCBjbGFzcyBFeGFtR3JhZGUgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWluX3Njb3JlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1heF9zY29yZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5leGFtX2lkID0gIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgbWluX3Njb3JlOiBudW1iZXI7XG4gICAgbWF4X3Njb3JlOiBudW1iZXI7XG4gICAgZXhhbV9pZDogbnVtYmVyO1xuXG4gICAgc3RhdGljIGdyYWRlU2NvcmUoZ3JhZGVzOkV4YW1HcmFkZVtdLCBzY29yZTpudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZChncmFkZXMsIChvYmopPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5taW5fc2NvcmUgPD0gc2NvcmUgJiYgb2JqLm1heF9zY29yZSA+PSBzY29yZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlFeGFtKGV4YW1JZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtR3JhZGUuTW9kZWwsIFtdLFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cbiAgICBcblxuICAgIHN0YXRpYyBsaXN0QnlFeGFtKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4YW1JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1HcmFkZS5zZWFyY2goY29udGV4dCxbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5RXhhbXMoIGNvbnRleHQ6QVBJQ29udGV4dCwgZXhhbUlkczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB2YXIgYXBpTGlzdCA9IF8ubWFwKGV4YW1JZHMsIGlkPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEV4YW1HcmFkZS5fX2FwaV9fbGlzdEJ5RXhhbShpZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQmFzZU1vZGVsLmJ1bGtfc2VhcmNoKGNvbnRleHQsIC4uLmFwaUxpc3QpLm1hcChqc29uQXJyPT4ge1xuICAgICAgICAgICAganNvbkFyciA9ICBfLmZsYXR0ZW4oanNvbkFycik7XG4gICAgICAgICAgICByZXR1cm4gRXhhbUdyYWRlLnRvQXJyYXkoanNvbkFycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
