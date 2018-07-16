"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var core_2 = require("@ngx-translate/core");
var app_routing_module_1 = require("./app-routing.module");
var auth_module_1 = require("./auth/auth.module");
var home_module_1 = require("./home/home.module");
var shared_module_1 = require("./shared/shared.module");
var workflow_module_1 = require("./workflow/workflow.module");
var setting_module_1 = require("./setting/setting.module");
var account_module_1 = require("./account/account.module");
var course_module_1 = require("./course/course.module");
var assessment_module_1 = require("./assessment/assessment.module");
var analysis_module_1 = require("./analysis/analysis.module");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var cms_module_1 = require("./cms/cms.module");
var lms_module_1 = require("./lms/lms.module");
var competency_module_1 = require("./competency/competency.module");
var intercept_http_1 = require("./shared/helpers/intercept.http");
var service_locator_1 = require("./service.locator");
var app_component_1 = require("./app.component");
var translation_loader_1 = require("./shared/helpers/translation.loader");
var AppModule = (function () {
    function AppModule(injector) {
        service_locator_1.ServiceLocator.injector = injector;
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                auth_module_1.AuthModule,
                home_module_1.HomeModule.forRoot(),
                dashboard_module_1.DashboardModule,
                setting_module_1.SettingModule,
                account_module_1.AccountModule,
                course_module_1.CourseModule,
                assessment_module_1.AssessmentModule,
                analysis_module_1.AnalysisModule,
                workflow_module_1.WorkflowModule,
                cms_module_1.CMSModule,
                competency_module_1.CompetencyModule,
                lms_module_1.LMSModule,
                shared_module_1.ErpSharedModule.forRoot(),
                core_2.TranslateModule.forRoot({
                    loader: { provide: core_2.TranslateLoader, useClass: translation_loader_1.CustomTranslationLoader }
                })
            ],
            declarations: [app_component_1.AppComponent],
            providers: [
                {
                    provide: common_1.APP_BASE_HREF,
                    useValue: '/'
                },
                http_1.BaseRequestOptions,
                {
                    provide: http_1.Http,
                    useFactory: function (options, realBackend) {
                        return new intercept_http_1.InterceptHttp(realBackend, options);
                    },
                    deps: [http_1.BaseRequestOptions, http_1.XHRBackend]
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
