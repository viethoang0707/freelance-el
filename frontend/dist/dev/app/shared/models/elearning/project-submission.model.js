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
var ProjectSubmission = (function (_super) {
    __extends(ProjectSubmission, _super);
    function ProjectSubmission() {
        var _this = _super.call(this) || this;
        _this.filename = undefined;
        _this.file_url = undefined;
        _this.user_id = undefined;
        _this.member_id = undefined;
        _this.class_id = undefined;
        _this.course_id = undefined;
        _this.project_id = undefined;
        _this.end = undefined;
        _this.start = undefined;
        _this.score = undefined;
        _this.date_submit = undefined;
        return _this;
    }
    ProjectSubmission_1 = ProjectSubmission;
    ProjectSubmission.__api__byMemberAndProject = function (member_id, projectId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('member_id','='," + member_id + "),('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.byMemberAndProject = function (context, member_id, projectId) {
        return ProjectSubmission_1.single(context, [], "[('member_id','='," + member_id + "),('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.__api__listByUser = function (userId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('user_id','='," + userId + ")]");
    };
    ProjectSubmission.listByUser = function (context, userId) {
        return ProjectSubmission_1.search(context, [], "[('user_id','='," + userId + ")]");
    };
    ProjectSubmission.__api__listByProject = function (projectId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.listByProject = function (context, projectId) {
        return ProjectSubmission_1.search(context, [], "[('project_id','='," + projectId + ")]");
    };
    ProjectSubmission.__api__listByMember = function (memberId) {
        return new search_read_api_1.SearchReadAPI(ProjectSubmission_1.Model, [], "[('member_id','='," + memberId + ")]");
    };
    ProjectSubmission.listByMember = function (context, memberId) {
        return ProjectSubmission_1.search(context, [], "[('member_id','='," + memberId + ")]");
    };
    var ProjectSubmission_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "date_submit", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "end", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], ProjectSubmission.prototype, "start", void 0);
    ProjectSubmission = ProjectSubmission_1 = __decorate([
        decorator_1.Model('etraining.project_submission'),
        __metadata("design:paramtypes", [])
    ], ProjectSubmission);
    return ProjectSubmission;
}(base_model_1.BaseModel));
exports.ProjectSubmission = ProjectSubmission;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0LXN1Ym1pc3Npb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFvRDtBQUVwRCxzRUFBbUU7QUFJbkU7SUFBdUMscUNBQVM7SUFHNUM7UUFBQSxZQUNJLGlCQUFPLFNBWWI7UUFYQSxLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNwQixLQUFJLENBQUMsUUFBUSxHQUFJLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsVUFBVSxHQUFJLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QixLQUFJLENBQUMsV0FBVyxHQUFJLFNBQVMsQ0FBQzs7SUFDckMsQ0FBQzswQkFoQlcsaUJBQWlCO0lBa0NuQiwyQ0FBeUIsR0FBaEMsVUFBaUMsU0FBaUIsRUFBRSxTQUFpQjtRQUNqRSxPQUFPLElBQUksK0JBQWEsQ0FBQyxtQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFNBQVMsR0FBQyxzQkFBc0IsR0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVNLG9DQUFrQixHQUF6QixVQUEyQixPQUFrQixFQUFFLFNBQWlCLEVBQUUsU0FBaUI7UUFDL0UsT0FBTyxtQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxvQkFBb0IsR0FBQyxTQUFTLEdBQUMsc0JBQXNCLEdBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JILENBQUM7SUFFTSxtQ0FBaUIsR0FBeEIsVUFBeUIsTUFBYztRQUNuQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxtQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU0sNEJBQVUsR0FBakIsVUFBbUIsT0FBa0IsRUFBRSxNQUFjO1FBQ2pELE9BQU8sbUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsa0JBQWtCLEdBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSxzQ0FBb0IsR0FBM0IsVUFBNEIsU0FBaUI7UUFDekMsT0FBTyxJQUFJLCtCQUFhLENBQUMsbUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxxQkFBcUIsR0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVNLCtCQUFhLEdBQXBCLFVBQXNCLE9BQWtCLEVBQUUsU0FBaUI7UUFDdkQsT0FBTyxtQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxxQkFBcUIsR0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLHFDQUFtQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxtQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU0sOEJBQVksR0FBbkIsVUFBcUIsT0FBa0IsRUFBRSxRQUFnQjtRQUNyRCxPQUFPLG1CQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLG9CQUFvQixHQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRixDQUFDOztJQXJDRDtRQURDLHlCQUFhLEVBQVE7a0NBQ1QsSUFBSTswREFBQztJQUVsQjtRQURDLHlCQUFhLEVBQVE7a0NBQ2pCLElBQUk7a0RBQUM7SUFFVjtRQURDLHlCQUFhLEVBQVE7a0NBQ2YsSUFBSTtvREFBQztJQS9CSCxpQkFBaUI7UUFEN0IsaUJBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7T0FDekIsaUJBQWlCLENBaUU3QjtJQUFELHdCQUFDO0NBakVELEFBaUVDLENBakVzQyxzQkFBUyxHQWlFL0M7QUFqRVksOENBQWlCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0LXN1Ym1pc3Npb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLCBGaWVsZFByb3BlcnR5IH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IEFQSUNvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnByb2plY3Rfc3VibWlzc2lvbicpXG5leHBvcnQgY2xhc3MgUHJvamVjdFN1Ym1pc3Npb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0dGhpcy5maWxlbmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5maWxlX3VybCA9ICB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5tZW1iZXJfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2xhc3NfaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291cnNlX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnByb2plY3RfaWQgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGFydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zY29yZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kYXRlX3N1Ym1pdCA9ICB1bmRlZmluZWQ7XG5cdH1cbiAgIFxuXG4gICAgZmlsZW5hbWU6IHN0cmluZztcbiAgICBmaWxlX3VybDogc3RyaW5nO1xuICAgIGNsYXNzX2lkOiBudW1iZXI7XG4gICAgY291cnNlX2lkOiBudW1iZXI7XG4gICAgdXNlcl9pZDogbnVtYmVyO1xuICAgIG1lbWJlcl9pZDogbnVtYmVyO1xuICAgIHByb2plY3RfaWQ6IG51bWJlcjtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZGF0ZV9zdWJtaXQ6IERhdGU7XG4gICAgQEZpZWxkUHJvcGVydHk8RGF0ZT4oKVxuICAgIGVuZDogRGF0ZTtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgc3RhcnQ6IERhdGU7XG4gICAgc2NvcmU6IG51bWJlcjtcblxuICAgIHN0YXRpYyBfX2FwaV9fYnlNZW1iZXJBbmRQcm9qZWN0KG1lbWJlcl9pZDogbnVtYmVyLCBwcm9qZWN0SWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUHJvamVjdFN1Ym1pc3Npb24uTW9kZWwsIFtdLFwiWygnbWVtYmVyX2lkJywnPScsXCIrbWVtYmVyX2lkK1wiKSwoJ3Byb2plY3RfaWQnLCc9JyxcIitwcm9qZWN0SWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnlNZW1iZXJBbmRQcm9qZWN0KCBjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcl9pZDogbnVtYmVyLCBwcm9qZWN0SWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9qZWN0U3VibWlzc2lvbi5zaW5nbGUoY29udGV4dCxbXSxcIlsoJ21lbWJlcl9pZCcsJz0nLFwiK21lbWJlcl9pZCtcIiksKCdwcm9qZWN0X2lkJywnPScsXCIrcHJvamVjdElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlVc2VyKHVzZXJJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShQcm9qZWN0U3VibWlzc2lvbi5Nb2RlbCwgW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVVzZXIoIGNvbnRleHQ6QVBJQ29udGV4dCwgdXNlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvamVjdFN1Ym1pc3Npb24uc2VhcmNoKGNvbnRleHQsW10sXCJbKCd1c2VyX2lkJywnPScsXCIrdXNlcklkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlQcm9qZWN0KHByb2plY3RJZDogbnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShQcm9qZWN0U3VibWlzc2lvbi5Nb2RlbCwgW10sXCJbKCdwcm9qZWN0X2lkJywnPScsXCIrcHJvamVjdElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpc3RCeVByb2plY3QoIGNvbnRleHQ6QVBJQ29udGV4dCwgcHJvamVjdElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvamVjdFN1Ym1pc3Npb24uc2VhcmNoKGNvbnRleHQsW10sXCJbKCdwcm9qZWN0X2lkJywnPScsXCIrcHJvamVjdElkK1wiKV1cIik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlNZW1iZXIobWVtYmVySWQ6IG51bWJlcik6IFNlYXJjaFJlYWRBUEkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaFJlYWRBUEkoUHJvamVjdFN1Ym1pc3Npb24uTW9kZWwsIFtdLFwiWygnbWVtYmVyX2lkJywnPScsXCIrbWVtYmVySWQrXCIpXVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGlzdEJ5TWVtYmVyKCBjb250ZXh0OkFQSUNvbnRleHQsIG1lbWJlcklkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gUHJvamVjdFN1Ym1pc3Npb24uc2VhcmNoKGNvbnRleHQsW10sXCJbKCdtZW1iZXJfaWQnLCc9JyxcIittZW1iZXJJZCtcIildXCIpO1xuICAgIH1cbn1cbiJdfQ==
