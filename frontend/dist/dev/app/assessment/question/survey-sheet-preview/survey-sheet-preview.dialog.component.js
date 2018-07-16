"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_component_1 = require("../../../shared/components/base/base.component");
var survey_question_model_1 = require("../../../shared/models/elearning/survey-question.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var SurveySheetPreviewDialog = (function (_super) {
    __extends(SurveySheetPreviewDialog, _super);
    function SurveySheetPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.surveyQuestions = [];
        return _this;
    }
    SurveySheetPreviewDialog.prototype.show = function (sheet) {
        this.display = true;
        this.surveyQuestions = [];
        this.sheet = sheet;
        this.startReview();
    };
    SurveySheetPreviewDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveySheetPreviewDialog.prototype.startReview = function () {
        var _this = this;
        survey_question_model_1.SurveyQuestion.listBySheet(this, this.sheet.id).subscribe(function (surveyQuestions) {
            survey_question_model_1.SurveyQuestion.populateQuestions(_this, surveyQuestions).subscribe(function () {
                _this.surveyQuestions = surveyQuestions;
                var questions = _.map(surveyQuestions, function (surveyQuestion) {
                    return surveyQuestion.question;
                });
                question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                    var componentHostArr = _this.questionsComponents.toArray();
                    for (var i = 0; i < surveyQuestions.length; i++) {
                        var surveyQuestion = surveyQuestions[i];
                        var componentHost = componentHostArr[i];
                        _this.displayQuestion(surveyQuestion, componentHost);
                    }
                });
            });
        });
    };
    SurveySheetPreviewDialog.prototype.displayQuestion = function (surveyQuestion, componentHost) {
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(surveyQuestion.question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(surveyQuestion.question);
        }
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], SurveySheetPreviewDialog.prototype, "questionsComponents", void 0);
    SurveySheetPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-sheet-preview-dialog',
            templateUrl: 'survey-sheet-preview.dialog.component.html',
            styleUrls: ['survey-sheet-preview.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], SurveySheetPreviewDialog);
    return SurveySheetPreviewDialog;
}(base_component_1.BaseComponent));
exports.SurveySheetPreviewDialog = SurveySheetPreviewDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3N1cnZleS1zaGVldC1wcmV2aWV3L3N1cnZleS1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVIO0FBS3ZILGlGQUErRTtBQUUvRSxnR0FBd0Y7QUFJeEYsa0ZBQTJFO0FBSTNFLDRIQUF5SDtBQUV6SCx3R0FBcUc7QUFDckcscUNBQW1DO0FBQ25DLDhCQUFnQztBQVFoQztJQUE4Qyw0Q0FBYTtJQVF2RCxrQ0FBb0Isd0JBQWtEO1FBQXRFLFlBQ0ksaUJBQU8sU0FHVjtRQUptQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBRWxFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDOztJQUM5QixDQUFDO0lBRUQsdUNBQUksR0FBSixVQUFLLEtBQWtCO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBbUJDO1FBbEJHLHNDQUFjLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDckUsc0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM5RCxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztnQkFDdkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBQyxjQUE2QjtvQkFDakUsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQztnQkFDSCx5QkFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUMvQyxJQUFJLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzdDLElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLEtBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3FCQUN2RDtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFBO1FBR04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0RBQWUsR0FBZixVQUFnQixjQUE4QixFQUFFLGFBQWE7UUFDckQsSUFBSSxlQUFlLEdBQUcscUNBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JGLElBQUksZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RELElBQUksZUFBZSxFQUFFO1lBQ2pCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlGLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFELFlBQVksQ0FBQyxRQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUN4QyxZQUFZLENBQUMsUUFBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEU7SUFDVCxDQUFDO0lBbER5QztRQUF6QyxtQkFBWSxDQUFDLHlEQUEwQixDQUFDO2tDQUFzQixnQkFBUzt5RUFBNkI7SUFONUYsd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFNBQVMsRUFBRSxDQUFDLDJDQUEyQyxDQUFDO1NBQzNELENBQUM7eUNBU2dELCtCQUF3QjtPQVI3RCx3QkFBd0IsQ0F5RHBDO0lBQUQsK0JBQUM7Q0F6REQsQUF5REMsQ0F6RDZDLDhCQUFhLEdBeUQxRDtBQXpEWSw0REFBd0IiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vc3VydmV5LXNoZWV0LXByZXZpZXcvc3VydmV5LXNoZWV0LXByZXZpZXcuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgU3VydmV5UXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdXJ2ZXktcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jbG91ZC90b2tlbi5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFN1cnZleVNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VydmV5LXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc3VydmV5LXNoZWV0LXByZXZpZXctZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3N1cnZleS1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3N1cnZleS1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFN1cnZleVNoZWV0UHJldmlld0RpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICAgIFxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIHN1cnZleVF1ZXN0aW9uczogU3VydmV5UXVlc3Rpb25bXTtcbiAgICBwcml2YXRlIHNoZWV0OiBTdXJ2ZXlTaGVldDtcblxuICAgIEBWaWV3Q2hpbGRyZW4oUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUpIHF1ZXN0aW9uc0NvbXBvbmVudHM6IFF1ZXJ5TGlzdDxRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1cnZleVF1ZXN0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIHNob3coc2hlZXQ6IFN1cnZleVNoZWV0KSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMuc3VydmV5UXVlc3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5zdGFydFJldmlldygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0UmV2aWV3KCkge1xuICAgICAgICBTdXJ2ZXlRdWVzdGlvbi5saXN0QnlTaGVldCh0aGlzLCB0aGlzLnNoZWV0LmlkKS5zdWJzY3JpYmUoc3VydmV5UXVlc3Rpb25zID0+IHtcbiAgICAgICAgICAgIFN1cnZleVF1ZXN0aW9uLnBvcHVsYXRlUXVlc3Rpb25zKHRoaXMsIHN1cnZleVF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VydmV5UXVlc3Rpb25zID0gc3VydmV5UXVlc3Rpb25zO1xuICAgICAgICAgICAgICAgIHZhciBxdWVzdGlvbnMgPSBfLm1hcChzdXJ2ZXlRdWVzdGlvbnMsIChzdXJ2ZXlRdWVzdGlvbjpTdXJ2ZXlRdWVzdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlRdWVzdGlvbi5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBRdWVzdGlvbi5wb3B1bGF0ZU9wdGlvbnModGhpcyxxdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEhvc3RBcnIgPSB0aGlzLnF1ZXN0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1cnZleVF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1cnZleVF1ZXN0aW9uID0gc3VydmV5UXVlc3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEhvc3QgPSBjb21wb25lbnRIb3N0QXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UXVlc3Rpb24oc3VydmV5UXVlc3Rpb24sIGNvbXBvbmVudEhvc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzcGxheVF1ZXN0aW9uKHN1cnZleVF1ZXN0aW9uOiBTdXJ2ZXlRdWVzdGlvbiwgY29tcG9uZW50SG9zdCkge1xuICAgICAgICAgICAgdmFyIGRldGFpbENvbXBvbmVudCA9IFF1ZXN0aW9uUmVnaXN0ZXIuSW5zdGFuY2UubG9va3VwKHN1cnZleVF1ZXN0aW9uLnF1ZXN0aW9uLnR5cGUpO1xuICAgICAgICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBjb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICAgICAgICBpZiAoZGV0YWlsQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShkZXRhaWxDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgKDxJUXVlc3Rpb24+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5tb2RlID0gJ3ByZXZpZXcnO1xuICAgICAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKHN1cnZleVF1ZXN0aW9uLnF1ZXN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iXX0=
