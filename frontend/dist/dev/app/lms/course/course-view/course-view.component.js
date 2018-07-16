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
var course_model_1 = require("../../../shared/models/elearning/course.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var unit_container_directive_1 = require("../../../cms/course/course-unit-template/unit-container.directive");
var CourseViewComponent = (function (_super) {
    __extends(CourseViewComponent, _super);
    function CourseViewComponent(router, route, componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                    _this.syl = content["syllabus"];
                    _this.faqs = content["faqs"];
                    _this.materials = content["materials"];
                    _this.units = content["units"];
                    _this.displayCouseSyllabus();
                });
            });
        });
    };
    CourseViewComponent.prototype.displayCouseSyllabus = function () {
        this.units = _.filter(this.units, function (unit) {
            return unit.status == 'published';
        });
        this.tree = this.sylUtils.buildGroupTree(this.units);
        this.treeList = this.sylUtils.flattenTree(this.tree);
        if (this.syl.status != 'published')
            this.warn('Cours syllabus is not published');
    };
    CourseViewComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.unloadCurrentUnit = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
    };
    CourseViewComponent.prototype.prevUnit = function () {
        if (this.selectedUnit) {
            var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.nextUnit = function () {
        if (this.selectedUnit) {
            var nextUnit = this.computedNextUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.computedPrevUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
                break;
        }
        currentNodeIndex--;
        while (currentNodeIndex >= 0) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex--;
        }
        return (currentNodeIndex >= 0 ? this.treeList[currentNodeIndex].data : null);
    };
    CourseViewComponent.prototype.computedNextUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
                break;
        }
        currentNodeIndex++;
        while (currentNodeIndex < this.treeList.length) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex++;
        }
        return (currentNodeIndex < this.treeList.length ? this.treeList[currentNodeIndex].data : null);
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseViewComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseViewComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseViewComponent.prototype, "unitHost", void 0);
    CourseViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-view',
            templateUrl: 'course-view.component.html',
            styleUrls: ['course-view.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, core_1.ComponentFactoryResolver])
    ], CourseViewComponent);
    return CourseViewComponent;
}(base_component_1.BaseComponent));
exports.CourseViewComponent = CourseViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS12aWV3L2NvdXJzZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsMENBQWlFO0FBRWpFLGlGQUErRTtBQUMvRSw4RUFBdUU7QUFHdkUsOEJBQWdDO0FBSWdELDhEQUd2QztBQUl6Qyx5RkFBNEU7QUFFNUUsd0dBQTJGO0FBRTNGLHlFQUF1RTtBQWtCdkUsOEdBQWlIO0FBaUJqSDtJQUF5Qyx1Q0FBYTtJQXdCckQsNkJBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLHdCQUFrRDtRQUE3SCxZQUNDLGlCQUFPLFNBR1A7UUFKbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFdBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQXRCN0gsc0JBQWdCLEdBQUcsNEJBQWdCLENBQUM7UUFDcEMsb0JBQWMsR0FBRywwQkFBYyxDQUFDO1FBQ2hDLGlCQUFXLEdBQUcsdUJBQVcsQ0FBQztRQXNCekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQU0sRUFBRSxDQUFDOztJQUM1QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQWFDO1FBWkEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNqQyxJQUFJLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDM0MsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87b0JBQ25FLEtBQUksQ0FB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WUFDUCxnQkFBZ0IsRUFBRSxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBcEdnQztRQUFoQyxnQkFBUyxDQUFDLHVEQUFvQixDQUFDO2tDQUFpQix1REFBb0I7K0RBQUM7SUFDMUM7UUFBM0IsZ0JBQVMsQ0FBQyw2Q0FBZSxDQUFDO2tDQUFZLDZDQUFlOzBEQUFDO0lBQ2Q7UUFBeEMsZ0JBQVMsQ0FBQyx1REFBNEIsQ0FBQztrQ0FBVyx1REFBNEI7eURBQUM7SUFyQnBFLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0F5QjJCLGVBQU0sRUFBaUIsdUJBQWMsRUFBb0MsK0JBQXdCO09BeEJqSCxtQkFBbUIsQ0F3SC9CO0lBQUQsMEJBQUM7Q0F4SEQsQUF3SEMsQ0F4SHdDLDhCQUFhLEdBd0hyRDtBQXhIWSxrREFBbUIiLCJmaWxlIjoiYXBwL2xtcy9jb3Vyc2UvY291cnNlLXZpZXcvY291cnNlLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb25mZXJlbmNlTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29uZmVyZW5jZS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmVyZW5jZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbmZlcmVuY2UubW9kZWwnOyBpbXBvcnQge1xuXHRTVVJWRVlfU1RBVFVTLCBDT05URU5UX1NUQVRVUywgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfUk9MRSwgUFJPSkVDVF9TVEFUVVMsXG5cdENPVVJTRV9NRU1CRVJfU1RBVFVTLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIENPVVJTRV9VTklUX1RZUEUsIEVYQU1fU1RBVFVTXG59IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBDb3Vyc2VGYXEgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtZmFxLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUZhcURpYWxvZyB9IGZyb20gJy4uL2NvdXJzZS1mYXEvY291cnNlLWZhcS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZU1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1hdGVyaWFsLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZU1hdGVyaWFsRGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLW1hdGVyaWFsL2NvdXJzZS1tYXRlcmlhbC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IFN5bGxhYnVzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy9zeWxsYWJ1cy51dGlscyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbG9nLm1vZGVsJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEV4YW1Db250ZW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vY21zL2V4YW0vY29udGVudC1kaWFsb2cvZXhhbS1jb250ZW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbVN0dWR5RGlhbG9nIH0gZnJvbSAnLi4vLi4vZXhhbS9leGFtLXN0dWR5L2V4YW0tc3R1ZHkuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXBvcnRVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3JlcG9ydC51dGlscyc7XG5pbXBvcnQgeyBSb3V0ZSwgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2VydGlmaWNhdGUubW9kZWwnO1xuaW1wb3J0IHsgQ2VydGlmaWNhdGVQcmludERpYWxvZyB9IGZyb20gJy4uL2NlcnRpZmljYXRlLXByaW50L2NlcnRpZmljYXRlLXByaW50LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQW5zd2VyUHJpbnREaWFsb2cgfSBmcm9tICcuLi8uLi9leGFtL2Fuc3dlci1wcmludC9hbnN3ZXItcHJpbnQuZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWV0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9tZWV0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0Lm1vZGVsJztcbmltcG9ydCB7IFByb2plY3RTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcHJvamVjdC1zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZUNsYXNzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNsYXNzLm1vZGVsJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXkubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5TWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBTdXJ2ZXlTdHVkeURpYWxvZyB9IGZyb20gJy4uLy4uL3N1cnZleS9zdXJ2ZXktc3R1ZHkvc3VydmV5LXN0dWR5LmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbUdyYWRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1ncmFkZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvdXJzZS12aWV3Jyxcblx0dGVtcGxhdGVVcmw6ICdjb3Vyc2Utdmlldy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydjb3Vyc2Utdmlldy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZVZpZXdDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRDT1VSU0VfVU5JVF9UWVBFID0gQ09VUlNFX1VOSVRfVFlQRTtcblx0Q09OVEVOVF9TVEFUVVMgPSBDT05URU5UX1NUQVRVUztcblx0Q09VUlNFX01PREUgPSBDT1VSU0VfTU9ERTtcblxuXHRwcml2YXRlIGNvdXJzZTogQ291cnNlO1xuXHRwcml2YXRlIG1lbWJlcjogQ291cnNlTWVtYmVyO1xuXHRwcml2YXRlIGZhcXM6IENvdXJzZUZhcVtdO1xuXHRwcml2YXRlIG1hdGVyaWFsczogQ291cnNlTWF0ZXJpYWxbXTtcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bDogQ291cnNlU3lsbGFidXM7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSB1bml0czogQ291cnNlVW5pdFtdO1xuXHRwcml2YXRlIHNlbGVjdGVkVW5pdDogQ291cnNlVW5pdDtcblx0cHJpdmF0ZSB0cmVlTGlzdDogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzeWxVdGlsczogU3lsbGFidXNVdGlscztcblx0cHJpdmF0ZSBjb21wb25lbnRSZWY6IGFueTtcblxuXHRAVmlld0NoaWxkKENvdXJzZU1hdGVyaWFsRGlhbG9nKSBtYXRlcmlhbERpYWxvZzogQ291cnNlTWF0ZXJpYWxEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoQ291cnNlRmFxRGlhbG9nKSBmYXFEaWFsb2c6IENvdXJzZUZhcURpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlKSB1bml0SG9zdDogQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZTtcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN5bFV0aWxzID0gbmV3IFN5bGxhYnVzVXRpbHMoKTtcblx0XHR0aGlzLmNvdXJzZSA9IG5ldyBDb3Vyc2UoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuXHRcdFx0dmFyIGNvdXJzZUlkID0gK3BhcmFtc1snY291cnNlSWQnXTtcblx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuaW5pdCh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZUNvbnRlbnQoIGNvdXJzZUlkKS5zdWJzY3JpYmUoY29udGVudCA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zeWwgPSBjb250ZW50W1wic3lsbGFidXNcIl07XG5cdFx0XHRcdFx0dGhpcy5mYXFzID0gY29udGVudFtcImZhcXNcIl07XG5cdFx0XHRcdFx0dGhpcy5tYXRlcmlhbHMgPSBjb250ZW50W1wibWF0ZXJpYWxzXCJdO1xuXHRcdFx0XHRcdHRoaXMudW5pdHMgPSBjb250ZW50W1widW5pdHNcIl07XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5Q291c2VTeWxsYWJ1cygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGlzcGxheUNvdXNlU3lsbGFidXMoKSB7XG5cdFx0dGhpcy51bml0cyA9IF8uZmlsdGVyKHRoaXMudW5pdHMsICh1bml0OiBDb3Vyc2VVbml0KSA9PiB7XG5cdFx0XHRyZXR1cm4gdW5pdC5zdGF0dXMgPT0gJ3B1Ymxpc2hlZCc7XG5cdFx0fSk7XG5cdFx0dGhpcy50cmVlID0gdGhpcy5zeWxVdGlscy5idWlsZEdyb3VwVHJlZSh0aGlzLnVuaXRzKTtcblx0XHR0aGlzLnRyZWVMaXN0ID0gdGhpcy5zeWxVdGlscy5mbGF0dGVuVHJlZSh0aGlzLnRyZWUpO1xuXHRcdGlmICh0aGlzLnN5bC5zdGF0dXMgIT0gJ3B1Ymxpc2hlZCcpXG5cdFx0XHR0aGlzLndhcm4oJ0NvdXJzIHN5bGxhYnVzIGlzIG5vdCBwdWJsaXNoZWQnKTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZFVuaXQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhO1xuXHRcdFx0dGhpcy51bmxvYWRDdXJyZW50VW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdHVubG9hZEN1cnJlbnRVbml0KCkge1xuXHRcdGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy51bml0SG9zdC52aWV3Q29udGFpbmVyUmVmO1xuXHRcdGlmICh2aWV3Q29udGFpbmVyUmVmKVxuXHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHR9XG5cblx0cHJldlVuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRVbml0KSB7XG5cdFx0XHR2YXIgcHJldlVuaXQgPSB0aGlzLmNvbXB1dGVkUHJldlVuaXQodGhpcy5zZWxlY3RlZFVuaXQuaWQpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGUgPSB0aGlzLnN5bFV0aWxzLmZpbmRUcmVlTm9kZSh0aGlzLnRyZWUsIHByZXZVbml0LmlkKTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRVbml0ID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHRcdHRoaXMudW5sb2FkQ3VycmVudFVuaXQoKTtcblx0XHR9XG5cdH1cblxuXHRuZXh0VW5pdCgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZFVuaXQpIHtcblx0XHRcdHZhciBuZXh0VW5pdCA9IHRoaXMuY29tcHV0ZWROZXh0VW5pdCh0aGlzLnNlbGVjdGVkVW5pdC5pZCk7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMuc3lsVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgbmV4dFVuaXQuaWQpO1xuXHRcdFx0dGhpcy5zZWxlY3RlZFVuaXQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhO1xuXHRcdFx0dGhpcy51bmxvYWRDdXJyZW50VW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cblx0Y29tcHV0ZWRQcmV2VW5pdChjdXJyZW50VW5pdElkOiBudW1iZXIpOiBDb3Vyc2VVbml0IHtcblx0XHR2YXIgY3VycmVudE5vZGVJbmRleCA9IDA7XG5cdFx0Zm9yICg7IGN1cnJlbnROb2RlSW5kZXggPCB0aGlzLnRyZWVMaXN0Lmxlbmd0aDsgY3VycmVudE5vZGVJbmRleCsrKSB7XG5cdFx0XHR2YXIgbm9kZSA9IHRoaXMudHJlZUxpc3RbY3VycmVudE5vZGVJbmRleF07XG5cdFx0XHRpZiAobm9kZS5kYXRhLmlkID09IGN1cnJlbnRVbml0SWQpXG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjdXJyZW50Tm9kZUluZGV4LS07XG5cdFx0d2hpbGUgKGN1cnJlbnROb2RlSW5kZXggPj0gMCkge1xuXHRcdFx0dmFyIG5vZGUgPSB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdO1xuXHRcdFx0aWYgKG5vZGUuZGF0YS50eXBlICE9ICdmb2xkZXInKVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGN1cnJlbnROb2RlSW5kZXgtLTtcblx0XHR9XG5cdFx0cmV0dXJuIChjdXJyZW50Tm9kZUluZGV4ID49IDAgPyB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdLmRhdGEgOiBudWxsKTtcblx0fVxuXG5cdGNvbXB1dGVkTmV4dFVuaXQoY3VycmVudFVuaXRJZDogbnVtYmVyKTogQ291cnNlVW5pdCB7XG5cdFx0dmFyIGN1cnJlbnROb2RlSW5kZXggPSAwO1xuXHRcdGZvciAoOyBjdXJyZW50Tm9kZUluZGV4IDwgdGhpcy50cmVlTGlzdC5sZW5ndGg7IGN1cnJlbnROb2RlSW5kZXgrKykge1xuXHRcdFx0dmFyIG5vZGUgPSB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdO1xuXHRcdFx0aWYgKG5vZGUuZGF0YS5pZCA9PSBjdXJyZW50VW5pdElkKVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y3VycmVudE5vZGVJbmRleCsrO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZUluZGV4IDwgdGhpcy50cmVlTGlzdC5sZW5ndGgpIHtcblx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XTtcblx0XHRcdGlmIChub2RlLmRhdGEudHlwZSAhPSAnZm9sZGVyJylcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjdXJyZW50Tm9kZUluZGV4Kys7XG5cdFx0fVxuXHRcdHJldHVybiAoY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoID8gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XS5kYXRhIDogbnVsbCk7XG5cdH1cbn1cbiJdfQ==
