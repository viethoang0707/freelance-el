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
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var FolderCourseUnitComponent = (function (_super) {
    __extends(FolderCourseUnitComponent, _super);
    function FolderCourseUnitComponent() {
        return _super.call(this) || this;
    }
    FolderCourseUnitComponent.prototype.render = function (unit) {
        this.unit = unit;
    };
    FolderCourseUnitComponent.prototype.saveEditor = function () {
        return this.unit.save(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FolderCourseUnitComponent.prototype, "mode", void 0);
    FolderCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'folder-course-unit',
            templateUrl: 'folder-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'folder'
        }),
        __metadata("design:paramtypes", [])
    ], FolderCourseUnitComponent);
    return FolderCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.FolderCourseUnitComponent = FolderCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL2ZvbGRlci9mb2xkZXItdW5pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBS3pELG9GQUFrRjtBQUlsRixvREFBdUQ7QUFZdkQ7SUFBK0MsNkNBQWE7SUFLM0Q7ZUFDQyxpQkFBTztJQUNSLENBQUM7SUFFRCwwQ0FBTSxHQUFOLFVBQU8sSUFBZTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsOENBQVUsR0FBVjtRQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQWJRO1FBQVIsWUFBSyxFQUFFOzsyREFBTTtJQUZGLHlCQUF5QjtRQVJyQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLDRCQUE0QjtTQUN6QyxDQUFDO1FBQ0QsbUNBQWtCLENBQUM7WUFDbkIsSUFBSSxFQUFDLFFBQVE7U0FDYixDQUFDOztPQUNXLHlCQUF5QixDQWtCckM7SUFBRCxnQ0FBQztDQWxCRCxBQWtCQyxDQWxCOEMsOEJBQWEsR0FrQjNEO0FBbEJZLDhEQUF5QiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS9mb2xkZXIvZm9sZGVyLXVuaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9QQVNTV09SRCwgR1JPVVBfQ0FURUdPUlkgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvdXJzZVVuaXRUZW1wbGF0ZSB9IGZyb20gJy4uL3VuaXQuZGVjb3JhdG9yJztcbmltcG9ydCB7IElDb3Vyc2VVbml0IH0gZnJvbSAnLi4vdW5pdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnZm9sZGVyLWNvdXJzZS11bml0Jyxcblx0dGVtcGxhdGVVcmw6ICdmb2xkZXItdW5pdC5jb21wb25lbnQuaHRtbCcsXG59KVxuQENvdXJzZVVuaXRUZW1wbGF0ZSh7XG5cdHR5cGU6J2ZvbGRlcidcbn0pXG5leHBvcnQgY2xhc3MgRm9sZGVyQ291cnNlVW5pdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBJQ291cnNlVW5pdHtcblxuXHRASW5wdXQoKSBtb2RlO1xuXHRwcml2YXRlIHVuaXQ6IENvdXJzZVVuaXQ7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHJlbmRlcih1bml0OkNvdXJzZVVuaXQpIHtcblx0XHR0aGlzLnVuaXQgPSB1bml0O1xuXHR9XG5cblx0c2F2ZUVkaXRvcigpOk9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMudW5pdC5zYXZlKHRoaXMpO1xuXHR9XG5cblxufVxuXG4iXX0=
