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
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var question_container_directive_1 = require("../../../assessment/question/question-template/question-container.directive");
var question_decorator_1 = require("../../../assessment/question/question-template/question.decorator");
require("rxjs/add/observable/timer");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var QuestionSheetPrintDialog = (function (_super) {
    __extends(QuestionSheetPrintDialog, _super);
    function QuestionSheetPrintDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.display = false;
        _this.examQuestions = [];
        _this.exam = new exam_model_1.Exam();
        return _this;
    }
    QuestionSheetPrintDialog.prototype.show = function (exam, sheet) {
        this.display = true;
        this.examQuestions = [];
        this.exam = exam;
        this.sheet = sheet;
        this.startReview();
    };
    QuestionSheetPrintDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetPrintDialog.prototype.startReview = function () {
        var _this = this;
        exam_question_model_1.ExamQuestion.listBySheet(this, this.sheet.id).subscribe(function (examQuestions) {
            _this.examQuestions = examQuestions;
            exam_question_model_1.ExamQuestion.populateQuestions(_this, _this.examQuestions).subscribe(function () {
                var questions = _.map(_this.examQuestions, function (examQuestion) {
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
    QuestionSheetPrintDialog.prototype.displayQuestion = function (examQuestion, componentHost) {
        var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(examQuestion.question.type);
        var viewContainerRef = componentHost.viewContainerRef;
        if (detailComponent) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.mode = 'preview';
            componentRef.instance.render(examQuestion.question);
        }
    };
    QuestionSheetPrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                " + constants_1.PRINT_DIALOG_STYLE + "\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
        popupWin.document.close();
    };
    __decorate([
        core_1.ViewChildren(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", core_1.QueryList)
    ], QuestionSheetPrintDialog.prototype, "questionsComponents", void 0);
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], QuestionSheetPrintDialog.prototype, "printSection", void 0);
    QuestionSheetPrintDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-print-dialog',
            templateUrl: 'question-sheet-print.dialog.component.html',
            styleUrls: ['question-sheet-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], QuestionSheetPrintDialog);
    return QuestionSheetPrintDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetPrintDialog = QuestionSheetPrintDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9xdWVzdGlvbi1zaGVldC1wcmludC9xdWVzdGlvbi1zaGVldC1wcmludC5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF1SDtBQUt2SCxpRkFBK0U7QUFDL0UsMEVBQW1FO0FBQ25FLDRGQUFvRjtBQUlwRixrRkFBMkU7QUFJM0UsNEhBQXlIO0FBRXpILHdHQUFxRztBQUNyRyxxQ0FBbUM7QUFDbkMsOEJBQWdDO0FBQ2hDLDhEQUFxRTtBQVFyRTtJQUE4Qyw0Q0FBYTtJQVV2RCxrQ0FBb0Isd0JBQWtEO1FBQXRFLFlBQ0ksaUJBQU8sU0FJVjtRQUxtQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBRWxFLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7O0lBQzNCLENBQUM7SUFFRCx1Q0FBSSxHQUFKLFVBQUssSUFBVSxFQUFFLEtBQW9CO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBa0JDO1FBakJHLGtDQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLGFB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QTdFNkMsOEJBQWEsR0E2RTFEO0FBN0VZLDREQUF3QiIsImZpbGUiOiJhcHAvbG1zL2V4YW0vcXVlc3Rpb24tc2hlZXQtcHJpbnQvcXVlc3Rpb24tc2hlZXQtcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2Nsb3VkL3Rva2VuLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEV4YW1NZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLW1lbWJlci5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25SZWdpc3RlciB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtQUklOVF9ESUFMT0dfU1RZTEV9IGZyb20gICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdxdWVzdGlvbi1zaGVldC1wcmludC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAncXVlc3Rpb24tc2hlZXQtcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncXVlc3Rpb24tc2hlZXQtcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TaGVldFByaW50RGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gICAgXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuICAgIHByaXZhdGUgZXhhbVF1ZXN0aW9uczogRXhhbVF1ZXN0aW9uW107XG4gICAgcHJpdmF0ZSBleGFtOiBFeGFtO1xuICAgIHByaXZhdGUgc2hlZXQ6IFF1ZXN0aW9uU2hlZXQ7XG5cbiAgICBAVmlld0NoaWxkcmVuKFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlKSBxdWVzdGlvbnNDb21wb25lbnRzOiBRdWVyeUxpc3Q8UXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmU+O1xuICAgIEBWaWV3Q2hpbGQoJ3ByaW50U2VjdGlvbicpIHByaW50U2VjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXhhbVF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmV4YW0gPSBuZXcgRXhhbSgpO1xuICAgIH1cblxuICAgIHNob3coZXhhbTogRXhhbSwgc2hlZXQ6IFF1ZXN0aW9uU2hlZXQpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leGFtUXVlc3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuZXhhbSA9IGV4YW07XG4gICAgICAgIHRoaXMuc2hlZXQgPSBzaGVldDtcbiAgICAgICAgdGhpcy5zdGFydFJldmlldygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0UmV2aWV3KCkge1xuICAgICAgICBFeGFtUXVlc3Rpb24ubGlzdEJ5U2hlZXQodGhpcywgdGhpcy5zaGVldC5pZCkuc3Vic2NyaWJlKGV4YW1RdWVzdGlvbnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtUXVlc3Rpb25zID0gZXhhbVF1ZXN0aW9ucztcbiAgICAgICAgICAgIEV4YW1RdWVzdGlvbi5wb3B1bGF0ZVF1ZXN0aW9ucyh0aGlzLCB0aGlzLmV4YW1RdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlc3Rpb25zID0gXy5tYXAodGhpcy5leGFtUXVlc3Rpb25zLCAoZXhhbVF1ZXN0aW9uOkV4YW1RdWVzdGlvbik9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGFtUXVlc3Rpb24ucXVlc3Rpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBRdWVzdGlvbi5wb3B1bGF0ZU9wdGlvbnModGhpcyxxdWVzdGlvbnMpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEhvc3RBcnIgPSB0aGlzLnF1ZXN0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4YW1RdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGFtUXVlc3Rpb24gPSBleGFtUXVlc3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEhvc3QgPSBjb21wb25lbnRIb3N0QXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UXVlc3Rpb24oZXhhbVF1ZXN0aW9uLCBjb21wb25lbnRIb3N0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5UXVlc3Rpb24oZXhhbVF1ZXN0aW9uOiBFeGFtUXVlc3Rpb24sIGNvbXBvbmVudEhvc3QpIHtcbiAgICAgICAgdmFyIGRldGFpbENvbXBvbmVudCA9IFF1ZXN0aW9uUmVnaXN0ZXIuSW5zdGFuY2UubG9va3VwKGV4YW1RdWVzdGlvbi5xdWVzdGlvbi50eXBlKTtcbiAgICAgICAgbGV0IHZpZXdDb250YWluZXJSZWYgPSBjb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XG4gICAgICAgIGlmIChkZXRhaWxDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdwcmV2aWV3JztcbiAgICAgICAgICAgICg8SVF1ZXN0aW9uPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkucmVuZGVyKGV4YW1RdWVzdGlvbi5xdWVzdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmludCgpIHtcbiAgICAgICAgbGV0IHByaW50Q29udGVudHMsIHBvcHVwV2luO1xuICAgICAgICBwcmludENvbnRlbnRzID0gdGhpcy5wcmludFNlY3Rpb24ubmF0aXZlRWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIHBvcHVwV2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnLCAndG9wPTAsbGVmdD0wLGhlaWdodD0xMDAlLHdpZHRoPWF1dG8nKTtcbiAgICAgICAgcG9wdXBXaW4uZG9jdW1lbnQub3BlbigpO1xuICAgICAgICBwb3B1cFdpbi5kb2N1bWVudC53cml0ZShgXG4gICAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICA8dGl0bGU+RXhhbSBwYXBlcjwvdGl0bGU+XG4gICAgICAgICAgICAgICAgJHtQUklOVF9ESUFMT0dfU1RZTEV9XG4gICAgICAgICAgICA8L2hlYWQ+XG4gICAgICAgICAgICA8Ym9keSBvbmxvYWQ9XCJ3aW5kb3cucHJpbnQoKTt3aW5kb3cuY2xvc2UoKVwiPiR7cHJpbnRDb250ZW50c308L2JvZHk+XG4gICAgICAgICAgPC9odG1sPmBcbiAgICAgICAgKTtcbiAgICAgICAgcG9wdXBXaW4uZG9jdW1lbnQuY2xvc2UoKTtcbiAgICB9XG59XG5cblxuXG4iXX0=
