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
var option_model_1 = require("../../../../shared/models/elearning/option.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var _ = require("underscore");
var question_decorator_1 = require("../question.decorator");
var MultiChoiceQuestionComponent = (function (_super) {
    __extends(MultiChoiceQuestionComponent, _super);
    function MultiChoiceQuestionComponent() {
        var _this = _super.call(this) || this;
        _this.options = [];
        return _this;
    }
    MultiChoiceQuestionComponent.prototype.render = function (question, answer) {
        this.question = question;
        this.answer = answer;
        if (this.question.id) {
            this.options = question.options;
            if (this.answer && this.answer.id) {
                var selectedOptions = JSON.parse(this.answer.json);
                _.each(this.options, (function (option) {
                    var selected = _.find(selectedOptions, function (obj) {
                        return obj == option.id;
                    });
                    if (selected)
                        option["is_selected"] = true;
                    option["is_selected"] = false;
                }));
            }
        }
    };
    MultiChoiceQuestionComponent.prototype.saveEditor = function () {
        var _this = this;
        return this.question.save(this).flatMap(function () {
            _.each(_this.options, function (option) {
                option.question_id = _this.question.id;
            });
            var existOptions = _.filter(_this.options, function (option) {
                return !option.IsNew;
            });
            var newOptions = _.filter(_this.options, function (option) {
                return option.IsNew;
            });
            return Rx_1.Observable.forkJoin(option_model_1.QuestionOption.updateArray(_this, existOptions), option_model_1.QuestionOption.createArray(_this, newOptions));
        });
    };
    MultiChoiceQuestionComponent.prototype.concludeAnswer = function () {
        var _this = this;
        this.answer.is_correct = true;
        var selectedOptions = _.filter(this.options, function (option) {
            return option["is_selected"];
        });
        this.answer.json = JSON.stringify(_.pluck(selectedOptions, "id"));
        _.each(this.options, (function (option) {
            if ((option.is_correct && !option["]is_selected"]) || (!option.is_correct && option["is_selected"]))
                _this.answer.is_correct = false;
        }));
    };
    MultiChoiceQuestionComponent.prototype.addOption = function () {
        this.options.push(new option_model_1.QuestionOption());
    };
    MultiChoiceQuestionComponent.prototype.removeOption = function (option) {
        var _this = this;
        if (option.id) {
            option.delete(this).subscribe(function () {
                _this.question.options = _this.options = _.reject(_this.options, function (obj) {
                    return obj == option;
                });
            });
        }
        else
            this.question.options = this.options = _.reject(this.options, function (obj) {
                return obj == option;
            });
    };
    MultiChoiceQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'multi-choice-question',
            templateUrl: 'multi-choice-question.component.html',
            styleUrls: ['multi-choice-question.component.css'],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'mc'
        }),
        __metadata("design:paramtypes", [])
    ], MultiChoiceQuestionComponent);
    return MultiChoiceQuestionComponent;
}(base_component_1.BaseComponent));
exports.MultiChoiceQuestionComponent = MultiChoiceQuestionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL211bHRpLWNob2ljZS1xdWVzdGlvbi9tdWx0aS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFFOUMsaUZBQWtGO0FBRWxGLG9GQUFrRjtBQUNsRiw4QkFBZ0M7QUFHaEMsNERBQXlEO0FBWXpEO0lBQWtELGdEQUFhO0lBTzlEO1FBQUEsWUFDQyxpQkFBTyxTQUVQO1FBREEsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0lBQ25CLENBQUM7SUFFRCw2Q0FBTSxHQUFOLFVBQU8sUUFBUSxFQUFFLE1BQU87UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRyxDQUFDLFVBQUEsTUFBTTtvQkFDNUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBQyxHQUFHO3dCQUMxQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLFFBQVE7d0JBQ1gsTUFBTSxDQUFDLGFBQWEsQ0FB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QU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ2pFLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUExRVcsNEJBQTRCO1FBVHhDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO1NBQ2xELENBQUM7UUFDRCxxQ0FBZ0IsQ0FBQztZQUNqQixJQUFJLEVBQUUsSUFBSTtTQUNWLENBQUM7O09BQ1csNEJBQTRCLENBMkV4QztJQUFELG1DQUFDO0NBM0VELEFBMkVDLENBM0VpRCw4QkFBYSxHQTJFOUQ7QUEzRVksb0VBQTRCIiwiZmlsZSI6ImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL211bHRpLWNob2ljZS1xdWVzdGlvbi9tdWx0aS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9QQVNTV09SRCwgR1JPVVBfQ0FURUdPUlksIFFVRVNUSU9OX0xFVkVMIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBRdWVzdGlvblRlbXBsYXRlIH0gZnJvbSAnLi4vcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCB7IElRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ211bHRpLWNob2ljZS1xdWVzdGlvbicsXG5cdHRlbXBsYXRlVXJsOiAnbXVsdGktY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ211bHRpLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQuY3NzJ10sXG59KVxuQFF1ZXN0aW9uVGVtcGxhdGUoe1xuXHR0eXBlOiAnbWMnXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ2hvaWNlUXVlc3Rpb25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgSVF1ZXN0aW9uIHtcblxuXHRtb2RlOiBhbnk7XG5cdHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uO1xuXHRwcml2YXRlIGFuc3dlcjogQW5zd2VyO1xuXHRwcml2YXRlIG9wdGlvbnM6IFF1ZXN0aW9uT3B0aW9uW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm9wdGlvbnMgPSBbXTtcblx0fVxuXG5cdHJlbmRlcihxdWVzdGlvbiwgYW5zd2VyPykge1xuXHRcdHRoaXMucXVlc3Rpb24gPSBxdWVzdGlvbjtcblx0XHR0aGlzLmFuc3dlciA9IGFuc3dlcjtcblx0XHRpZiAodGhpcy5xdWVzdGlvbi5pZCkge1xuXHRcdFx0dGhpcy5vcHRpb25zID0gcXVlc3Rpb24ub3B0aW9ucztcblx0XHRcdGlmICh0aGlzLmFuc3dlciAmJiB0aGlzLmFuc3dlci5pZCkge1xuXHRcdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLmFuc3dlci5qc29uKTtcblx0XHRcdFx0Xy5lYWNoKHRoaXMub3B0aW9ucyAsIChvcHRpb24gPT4ge1xuXHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9IF8uZmluZChzZWxlY3RlZE9wdGlvbnMsIChvYmopID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBvYmogPT0gb3B0aW9uLmlkO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChzZWxlY3RlZClcblx0XHRcdFx0XHRcdG9wdGlvbltcImlzX3NlbGVjdGVkXCJdID0gdHJ1ZTtcblx0XHRcdFx0XHRvcHRpb25bXCJpc19zZWxlY3RlZFwiXSA9IGZhbHNlO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2F2ZUVkaXRvcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnF1ZXN0aW9uLnNhdmUodGhpcykuZmxhdE1hcCgoKSA9PiB7XG5cdFx0XHRfLmVhY2godGhpcy5vcHRpb25zLCAob3B0aW9uOiBRdWVzdGlvbk9wdGlvbikgPT4ge1xuXHRcdFx0XHRvcHRpb24ucXVlc3Rpb25faWQgPSB0aGlzLnF1ZXN0aW9uLmlkO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgZXhpc3RPcHRpb25zID0gXy5maWx0ZXIodGhpcy5vcHRpb25zLCAob3B0aW9uOlF1ZXN0aW9uT3B0aW9uKT0+IHtcblx0XHRcdFx0cmV0dXJuICFvcHRpb24uSXNOZXc7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBuZXdPcHRpb25zID0gXy5maWx0ZXIodGhpcy5vcHRpb25zLCAob3B0aW9uOlF1ZXN0aW9uT3B0aW9uKT0+IHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbi5Jc05ldztcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUuZm9ya0pvaW4oUXVlc3Rpb25PcHRpb24udXBkYXRlQXJyYXkodGhpcywgZXhpc3RPcHRpb25zKSxRdWVzdGlvbk9wdGlvbi5jcmVhdGVBcnJheSh0aGlzLCBuZXdPcHRpb25zKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb25jbHVkZUFuc3dlcigpIHtcblx0XHR0aGlzLmFuc3dlci5pc19jb3JyZWN0ID0gdHJ1ZTtcblx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gXy5maWx0ZXIodGhpcy5vcHRpb25zLCBvcHRpb24gPT4ge1xuXHRcdFx0cmV0dXJuIG9wdGlvbltcImlzX3NlbGVjdGVkXCJdO1xuXHRcdH0pO1xuXHRcdHRoaXMuYW5zd2VyLmpzb24gPSBKU09OLnN0cmluZ2lmeShfLnBsdWNrKHNlbGVjdGVkT3B0aW9ucywgXCJpZFwiKSk7XG5cdFx0Xy5lYWNoKHRoaXMub3B0aW9ucywgKG9wdGlvbiA9PiB7XG5cdFx0XHRpZiAoKG9wdGlvbi5pc19jb3JyZWN0ICYmICFvcHRpb25bXCJdaXNfc2VsZWN0ZWRcIl0pIHx8ICghb3B0aW9uLmlzX2NvcnJlY3QgJiYgb3B0aW9uW1wiaXNfc2VsZWN0ZWRcIl0pKVxuXHRcdFx0XHR0aGlzLmFuc3dlci5pc19jb3JyZWN0ID0gZmFsc2U7XG5cdFx0fSkpO1xuXHR9XG5cblx0YWRkT3B0aW9uKCkge1xuXHRcdHRoaXMub3B0aW9ucy5wdXNoKG5ldyBRdWVzdGlvbk9wdGlvbigpKTtcblx0fVxuXG5cblx0cmVtb3ZlT3B0aW9uKG9wdGlvbjogUXVlc3Rpb25PcHRpb24pIHtcblx0XHRpZiAob3B0aW9uLmlkKSB7XG5cdFx0XHRvcHRpb24uZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlc3Rpb24ub3B0aW9ucyA9IHRoaXMub3B0aW9ucyA9IF8ucmVqZWN0KHRoaXMub3B0aW9ucywgKG9iaikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBvYmogPT0gb3B0aW9uO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0fSBlbHNlXG5cdFx0XHR0aGlzLnF1ZXN0aW9uLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgPSBfLnJlamVjdCh0aGlzLm9wdGlvbnMsIChvYmopID0+IHtcblx0XHRcdFx0cmV0dXJuIG9iaiA9PSBvcHRpb247XG5cdFx0XHR9KTtcblx0fVxufVxuXG4iXX0=
