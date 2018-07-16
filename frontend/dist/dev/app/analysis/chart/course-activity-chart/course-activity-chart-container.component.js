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
var base_component_1 = require("../../../shared/components/base/base.component");
var chart_decorator_1 = require("../chart.decorator");
var course_activity_chart_component_1 = require("./course-activity-chart.component");
var CourseActivityChartContainerComponent = (function (_super) {
    __extends(CourseActivityChartContainerComponent, _super);
    function CourseActivityChartContainerComponent() {
        return _super.call(this) || this;
    }
    CourseActivityChartContainerComponent.prototype.ngOnInit = function () {
        this.drawChart(7);
    };
    CourseActivityChartContainerComponent.prototype.drawChart = function (day) {
        this.courseChart.drawChart(day);
    };
    __decorate([
        core_1.ViewChild(course_activity_chart_component_1.CourseActivityChartComponent),
        __metadata("design:type", course_activity_chart_component_1.CourseActivityChartComponent)
    ], CourseActivityChartContainerComponent.prototype, "courseChart", void 0);
    CourseActivityChartContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-activity-chart-container',
            templateUrl: 'course-activity-chart-container.component.html',
        }),
        chart_decorator_1.Chart({
            title: 'Course activity chart',
        }),
        __metadata("design:paramtypes", [])
    ], CourseActivityChartContainerComponent);
    return CourseActivityChartContainerComponent;
}(base_component_1.BaseComponent));
exports.CourseActivityChartContainerComponent = CourseActivityChartContainerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jb3Vyc2UtYWN0aXZpdHktY2hhcnQvY291cnNlLWFjdGl2aXR5LWNoYXJ0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBTXBFLGlGQUErRTtBQVEvRSxzREFBMkM7QUFFM0MscUZBQWlGO0FBVWpGO0lBQTJELHlEQUFhO0lBSXBFO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBRUQsd0RBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELHlEQUFTLEdBQVQsVUFBVSxHQUFXO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFac0M7UUFBeEMsZ0JBQVMsQ0FBQyw4REFBNEIsQ0FBQztrQ0FBYyw4REFBNEI7OEVBQUM7SUFGeEUscUNBQXFDO1FBUmpELGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlDQUFpQztZQUM1QyxXQUFXLEVBQUUsZ0RBQWdEO1NBQzdELENBQUM7UUFDRCx1QkFBSyxDQUFDO1lBQ0wsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQixDQUFDOztPQUNXLHFDQUFxQyxDQWVqRDtJQUFELDRDQUFDO0NBZkQsQUFlQyxDQWYwRCw4QkFBYSxHQWV2RTtBQWZZLHNGQUFxQyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvY2hhcnQvY291cnNlLWFjdGl2aXR5LWNoYXJ0L2NvdXJzZS1hY3Rpdml0eS1jaGFydC1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVwb3J0VXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9yZXBvcnQudXRpbHMnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBFWFBPUlRfREFURVRJTUVfRk9STUFULCBSRVBPUlRfQ0FURUdPUlksIEdST1VQX0NBVEVHT1JZLCBDT1VSU0VfTU9ERSwgQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTLCBFWFBPUlRfREFURV9GT1JNQVQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENoYXJ0IH0gZnJvbSAnLi4vY2hhcnQuZGVjb3JhdG9yJztcbmltcG9ydCB7IFN0YXRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zdGF0aXN0aWNzLnV0aWxzJztcbmltcG9ydCB7IENvdXJzZUFjdGl2aXR5Q2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2NvdXJzZS1hY3Rpdml0eS1jaGFydC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjb3Vyc2UtYWN0aXZpdHktY2hhcnQtY29udGFpbmVyJyxcblx0dGVtcGxhdGVVcmw6ICdjb3Vyc2UtYWN0aXZpdHktY2hhcnQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5AQ2hhcnQoe1xuICB0aXRsZTogJ0NvdXJzZSBhY3Rpdml0eSBjaGFydCcsXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUFjdGl2aXR5Q2hhcnRDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuXG4gIEBWaWV3Q2hpbGQoQ291cnNlQWN0aXZpdHlDaGFydENvbXBvbmVudCkgY291cnNlQ2hhcnQ6IENvdXJzZUFjdGl2aXR5Q2hhcnRDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLmRyYXdDaGFydCg3KTtcbiAgICB9XG5cbiAgICBkcmF3Q2hhcnQoZGF5OiBudW1iZXIpIHtcbiAgICAgIHRoaXMuY291cnNlQ2hhcnQuZHJhd0NoYXJ0KGRheSk7XG4gICAgfVxufVxuIl19
