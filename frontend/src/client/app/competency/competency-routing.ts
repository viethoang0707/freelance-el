import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { CompetencyMatrixComponent } from './competency-matrix/competency-matrix.component';
import { CompetencyFormComponent } from './competency-form/competency-form.component';
import { CompetencyViewComponent } from './competency-view/competency-view.component';
import { CompetencyResolve } from './route.resolver';

export const CompetencyRoutes: Routes = [
  {
    path: 'competency',
    component: CompetencyComponent,
    data: {
      breadcrumb: 'Competency'
    },
    canActivate: [AdminGuard],
    children:
    [
      {
        path: "list",
        component: CompetencyListComponent,
        data: {
          breadcrumb: 'Competency list'
        }
      },
      {
        path: "form",
        component: CompetencyFormComponent,
        data: {
          breadcrumb: 'Competency form'
        },
        resolve: {
          competency: CompetencyResolve,
        },
      },
      {
        path: "form/:competencyId",
        component: CompetencyFormComponent,
        data: {
          breadcrumb: 'Competency form'
        },
        resolve: {
          competency: CompetencyResolve,
        },
      },
      {
        path: "view/:competencyId",
        component: CompetencyViewComponent,
        data: {
          breadcrumb: 'Competency view'
        },
        resolve: {
          competency: CompetencyResolve,
        },
      },
      {
        path: "matrix",
        component: CompetencyMatrixComponent,
        data: {
          breadcrumb: 'Matrix'
        }
      },
      {
        path: "groups",
        component: GroupListComponent,
        data: {
          breadcrumb: 'Competency groups',
          category: 'competency'
        },
      }
    ]
  }

]


