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
var Submission = (function (_super) {
    __extends(Submission, _super);
    function Submission() {
        var _this = _super.call(this) || this;
        _this.picture = undefined;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.exam_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.score = undefined;
        _this.survey_id = undefined;
        return _this;
    }
    Submission_1 = Submission;
    Submission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    Submission.listByUser = function (context, userId) {
        return Submission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    Submission.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('exam_id','='," + examId + "),('exam_id','='," + examId + ")]");
    };
    Submission.listByExam = function (context, examId) {
        return Submission_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    Submission.__api__byMemberAndExam = function (memberId, examId) {
        return new search_read_api_1.SearchReadAPI(Submission_1.Model, [], "[('member_id','='," + memberId + "),('exam_id','='," + examId + "),('exam_id','='," + examId + ")]");
    };
    Submission.byMemberAndExam = function (context, memberId, examId) {
        return Submission_1.single(context, [], "[('member_id','='," + memberId + "),('exam_id','='," + examId + ")]");
    };
    var Submission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Submission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Submission.prototype, "start", void 0);
    Submission = Submission_1 = __decorate([
        decorator_1.Model('etraining.submission'),
        __metadata("design:paramtypes", [])
    ], Submission);
    return Submission;
}(base_model_1.BaseModel));
exports.Submission = Submission;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwQztBQUUxQywwQ0FBb0Q7QUFFcEQsc0VBQW1FO0FBR25FO0lBQWdDLDhCQUFTO0lBR3JDO1FBQUEsWUFDSSxpQkFBTyxTQVNWO1FBUkgsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDbkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBSSxTQUFTLENBQUM7O0lBQzdCLENBQUM7bUJBYlEsVUFBVTtJQTJCWiw0QkFBaUIsR0FBeEIsVUFBeUIsTUFBYztRQUNuQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLHFCQUFVLEdBQWpCLFVBQW1CLE9BQWtCLEVBQUUsTUFBYztRQUNqRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLDRCQUFpQixHQUF4QixVQUF5QixNQUFjO1FBQ25DLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxtQkFBbUIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVNLHFCQUFVLEdBQWpCLFVBQW1CLE9BQWtCLEVBQUUsTUFBYztRQUNqRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLGlDQUFzQixHQUE3QixVQUE4QixRQUFnQixFQUFFLE1BQWM7UUFDMUQsT0FBTyxJQUFJLCtCQUFhLENBQUMsWUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsUUFBUSxHQUFDLG1CQUFtQixHQUFDLE1BQU0sR0FBQyxtQkFBbUIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUksQ0FBQztJQUVNLDBCQUFlLEdBQXRCLFVBQXdCLE9BQWtCLEVBQUUsUUFBZ0IsRUFBRSxNQUFjO1FBQ3hFLE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFFBQVEsR0FBQyxtQkFBbUIsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkcsQ0FBQzs7SUE1QkQ7UUFEQyx5QkFBYSxFQUFRO2tDQUNqQixJQUFJOzJDQUFDO0lBRVY7UUFEQyx5QkFBYSxFQUFRO2tDQUNmLElBQUk7NkNBQUM7SUF2QkgsVUFBVTtRQUR0QixpQkFBSyxDQUFDLHNCQUFzQixDQUFDOztPQUNqQixVQUFVLENBbUR0QjtJQUFELGlCQUFDO0NBbkRELEFBbURDLENBbkQrQixzQkFBUyxHQW1EeEM7QUFuRFksZ0NBQVUiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCwgRmllbGRQcm9wZXJ0eSB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnN1Ym1pc3Npb24nKVxuZXhwb3J0IGNsYXNzIFN1Ym1pc3Npb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0dGhpcy5waWN0dXJlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVzZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVtYmVyX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmV4YW1faWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZW5kID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNjb3JlID0gdW5kZWZpbmVkO1xuXHQgICAgdGhpcy5zdXJ2ZXlfaWQgPSAgdW5kZWZpbmVkO1xuICAgIH1cbiAgICBcbiAgICBzdXJ2ZXlfaWQ6IG51bWJlcjtcbiAgICBleGFtX2lkOiBudW1iZXI7XG4gICAgdXNlcl9pZDogbnVtYmVyO1xuICAgIG1lbWJlcl9pZDogbnVtYmVyO1xuICAgIHBpY3R1cmU6IHN0cmluZztcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZW5kOiBEYXRlO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBzdGFydDogRGF0ZTtcbiAgICBzY29yZTogbnVtYmVyO1xuXG4gICAgXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdWJtaXNzaW9uLk1vZGVsLCBbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5VXNlciggY29udGV4dDpBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBTdWJtaXNzaW9uLnNlYXJjaChjb250ZXh0LFtdLFwiWygndXNlcl9pZCcsJz0nLFwiK3VzZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5RXhhbShleGFtSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoU3VibWlzc2lvbi5Nb2RlbCwgW10sXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKSwoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5RXhhbSggY29udGV4dDpBUElDb250ZXh0LCBleGFtSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBTdWJtaXNzaW9uLnNlYXJjaChjb250ZXh0LFtdLFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fYnlNZW1iZXJBbmRFeGFtKG1lbWJlcklkOiBudW1iZXIsIGV4YW1JZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShTdWJtaXNzaW9uLk1vZGVsLCBbXSxcIlsoJ21lbWJlcl9pZCcsJz0nLFwiK21lbWJlcklkK1wiKSwoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpLCgnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBieU1lbWJlckFuZEV4YW0oIGNvbnRleHQ6QVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlciwgZXhhbUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gU3VibWlzc2lvbi5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ21lbWJlcl9pZCcsJz0nLFwiK21lbWJlcklkK1wiKSwoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG5cbn1cbiJdfQ==
