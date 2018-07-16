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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBQ25FLDhEQUEwRDtBQUMxRCxtRUFBK0U7QUFDL0UsMENBQWdEO0FBQ2hELHNDQUFpRjtBQUNqRiw0Q0FBdUU7QUFDdkUsMkRBQXdEO0FBQ3hELGtEQUFnRDtBQUNoRCxrREFBZ0Q7QUFDaEQsd0RBQXlEO0FBQ3pELDhEQUE0RDtBQUM1RCwyREFBeUQ7QUFDekQsMkRBQXlEO0FBQ3pELHdEQUFzRDtBQUN0RCxvRUFBa0U7QUFDbEUsOERBQTREO0FBQzVELGlFQUErRDtBQUMvRCwrQ0FBNkM7QUFDN0MsK0NBQTZDO0FBQzdDLG9FQUFrRTtBQUNsRSxrRUFBZ0U7QUFDaEUscURBQW1EO0FBQ25ELGlEQUErQztBQUMvQywwRUFBOEU7QUE2QzlFO0lBRUksbUJBQVksUUFBa0I7UUFDMUIsZ0NBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFKUSxTQUFTO1FBMUNyQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsZ0NBQWE7Z0JBQ2Isb0NBQXVCO2dCQUN2QixpQkFBVTtnQkFDVixxQ0FBZ0I7Z0JBQ2hCLHdCQUFVO2dCQUNWLHdCQUFVLENBQUMsT0FBTyxFQUFFO2dCQUNwQixrQ0FBZTtnQkFDZiw4QkFBYTtnQkFDYiw4QkFBYTtnQkFDYiw0QkFBWTtnQkFDWixvQ0FBZ0I7Z0JBQ2hCLGdDQUFjO2dCQUNkLGdDQUFjO2dCQUNkLHNCQUFTO2dCQUNULG9DQUFnQjtnQkFDaEIsc0JBQVM7Z0JBQ1QsK0JBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pCLHNCQUFlLENBQUMsT0FBTyxDQUFDO29CQUNwQixNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsc0JBQWUsRUFBRSxRQUFRLEVBQUUsNENBQXVCLEVBQUM7aUJBQ3hFLENBQUM7YUFDTDtZQUNELFlBQVksRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDNUIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxzQkFBYTtvQkFDdEIsUUFBUSxFQUFFLGlCQUFpQjtpQkFDOUI7Z0JBQ0QseUJBQWtCO2dCQUNsQjtvQkFDSSxPQUFPLEVBQUUsV0FBSTtvQkFDYixVQUFVLEVBQUUsVUFBQyxPQUEyQixFQUFFLFdBQXVCO3dCQUM3RCxPQUFPLElBQUksOEJBQWEsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ25ELENBQUM7b0JBQ0QsSUFBSSxFQUFFLENBQUMseUJBQWtCLEVBQUUsaUJBQVUsQ0FBQztpQkFFekM7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FFNUIsQ0FBQzt5Q0FHd0IsZUFBUTtPQUZyQixTQUFTLENBS3JCO0lBQUQsZ0JBQUM7Q0FMRCxBQUtDLElBQUE7QUFMWSw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3RvciwgQXBwbGljYXRpb25SZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFQUF9CQVNFX0hSRUYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cE1vZHVsZSwgSHR0cCwgQmFzZVJlcXVlc3RPcHRpb25zLCBYSFJCYWNrZW5kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYXBwLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL2F1dGgvYXV0aC5tb2R1bGUnO1xuaW1wb3J0IHsgSG9tZU1vZHVsZSB9IGZyb20gJy4vaG9tZS9ob21lLm1vZHVsZSc7XG5pbXBvcnQgeyBFcnBTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFdvcmtmbG93TW9kdWxlIH0gZnJvbSAnLi93b3JrZmxvdy93b3JrZmxvdy5tb2R1bGUnO1xuaW1wb3J0IHsgU2V0dGluZ01vZHVsZSB9IGZyb20gJy4vc2V0dGluZy9zZXR0aW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBBY2NvdW50TW9kdWxlIH0gZnJvbSAnLi9hY2NvdW50L2FjY291bnQubW9kdWxlJztcbmltcG9ydCB7IENvdXJzZU1vZHVsZSB9IGZyb20gJy4vY291cnNlL2NvdXJzZS5tb2R1bGUnO1xuaW1wb3J0IHsgQXNzZXNzbWVudE1vZHVsZSB9IGZyb20gJy4vYXNzZXNzbWVudC9hc3Nlc3NtZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBBbmFseXNpc01vZHVsZSB9IGZyb20gJy4vYW5hbHlzaXMvYW5hbHlzaXMubW9kdWxlJztcbmltcG9ydCB7IERhc2hib2FyZE1vZHVsZSB9IGZyb20gJy4vZGFzaGJvYXJkL2Rhc2hib2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ01TTW9kdWxlIH0gZnJvbSAnLi9jbXMvY21zLm1vZHVsZSc7XG5pbXBvcnQgeyBMTVNNb2R1bGUgfSBmcm9tICcuL2xtcy9sbXMubW9kdWxlJztcbmltcG9ydCB7IENvbXBldGVuY3lNb2R1bGUgfSBmcm9tICcuL2NvbXBldGVuY3kvY29tcGV0ZW5jeS5tb2R1bGUnO1xuaW1wb3J0IHsgSW50ZXJjZXB0SHR0cCB9IGZyb20gJy4vc2hhcmVkL2hlbHBlcnMvaW50ZXJjZXB0Lmh0dHAnO1xuaW1wb3J0IHsgU2VydmljZUxvY2F0b3IgfSBmcm9tICcuL3NlcnZpY2UubG9jYXRvcic7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tVHJhbnNsYXRpb25Mb2FkZXIgfSBmcm9tICcuL3NoYXJlZC9oZWxwZXJzL3RyYW5zbGF0aW9uLmxvYWRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBCcm93c2VyTW9kdWxlLFxuICAgICAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgICAgSHR0cE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgQXV0aE1vZHVsZSxcbiAgICAgICAgSG9tZU1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIERhc2hib2FyZE1vZHVsZSxcbiAgICAgICAgU2V0dGluZ01vZHVsZSxcbiAgICAgICAgQWNjb3VudE1vZHVsZSxcbiAgICAgICAgQ291cnNlTW9kdWxlLFxuICAgICAgICBBc3Nlc3NtZW50TW9kdWxlLFxuICAgICAgICBBbmFseXNpc01vZHVsZSxcbiAgICAgICAgV29ya2Zsb3dNb2R1bGUsXG4gICAgICAgIENNU01vZHVsZSxcbiAgICAgICAgQ29tcGV0ZW5jeU1vZHVsZSxcbiAgICAgICAgTE1TTW9kdWxlLFxuICAgICAgICBFcnBTaGFyZWRNb2R1bGUuZm9yUm9vdCgpLFxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgICAgICBsb2FkZXI6IHtwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsIHVzZUNsYXNzOiBDdXN0b21UcmFuc2xhdGlvbkxvYWRlcn1cbiAgICAgICAgfSlcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEFQUF9CQVNFX0hSRUYsXG4gICAgICAgICAgICB1c2VWYWx1ZTogJzwlPSBBUFBfQkFTRSAlPidcbiAgICAgICAgfSxcbiAgICAgICAgQmFzZVJlcXVlc3RPcHRpb25zLFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBIdHRwLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogKG9wdGlvbnM6IEJhc2VSZXF1ZXN0T3B0aW9ucywgcmVhbEJhY2tlbmQ6IFhIUkJhY2tlbmQpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZXJjZXB0SHR0cChyZWFsQmFja2VuZCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVwczogW0Jhc2VSZXF1ZXN0T3B0aW9ucywgWEhSQmFja2VuZF1cblxuICAgICAgICB9XG4gICAgXSxcbiAgICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG5cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBTZXJ2aWNlTG9jYXRvci5pbmplY3RvciA9IGluamVjdG9yO1xuICAgIH1cbn0iXX0=
