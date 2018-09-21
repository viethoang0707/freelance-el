import { NgModule, Injector, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ErpSharedModule } from './shared/shared.module';
import { WorkflowModule } from './workflow/workflow.module';
import { SettingModule } from './setting/setting.module';
import { AccountModule } from './account/account.module';
import { CourseModule } from './course/course.module';
import { AssessmentModule } from './assessment/assessment.module';
import { AnalysisModule } from './analysis/analysis.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CMSModule } from './cms/cms.module';
import { LMSModule } from './lms/lms.module';
import { CompetencyModule } from './competency/competency.module';
import { InterceptHttp } from './shared/helpers/intercept.http';
import { ServiceLocator } from './service.locator';
import { AppComponent } from './app.component';
import { CustomTranslationLoader } from './shared/helpers/translation.loader';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,
        AuthModule,
        CMSModule,
        HomeModule,
        ErpSharedModule.forRoot(),
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: CustomTranslationLoader}
        })
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '<%= APP_BASE %>'
        },
        BaseRequestOptions,
        {
            provide: Http,
            useFactory: (options: BaseRequestOptions, realBackend: XHRBackend)=> {
                return new InterceptHttp(realBackend, options);
            },
            deps: [BaseRequestOptions, XHRBackend]

        }
    ],
    bootstrap: [AppComponent]

})
export class AppModule {

    constructor(injector: Injector) {
        ServiceLocator.injector = injector;
    }
}