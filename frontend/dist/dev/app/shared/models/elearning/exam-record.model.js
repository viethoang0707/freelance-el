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
var ExamRecord = (function (_super) {
    __extends(ExamRecord, _super);
    function ExamRecord() {
        var _this = _super.call(this) || this;
        _this.score = undefined;
        _this.grade = undefined;
        _this.member_id = undefined;
        _this.user_id = undefined;
        _this.submission_id = undefined;
        _this.class_id = undefined;
        _this.exam_id = undefined;
        _this.course_member_id = undefined;
        return _this;
    }
    ExamRecord_1 = ExamRecord;
    ExamRecord.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ExamRecord_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ExamRecord.listByUser = function (context, userId) {
        return ExamRecord_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ExamRecord.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ExamRecord_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    ExamRecord.listByCourseMember = function (context, memberId) {
        return ExamRecord_1.search(context, [], "[('course_member_id','='," + memberId + ")]");
    };
    ExamRecord.__api__listByCourseMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ExamRecord_1.Model, [], "[('course_member_id','='," + memberId + ")]");
    };
    ExamRecord.listByMember = function (context, memberId) {
        return ExamRecord_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    ExamRecord.__api__listByExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamRecord_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamRecord.listByExam = function (context, examId) {
        return ExamRecord_1.search(context, [], "[('exam_id','='," + examId + ")]");
    };
    var ExamRecord_1;
    ExamRecord = ExamRecord_1 = __decorate([
        decorator_1.Model('etraining.exam_record'),
        __metadata("design:paramtypes", [])
    ], ExamRecord);
    return ExamRecord;
}(base_model_1.BaseModel));
exports.ExamRecord = ExamRecord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXJlY29yZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFFMUMsMENBQXFDO0FBR3JDLHNFQUFtRTtBQUduRTtJQUFnQyw4QkFBUztJQUdyQztRQUFBLFlBQ0ksaUJBQU8sU0FVYjtRQVJBLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUksU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxhQUFhLEdBQUksU0FBUyxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxRQUFRLEdBQUksU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUksU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7O0lBQ3pDLENBQUM7bUJBZFcsVUFBVTtJQXlCWiw0QkFBaUIsR0FBeEIsVUFBeUIsTUFBYztRQUNuQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLHFCQUFVLEdBQWpCLFVBQWtCLE9BQW1CLEVBQUUsTUFBYztRQUNqRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLDhCQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxZQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLDZCQUFrQixHQUF6QixVQUEwQixPQUFtQixFQUFFLFFBQWdCO1FBQzNELE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLDJCQUEyQixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU0sb0NBQXlCLEdBQWhDLFVBQWlDLFFBQWdCO1FBQzdDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLDJCQUEyQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU0sdUJBQVksR0FBbkIsVUFBb0IsT0FBbUIsRUFBRSxRQUFnQjtRQUNyRCxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxvQkFBb0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLDRCQUFpQixHQUF4QixVQUF5QixNQUFjO1FBQ25DLE9BQU8sSUFBSSwrQkFBYSxDQUFDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0scUJBQVUsR0FBakIsVUFBa0IsT0FBbUIsRUFBRSxNQUFjO1FBQ2pELE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDOztJQXZEUSxVQUFVO1FBRHRCLGlCQUFLLENBQUMsdUJBQXVCLENBQUM7O09BQ2xCLFVBQVUsQ0F5RHRCO0lBQUQsaUJBQUM7Q0F6REQsQUF5REMsQ0F6RCtCLHNCQUFTLEdBeUR4QztBQXpEWSxnQ0FBVSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1yZWNvcmQubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLmV4YW1fcmVjb3JkJylcbmV4cG9ydCBjbGFzcyBFeGFtUmVjb3JkIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMuc2NvcmUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5ncmFkZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm1lbWJlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51c2VyX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdWJtaXNzaW9uX2lkID0gIHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jbGFzc19pZCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXhhbV9pZCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX21lbWJlcl9pZCA9IHVuZGVmaW5lZDtcblx0fVxuXG4gICAgc2NvcmU6IG51bWJlcjtcbiAgICBncmFkZTogc3RyaW5nO1xuICAgIG1lbWJlcl9pZDogbnVtYmVyO1xuICAgIGNvdXJzZV9tZW1iZXJfaWQ6IG51bWJlcjtcbiAgICB1c2VyX2lkOiBudW1iZXI7XG4gICAgZXhhbV9pZDogbnVtYmVyO1xuICAgIGNsYXNzX2lkOiBudW1iZXI7XG4gICAgc3VibWlzc2lvbl9pZDogbnVtYmVyO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtUmVjb3JkLk1vZGVsLCBbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5VXNlcihjb250ZXh0OiBBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1SZWNvcmQuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ3VzZXJfaWQnLCc9JyxcIiArIHVzZXJJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbVJlY29yZC5Nb2RlbCwgW10sXCJbKCdtZW1iZXJfaWQnLCc9JyxcIittZW1iZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlDb3Vyc2VNZW1iZXIoY29udGV4dDogQVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1SZWNvcmQuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ2NvdXJzZV9tZW1iZXJfaWQnLCc9JyxcIiArIG1lbWJlcklkICsgXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX19hcGlfX2xpc3RCeUNvdXJzZU1lbWJlcihtZW1iZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShFeGFtUmVjb3JkLk1vZGVsLCBbXSxcIlsoJ2NvdXJzZV9tZW1iZXJfaWQnLCc9JyxcIittZW1iZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlNZW1iZXIoY29udGV4dDogQVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1SZWNvcmQuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ21lbWJlcl9pZCcsJz0nLFwiICsgbWVtYmVySWQgKyBcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfX2FwaV9fbGlzdEJ5RXhhbShleGFtSWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoRXhhbVJlY29yZC5Nb2RlbCwgW10sXCJbKCdleGFtX2lkJywnPScsXCIrZXhhbUlkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeUV4YW0oY29udGV4dDogQVBJQ29udGV4dCwgZXhhbUlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgICAgIHJldHVybiBFeGFtUmVjb3JkLnNlYXJjaChjb250ZXh0LCBbXSwgXCJbKCdleGFtX2lkJywnPScsXCIgKyBleGFtSWQgKyBcIildXCIpO1xuICAgIH1cblxufVxuIl19
