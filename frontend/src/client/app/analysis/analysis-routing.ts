import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { ReportComponent } from './report/report.component';
import { ChartComponent } from './chart/chart.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { RouterModule } from '@angular/router';

export const AnalysisRoutes: Routes = [
  {
    path: 'analysis',
    component: AnalysisComponent,
    data: {
      breadcrumb: 'Analysis'
    },
    canActivate: [AdminGuard],
    children:
    [
      {
        path: "reports",
        component: ReportComponent,
        data: {
          breadcrumb: 'Report'
        }
      },
      {
        path: "charts",
        component: ChartComponent,
        data: {
          breadcrumb: 'Charts'
        }
      },
    ]
  }

]

