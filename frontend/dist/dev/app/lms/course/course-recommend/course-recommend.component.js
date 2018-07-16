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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var base_model_1 = require("../../../shared/models/base.model");
var CourseRecommendComponent = (function (_super) {
    __extends(CourseRecommendComponent, _super);
    function CourseRecommendComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.courses = [];
        return _this;
    }
    CourseRecommendComponent.prototype.ngOnInit = function () {
        this.courses = [];
        this.searchRecommendCourse();
    };
    CourseRecommendComponent.prototype.searchRecommendCourse = function () {
        var _this = this;
        this.courses = [];
        var domain = "('status','=','published')";
        achievement_model_1.Achivement.listByUser(this, this.ContextUser.id).subscribe(function (skills) {
            var apiList = _.map(skills, function (skill) {
                return course_model_1.Course.__api__listByCompetency(skill.competency_id);
            });
            base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [_this].concat(apiList)).map(function (jsonArr) {
                return _.flatten(jsonArr);
            })
                .subscribe(function (jsonArr) {
                _this.courses = course_model_1.Course.toArray(jsonArr);
            });
        });
    };
    CourseRecommendComponent.prototype.sendEnrollmentRequest = function (course) {
    };
    CourseRecommendComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-recommend',
            templateUrl: 'course-recommend.component.html',
            styleUrls: ['course-recommend.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseRecommendComponent);
    return CourseRecommendComponent;
}(base_component_1.BaseComponent));
exports.CourseRecommendComponent = CourseRecommendComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1yZWNvbW1lbmQvY291cnNlLXJlY29tbWVuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxpRkFBK0U7QUFHL0UsOEJBQWdDO0FBQ2hDLDhEQUE4RjtBQUM5Riw4RUFBdUU7QUFJdkUsd0ZBQWdGO0FBSWhGLGdFQUE4RDtBQVU5RDtJQUE4Qyw0Q0FBYTtJQVF2RCxrQ0FBb0IsTUFBYztRQUFsQyxZQUNJLGlCQUFPLFNBRVY7UUFIbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQU5sQyxpQkFBVyxHQUFJLHVCQUFXLENBQUM7UUFDM0Isb0JBQWMsR0FBRywwQkFBYyxDQUFDO1FBTzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztJQUN0QixDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3REFBcUIsR0FBckI7UUFBQSxpQkFlQztRQWRHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLDRCQUE0QixDQUFDO1FBQzFDLDhCQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDN0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFnQjtnQkFDekMsT0FBTyxxQkFBTSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztZQUNILHNCQUFTLENBQUMsV0FBVyxPQUFyQixzQkFBUyxHQUFhLEtBQUksU0FBSyxPQUFPLEdBQ3JDLEdBQUcsQ0FBQyxVQUFBLE9BQU87Z0JBQ1IsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQztpQkFDRCxTQUFTLENBQUMsVUFBQSxPQUFPO2dCQUNkLEtBQUksQ0FBQyxPQUFPLEdBQUcscUJBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3REFBcUIsR0FBckIsVUFBc0IsTUFBYTtJQUVuQyxDQUFDO0lBckNRLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQVU4QixlQUFNO09BUnpCLHdCQUF3QixDQXVDcEM7SUFBRCwrQkFBQztDQXZDRCxBQXVDQyxDQXZDNkMsOEJBQWEsR0F1QzFEO0FBdkNZLDREQUF3QiIsImZpbGUiOiJhcHAvbG1zL2NvdXJzZS9jb3Vyc2UtcmVjb21tZW5kL2NvdXJzZS1yZWNvbW1lbmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIENPTlRFTlRfU1RBVFVTLCBDT1VSU0VfTU9ERSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VTeWxsYWJ1cyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1zeWxsYWJ1cy5tb2RlbCc7XG5pbXBvcnQgeyBDb21wZXRlbmN5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS5tb2RlbCc7XG5pbXBvcnQgeyBBY2hpdmVtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYWNoaWV2ZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2Utc3lsbGFidXMvY291cnNlLXN5bGxhYnVzLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbG1zLWNvdXJzZS1yZWNvbW1lbmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnY291cnNlLXJlY29tbWVuZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NvdXJzZS1yZWNvbW1lbmQuY29tcG9uZW50LmNzcyddLFxufSlcblxuZXhwb3J0IGNsYXNzIENvdXJzZVJlY29tbWVuZENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQ09VUlNFX01PREUgPSAgQ09VUlNFX01PREU7XG4gICAgQ09OVEVOVF9TVEFUVVMgPSBDT05URU5UX1NUQVRVUztcblxuICAgIHByaXZhdGUgY291cnNlczogQ291cnNlW107XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gW107XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY291cnNlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaFJlY29tbWVuZENvdXJzZSgpO1xuICAgIH1cblxuICAgIHNlYXJjaFJlY29tbWVuZENvdXJzZSgpIHtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gW107XG4gICAgICAgIHZhciBkb21haW4gPSBcIignc3RhdHVzJywnPScsJ3B1Ymxpc2hlZCcpXCI7XG4gICAgICAgIEFjaGl2ZW1lbnQubGlzdEJ5VXNlcih0aGlzLCB0aGlzLkNvbnRleHRVc2VyLmlkKS5zdWJzY3JpYmUoc2tpbGxzPT4ge1xuICAgICAgICAgICAgdmFyIGFwaUxpc3QgPSBfLm1hcChza2lsbHMsIChza2lsbDpBY2hpdmVtZW50KT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ291cnNlLl9fYXBpX19saXN0QnlDb21wZXRlbmN5KHNraWxsLmNvbXBldGVuY3lfaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBCYXNlTW9kZWwuYnVsa19zZWFyY2godGhpcywgLi4uYXBpTGlzdClcbiAgICAgICAgICAgIC5tYXAoanNvbkFycj0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5mbGF0dGVuKGpzb25BcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoanNvbkFycj0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBDb3Vyc2UudG9BcnJheShqc29uQXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbmRFbnJvbGxtZW50UmVxdWVzdChjb3Vyc2U6Q291cnNlKSB7XG5cbiAgICB9XG4gICAgXG59Il19
