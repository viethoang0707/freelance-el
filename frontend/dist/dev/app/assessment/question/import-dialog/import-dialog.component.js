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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var option_model_1 = require("../../../shared/models/elearning/option.model");
var _ = require("underscore");
var excel_service_1 = require("../../../shared/services/excel.service");
var QuestionImportDialog = (function (_super) {
    __extends(QuestionImportDialog, _super);
    function QuestionImportDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.onImportCompleteReceiver = new Rx_1.Subject();
        _this.onImportComplete = _this.onImportCompleteReceiver.asObservable();
        _this.display = false;
        _this.records = [];
        return _this;
    }
    QuestionImportDialog.prototype.show = function () {
        this.display = true;
        this.percentage = 0;
    };
    QuestionImportDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionImportDialog.prototype.import = function () {
        var _this = this;
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            var questionList = [];
            var optionList = [];
            for (var i = 0; i < _this.records.length;) {
                var record = _this.records[i];
                var question = new question_model_1.Question();
                Object.assign(question, record);
                var group = _.find(groups, function (obj) {
                    return obj.code == record["group_code"];
                });
                var type = record["type"];
                if (group && type) {
                    question.group_id = group.id;
                    question.type = type;
                    var options = [];
                    var optionLength = 1;
                    while (i + optionLength < _this.records.length && !_this.records[i + optionLength]["group_code"])
                        optionLength++;
                    if ((type == "sc" || type == "mc") && optionLength) {
                        for (var j = 0; j < optionLength && i < _this.records.length; j++) {
                            var optionRecord = _this.records[j + i];
                            var option = new option_model_1.QuestionOption();
                            option.is_correct = optionRecord["correct"] == 'Y';
                            option.content = optionRecord["option"];
                            options.push(option);
                        }
                        optionList.push(_.shuffle(options));
                    }
                    else
                        optionList.push([]);
                    i += optionLength;
                }
                else
                    i++;
                questionList.push(question);
            }
            question_model_1.Question.importQuestion(_this, questionList, optionList).subscribe(function () {
                _this.onImportCompleteReceiver.next();
                _this.hide();
            });
        });
    };
    QuestionImportDialog.prototype.changeListner = function (event) {
        var _this = this;
        var file = event.files[0];
        this.fileName = file.name;
        this.excelService.importFromExcelFile(file).subscribe(function (data) {
            _this.records = data;
            _this.total = _this.records.length;
        });
    };
    QuestionImportDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-import-dialog',
            templateUrl: 'import-dialog.component.html',
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], QuestionImportDialog);
    return QuestionImportDialog;
}(base_component_1.BaseComponent));
exports.QuestionImportDialog = QuestionImportDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL2ltcG9ydC1kaWFsb2cvaW1wb3J0LWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDhCQUE4QztBQUc5Qyw0RUFBcUU7QUFDckUsaUZBQStFO0FBQy9FLGtGQUEyRTtBQUMzRSw4RUFBK0U7QUFDL0UsOEJBQWdDO0FBR2hDLHdFQUFzRTtBQVF0RTtJQUEwQyx3Q0FBYTtJQVd0RCw4QkFBb0IsWUFBMEI7UUFBOUMsWUFDQyxpQkFBTyxTQUdQO1FBSm1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBSHRDLDhCQUF3QixHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQy9ELHNCQUFnQixHQUFvQixLQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJaEYsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0lBQ25CLENBQUM7SUFFRCxtQ0FBSSxHQUFKO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUFBLGlCQXdDQztRQXZDQSxtQkFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDN0MsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUc7Z0JBQ3pD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QUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBM0VXLG9CQUFvQjtRQUxoQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLDhCQUE4QjtTQUMzQyxDQUFDO3lDQVlpQyw0QkFBWTtPQVhsQyxvQkFBb0IsQ0E4RWhDO0lBQUQsMkJBQUM7Q0E5RUQsQUE4RUMsQ0E5RXlDLDhCQUFhLEdBOEV0RDtBQTlFWSxvREFBb0IiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vaW1wb3J0LWRpYWxvZy9pbXBvcnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3F1ZXN0aW9uLWltcG9ydC1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2ltcG9ydC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkltcG9ydERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSBmaWxlTmFtZTogc3RyaW5nO1xuXHRwcml2YXRlIHJlY29yZHM6IGFueVtdO1xuXHRwcml2YXRlIHBlcmNlbnRhZ2U6IG51bWJlcjtcblx0cHJpdmF0ZSBjb21wbGV0ZWQ6IG51bWJlcjtcblx0cHJpdmF0ZSB0b3RhbDogbnVtYmVyO1xuXHRwcml2YXRlIG9uSW1wb3J0Q29tcGxldGVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25JbXBvcnRDb21wbGV0ZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vbkltcG9ydENvbXBsZXRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5yZWNvcmRzID0gW107XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5wZXJjZW50YWdlID0gMDtcblx0fVxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRpbXBvcnQoKSB7XG5cdFx0R3JvdXAubGlzdFF1ZXN0aW9uR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG5cdFx0XHR2YXIgcXVlc3Rpb25MaXN0ID0gW107XG5cdFx0XHR2YXIgb3B0aW9uTGlzdCA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlY29yZHMubGVuZ3RoOykge1xuXHRcdFx0XHR2YXIgcmVjb3JkID0gdGhpcy5yZWNvcmRzW2ldO1xuXHRcdFx0XHR2YXIgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb24oKTtcblx0XHRcdFx0T2JqZWN0LmFzc2lnbihxdWVzdGlvbiwgcmVjb3JkKTtcblx0XHRcdFx0dmFyIGdyb3VwID0gXy5maW5kKGdyb3VwcywgKG9iajogR3JvdXApID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqLmNvZGUgPT0gcmVjb3JkW1wiZ3JvdXBfY29kZVwiXTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHZhciB0eXBlID0gcmVjb3JkW1widHlwZVwiXTtcblx0XHRcdFx0aWYgKGdyb3VwICYmIHR5cGUpIHtcblx0XHRcdFx0XHRxdWVzdGlvbi5ncm91cF9pZCA9IGdyb3VwLmlkO1xuXHRcdFx0XHRcdHF1ZXN0aW9uLnR5cGUgPSB0eXBlO1xuXHRcdFx0XHRcdHZhciBvcHRpb25zID0gW107XG5cdFx0XHRcdFx0dmFyIG9wdGlvbkxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0d2hpbGUgKGkgKyBvcHRpb25MZW5ndGggPCB0aGlzLnJlY29yZHMubGVuZ3RoICYmICF0aGlzLnJlY29yZHNbaSArIG9wdGlvbkxlbmd0aF1bXCJncm91cF9jb2RlXCJdKSBcblx0XHRcdFx0XHRcdG9wdGlvbkxlbmd0aCsrO1xuXHRcdFx0XHRcdGlmICgodHlwZSA9PSBcInNjXCIgfHwgdHlwZSA9PSBcIm1jXCIpICYmIG9wdGlvbkxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBvcHRpb25MZW5ndGggJiYgaSA8IHRoaXMucmVjb3Jkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uUmVjb3JkID0gdGhpcy5yZWNvcmRzW2ogKyBpXTtcblx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9IG5ldyBRdWVzdGlvbk9wdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uaXNfY29ycmVjdCA9IG9wdGlvblJlY29yZFtcImNvcnJlY3RcIl0gPT0gJ1knO1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uY29udGVudCA9IG9wdGlvblJlY29yZFtcIm9wdGlvblwiXTtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRvcHRpb25MaXN0LnB1c2goIF8uc2h1ZmZsZShvcHRpb25zKSk7XG5cdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRvcHRpb25MaXN0LnB1c2goW10pXG5cdFx0XHRcdFx0aSArPSBvcHRpb25MZW5ndGg7XG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdGkrKztcblx0XHRcdFx0cXVlc3Rpb25MaXN0LnB1c2gocXVlc3Rpb24pO1xuXHRcdFx0fVxuXHRcdFx0UXVlc3Rpb24uaW1wb3J0UXVlc3Rpb24odGhpcyxxdWVzdGlvbkxpc3QsIG9wdGlvbkxpc3QpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdFx0dGhpcy5vbkltcG9ydENvbXBsZXRlUmVjZWl2ZXIubmV4dCgpO1xuXHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxuXHRjaGFuZ2VMaXN0bmVyKGV2ZW50OiBhbnkpIHtcblx0XHR2YXIgZmlsZSA9IGV2ZW50LmZpbGVzWzBdO1xuXHRcdHRoaXMuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cdFx0dGhpcy5leGNlbFNlcnZpY2UuaW1wb3J0RnJvbUV4Y2VsRmlsZShmaWxlKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG5cdFx0XHR0aGlzLnJlY29yZHMgPSBkYXRhO1xuXHRcdFx0dGhpcy50b3RhbCA9IHRoaXMucmVjb3Jkcy5sZW5ndGg7XG5cdFx0fSlcblx0fVxuXG5cbn0iXX0=
