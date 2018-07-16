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
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
require("rxjs/add/observable/timer");
var ExamSubmissionDialog = (function (_super) {
    __extends(ExamSubmissionDialog, _super);
    function ExamSubmissionDialog(componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.trigger = new Rx_1.Subject();
        _this.onConfirmReceiver = new Rx_1.Subject();
        _this.onConfirm = _this.onConfirmReceiver.asObservable();
        _this.display = false;
        _this.exam = new exam_model_1.Exam();
        _this.submission = new submission_model_1.Submission();
        _this.setting = new exam_setting_model_1.ExamSetting();
        return _this;
    }
    ExamSubmissionDialog.prototype.show = function (exam, submission) {
        var _this = this;
        this.display = true;
        this.exam = exam;
        this.submission = submission;
        exam_setting_model_1.ExamSetting.byExam(this, exam.id).subscribe(function (setting) {
            if (setting)
                _this.setting = setting;
        });
    };
    ExamSubmissionDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamSubmissionDialog.prototype.confirm = function () {
        if (this.setting.take_picture_on_submit)
            this.trigger.next();
        else {
            this.onConfirmReceiver.next();
            this.hide();
        }
    };
    ExamSubmissionDialog.prototype.handleImage = function (webcamImage) {
        console.info(this.translateService.instant('received webcam image'), webcamImage);
        this.submission.picture = webcamImage.imageAsBase64;
        this.onConfirmReceiver.next();
        this.hide();
    };
    Object.defineProperty(ExamSubmissionDialog.prototype, "triggerObservable", {
        get: function () {
            return this.trigger.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], ExamSubmissionDialog.prototype, "printSection", void 0);
    ExamSubmissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-submission-dialog',
            templateUrl: 'exam-submission.dialog.component.html',
            styleUrls: ['exam-submission.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], ExamSubmissionDialog);
    return ExamSubmissionDialog;
}(base_component_1.BaseComponent));
exports.ExamSubmissionDialog = ExamSubmissionDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvZXhhbS9leGFtLXN1Ym1pdC9leGFtLXN1Ym1pc3Npb24uZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUg7QUFDdkgsOEJBQThDO0FBSTlDLGlGQUErRTtBQUMvRSwwRUFBbUU7QUFHbkUsMEZBQWtGO0FBQ2xGLHNGQUErRTtBQVEvRSxxQ0FBbUM7QUFVbkM7SUFBMEMsd0NBQWE7SUFhbkQsOEJBQW9CLHdCQUFrRDtRQUF0RSxZQUNJLGlCQUFPLFNBS1Y7UUFObUIsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQVI5RCxhQUFPLEdBQWtCLElBQUksWUFBTyxFQUFRLENBQUM7UUFHN0MsdUJBQWlCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDeEQsZUFBUyxHQUFvQixLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFNL0QsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkJBQVUsRUFBRSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFFRCxtQ0FBSSxHQUFKLFVBQUssSUFBVSxFQUFFLFVBQXNCO1FBQXZDLGlCQVFDO1FBUEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsZ0NBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQzlDLElBQUksT0FBTztnQkFDUCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCO1lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDbkI7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUYsMENBQVcsR0FBWCxVQUFZLFdBQXdCO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFQyxzQkFBSSxtREFBaUI7YUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUExQzBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzs4REFBYztJQVgvQixvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7U0FDdEQsQ0FBQzt5Q0FjZ0QsK0JBQXdCO09BYjdELG9CQUFvQixDQXNEaEM7SUFBRCwyQkFBQztDQXRERCxBQXNEQyxDQXREeUMsOEJBQWEsR0FzRHREO0FBdERZLG9EQUFvQiIsImZpbGUiOiJhcHAvbG1zL2V4YW0vZXhhbS1zdWJtaXQvZXhhbS1zdWJtaXNzaW9uLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEFuc3dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2Fuc3dlci5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtU2V0dGluZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tc2V0dGluZy5tb2RlbCc7XG5pbXBvcnQgeyBTdWJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvc3VibWlzc2lvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtTWVtYmVyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1tZW1iZXIubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFF1ZXN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IElRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uUmVnaXN0ZXIgfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmRlY29yYXRvcic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvdGltZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFdlYmNhbUltYWdlIH0gZnJvbSAnbmd4LXdlYmNhbSc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdleGFtLXN1Ym1pc3Npb24tZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2V4YW0tc3VibWlzc2lvbi5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydleGFtLXN1Ym1pc3Npb24uZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRXhhbVN1Ym1pc3Npb25EaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGV4YW06IEV4YW07XG4gICAgcHJpdmF0ZSBzdWJtaXNzaW9uOiBTdWJtaXNzaW9uO1xuICAgIHByaXZhdGUgdHJpZ2dlcjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcHJpdmF0ZSBzZXR0aW5nOiBFeGFtU2V0dGluZztcblxuICAgIHByaXZhdGUgb25Db25maXJtUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25Db25maXJtOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uQ29uZmlybVJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgQFZpZXdDaGlsZCgncHJpbnRTZWN0aW9uJykgcHJpbnRTZWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leGFtID0gbmV3IEV4YW0oKTtcbiAgICAgICAgdGhpcy5zdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb24oKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nID0gbmV3IEV4YW1TZXR0aW5nKCk7XG4gICAgfVxuXG4gICAgc2hvdyhleGFtOiBFeGFtLCBzdWJtaXNzaW9uOiBTdWJtaXNzaW9uKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMuZXhhbSA9IGV4YW07XG4gICAgICAgIHRoaXMuc3VibWlzc2lvbiA9IHN1Ym1pc3Npb247XG4gICAgICAgIEV4YW1TZXR0aW5nLmJ5RXhhbSh0aGlzLGV4YW0uaWQpLnN1YnNjcmliZShzZXR0aW5nID0+IHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZyA9IHNldHRpbmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmcudGFrZV9waWN0dXJlX29uX3N1Ym1pdClcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlci5uZXh0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkNvbmZpcm1SZWNlaXZlci5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgaGFuZGxlSW1hZ2Uod2ViY2FtSW1hZ2U6IFdlYmNhbUltYWdlKTogdm9pZCB7XG4gICAgY29uc29sZS5pbmZvKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdyZWNlaXZlZCB3ZWJjYW0gaW1hZ2UnKSwgd2ViY2FtSW1hZ2UpO1xuICAgIHRoaXMuc3VibWlzc2lvbi5waWN0dXJlID0gd2ViY2FtSW1hZ2UuaW1hZ2VBc0Jhc2U2NDtcbiAgICB0aGlzLm9uQ29uZmlybVJlY2VpdmVyLm5leHQoKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gICAgZ2V0IHRyaWdnZXJPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cblxuXG5cbiJdfQ==
