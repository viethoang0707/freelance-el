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
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var QuestionSheetPreviewDialog = (function (_super) {
    __extends(QuestionSheetPreviewDialog, _super);
    function QuestionSheetPreviewDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.questions = [];
        return _this;
    }
    QuestionSheetPreviewDialog.prototype.show = function (sheet, examQuestions) {
        this.display = true;
        this.examQuestions = examQuestions;
        this.sheet = sheet;
        this.startReview();
    };
    QuestionSheetPreviewDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetPreviewDialog.prototype.startReview = function () {
        var _this = this;
        exam_question_model_1.ExamQuestion.listBySheet(this, this.sheet.id).subscribe(function (examQuestions) {
            _this.examQuestions = examQuestions;
            exam_question_model_1.ExamQuestion.populateQuestions(_this, examQuestions).subscribe(function () {
                var questions = _.map(examQuestions, function (examQuestion) {
                    return examQuestion.question;
                });
                question_model_1.Question.populateOptions(_this, questions).subscribe(function () {
                    var componentHostArr = _this.questionsComponents.toArray();
                    for (var i = 0; i < examQuestions.length; i++) {
                        var examQuestion = examQuestions[i];
                        var componentHost = componentHostArr[i];
                        _this.displayQuestion(examQuestion, componentHost);
                    }
                });
            });
        });
    };
    QuestionSheetPreviewDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var question = examQuestion.question;
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(question);
        }
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], QuestionSheetPreviewDialog.prototype, "questionsComponents", void 0);
    QuestionSheetPreviewDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-preview-dialog',
            templateUrl: 'question-sheet-preview.dialog.component.html',
            styleUrls: ['question-sheet-preview.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], QuestionSheetPreviewDialog);
    return QuestionSheetPreviewDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetPreviewDialog = QuestionSheetPreviewDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXNoZWV0LXByZXZpZXcvcXVlc3Rpb24tc2hlZXQtcHJldmlldy5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF1SDtBQUt2SCxpRkFBK0U7QUFFL0UsNEZBQW9GO0FBSXBGLGtGQUEyRTtBQUkzRSw0SEFBeUg7QUFFekgsd0dBQXFHO0FBQ3JHLHFDQUFtQztBQUNuQyw4QkFBZ0M7QUFTaEM7SUFBZ0QsOENBQWE7SUFTekQsb0NBQW9CLHdCQUFrRDtRQUF0RSxZQUNJLGlCQUFPLFNBSVY7UUFMbUIsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUVsRSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7SUFDeEIsQ0FBQztJQUVELHlDQUFJLEdBQUosVUFBSyxLQUFvQixFQUFFLGFBQTZCO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQseUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnREFBVyxHQUFYO1FBQUEsaUJBaUJDO1FBaEJHLGtDQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGFBQWE7WUFDakUsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsa0NBQVksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFDLFlBQXlCO29CQUMzRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILHlCQUFRLENBQUMsZUFBZSxDQUFDLEtBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2hELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDM0MsSUFBSSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7cUJBQ3JEO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvREFBZSxHQUFmLFVBQWdCLFlBQTBCLEVBQUUsYUFBYTtRQUNyRCxJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3JDLElBQUksZUFBZSxHQUFHLHFDQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RELElBQUksZUFBZSxFQUFFO1lBQ2pCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlGLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFELFlBQVksQ0FBQyxRQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUN4QyxZQUFZLENBQUMsUUFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFsRHlDO1FBQXpDLG1CQUFZLENBQUMseURBQTBCLENBQUM7a0NBQXNCLGdCQUFTOzJFQUE2QjtJQVA1RiwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsU0FBUyxFQUFFLENBQUMsNkNBQTZDLENBQUM7U0FDN0QsQ0FBQzt5Q0FVZ0QsK0JBQXdCO09BVDdELDBCQUEwQixDQTBEdEM7SUFBRCxpQ0FBQztDQTFERCxBQTBEQyxDQTFEK0MsOEJBQWEsR0EwRDVEO0FBMURZLGdFQUEwQiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi1zaGVldC1wcmV2aWV3L3F1ZXN0aW9uLXNoZWV0LXByZXZpZXcuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgUFJJTlRfRElBTE9HX1NUWUxFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncXVlc3Rpb24tc2hlZXQtcHJldmlldy1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAncXVlc3Rpb24tc2hlZXQtcHJldmlldy5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydxdWVzdGlvbi1zaGVldC1wcmV2aWV3LmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uU2hlZXRQcmV2aWV3RGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBleGFtUXVlc3Rpb25zOiBFeGFtUXVlc3Rpb25bXTtcbiAgICBwcml2YXRlIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgICBwcml2YXRlIHNoZWV0OiBRdWVzdGlvblNoZWV0O1xuXG4gICAgQFZpZXdDaGlsZHJlbihRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSkgcXVlc3Rpb25zQ29tcG9uZW50czogUXVlcnlMaXN0PFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhhbVF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIHNob3coc2hlZXQ6IFF1ZXN0aW9uU2hlZXQsIGV4YW1RdWVzdGlvbnM6IEV4YW1RdWVzdGlvbltdKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZXhhbVF1ZXN0aW9ucyA9IGV4YW1RdWVzdGlvbnM7XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5zdGFydFJldmlldygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0UmV2aWV3KCkge1xuICAgICAgICBFeGFtUXVlc3Rpb24ubGlzdEJ5U2hlZXQodGhpcywgdGhpcy5zaGVldC5pZCkuc3Vic2NyaWJlKGV4YW1RdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtUXVlc3Rpb25zID0gZXhhbVF1ZXN0aW9ucztcbiAgICAgICAgICAgIEV4YW1RdWVzdGlvbi5wb3B1bGF0ZVF1ZXN0aW9ucyh0aGlzLCBleGFtUXVlc3Rpb25zKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBxdWVzdGlvbnMgPSBfLm1hcChleGFtUXVlc3Rpb25zLCAoZXhhbVF1ZXN0aW9uOkV4YW1RdWVzdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGFtUXVlc3Rpb24ucXVlc3Rpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgUXVlc3Rpb24ucG9wdWxhdGVPcHRpb25zKHRoaXMsIHF1ZXN0aW9ucykuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50SG9zdEFyciA9IHRoaXMucXVlc3Rpb25zQ29tcG9uZW50cy50b0FycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhhbVF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4YW1RdWVzdGlvbiA9IGV4YW1RdWVzdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50SG9zdCA9IGNvbXBvbmVudEhvc3RBcnJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlRdWVzdGlvbihleGFtUXVlc3Rpb24sIGNvbXBvbmVudEhvc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc3BsYXlRdWVzdGlvbihleGFtUXVlc3Rpb246IEV4YW1RdWVzdGlvbiwgY29tcG9uZW50SG9zdCkge1xuICAgICAgICB2YXIgcXVlc3Rpb24gPSBleGFtUXVlc3Rpb24ucXVlc3Rpb247XG4gICAgICAgIHZhciBkZXRhaWxDb21wb25lbnQgPSBRdWVzdGlvblJlZ2lzdGVyLkluc3RhbmNlLmxvb2t1cChxdWVzdGlvbi50eXBlKTtcbiAgICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBjb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICAgIGlmIChkZXRhaWxDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdwcmV2aWV3JztcbiAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKHF1ZXN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbiJdfQ==
