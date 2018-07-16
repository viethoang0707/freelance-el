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
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var answer_model_1 = require("../../../shared/models/elearning/answer.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var question_sheet_model_1 = require("../../../shared/models/elearning/question-sheet.model");
var base_model_1 = require("../../../shared/models/base.model");
var QuestionMarkingDialog = (function (_super) {
    __extends(QuestionMarkingDialog, _super);
    function QuestionMarkingDialog() {
        var _this = _super.call(this) || this;
        _this.onMarkCompleteReceiver = new Rx_1.Subject();
        _this.onMarkComplete = _this.onMarkCompleteReceiver.asObservable();
        _this.display = false;
        _this.answers = [];
        _this.questions = {};
        _this.member = new exam_member_model_1.ExamMember();
        return _this;
    }
    QuestionMarkingDialog.prototype.show = function (member, submit) {
        var _this = this;
        this.display = true;
        this.questions = {};
        this.member = member;
        this.submit = submit;
        base_model_1.BaseModel.bulk_search(this, question_sheet_model_1.QuestionSheet.__api__byExam(this.submit.exam_id), answer_model_1.Answer.__api__listBySubmit(this.submit.id))
            .subscribe(function (jsonArr) {
            var sheetList = question_sheet_model_1.QuestionSheet.toArray(jsonArr[0]);
            _this.answers = answer_model_1.Answer.toArray(jsonArr[1]);
            if (sheetList.length) {
                exam_question_model_1.ExamQuestion.listBySheet(_this, sheetList[0].id).subscribe(function (examQuestions) {
                    _.each(examQuestions, function (question) {
                        _this.questions[question.question_id] = question;
                    });
                    _this.markAnswers = _.filter(_this.answers, function (ans) {
                        var question = _.find(examQuestions, function (q) {
                            return ans.question_id == q.question_id;
                        });
                        return question && question.type == 'ext';
                    });
                });
            }
        });
    };
    QuestionMarkingDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionMarkingDialog.prototype.save = function () {
        var _this = this;
        answer_model_1.Answer.updateArray(this, this.answers).subscribe(function () {
            _this.success(_this.translateService.instant('Marking saved sucessfully'));
            _this.onMarkCompleteReceiver.next();
            _this.hide();
        });
    };
    QuestionMarkingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-marking-dialog',
            templateUrl: 'question-marking.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], QuestionMarkingDialog);
    return QuestionMarkingDialog;
}(base_component_1.BaseComponent));
exports.QuestionMarkingDialog = QuestionMarkingDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9xdWVzdGlvbi1tYXJraW5nL3F1ZXN0aW9uLW1hcmtpbmcuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsOEJBQThDO0FBQzlDLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFLaEMsOEVBQXVFO0FBQ3ZFLDRGQUFvRjtBQUNwRix3RkFBZ0Y7QUFFaEYsOEZBQXNGO0FBQ3RGLGdFQUE4RDtBQVE5RDtJQUEyQyx5Q0FBYTtJQVl2RDtRQUFBLFlBQ0MsaUJBQU8sU0FLUDtRQVZPLDRCQUFzQixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzdELG9CQUFjLEdBQW9CLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUs1RSxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDOztJQUNoQyxDQUFDO0lBRUQsb0NBQUksR0FBSixVQUFLLE1BQWtCLEVBQUUsTUFBa0I7UUFBM0MsaUJBMEJDO1FBekJBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLHNCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFDekIsb0NBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDaEQscUJBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDakIsSUFBSSxTQUFTLEdBQUcsb0NBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxxQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLGtDQUFZLENBQUMsV0FBVyxDQUFDLEtBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsYUFBYTtvQkFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsVUFBQyxRQUFzQjt3QkFDNUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUNqRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQVc7d0JBQ3JELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQUMsQ0FBZTs0QkFDcEQsT0FBTyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUM7d0JBQ3pDLENBQUMsQ0FBQyxDQUFDO3dCQUNILE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDO29CQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBSSxHQUFKO1FBQUEsaUJBTUM7UUFMQSxxQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNoRCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUExRFcscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxXQUFXLEVBQUUsd0NBQXdDO1NBQ3JELENBQUM7O09BQ1cscUJBQXFCLENBMkRqQztJQUFELDRCQUFDO0NBM0RELEFBMkRDLENBM0QwQyw4QkFBYSxHQTJEdkQ7QUEzRFksc0RBQXFCIiwiZmlsZSI6ImFwcC9sbXMvZXhhbS9xdWVzdGlvbi1tYXJraW5nL3F1ZXN0aW9uLW1hcmtpbmcuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgRVhBTV9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25TaGVldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLXNoZWV0Lm1vZGVsJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncXVlc3Rpb24tbWFya2luZy1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3F1ZXN0aW9uLW1hcmtpbmcuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXJraW5nRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cblx0cHJpdmF0ZSBkaXNwbGF5OiBib29sZWFuO1xuXHRwcml2YXRlIHN1Ym1pdDogU3VibWlzc2lvbjtcblx0cHJpdmF0ZSBhbnN3ZXJzOiBBbnN3ZXJbXTtcblx0cHJpdmF0ZSBtYXJrQW5zd2VyczogQW5zd2VyW107XG5cdHByaXZhdGUgcXVlc3Rpb25zOiBhbnk7XG5cdHByaXZhdGUgbWVtYmVyOiBFeGFtTWVtYmVyO1xuXHRwcml2YXRlIG9uTWFya0NvbXBsZXRlUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cdG9uTWFya0NvbXBsZXRlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uTWFya0NvbXBsZXRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuYW5zd2VycyA9IFtdO1xuXHRcdHRoaXMucXVlc3Rpb25zID0ge307XG5cdFx0dGhpcy5tZW1iZXIgPSBuZXcgRXhhbU1lbWJlcigpO1xuXHR9XG5cblx0c2hvdyhtZW1iZXI6IEV4YW1NZW1iZXIsIHN1Ym1pdDogU3VibWlzc2lvbikge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5xdWVzdGlvbnMgPSB7fTtcblx0XHR0aGlzLm1lbWJlciA9IG1lbWJlcjtcblx0XHR0aGlzLnN1Ym1pdCA9IHN1Ym1pdDtcblxuXHRcdEJhc2VNb2RlbC5idWxrX3NlYXJjaCh0aGlzLFxuXHRcdFx0UXVlc3Rpb25TaGVldC5fX2FwaV9fYnlFeGFtKHRoaXMuc3VibWl0LmV4YW1faWQpLFxuXHRcdFx0QW5zd2VyLl9fYXBpX19saXN0QnlTdWJtaXQodGhpcy5zdWJtaXQuaWQpKVxuXHRcdFx0LnN1YnNjcmliZShqc29uQXJyID0+IHtcblx0XHRcdFx0dmFyIHNoZWV0TGlzdCA9IFF1ZXN0aW9uU2hlZXQudG9BcnJheShqc29uQXJyWzBdKTtcblx0XHRcdFx0dGhpcy5hbnN3ZXJzID0gQW5zd2VyLnRvQXJyYXkoanNvbkFyclsxXSk7XG5cdFx0XHRcdGlmIChzaGVldExpc3QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0RXhhbVF1ZXN0aW9uLmxpc3RCeVNoZWV0KHRoaXMsIHNoZWV0TGlzdFswXS5pZCkuc3Vic2NyaWJlKGV4YW1RdWVzdGlvbnMgPT4ge1xuXHRcdFx0XHRcdFx0Xy5lYWNoKGV4YW1RdWVzdGlvbnMsIChxdWVzdGlvbjogRXhhbVF1ZXN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucXVlc3Rpb25zW3F1ZXN0aW9uLnF1ZXN0aW9uX2lkXSA9IHF1ZXN0aW9uO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR0aGlzLm1hcmtBbnN3ZXJzID0gXy5maWx0ZXIodGhpcy5hbnN3ZXJzLCAoYW5zOiBBbnN3ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0dmFyIHF1ZXN0aW9uID0gXy5maW5kKGV4YW1RdWVzdGlvbnMsIChxOiBFeGFtUXVlc3Rpb24pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYW5zLnF1ZXN0aW9uX2lkID09IHEucXVlc3Rpb25faWQ7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcXVlc3Rpb24gJiYgcXVlc3Rpb24udHlwZSA9PSAnZXh0Jztcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRzYXZlKCkge1xuXHRcdEFuc3dlci51cGRhdGVBcnJheSh0aGlzLCB0aGlzLmFuc3dlcnMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ01hcmtpbmcgc2F2ZWQgc3VjZXNzZnVsbHknKSk7XG5cdFx0XHR0aGlzLm9uTWFya0NvbXBsZXRlUmVjZWl2ZXIubmV4dCgpO1xuXHRcdFx0dGhpcy5oaWRlKCk7XG5cdFx0fSk7XG5cdH1cbn0iXX0=
