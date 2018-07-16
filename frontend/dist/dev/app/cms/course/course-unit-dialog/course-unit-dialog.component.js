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
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var unit_decorator_1 = require("../course-unit-template/unit.decorator");
var unit_container_directive_1 = require("../course-unit-template/unit-container.directive");
var constants_1 = require("../../../shared/models/constants");
var CourseUnitDialog = (function (_super) {
    __extends(CourseUnitDialog, _super);
    function CourseUnitDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.contentStatus = _.map(constants_1.CONTENT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        return _this;
    }
    CourseUnitDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            var detailComponent = unit_decorator_1.CourseUnitRegister.Instance.lookup(object.type);
            var viewContainerRef = _this.unitHost.viewContainerRef;
            if (detailComponent) {
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'design';
                _this.componentRef.instance.render(object);
            }
            else {
                viewContainerRef.clear();
                _this.componentRef = null;
            }
        });
        this.onUpdateComplete.subscribe(function (object) {
            if (_this.componentRef)
                _this.componentRef.instance.saveEditor().subscribe(function () {
                    _this.success(_this.translateService.instant('Course unit saved.'));
                });
        });
    };
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseUnitDialog.prototype, "unitHost", void 0);
    CourseUnitDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-unit-dialog',
            templateUrl: 'course-unit-dialog.component.html',
            styles: ["\n\t\t.custom .ui-scrollpanel-content {\n\t\t\twidth: 100% !important;\n\t\t}\n    "],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], CourseUnitDialog);
    return CourseUnitDialog;
}(base_dialog_1.BaseDialog));
exports.CourseUnitDialog = CourseUnitDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LWRpYWxvZy9jb3Vyc2UtdW5pdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFpSDtBQUtqSCwyRUFBeUU7QUFFekUsOEJBQWdDO0FBQ2hDLGlFQUErRDtBQUUvRCx5RUFBNEU7QUFDNUUsNkZBQWdHO0FBR2hHLDhEQUFxSztBQWFySztJQUFzQyxvQ0FBc0I7SUFRM0QsMEJBQXFCLHdCQUFrRDtRQUF2RSxZQUNDLGlCQUFPLFNBUVA7UUFUb0IsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUV0RSxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQywwQkFBYyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDbkQsT0FBTztnQkFDTixLQUFLLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ3pDLEtBQUssRUFBRSxHQUFHO2FBQ1YsQ0FBQTtRQUNGLENBQUMsQ0FBQyxDQUFDOztJQUNKLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQixJQUFJLGVBQWUsR0FBRyxtQ0FBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxJQUFJLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7WUFDdEQsSUFBSSxlQUFlLEVBQUU7Z0JBQ3BCLElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM5RixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDekQsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNOLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN6QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN6QjtRQUVGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDckMsSUFBSSxLQUFJLENBQUMsWUFBWTtnQkFDTixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ2hFLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBbkN3QztRQUF4QyxnQkFBUyxDQUFDLHVEQUE0QixDQUFDO2tDQUFXLHVEQUE0QjtzREFBQztJQU5wRSxnQkFBZ0I7UUFYNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsTUFBTSxFQUFFLENBQUMscUZBSUwsQ0FBQztZQUNMLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1NBQ3JDLENBQUM7eUNBUzhDLCtCQUF3QjtPQVIzRCxnQkFBZ0IsQ0E0QzVCO0lBQUQsdUJBQUM7Q0E1Q0QsQUE0Q0MsQ0E1Q3FDLHdCQUFVLEdBNEMvQztBQTVDWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL2Ntcy9jb3Vyc2UvY291cnNlLXVuaXQtZGlhbG9nL2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvdXJzZVVuaXRSZWdpc3RlciB9IGZyb20gJy4uL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvdXJzZVVuaXRDb250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS91bml0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBDT05URU5UX1NUQVRVUywgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfUk9MRSwgQ09VUlNFX01FTUJFUl9TVEFUVVMsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjb3Vyc2UtdW5pdC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlczogW2Bcblx0XHQuY3VzdG9tIC51aS1zY3JvbGxwYW5lbC1jb250ZW50IHtcblx0XHRcdHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG5cdFx0fVxuICAgIGBdLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZVVuaXREaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPENvdXJzZVVuaXQ+IHtcblxuXHRwcml2YXRlIGNvbXBvbmVudFJlZjogYW55O1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXHRwcml2YXRlIGNvbnRlbnRTdGF0dXM6IFNlbGVjdEl0ZW1bXTtcblxuXHRAVmlld0NoaWxkKENvdXJzZVVuaXRDb250YWluZXJEaXJlY3RpdmUpIHVuaXRIb3N0OiBDb3Vyc2VVbml0Q29udGFpbmVyRGlyZWN0aXZlO1xuXG5cdGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0XHR0aGlzLmNvbnRlbnRTdGF0dXMgPSBfLm1hcChDT05URU5UX1NUQVRVUywgKHZhbCwga2V5KSA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQodmFsKSxcblx0XHRcdFx0dmFsdWU6IGtleVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG5cdFx0XHR2YXIgZGV0YWlsQ29tcG9uZW50ID0gQ291cnNlVW5pdFJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cChvYmplY3QudHlwZSk7XG5cdFx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudW5pdEhvc3Qudmlld0NvbnRhaW5lclJlZjtcblx0XHRcdGlmIChkZXRhaWxDb21wb25lbnQpIHtcblx0XHRcdFx0bGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShkZXRhaWxDb21wb25lbnQpO1xuXHRcdFx0XHR2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XHRcdCg8SUNvdXJzZVVuaXQ+dGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UpLm1vZGUgPSAnZGVzaWduJztcblx0XHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKG9iamVjdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdH0pO1xuXHRcdHRoaXMub25VcGRhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0ID0+IHtcblx0XHRcdGlmICh0aGlzLmNvbXBvbmVudFJlZilcblx0XHRcdFx0KDxJQ291cnNlVW5pdD50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuc2F2ZUVkaXRvcigpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zdWNjZXNzKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdDb3Vyc2UgdW5pdCBzYXZlZC4nKSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pXG5cdH1cblxuXG59XG5cblxuIl19
