import { NgModule, ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ErpSharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthService } from '../shared/services/auth.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SubMenuComponent } from './side-menu/sub-menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcumb/breadcrumb.component';
import { HomeEventManager } from './home-manager.service';
import { WorkflowModule } from '../workflow/workflow.module';
import { SettingModule } from '../setting/setting.module';
import { AccountModule } from '../account/account.module';
import { CourseModule } from '../course/course.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CMSModule } from '../cms/cms.module';
import { LMSModule } from '../lms/lms.module';
import { CompetencyModule } from '../competency/competency.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    ErpSharedModule,
    AccountModule,
    LMSModule,
    DashboardModule,
    SettingModule,
    AccountModule,
    CourseModule,
    AssessmentModule,
    AnalysisModule,
    WorkflowModule,
    CMSModule,
    CompetencyModule,
    WorkflowModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    SideMenuComponent,
    FooterComponent,
    SubMenuComponent, 
    BreadcrumbComponent
  ],
  exports: [],
  providers: [HomeEventManager]
})

export class HomeModule {
}


