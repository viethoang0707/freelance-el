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
var competency_model_1 = require("../../../shared/models/elearning/competency.model");
var CourseSearchComponent = (function (_super) {
    __extends(CourseSearchComponent, _super);
    function CourseSearchComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.competencies = [];
        _this.courses = [];
        return _this;
    }
    CourseSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courses = [];
        competency_model_1.Competency.all(this).subscribe(function (competencies) {
            _this.competencies = competencies;
        });
    };
    CourseSearchComponent.prototype.searchCourse = function () {
        var _this = this;
        this.courses = [];
        var domain = "('status','=','open'),('review_state','=','approved')";
        if (this.selectedCompetency)
            domain += ",('competency_id','='," + this.selectedCompetency.id + ")";
        if (this.selfStudyMode && !this.groupStudyMode)
            domain += ",('mode','=','self-study')";
        if (!this.selfStudyMode && this.groupStudyMode)
            domain += ",('mode','=','group')";
        if (this.selfStudyMode && this.groupStudyMode)
            domain += ",'|',('mode','=','self-study'),('mode','=','group')";
        domain = "[" + domain + "]";
        course_model_1.Course.search(this, [], domain).subscribe(function (courses) {
            if (_this.keyword != null && _this.keyword != "")
                courses = _.filter(courses, function (course) {
                    return course.name.includes(_this.keyword)
                        || course.summary.includes(_this.keyword)
                        || course.code.includes(_this.keyword)
                        || course.description.includes(_this.keyword);
                });
            _this.courses = courses;
        });
    };
    CourseSearchComponent.prototype.sendEnrollmentRequest = function (course) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CourseSearchComponent.prototype, "keyword", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CourseSearchComponent.prototype, "selfStudyMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CourseSearchComponent.prototype, "groupStudyMode", void 0);
    CourseSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-search',
            templateUrl: 'course-search.component.html',
            styleUrls: ['course-search.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseSearchComponent);
    return CourseSearchComponent;
}(base_component_1.BaseComponent));
exports.CourseSearchComponent = CourseSearchComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1zZWFyY2gvY291cnNlLXNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUF5QztBQUV6QyxpRkFBK0U7QUFHL0UsOEJBQWdDO0FBQ2hDLDhEQUE4RjtBQUM5Riw4RUFBdUU7QUFHdkUsc0ZBQStFO0FBZS9FO0lBQTJDLHlDQUFhO0lBYXBELCtCQUFvQixNQUFjO1FBQWxDLFlBQ0ksaUJBQU8sU0FHVjtRQUptQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBWGxDLGlCQUFXLEdBQUksdUJBQVcsQ0FBQztRQUMzQixvQkFBYyxHQUFHLDBCQUFjLENBQUM7UUFZNUIsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0lBQ3RCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQiw2QkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxZQUFZO1lBQ3ZDLEtBQUksQ0FBQyxZQUFZLEdBQUksWUFBWSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFZLEdBQVo7UUFBQSxpQkFzQkM7UUFyQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxNQUFNLEdBQUcsdURBQXVELENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLE1BQU0sSUFBSSx3QkFBd0IsR0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFFLEdBQUcsQ0FBQztRQUN2RSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUMxQyxNQUFNLElBQUksNEJBQTRCLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGNBQWM7WUFDMUMsTUFBTSxJQUFJLHVCQUF1QixDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsY0FBYztZQUN6QyxNQUFNLElBQUkscURBQXFELENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUUsR0FBRyxDQUFDO1FBQzNCLHFCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUM1QyxJQUFJLEtBQUksQ0FBQyxPQUFPLElBQUcsSUFBSSxJQUFJLEtBQUksQ0FBQyxPQUFPLElBQUUsRUFBRTtnQkFDdkMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBYTtvQkFDdEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDOzJCQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDOzJCQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDOzJCQUNsQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsQ0FBQyxDQUFDO1lBQ1AsS0FBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscURBQXFCLEdBQXJCLFVBQXNCLE1BQWE7SUFFbkMsQ0FBQztJQTNDUTtRQUFSLFlBQUssRUFBRTs7MERBQWlCO0lBQ2hCO1FBQVIsWUFBSyxFQUFFOztnRUFBd0I7SUFDdkI7UUFBUixZQUFLLEVBQUU7O2lFQUF5QjtJQVh4QixxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDN0MsQ0FBQzt5Q0FlOEIsZUFBTTtPQWJ6QixxQkFBcUIsQ0FzRGpDO0lBQUQsNEJBQUM7Q0F0REQsQUFzREMsQ0F0RDBDLDhCQUFhLEdBc0R2RDtBQXREWSxzREFBcUIiLCJmaWxlIjoiYXBwL2xtcy9jb3Vyc2UvY291cnNlLXNlYXJjaC9jb3Vyc2Utc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUywgQ09VUlNFX01PREUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9jbXMvY291cnNlL2NvdXJzZS1zeWxsYWJ1cy9jb3Vyc2Utc3lsbGFidXMuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdsbXMtY291cnNlLXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2Utc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY291cnNlLXNlYXJjaC5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgQ291cnNlU2VhcmNoQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBDT1VSU0VfTU9ERSA9ICBDT1VSU0VfTU9ERTtcbiAgICBDT05URU5UX1NUQVRVUyA9IENPTlRFTlRfU1RBVFVTO1xuXG4gICAgcHJpdmF0ZSBjb3Vyc2VzOiBDb3Vyc2VbXTtcbiAgICBwcml2YXRlIGNvbXBldGVuY2llczogQ29tcGV0ZW5jeVtdO1xuICAgIHByaXZhdGUgc2VsZWN0ZWRDb21wZXRlbmN5OiBhbnk7XG5cbiAgICBASW5wdXQoKSBrZXl3b3JkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2VsZlN0dWR5TW9kZTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBncm91cFN0dWR5TW9kZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21wZXRlbmNpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gW107XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY291cnNlcyA9IFtdO1xuICAgICAgICBDb21wZXRlbmN5LmFsbCh0aGlzKS5zdWJzY3JpYmUoY29tcGV0ZW5jaWVzPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wZXRlbmNpZXMgPSAgY29tcGV0ZW5jaWVzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWFyY2hDb3Vyc2UoKSB7XG4gICAgICAgIHRoaXMuY291cnNlcyA9IFtdO1xuICAgICAgICB2YXIgZG9tYWluID0gXCIoJ3N0YXR1cycsJz0nLCdvcGVuJyksKCdyZXZpZXdfc3RhdGUnLCc9JywnYXBwcm92ZWQnKVwiO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvbXBldGVuY3kpXG4gICAgICAgICAgICBkb21haW4gKz0gXCIsKCdjb21wZXRlbmN5X2lkJywnPScsXCIrdGhpcy5zZWxlY3RlZENvbXBldGVuY3kuaWQgK1wiKVwiO1xuICAgICAgICBpZiAodGhpcy5zZWxmU3R1ZHlNb2RlICYmICF0aGlzLmdyb3VwU3R1ZHlNb2RlKVxuICAgICAgICAgICAgZG9tYWluICs9IFwiLCgnbW9kZScsJz0nLCdzZWxmLXN0dWR5JylcIjtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGZTdHVkeU1vZGUgJiYgdGhpcy5ncm91cFN0dWR5TW9kZSlcbiAgICAgICAgICAgIGRvbWFpbiArPSBcIiwoJ21vZGUnLCc9JywnZ3JvdXAnKVwiO1xuICAgICAgICBpZiAodGhpcy5zZWxmU3R1ZHlNb2RlICYmIHRoaXMuZ3JvdXBTdHVkeU1vZGUpXG4gICAgICAgICAgICBkb21haW4gKz0gXCIsJ3wnLCgnbW9kZScsJz0nLCdzZWxmLXN0dWR5JyksKCdtb2RlJywnPScsJ2dyb3VwJylcIjtcbiAgICAgICAgZG9tYWluID0gXCJbXCIgKyBkb21haW4gK1wiXVwiO1xuICAgICAgICBDb3Vyc2Uuc2VhcmNoKHRoaXMsIFtdLGRvbWFpbikuc3Vic2NyaWJlKGNvdXJzZXM9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5rZXl3b3JkIT0gbnVsbCAmJiB0aGlzLmtleXdvcmQhPVwiXCIpXG4gICAgICAgICAgICAgICAgY291cnNlcyA9IF8uZmlsdGVyKGNvdXJzZXMsIChjb3Vyc2U6Q291cnNlKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZS5uYW1lLmluY2x1ZGVzKHRoaXMua2V5d29yZCkgXG4gICAgICAgICAgICAgICAgICAgIHx8IGNvdXJzZS5zdW1tYXJ5LmluY2x1ZGVzKHRoaXMua2V5d29yZClcbiAgICAgICAgICAgICAgICAgICAgfHwgY291cnNlLmNvZGUuaW5jbHVkZXModGhpcy5rZXl3b3JkKVxuICAgICAgICAgICAgICAgICAgICB8fCBjb3Vyc2UuZGVzY3JpcHRpb24uaW5jbHVkZXModGhpcy5rZXl3b3JkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY291cnNlcyA9ICBjb3Vyc2VzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZW5kRW5yb2xsbWVudFJlcXVlc3QoY291cnNlOkNvdXJzZSkge1xuXG4gICAgfVxuICAgIFxufSJdfQ==
