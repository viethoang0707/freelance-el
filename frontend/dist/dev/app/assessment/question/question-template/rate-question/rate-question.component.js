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
var base_component_1 = require("../../../../shared/components/base/base.component");
var question_decorator_1 = require("../question.decorator");
var RateQuestionComponent = (function (_super) {
    __extends(RateQuestionComponent, _super);
    function RateQuestionComponent() {
        return _super.call(this) || this;
    }
    RateQuestionComponent.prototype.render = function (question, answer) {
        this.question = question;
        this.answer = answer;
    };
    RateQuestionComponent.prototype.saveEditor = function () {
        return this.question.save(this);
    };
    RateQuestionComponent.prototype.concludeAnswer = function () {
    };
    RateQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rate-question',
            templateUrl: 'rate-question.component.html',
            styleUrls: ['rate-question.component.css'],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'rate'
        }),
        __metadata("design:paramtypes", [])
    ], RateQuestionComponent);
    return RateQuestionComponent;
}(base_component_1.BaseComponent));
exports.RateQuestionComponent = RateQuestionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3JhdGUtcXVlc3Rpb24vcmF0ZS1xdWVzdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBS3pELG9GQUFrRjtBQUlsRiw0REFBeUQ7QUFZekQ7SUFBMkMseUNBQWE7SUFNdkQ7ZUFDQyxpQkFBTztJQUNSLENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQU8sUUFBUSxFQUFFLE1BQU87UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFDQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCw4Q0FBYyxHQUFkO0lBQ0EsQ0FBQztJQXBCVyxxQkFBcUI7UUFUakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzFDLENBQUM7UUFDRCxxQ0FBZ0IsQ0FBQztZQUNqQixJQUFJLEVBQUUsTUFBTTtTQUNaLENBQUM7O09BQ1cscUJBQXFCLENBc0JqQztJQUFELDRCQUFDO0NBdEJELEFBc0JDLENBdEIwQyw4QkFBYSxHQXNCdkQ7QUF0Qlksc0RBQXFCIiwiZmlsZSI6ImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3JhdGUtcXVlc3Rpb24vcmF0ZS1xdWVzdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb25PcHRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9vcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQW5zd2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYW5zd2VyLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSwgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFF1ZXN0aW9uVGVtcGxhdGUgfSBmcm9tICcuLi9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAncmF0ZS1xdWVzdGlvbicsXG5cdHRlbXBsYXRlVXJsOiAncmF0ZS1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydyYXRlLXF1ZXN0aW9uLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5AUXVlc3Rpb25UZW1wbGF0ZSh7XG5cdHR5cGU6ICdyYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBSYXRlUXVlc3Rpb25Db21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgSVF1ZXN0aW9uIHtcblxuXHRtb2RlOiBhbnk7XG5cdHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uO1xuXHRwcml2YXRlIGFuc3dlcjogQW5zd2VyO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRyZW5kZXIocXVlc3Rpb24sIGFuc3dlcj8pIHtcblx0XHR0aGlzLnF1ZXN0aW9uID0gcXVlc3Rpb247XG5cdFx0dGhpcy5hbnN3ZXIgPSBhbnN3ZXI7XG5cdH1cblxuXHRzYXZlRWRpdG9yKCk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMucXVlc3Rpb24uc2F2ZSh0aGlzKTtcblx0fVxuXG5cdGNvbmNsdWRlQW5zd2VyKCkge1xuXHR9XG5cbn1cblxuIl19
