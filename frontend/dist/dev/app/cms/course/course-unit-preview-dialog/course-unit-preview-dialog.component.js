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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var unit_decorator_1 = require("../course-unit-template/unit.decorator");
var unit_container_directive_1 = require("../course-unit-template/unit-container.directive");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var CourseUnitPreviewDialog = (function (_super) {
    __extends(CourseUnitPreviewDialog, _super);
    function CourseUnitPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        return _this;
    }
    CourseUnitPreviewDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(object.type);
            var viewContainerRef = _this.unitHost.viewContainerRef;
            _this.nameUnit = object.name;
            course_syllabus_model_1.CourseSyllabus.get(_this, object.syllabus_id).subscribe(function (syl) {
                course_unit_model_1.CourseUnit.listBySyllabus(_this, syl.id).subscribe(function (units) {
                    _this.tree = _this.sylUtils.buildGroupTree(units);
                    _this.treeList = _this.sylUtils.flattenTree(_this.tree);
                });
            });
            _this.selectedUnit = object;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'preview';
                _this.componentRef.instance.render(object);
            }
            else {
                viewContainerRef.clear();
                _this.componentRef = null;
            }
        });
        this.onHide.subscribe(function () {
            var viewContainerRef = _this.unitHost.viewContainerRef;
            if (viewContainerRef)
                viewContainerRef.clear();
        });
    };
    CourseUnitPreviewDialog.prototype.nextUnitPreview = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
        this.selectedUnit = this.computedNextUnit(this.selectedUnit);
        if (!this.selectedUnit)
            return;
        this.selectedUnit = this.selectedUnit;
        var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
        this.nameUnit = this.selectedUnit.name;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'preview';
            this.componentRef.instance.render(this.selectedUnit);
        }
        else {
            viewContainerRef.clear();
            this.componentRef = null;
        }
    };
    CourseUnitPreviewDialog.prototype.prevUnitPreview = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
        this.selectedUnit = this.computedPrevUnit(this.selectedUnit);
        if (!this.selectedUnit)
            return;
        var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(this.selectedUnit.type);
        this.nameUnit = this.selectedUnit.name;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            this.componentRef = viewContainerRef.createComponent(componentFactory);
            this.componentRef.instance.mode = 'preview';
            this.componentRef.instance.render(this.selectedUnit);
        }
        else {
            viewContainerRef.clear();
            this.componentRef = null;
        }
    };
    CourseUnitPreviewDialog.prototype.computedNextUnit = function (unit) {
        var currentNodeIndex = 0;
        if (unit)
            for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
                var node = this.treeList[currentNodeIndex];
                if (node.data.id == unit.id)
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
    CourseUnitPreviewDialog.prototype.computedPrevUnit = function (unit) {
        var currentNodeIndex = 0;
        if (unit)
            for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
                var node = this.treeList[currentNodeIndex];
                if (node.data.id == unit.id)
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
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseUnitPreviewDialog.prototype, "unitHost", void 0);
    CourseUnitPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-unit-preview-dialog',
            templateUrl: 'course-unit-preview-dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], CourseUnitPreviewDialog);
    return CourseUnitPreviewDialog;
}(base_dialog_1.BaseDialog));
exports.CourseUnitPreviewDialog = CourseUnitPreviewDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nL2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUc7QUFLekcsMkVBQXlFO0FBQ3pFLHdGQUFnRjtBQUVoRixpRUFBK0Q7QUFFL0QseUVBQTRFO0FBQzVFLDZGQUFnRztBQUVoRyx5RUFBdUU7QUFDdkUsZ0dBQXdGO0FBT3hGO0lBQTZDLDJDQUFzQjtJQVlsRSxpQ0FBb0Isd0JBQWtEO1FBQXRFLFlBQ0MsaUJBQU8sU0FHUDtRQUptQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBRXJFLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQzs7SUFDckMsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFrQ0M7UUFqQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzNCLElBQUksZUFBZSxHQUFHLG1DQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RFLElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0RCxLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFHNUIsc0NBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUN6RCw4QkFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7b0JBQ3RELEtBQUksQ0FBQyxJQUFJLEdBQUcs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Q0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBekh3QztRQUF4QyxnQkFBUyxDQUFDLHVEQUE0QixDQUFDO2tDQUFXLHVEQUE0Qjs2REFBQztJQVZwRSx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSwyQ0FBMkM7U0FDeEQsQ0FBQzt5Q0FhNkMsK0JBQXdCO09BWjFELHVCQUF1QixDQW9JbkM7SUFBRCw4QkFBQztDQXBJRCxBQW9JQyxDQXBJNEMsd0JBQVUsR0FvSXREO0FBcElZLDBEQUF1QiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NoaWxkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0UmVnaXN0ZXIgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vY291cnNlLXVuaXQtdGVtcGxhdGUvdW5pdC1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IElDb3Vyc2VVbml0IH0gZnJvbSAnLi4vY291cnNlLXVuaXQtdGVtcGxhdGUvdW5pdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3lsbGFidXNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY291cnNlLXVuaXQtcHJldmlldy1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2NvdXJzZS11bml0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPENvdXJzZVVuaXQ+IHtcblxuXHRwcml2YXRlIGNvbXBvbmVudFJlZjogYW55O1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgdHJlZUxpc3Q6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWRVbml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIHN5bFV0aWxzOiBTeWxsYWJ1c1V0aWxzO1xuXHRwcml2YXRlIG5hbWVVbml0OiBzdHJpbmc7XG5cblx0QFZpZXdDaGlsZChDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlKSB1bml0SG9zdDogQ291cnNlVW5pdENvbnRhaW5lckRpcmVjdGl2ZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0XHR0aGlzLnN5bFV0aWxzID0gbmV3IFN5bGxhYnVzVXRpbHMoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMub25TaG93LnN1YnNjcmliZShvYmplY3QgPT4ge1xuXHRcdFx0dmFyIGRldGFpbENvbXBvbmVudCA9IENvdXJzZVVuaXRSZWdpc3Rlci5JbnN0YW5jZS5sb29rdXAob2JqZWN0LnR5cGUpO1xuXHRcdFx0bGV0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLnVuaXRIb3N0LnZpZXdDb250YWluZXJSZWY7XG5cdFx0XHR0aGlzLm5hbWVVbml0ID0gb2JqZWN0Lm5hbWU7XG5cblx0XHRcdC8vIEdldCB0cmVlbGlzdFxuXHRcdFx0Q291cnNlU3lsbGFidXMuZ2V0KHRoaXMsIG9iamVjdC5zeWxsYWJ1c19pZCkuc3Vic2NyaWJlKHN5bCA9PiB7XG5cdFx0XHRcdENvdXJzZVVuaXQubGlzdEJ5U3lsbGFidXModGhpcywgc3lsLmlkKS5zdWJzY3JpYmUodW5pdHMgPT4ge1xuXHRcdFx0XHRcdHRoaXMudHJlZSA9IHRoaXMuc3lsVXRpbHMuYnVpbGRHcm91cFRyZWUodW5pdHMpO1xuXHRcdFx0XHRcdHRoaXMudHJlZUxpc3QgPSB0aGlzLnN5bFV0aWxzLmZsYXR0ZW5UcmVlKHRoaXMudHJlZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IG9iamVjdDtcblx0XHRcdC8vIEVuZCBnZXQgdHJlZWxpc3RcblxuXHRcdFx0aWYgKGRldGFpbENvbXBvbmVudCkge1xuXHRcdFx0XHRsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGRldGFpbENvbXBvbmVudCk7XG5cdFx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRcdFx0dGhpcy5jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblx0XHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdwcmV2aWV3Jztcblx0XHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKG9iamVjdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdFx0dGhpcy5vbkhpZGUuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy51bml0SG9zdC52aWV3Q29udGFpbmVyUmVmO1xuXHRcdFx0aWYgKHZpZXdDb250YWluZXJSZWYpXG5cdFx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHR9KTtcblx0fVxuXG5cdG5leHRVbml0UHJldmlldygpIHtcblx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudW5pdEhvc3Qudmlld0NvbnRhaW5lclJlZjtcblx0XHRpZiAodmlld0NvbnRhaW5lclJlZilcblx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IHRoaXMuY29tcHV0ZWROZXh0VW5pdCh0aGlzLnNlbGVjdGVkVW5pdCk7XG5cdFx0aWYgKCF0aGlzLnNlbGVjdGVkVW5pdClcblx0XHRcdHJldHVybjtcblx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IHRoaXMuc2VsZWN0ZWRVbml0O1xuXHRcdHZhciBkZXRhaWxDb21wb25lbnQgPSBDb3Vyc2VVbml0UmVnaXN0ZXIuSW5zdGFuY2UubG9va3VwKHRoaXMuc2VsZWN0ZWRVbml0LnR5cGUpO1xuXHRcdHRoaXMubmFtZVVuaXQgPSB0aGlzLnNlbGVjdGVkVW5pdC5uYW1lO1xuXHRcdGlmIChkZXRhaWxDb21wb25lbnQpIHtcblx0XHRcdGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcblx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XHQoPElDb3Vyc2VVbml0PnRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlKS5tb2RlID0gJ3ByZXZpZXcnO1xuXHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKHRoaXMuc2VsZWN0ZWRVbml0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHRcdFx0dGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHByZXZVbml0UHJldmlldygpIHtcblx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudW5pdEhvc3Qudmlld0NvbnRhaW5lclJlZjtcblx0XHRpZiAodmlld0NvbnRhaW5lclJlZilcblx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IHRoaXMuY29tcHV0ZWRQcmV2VW5pdCh0aGlzLnNlbGVjdGVkVW5pdCk7XG5cdFx0aWYgKCF0aGlzLnNlbGVjdGVkVW5pdClcblx0XHRcdHJldHVybjtcblx0XHR2YXIgZGV0YWlsQ29tcG9uZW50ID0gQ291cnNlVW5pdFJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cCh0aGlzLnNlbGVjdGVkVW5pdC50eXBlKTtcblx0XHR0aGlzLm5hbWVVbml0ID0gdGhpcy5zZWxlY3RlZFVuaXQubmFtZTtcblx0XHRpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG5cdFx0XHRsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGRldGFpbENvbXBvbmVudCk7XG5cdFx0XHR2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdwcmV2aWV3Jztcblx0XHRcdCg8SUNvdXJzZVVuaXQ+dGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UpLnJlbmRlcih0aGlzLnNlbGVjdGVkVW5pdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRjb21wdXRlZE5leHRVbml0KHVuaXQ6IENvdXJzZVVuaXQpOiBDb3Vyc2VVbml0IHtcblx0XHR2YXIgY3VycmVudE5vZGVJbmRleCA9IDA7XG5cdFx0aWYgKHVuaXQpXG5cdFx0XHRmb3IgKDsgY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoOyBjdXJyZW50Tm9kZUluZGV4KyspIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdO1xuXHRcdFx0XHRpZiAobm9kZS5kYXRhLmlkID09IHVuaXQuaWQpXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y3VycmVudE5vZGVJbmRleCsrO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZUluZGV4IDwgdGhpcy50cmVlTGlzdC5sZW5ndGgpIHtcblx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XTtcblx0XHRcdGlmIChub2RlLmRhdGEudHlwZSAhPSAnZm9sZGVyJylcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjdXJyZW50Tm9kZUluZGV4Kys7XG5cdFx0fVxuXHRcdHJldHVybiAoY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoID8gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XS5kYXRhIDogbnVsbCk7XG5cdH1cblxuXHRjb21wdXRlZFByZXZVbml0KHVuaXQ6IENvdXJzZVVuaXQpOiBDb3Vyc2VVbml0IHtcblx0XHR2YXIgY3VycmVudE5vZGVJbmRleCA9IDA7XG5cdFx0aWYgKHVuaXQpXG5cdFx0XHRmb3IgKDsgY3VycmVudE5vZGVJbmRleCA8IHRoaXMudHJlZUxpc3QubGVuZ3RoOyBjdXJyZW50Tm9kZUluZGV4KyspIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0aGlzLnRyZWVMaXN0W2N1cnJlbnROb2RlSW5kZXhdO1xuXHRcdFx0XHRpZiAobm9kZS5kYXRhLmlkID09IHVuaXQuaWQpXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y3VycmVudE5vZGVJbmRleC0tO1xuXHRcdHdoaWxlIChjdXJyZW50Tm9kZUluZGV4ID49IDApIHtcblx0XHRcdHZhciBub2RlID0gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XTtcblx0XHRcdGlmIChub2RlLmRhdGEudHlwZSAhPSAnZm9sZGVyJylcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjdXJyZW50Tm9kZUluZGV4LS07XG5cdFx0fVxuXHRcdHJldHVybiAoY3VycmVudE5vZGVJbmRleCA+PSAwID8gdGhpcy50cmVlTGlzdFtjdXJyZW50Tm9kZUluZGV4XS5kYXRhIDogbnVsbCk7XG5cdH1cbn1cblxuXG4iXX0=
