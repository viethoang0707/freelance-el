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
import { SettingModule } from './setting/setting.module';
import { AccountModule } from './account/account.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AssessmentModule } from './assessment/assessment.module';
import { ReportModule } from './report/report.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CMSModule } from './cms/cms.module';
import { LMSModule } from './lms/lms.module';
import { InterceptHttp } from './shared/helpers/intercept.http';
import { ServiceLocator } from './service.locator';
import { AppComponent } from './app.component';
import { CustomTranslationLoader } from './shared/helpers/translation.loader';
import {ScheduleModule} from 'primeng/schedule';

@NgModule({
    imports: [
        ScheduleModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,
        AuthModule,
        HomeModule.forRoot(),
        DashboardModule,
        SettingModule,
        AccountModule,
        EnrollmentModule,
        AssessmentModule,
        ReportModule,
        CMSModule,
        LMSModule,
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