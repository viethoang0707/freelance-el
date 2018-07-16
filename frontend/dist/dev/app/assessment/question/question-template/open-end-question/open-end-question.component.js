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
var OpenEndQuestionComponent = (function (_super) {
    __extends(OpenEndQuestionComponent, _super);
    function OpenEndQuestionComponent() {
        return _super.call(this) || this;
    }
    OpenEndQuestionComponent.prototype.render = function (question, answer) {
        this.question = question;
        this.answer = answer;
    };
    OpenEndQuestionComponent.prototype.saveEditor = function () {
        return this.question.save(this);
    };
    OpenEndQuestionComponent.prototype.concludeAnswer = function () {
        return;
    };
    OpenEndQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'open-end-question',
            templateUrl: 'open-end-question.component.html',
            styleUrls: ['open-end-question.component.css'],
        }),
        question_decorator_1.QuestionTemplate({
            type: 'ext'
        }),
        __metadata("design:paramtypes", [])
    ], OpenEndQuestionComponent);
    return OpenEndQuestionComponent;
}(base_component_1.BaseComponent));
exports.OpenEndQuestionComponent = OpenEndQuestionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL29wZW4tZW5kLXF1ZXN0aW9uL29wZW4tZW5kLXF1ZXN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFLekQsb0ZBQWtGO0FBSWxGLDREQUF5RDtBQVl6RDtJQUE4Qyw0Q0FBYTtJQU0xRDtlQUNDLGlCQUFPO0lBQ1IsQ0FBQztJQUVELHlDQUFNLEdBQU4sVUFBTyxRQUFRLEVBQUUsTUFBTztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQsNkNBQVUsR0FBVjtRQUNDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlEQUFjLEdBQWQ7UUFDQyxPQUFPO0lBQ1IsQ0FBQztJQXJCVyx3QkFBd0I7UUFUcEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxrQ0FBa0M7WUFDL0MsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7U0FDOUMsQ0FBQztRQUNELHFDQUFnQixDQUFDO1lBQ2pCLElBQUksRUFBQyxLQUFLO1NBQ1YsQ0FBQzs7T0FDVyx3QkFBd0IsQ0F1QnBDO0lBQUQsK0JBQUM7Q0F2QkQsQUF1QkMsQ0F2QjZDLDhCQUFhLEdBdUIxRDtBQXZCWSw0REFBd0IiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvb3Blbi1lbmQtcXVlc3Rpb24vb3Blbi1lbmQtcXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9QQVNTV09SRCwgR1JPVVBfQ0FURUdPUlksIFFVRVNUSU9OX0xFVkVMIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBRdWVzdGlvblRlbXBsYXRlIH0gZnJvbSAnLi4vcXVlc3Rpb24uZGVjb3JhdG9yJztcbmltcG9ydCB7IElRdWVzdGlvbiB9IGZyb20gJy4uL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ29wZW4tZW5kLXF1ZXN0aW9uJyxcblx0dGVtcGxhdGVVcmw6ICdvcGVuLWVuZC1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydvcGVuLWVuZC1xdWVzdGlvbi5jb21wb25lbnQuY3NzJ10sXG59KVxuQFF1ZXN0aW9uVGVtcGxhdGUoe1xuXHR0eXBlOidleHQnXG59KVxuZXhwb3J0IGNsYXNzIE9wZW5FbmRRdWVzdGlvbkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBJUXVlc3Rpb257XG5cblx0bW9kZTphbnk7XG5cdHByaXZhdGUgcXVlc3Rpb246UXVlc3Rpb247XG5cdHByaXZhdGUgYW5zd2VyOiBBbnN3ZXI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdHJlbmRlcihxdWVzdGlvbiwgYW5zd2VyPykge1xuXHRcdHRoaXMucXVlc3Rpb24gPSBxdWVzdGlvbjtcblx0XHR0aGlzLmFuc3dlciA9IGFuc3dlcjtcblx0fVxuXHRcblx0c2F2ZUVkaXRvcigpOk9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMucXVlc3Rpb24uc2F2ZSh0aGlzKTtcblx0fVxuXG5cdGNvbmNsdWRlQW5zd2VyKCkge1xuXHRcdHJldHVybjtcblx0fVxuXG59XG5cbiJdfQ==
