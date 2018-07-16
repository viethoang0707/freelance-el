"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var competency_component_1 = require("./competency.component");
var competency_list_component_1 = require("./competency-list/competency-list.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
var group_list_component_1 = require("../shared/components/group-list/group-list.component");
var competency_matrix_component_1 = require("./competency-matrix/competency-matrix.component");
var router_1 = require("@angular/router");
exports.CompetencyRoutes = [
    {
        path: 'competency',
        component: competency_component_1.CompetencyComponent,
        data: {
            breadcrumb: 'Competency'
        },
        canActivate: [admin_guard_1.AdminGuard],
        children: [
            {
                path: "list",
                component: competency_list_component_1.CompetencyListComponent,
                data: {
                    breadcrumb: 'List'
                }
            },
            {
                path: "matrix",
                component: competency_matrix_component_1.CompetencyMatrixComponent,
                data: {
                    breadcrumb: 'Matrix'
                }
            },
            {
                path: "groups",
                component: group_list_component_1.GroupListComponent,
                data: {
                    breadcrumb: 'Competency groups',
                    category: 'competency'
                },
            }
        ]
    }
];
var CompetencyRoutingModule = (function () {
    function CompetencyRoutingModule() {
    }
    CompetencyRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.CompetencyRoutes)],
            exports: [router_1.RouterModule]
        })
    ], CompetencyRoutingModule);
    return CompetencyRoutingModule;
}());
exports.CompetencyRoutingModule = CompetencyRoutingModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wZXRlbmN5L2NvbXBldGVuY3ktcm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUV6QywrREFBNEQ7QUFDNUQseUZBQXNGO0FBRXRGLDREQUEwRDtBQUMxRCw2RkFBMEY7QUFDMUYsK0ZBQTRGO0FBQzVGLDBDQUErQztBQUVsQyxRQUFBLGdCQUFnQixHQUFXO0lBQ3RDO1FBQ0UsSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLDBDQUFtQjtRQUM5QixJQUFJLEVBQUU7WUFDSixVQUFVLEVBQUUsWUFBWTtTQUN6QjtRQUNELFdBQVcsRUFBRSxDQUFDLHdCQUFVLENBQUM7UUFDekIsUUFBUSxFQUNSO1lBQ0U7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLG1EQUF1QjtnQkFDbEMsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLHVEQUF5QjtnQkFDcEMsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxRQUFRO2lCQUNyQjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsU0FBUyxFQUFFLHlDQUFrQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRSxtQkFBbUI7b0JBQy9CLFFBQVEsRUFBRSxZQUFZO2lCQUN2QjthQUNGO1NBQ0Y7S0FDRjtDQUVGLENBQUE7QUFNRDtJQUFBO0lBQXNDLENBQUM7SUFBMUIsdUJBQXVCO1FBSm5DLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLHdCQUFnQixDQUFDLENBQUM7WUFDbEQsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztTQUN4QixDQUFDO09BQ1csdUJBQXVCLENBQUc7SUFBRCw4QkFBQztDQUF2QyxBQUF1QyxJQUFBO0FBQTFCLDBEQUF1QiIsImZpbGUiOiJhcHAvY29tcGV0ZW5jeS9jb21wZXRlbmN5LXJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbXBldGVuY3lDb21wb25lbnQgfSBmcm9tICcuL2NvbXBldGVuY3kuY29tcG9uZW50J1xuaW1wb3J0IHsgQ29tcGV0ZW5jeUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBldGVuY3ktbGlzdC9jb21wZXRlbmN5LWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3lEaWFsb2cgfSBmcm9tICcuL2NvbXBldGVuY3ktZGlhbG9nL2NvbXBldGVuY3ktZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9hZG1pbi5ndWFyZCc7XG5pbXBvcnQgeyBHcm91cExpc3RDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1saXN0L2dyb3VwLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbXBldGVuY3lNYXRyaXhDb21wb25lbnQgfSBmcm9tICcuL2NvbXBldGVuY3ktbWF0cml4L2NvbXBldGVuY3ktbWF0cml4LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY29uc3QgQ29tcGV0ZW5jeVJvdXRlczogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJ2NvbXBldGVuY3knLFxuICAgIGNvbXBvbmVudDogQ29tcGV0ZW5jeUNvbXBvbmVudCxcbiAgICBkYXRhOiB7XG4gICAgICBicmVhZGNydW1iOiAnQ29tcGV0ZW5jeSdcbiAgICB9LFxuICAgIGNhbkFjdGl2YXRlOiBbQWRtaW5HdWFyZF0sXG4gICAgY2hpbGRyZW46XG4gICAgW1xuICAgICAge1xuICAgICAgICBwYXRoOiBcImxpc3RcIixcbiAgICAgICAgY29tcG9uZW50OiBDb21wZXRlbmN5TGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdMaXN0J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIm1hdHJpeFwiLFxuICAgICAgICBjb21wb25lbnQ6IENvbXBldGVuY3lNYXRyaXhDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBicmVhZGNydW1iOiAnTWF0cml4J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcImdyb3Vwc1wiLFxuICAgICAgICBjb21wb25lbnQ6IEdyb3VwTGlzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGJyZWFkY3J1bWI6ICdDb21wZXRlbmN5IGdyb3VwcycsXG4gICAgICAgICAgY2F0ZWdvcnk6ICdjb21wZXRlbmN5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIF1cbiAgfVxuXG5dXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoQ29tcGV0ZW5jeVJvdXRlcyldLFxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5Um91dGluZ01vZHVsZSB7fVxuIl19
