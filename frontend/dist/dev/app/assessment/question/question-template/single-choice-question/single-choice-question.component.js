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
var SingleChoiceQuestionComponent = (function (_super) {
    __extends(SingleChoiceQuestionComponent, _super);
    function SingleChoiceQuestionComponent() {
        var _this = _super.call(this) || this;
        _this.options = [];
        return _this;
    }
    SingleChoiceQuestionComponent.prototype.render = function (question, answer) {
        var _this = this;
        this.question = question;
        this.answer = answer;
        this.checkTrueOption = '';
        if (this.question.id) {
            this.options = question.options;
            this.options.forEach(function (opt) {
                if (!opt.is_correct && opt.is_correct == true) {
                    _this.checkTrueOption = 'true';
                }
            });
        }
    };
    SingleChoiceQuestionComponent.prototype.saveEditor = function () {
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
            if (existOptions.length || newOptions.length)
                return Rx_1.Observable.forkJoin(option_model_1.QuestionOption.updateArray(_this, existOptions), option_model_1.QuestionOption.createArray(_this, newOptions));
            return Rx_1.Observable.of(null);
        });
    };
    SingleChoiceQuestionComponent.prototype.concludeAnswer = function () {
        var _this = this;
        var option = _.find(this.options, function (obj) {
            return obj.id == _this.answer.option_id;
        });
        if (option)
            this.answer.is_correct = option.is_correct;
    };
    SingleChoiceQuestionComponent.prototype.addOption = function () {
        this.options.push(new option_model_1.QuestionOption());
    };
    SingleChoiceQuestionComponent.prototype.setOptionCorrect = function (option) {
        _.each(this.options, function (obj) {
            obj.is_correct = false;
        });
        option.is_correct = true;
    };
    SingleChoiceQuestionComponent.prototype.removeOption = function (option) {
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
    SingleChoiceQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'single-choice-question',
            templateUrl: 'single-choice-question.component.html',
            styleUrls: ['single-choice-question.component.css'],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'sc'
        }),
        __metadata("design:paramtypes", [])
    ], SingleChoiceQuestionComponent);
    return SingleChoiceQuestionComponent;
}(base_component_1.BaseComponent));
exports.SingleChoiceQuestionComponent = SingleChoiceQuestionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3NpbmdsZS1jaG9pY2UtcXVlc3Rpb24vc2luZ2xlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDhCQUE4QztBQUU5QyxpRkFBa0Y7QUFFbEYsb0ZBQWtGO0FBQ2xGLDhCQUFnQztBQUdoQyw0REFBeUQ7QUFZekQ7SUFBbUQsaURBQWE7SUFRL0Q7UUFBQSxZQUNDLGlCQUFPLFNBRVA7UUFEQSxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQztJQUVELDhDQUFNLEdBQU4sVUFBTyxRQUFRLEVBQUUsTUFBTztRQUF4QixpQkFZQztRQVhBLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7b0JBQzlDLEtBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO2lCQUM5QjtZQUNGLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDRixDQUFDO0lBRUQsa0RBQVUsR0FBVjtRQUFBLGlCQWVDO1FBZEEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENB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QUFJO1NBQ1YsQ0FBQzs7T0FDVyw2QkFBNkIsQ0E0RXpDO0lBQUQsb0NBQUM7Q0E1RUQsQUE0RUMsQ0E1RWtELDhCQUFhLEdBNEUvRDtBQTVFWSxzRUFBNkIiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvc2luZ2xlLWNob2ljZS1xdWVzdGlvbi9zaW5nbGUtY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL29wdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBBbnN3ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9hbnN3ZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IERFRkFVTFRfUEFTU1dPUkQsIEdST1VQX0NBVEVHT1JZLCBRVUVTVElPTl9MRVZFTCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUXVlc3Rpb25UZW1wbGF0ZSB9IGZyb20gJy4uL3F1ZXN0aW9uLmRlY29yYXRvcic7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzaW5nbGUtY2hvaWNlLXF1ZXN0aW9uJyxcblx0dGVtcGxhdGVVcmw6ICdzaW5nbGUtY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NpbmdsZS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50LmNzcyddLFxufSlcbkBRdWVzdGlvblRlbXBsYXRlKHtcblx0dHlwZTogJ3NjJ1xufSlcbmV4cG9ydCBjbGFzcyBTaW5nbGVDaG9pY2VRdWVzdGlvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBJUXVlc3Rpb24ge1xuXG5cdG1vZGU6IGFueTtcblx0cHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb247XG5cdHByaXZhdGUgYW5zd2VyOiBBbnN3ZXI7XG5cdHByaXZhdGUgb3B0aW9uczogUXVlc3Rpb25PcHRpb25bXTtcblx0cHJpdmF0ZSBjaGVja1RydWVPcHRpb246IHN0cmluZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub3B0aW9ucyA9IFtdO1xuXHR9XG5cblx0cmVuZGVyKHF1ZXN0aW9uLCBhbnN3ZXI/KSB7XG5cdFx0dGhpcy5xdWVzdGlvbiA9IHF1ZXN0aW9uO1xuXHRcdHRoaXMuYW5zd2VyID0gYW5zd2VyO1xuXHRcdHRoaXMuY2hlY2tUcnVlT3B0aW9uID0gJyc7XG5cdFx0aWYgKHRoaXMucXVlc3Rpb24uaWQpIHtcblx0XHRcdFx0dGhpcy5vcHRpb25zID0gcXVlc3Rpb24ub3B0aW9ucztcblx0XHRcdFx0dGhpcy5vcHRpb25zLmZvckVhY2gob3B0ID0+IHtcblx0XHRcdFx0XHRpZiAoIW9wdC5pc19jb3JyZWN0ICYmIG9wdC5pc19jb3JyZWN0ID09IHRydWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuY2hlY2tUcnVlT3B0aW9uID0gJ3RydWUnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c2F2ZUVkaXRvcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnF1ZXN0aW9uLnNhdmUodGhpcykuZmxhdE1hcCgoKSA9PiB7XG5cdFx0XHRfLmVhY2godGhpcy5vcHRpb25zLCAob3B0aW9uOiBRdWVzdGlvbk9wdGlvbikgPT4ge1xuXHRcdFx0XHRvcHRpb24ucXVlc3Rpb25faWQgPSB0aGlzLnF1ZXN0aW9uLmlkO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgZXhpc3RPcHRpb25zID0gXy5maWx0ZXIodGhpcy5vcHRpb25zLCAob3B0aW9uOlF1ZXN0aW9uT3B0aW9uKT0+IHtcblx0XHRcdFx0cmV0dXJuICFvcHRpb24uSXNOZXc7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBuZXdPcHRpb25zID0gXy5maWx0ZXIodGhpcy5vcHRpb25zLCAob3B0aW9uOlF1ZXN0aW9uT3B0aW9uKT0+IHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbi5Jc05ldztcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGV4aXN0T3B0aW9ucy5sZW5ndGggfHwgbmV3T3B0aW9ucy5sZW5ndGgpXG5cdFx0XHRcdHJldHVybiBPYnNlcnZhYmxlLmZvcmtKb2luKFF1ZXN0aW9uT3B0aW9uLnVwZGF0ZUFycmF5KHRoaXMsIGV4aXN0T3B0aW9ucyksUXVlc3Rpb25PcHRpb24uY3JlYXRlQXJyYXkodGhpcywgbmV3T3B0aW9ucykpO1xuXHRcdFx0cmV0dXJuIE9ic2VydmFibGUub2YobnVsbCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb25jbHVkZUFuc3dlcigpIHtcblx0XHR2YXIgb3B0aW9uID0gXy5maW5kKHRoaXMub3B0aW9ucywgKG9iaikgPT4ge1xuXHRcdFx0cmV0dXJuIG9iai5pZCA9PSB0aGlzLmFuc3dlci5vcHRpb25faWQ7XG5cdFx0fSk7XG5cdFx0aWYgKG9wdGlvbilcblx0XHRcdHRoaXMuYW5zd2VyLmlzX2NvcnJlY3QgPSBvcHRpb24uaXNfY29ycmVjdDtcblx0fVxuXG5cdGFkZE9wdGlvbigpIHtcblx0XHR0aGlzLm9wdGlvbnMucHVzaChuZXcgUXVlc3Rpb25PcHRpb24oKSk7XG5cdH1cblxuXHRzZXRPcHRpb25Db3JyZWN0KG9wdGlvbikge1xuXHRcdF8uZWFjaCh0aGlzLm9wdGlvbnMsIChvYmopID0+IHtcblx0XHRcdG9iai5pc19jb3JyZWN0ID0gZmFsc2U7XG5cdFx0fSk7XG5cdFx0b3B0aW9uLmlzX2NvcnJlY3QgPSB0cnVlO1xuXHR9XG5cblx0cmVtb3ZlT3B0aW9uKG9wdGlvbjogUXVlc3Rpb25PcHRpb24pIHtcblx0XHRpZiAob3B0aW9uLmlkKSB7XG5cdFx0XHRvcHRpb24uZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlc3Rpb24ub3B0aW9ucyA9IHRoaXMub3B0aW9ucyA9IF8ucmVqZWN0KHRoaXMub3B0aW9ucywgKG9iaikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBvYmogPT0gb3B0aW9uO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0XG5cdFx0XHR9KVxuXHRcdH0gZWxzZVxuXHRcdFx0dGhpcy5xdWVzdGlvbi5vcHRpb25zID0gdGhpcy5vcHRpb25zID0gXy5yZWplY3QodGhpcy5vcHRpb25zLCAob2JqKSA9PiB7XG5cdFx0XHRcdHJldHVybiBvYmogPT0gb3B0aW9uO1xuXHRcdFx0fSk7XG5cdH1cbn1cblxuIl19
