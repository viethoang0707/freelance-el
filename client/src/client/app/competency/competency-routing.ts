import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CompetencyComponent } from './competency.component'
import { CompetencyListComponent } from './competency-list/competency-list.component';
import { CompetencyDialog } from './competency-dialog/competency-dialog.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { GroupListComponent } from '../shared/components/group-list/group-list.component';
import { CompetencyMatrixComponent } from './competency-matrix/competency-matrix.component';
import { RouterModule } from '@angular/router';

export const CompetencyRoutes: Routes = [
  {
    path: '',
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

@NgModule({
  imports: [RouterModule.forChild(CompetencyRoutes)],
  exports: [RouterModule]
})
export class CompetencyRoutingModule {}
