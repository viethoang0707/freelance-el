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
var lecture_slide_model_1 = require("../../../../shared/models/elearning/lecture-slide.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var SlideLectureCourseUnitComponent = (function (_super) {
    __extends(SlideLectureCourseUnitComponent, _super);
    function SlideLectureCourseUnitComponent(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.lecture = new lecture_slide_model_1.SlideLecture();
        return _this;
    }
    SlideLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_slide_model_1.SlideLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_slide_model_1.SlideLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    SlideLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    SlideLectureCourseUnitComponent.prototype.uploadFile = function (file) {
        var _this = this;
        this.lecture.filename = file.name;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    if (file.name.endsWith('pdf'))
                        _this.lecture.slide_url = data["url"];
                    else {
                        var serverFile = data["filename"];
                        _this.fileApiService.convert2Pdf(serverFile, _this.authService.LoginToken.cloud_id).subscribe(function (data) {
                            _this.lecture.slide_url = data["url"];
                        });
                    }
                });
            }
        });
    };
    SlideLectureCourseUnitComponent.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideLectureCourseUnitComponent.prototype, "mode", void 0);
    SlideLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'slide-lecture-course-unit',
            template: "<style>   .ui-scrollpanel-content{        } </style>  <div *ngIf=\"mode=='design'\">   <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>   <div class=\"ui-g\">     <div class=\"ui-g-6\">       <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}'\" (onSelect)=\"changeFile($event)\"         accept=\"*\" maxFileSize=\"1024*512\" showUploadButton=\"false\">       </p-fileUpload>       <a href=\"{{lecture.slide_url}}\" target=\"_blank\" *ngIf=\"lecture.slide_url\">{{lecture.filename}}</a>     </div>   </div> </div> <div *ngIf=\"mode=='preview'\">    <pdf-viewer [stick-to-page]=\"true\" [fit-to-page]=\"true\" [src]=\"lecture.slide_url\" [show-all]=\"true\" [render-text]=\"true\"     style=\"display: block;\">   </pdf-viewer> </div> <div *ngIf=\"mode=='study'\">    <pdf-viewer [stick-to-page]=\"true\" [fit-to-page]=\"true\" [src]=\"lecture.slide_url\" [show-all]=\"true\" [render-text]=\"true\" style=\"display: block; height: 410px; overflow: auto;\">   </pdf-viewer>  </div>",
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'slide'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], SlideLectureCourseUnitComponent);
    return SlideLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.SlideLectureCourseUnitComponent = SlideLectureCourseUnitComponent;
