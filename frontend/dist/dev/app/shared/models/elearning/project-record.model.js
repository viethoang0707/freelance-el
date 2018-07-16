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
var ProjectRecord = (function (_super) {
    __extends(ProjectRecord, _super);
    function ProjectRecord() {
        var _this = _super.call(this) || this;
        _this.score = undefined;
        _this.member_id = undefined;
        _this.user_id = undefined;
        _this.project_id = undefined;
        _this.class_id = undefined;
        _this.course_id = undefined;
        return _this;
    }
    ProjectRecord_1 = ProjectRecord;
    ProjectRecord.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ProjectRecord_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ProjectRecord.listByUser = function (context, userId) {
        return ProjectRecord_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ProjectRecord.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ProjectRecord_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    ProjectRecord.listByMember = function (context, memberId) {
        return ProjectRecord_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var ProjectRecord_1;
    ProjectRecord = ProjectRecord_1 = __decorate([
        decorator_1.Model('etraining.project_record'),
        __metadata("design:paramtypes", [])
    ], ProjectRecord);
    return ProjectRecord;
}(base_model_1.BaseModel));
exports.ProjectRecord = ProjectRecord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0LXJlY29yZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMEM7QUFFMUMsMENBQXFDO0FBR3JDLHNFQUFtRTtBQUduRTtJQUFtQyxpQ0FBUztJQUd4QztRQUFBLFlBQ0ksaUJBQU8sU0FRYjtRQU5BLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUksU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxVQUFVLEdBQUksU0FBUyxDQUFDO1FBQzdCLEtBQUksQ0FBQyxRQUFRLEdBQUksU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxTQUFTLEdBQUksU0FBUyxDQUFDOztJQUNuQyxDQUFDO3NCQVpXLGFBQWE7SUFxQmYsK0JBQWlCLEdBQXhCLFVBQXlCLE1BQWM7UUFDbkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsZUFBYSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTSx3QkFBVSxHQUFqQixVQUFrQixPQUFtQixFQUFFLE1BQWM7UUFDakQsT0FBTyxlQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsa0JBQWtCLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTSxpQ0FBbUIsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDdkMsT0FBTyxJQUFJLCtCQUFhLENBQUMsZUFBYSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsb0JBQW9CLEdBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTSwwQkFBWSxHQUFuQixVQUFvQixPQUFtQixFQUFFLFFBQWdCO1FBQ3JELE9BQU8sZUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDOztJQW5DUSxhQUFhO1FBRHpCLGlCQUFLLENBQUMsMEJBQTBCLENBQUM7O09BQ3JCLGFBQWEsQ0FxQ3pCO0lBQUQsb0JBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ2tDLHNCQUFTLEdBcUMzQztBQXJDWSxzQ0FBYSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcHJvamVjdC1yZWNvcmQubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnByb2plY3RfcmVjb3JkJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVjb3JkIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgLy8gRGVmYXVsdCBjb25zdHJ1Y3RvciB3aWxsIGJlIGNhbGxlZCBieSBtYXBwZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuXHRcdFxuXHRcdHRoaXMuc2NvcmUgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5tZW1iZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJvamVjdF9pZCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2xhc3NfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvdXJzZV9pZCA9ICB1bmRlZmluZWQ7XG5cdH1cblxuICAgIHNjb3JlOiBudW1iZXI7XG4gICAgbWVtYmVyX2lkOiBudW1iZXI7XG4gICAgdXNlcl9pZDogbnVtYmVyO1xuICAgIGNvdXJzZV9pZDogbnVtYmVyO1xuICAgIGNsYXNzX2lkOiBudW1iZXI7XG4gICAgcHJvamVjdF9pZDogbnVtYmVyO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShQcm9qZWN0UmVjb3JkLk1vZGVsLCBbXSxcIlsoJ3VzZXJfaWQnLCc9JyxcIit1c2VySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5VXNlcihjb250ZXh0OiBBUElDb250ZXh0LCB1c2VySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFByb2plY3RSZWNvcmQuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ3VzZXJfaWQnLCc9JyxcIiArIHVzZXJJZCArIFwiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUHJvamVjdFJlY29yZC5Nb2RlbCwgW10sXCJbKCdtZW1iZXJfaWQnLCc9JyxcIittZW1iZXJJZCtcIildXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaXN0QnlNZW1iZXIoY29udGV4dDogQVBJQ29udGV4dCwgbWVtYmVySWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICAgICAgcmV0dXJuIFByb2plY3RSZWNvcmQuc2VhcmNoKGNvbnRleHQsIFtdLCBcIlsoJ21lbWJlcl9pZCcsJz0nLFwiICsgbWVtYmVySWQgKyBcIildXCIpO1xuICAgIH1cblxufVxuIl19
