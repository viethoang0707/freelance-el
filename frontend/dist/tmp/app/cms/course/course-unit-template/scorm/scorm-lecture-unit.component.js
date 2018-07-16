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
var lecture_scorm_model_1 = require("../../../../shared/models/elearning/lecture-scorm.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var SCORMLectureCourseUnitComponent = (function (_super) {
    __extends(SCORMLectureCourseUnitComponent, _super);
    function SCORMLectureCourseUnitComponent(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.lecture = new lecture_scorm_model_1.SCORMLecture();
        _this.blockedUpload = false;
        return _this;
    }
    SCORMLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_scorm_model_1.SCORMLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_scorm_model_1.SCORMLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    SCORMLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    SCORMLectureCourseUnitComponent.prototype.uploadFile = function (file) {
        var _this = this;
        this.blockedUpload = true;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.lecture.package_url = data["url"];
                    var serverFile = data["filename"];
                    _this.fileApiService.unzip(serverFile, _this.authService.LoginToken.cloud_id)
                        .subscribe(function (data) {
                        _this.lecture.base_url = data["url"];
                        _this.blockedUpload = false;
                    }, function () {
                        _this.blockedUpload = false;
                    });
                });
            }
        }, function () {
            _this.blockedUpload = false;
        });
    };
    SCORMLectureCourseUnitComponent.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SCORMLectureCourseUnitComponent.prototype, "mode", void 0);
    SCORMLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scorm-lecture-course-unit',
            template: "<div *ngIf=\"mode=='design'\">          <div class=\"ui-g\">         <div class=\"ui-g-6\">             <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>             <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}'\" (onSelect)=\"changeFile($event)\" accept=\"*\" maxFileSize=\"1024*512\" showUploadButton=\"false\">             </p-fileUpload>             <a href=\"{{lecture.package_url}}\" target=\"_blank\" *ngIf=\"lecture.package_url\">{{'Download SCORM package file'|translate}}</a>         </div>         <div class=\"ui-g-6\">             <span class=\"md-inputfield\">             <input type=\"text\" pInputText [(ngModel)]=\"lecture.entry_file\"  name=\"entry_file\" required>             <label>{{'Entry file'|translate}}</label>           </span>         </div>     </div> </div> <div *ngIf=\"mode=='preview'\" style=\"height: 430px;\">     <iframe width=\"100%\" height=\"100%\" [src]=\"(lecture.base_url+'/'+lecture.entry_file) | safe\"></iframe>     <span>{{'If you cannot see the SCORM unit, please '|translate}}<a target=\"_blank\" href=\"{{lecture.base_url+'/'+lecture.entry_file}}\">{{'click here'|translate}}</a></span> </div> <div *ngIf=\"mode=='study'\" style=\"height: 380px; margin-bottom: 25px;\" class=\"scorm-study-mode\">     <iframe width=\"100%\" height=\"100%\" [src]=\"(lecture.base_url+'/'+lecture.entry_file) | safe\"></iframe>     <span>{{'If you cannot see the SCORM unit, please '|translate}}<a target=\"_blank\" href=\"{{lecture.base_url+'/'+lecture.entry_file}}\">{{'click here'|translate}}</a></span> </div>",
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'scorm'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], SCORMLectureCourseUnitComponent);
    return SCORMLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.SCORMLectureCourseUnitComponent = SCORMLectureCourseUnitComponent;
