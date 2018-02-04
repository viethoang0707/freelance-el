import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ReportComponent } from './report.component';

export const ReportRoutes: Routes = [
    {
       path: "reports",
       component: ReportComponent,
       data: {
         breadcrumb:'Reports'
       }
    }

]
