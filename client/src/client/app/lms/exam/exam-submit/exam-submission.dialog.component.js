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
        exam_setting_model_1.ExamSetting.appSetting(this).subscribe(function (setting) {
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
        console.info('received webcam image', webcamImage);
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
//# sourceMappingURL=exam-submission.dialog.component.js.map