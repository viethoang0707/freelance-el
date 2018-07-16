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
var base_component_1 = require("../../shared/components/base/base.component");
var course_model_1 = require("../../shared/models/elearning/course.model");
var CompetencyMatrixComponent = (function (_super) {
    __extends(CompetencyMatrixComponent, _super);
    function CompetencyMatrixComponent() {
        var _this = _super.call(this) || this;
        _this.courses = [];
        return _this;
    }
    CompetencyMatrixComponent.prototype.ngOnInit = function () {
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = courses;
        });
    };
    CompetencyMatrixComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-matrix',
            templateUrl: 'competency-matrix.component.html',
            styleUrls: ['competency-matrix.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyMatrixComponent);
    return CompetencyMatrixComponent;
}(base_component_1.BaseComponent));
exports.CompetencyMatrixComponent = CompetencyMatrixComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wZXRlbmN5L2NvbXBldGVuY3ktbWF0cml4L2NvbXBldGVuY3ktbWF0cml4LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsOEVBQTRFO0FBVTVFLDJFQUFvRTtBQVFwRTtJQUErQyw2Q0FBYTtJQUt4RDtRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztJQUN0QixDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcscUJBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUM5QixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFkUSx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxrQ0FBa0M7WUFDL0MsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7U0FDakQsQ0FBQzs7T0FDVyx5QkFBeUIsQ0FpQnJDO0lBQUQsZ0NBQUM7Q0FqQkQsQUFpQkMsQ0FqQjhDLDhCQUFhLEdBaUIzRDtBQWpCWSw4REFBeUIiLCJmaWxlIjoiYXBwL2NvbXBldGVuY3kvY29tcGV0ZW5jeS1tYXRyaXgvY29tcGV0ZW5jeS1tYXRyaXguY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFFVRVNUSU9OX1RZUEUsIEdST1VQX0NBVEVHT1JZLCBRVUVTVElPTl9MRVZFTCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBDb21wZXRlbmN5RGlhbG9nIH0gZnJvbSAnLi4vY29tcGV0ZW5jeS1kaWFsb2cvY29tcGV0ZW5jeS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUsIE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvbXBldGVuY3ktbWF0cml4JyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbXBldGVuY3ktbWF0cml4LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnY29tcGV0ZW5jeS1tYXRyaXguY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5TWF0cml4Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblxuICAgIHByaXZhdGUgY291cnNlczogQ291cnNlW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb3Vyc2VzID0gW107XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIENvdXJzZS5hbGwodGhpcykuc3Vic2NyaWJlKGNvdXJzZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gY291cnNlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgXG59Il19
