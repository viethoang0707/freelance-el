import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { CompetencyDialog } from './competency-dialog/question-competency.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';

export const CompetencyRoutes: Routes = [
  {
    path: "competency",
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
          breadcrumb: 'List'
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
