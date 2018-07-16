"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var course_component_1 = require("./course.component");
var course_pipe_1 = require("./course.pipe");
var class_pipe_1 = require("./class.pipe");
var class_list_dialog_component_1 = require("./enrollment/class-list/class-list-dialog.component");
var class_dialog_component_1 = require("./enrollment/class-dialog/class-dialog.component");
var course_list_component_1 = require("./course/course-list/course-list.component");
var course_dialog_component_1 = require("./course/course-dialog/course-dialog.component");
var enrollment_dialog_component_1 = require("./enrollment/enrollment-dialog/enrollment-dialog.component");
var course_list_component_2 = require("./enrollment/course-list/course-list.component");
var course_routing_1 = require("./course-routing");
var CourseModule = (function () {
    function CourseModule() {
    }
    CourseModule = __decorate([
        core_1.NgModule({
            imports: [course_routing_1.CourseRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [course_component_1.CourseComponent, class_dialog_component_1.CourseClassDialog, class_list_dialog_component_1.ClassListDialog, course_pipe_1.ByCoursePipe, class_pipe_1.ByClassPipe,
                course_list_component_1.CourseListComponent, course_dialog_component_1.CourseDialog, enrollment_dialog_component_1.CourseEnrollDialog, course_list_component_2.CourseEnrollmentListComponent],
            exports: [course_dialog_component_1.CourseDialog, class_dialog_component_1.CourseClassDialog],
            providers: []
        })
    ], CourseModule);
    return CourseModule;
}());
exports.CourseModule = CourseModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY291cnNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6QyxtREFBaUQ7QUFDakQseURBQTBEO0FBQzFELHVEQUFxRDtBQUNyRCw2Q0FBNkM7QUFDN0MsMkNBQTJDO0FBQzNDLG1HQUFzRjtBQUN0RiwyRkFBcUY7QUFDckYsb0ZBQWlGO0FBQ2pGLDBGQUE4RTtBQUM5RSwwR0FBZ0c7QUFDaEcsd0ZBQStGO0FBQy9GLG1EQUF1RDtBQVN2RDtJQUFBO0lBQ0EsQ0FBQztJQURZLFlBQVk7UUFQeEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsb0NBQW1CLEVBQUMsK0JBQWUsRUFBRSx3QkFBVSxDQUFDO1lBQzFELFlBQVksRUFBRSxDQUFDLGtDQUFlLEVBQUUsMENBQWlCLEVBQUUsNkNBQWUsRUFBQywwQkFBWSxFQUFDLHdCQUFXO2dCQUN2RiwyQ0FBbUIsRUFBRSxzQ0FBWSxFQUFFLGdEQUFrQixFQUFFLHFEQUE2QixDQUFDO1lBQ3pGLE9BQU8sRUFBRSxDQUFDLHNDQUFZLEVBQUUsMENBQWlCLENBQUM7WUFDMUMsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQURELEFBQ0MsSUFBQTtBQURZLG9DQUFZIiwiZmlsZSI6ImFwcC9jb3Vyc2UvY291cnNlLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoTW9kdWxlIH0gZnJvbSAnLi4vYXV0aC9hdXRoLm1vZHVsZSc7XG5pbXBvcnQgeyBFcnBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgIHsgQ291cnNlQ29tcG9uZW50IH0gZnJvbSAnLi9jb3Vyc2UuY29tcG9uZW50J1xuaW1wb3J0IHsgQnlDb3Vyc2VQaXBlIH0gZnJvbSAnLi9jb3Vyc2UucGlwZSc7XG5pbXBvcnQgeyBCeUNsYXNzUGlwZSB9IGZyb20gJy4vY2xhc3MucGlwZSc7XG5pbXBvcnQgeyBDbGFzc0xpc3REaWFsb2cgfSBmcm9tICcuL2Vucm9sbG1lbnQvY2xhc3MtbGlzdC9jbGFzcy1saXN0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3NEaWFsb2cgfSBmcm9tICcuL2Vucm9sbG1lbnQvY2xhc3MtZGlhbG9nL2NsYXNzLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY291cnNlL2NvdXJzZS1saXN0L2NvdXJzZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VEaWFsb2cgfSBmcm9tICcuL2NvdXJzZS9jb3Vyc2UtZGlhbG9nL2NvdXJzZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUVucm9sbERpYWxvZyB9IGZyb20gJy4vZW5yb2xsbWVudC9lbnJvbGxtZW50LWRpYWxvZy9lbnJvbGxtZW50LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlRW5yb2xsbWVudExpc3RDb21wb25lbnQgfSBmcm9tICcuL2Vucm9sbG1lbnQvY291cnNlLWxpc3QvY291cnNlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2NvdXJzZS1yb3V0aW5nJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ291cnNlUm91dGluZ01vZHVsZSxFcnBTaGFyZWRNb2R1bGUsIEF1dGhNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0NvdXJzZUNvbXBvbmVudCwgQ291cnNlQ2xhc3NEaWFsb2csIENsYXNzTGlzdERpYWxvZyxCeUNvdXJzZVBpcGUsQnlDbGFzc1BpcGUsXG4gICAgXHRcdFx0XHRDb3Vyc2VMaXN0Q29tcG9uZW50LCBDb3Vyc2VEaWFsb2csIENvdXJzZUVucm9sbERpYWxvZywgQ291cnNlRW5yb2xsbWVudExpc3RDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtDb3Vyc2VEaWFsb2csIENvdXJzZUNsYXNzRGlhbG9nXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZU1vZHVsZSB7XG59XG4iXX0=
