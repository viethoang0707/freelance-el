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
var lecture_video_model_1 = require("../../../../shared/models/elearning/lecture-video.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var RecordRTC = require("recordrtc");
var VideoLectureCourseUnitComponent = (function (_super) {
    __extends(VideoLectureCourseUnitComponent, _super);
    function VideoLectureCourseUnitComponent(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.openFileStatus = false;
        _this.lecture = new lecture_video_model_1.VideoLecture();
        return _this;
    }
    VideoLectureCourseUnitComponent.prototype.ngAfterViewInit = function () {
        var video = this.video.nativeElement;
        video.muted = false;
        video.controls = true;
        video.autoplay = false;
    };
    VideoLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_video_model_1.VideoLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_video_model_1.VideoLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    VideoLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    VideoLectureCourseUnitComponent.prototype.uploadFile = function (file) {
        var _this = this;
        this.openFileStatus = true;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.lecture.video_url = data["url"];
                    _this.openFileStatus = false;
                });
            }
        });
    };
    VideoLectureCourseUnitComponent.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    VideoLectureCourseUnitComponent.prototype.startRecording = function () {
        var mediaConstraints = {
            video: true,
            audio: true
        };
        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    };
    VideoLectureCourseUnitComponent.prototype.stopRecording = function () {
        var recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processVideo.bind(this));
        var stream = this.stream;
        stream.getAudioTracks().forEach(function (track) { return track.stop(); });
        stream.getVideoTracks().forEach(function (track) { return track.stop(); });
    };
    VideoLectureCourseUnitComponent.prototype.cancelRecording = function () {
        var recordRTC = this.recordRTC;
        recordRTC.stopRecording();
        var stream = this.stream;
        stream.getAudioTracks().forEach(function (track) { return track.stop(); });
        stream.getVideoTracks().forEach(function (track) { return track.stop(); });
    };
    VideoLectureCourseUnitComponent.prototype.successCallback = function (stream) {
        var options = {
            mimeType: 'video/webm',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 128000,
            bitsPerSecond: 128000
        };
        this.stream = stream;
        this.recordRTC = RecordRTC(stream, options);
        this.recordRTC.startRecording();
        var video = this.video.nativeElement;
        video.src = window.URL.createObjectURL(stream);
        this.toggleControls();
    };
    VideoLectureCourseUnitComponent.prototype.errorCallback = function (error) {
        console.log(error);
    };
    VideoLectureCourseUnitComponent.prototype.toggleControls = function () {
        var video = this.video.nativeElement;
        video.muted = !video.muted;
        video.controls = !video.controls;
        video.autoplay = !video.autoplay;
    };
    VideoLectureCourseUnitComponent.prototype.processVideo = function (audioVideoWebMURL) {
        var video = this.video.nativeElement;
        video.src = audioVideoWebMURL;
        this.toggleControls();
        var recordedBlob = this.recordRTC.getBlob();
        var file = new File([recordedBlob], "video.webm");
        this.uploadFile(file);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VideoLectureCourseUnitComponent.prototype, "mode", void 0);
    __decorate([
        core_1.ViewChild('camera'),
        __metadata("design:type", Object)
    ], VideoLectureCourseUnitComponent.prototype, "video", void 0);
    VideoLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'video-lecture-course-unit',
            template: "<style>   body .ui-progressbar .ui-progressbar-value {     height: 0px !important;   } </style>  <div *ngIf=\"mode=='design'\">   <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>   <div class=\"ui-g\">     <div class=\"ui-g-6\" align='center'>       <p-progressBar [hidden]=\"!openFileStatus\" mode=\"indeterminate\" [style]=\"{'height': '15px'}\"></p-progressBar>       <div class=\"ui-g\">         <div style=\"width: 50%\">           <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}\" (onSelect)=\"changeFile($event)\"             accept=\"*\" maxFileSize=\"1024*512\" showUploadButton=\"false\">           </p-fileUpload>         </div>         <div style=\"width: 50%\">           <button pButton type=\"button\" label=\"{{'Record from camera'|translate}}\" class=\"green-btn mb10\" icon=\"ui-icon-videocam\" (click)=\"showToolbar=!showToolbar\"></button>           <p-toolbar *ngIf=\"showToolbar\" styleClass=\"mb5\">             <div>               <button pButton type=\"button\" pTooltip=\"{{'Start'|translate}}\" icon=\"ui-icon-play-arrow\" (click)=\"startRecording()\"></button>               <button pButton type=\"button\" pTooltip=\"{{'Stop'|translate}}\" icon=\"ui-icon-stop\" (click)=\"stopRecording()\"></button>               <button pButton type=\"button\" pTooltip=\"{{'Cancel'|translate}}\" icon=\"ui-icon-cancel\" (click)=\"cancelRecording()\"></button>             </div>           </p-toolbar>         </div>       </div>       <div>         <div class=\"spinner\" [hidden]=\"!uploadInprogress\">           <p-progressSpinner></p-progressSpinner>         </div>         <video id=\"camera\" width=\"100%\" #camera autoplay poster=\"assets/images/logo-vietinterview.png\" src=\"{{lecture.video_url}}\"></video>       </div>     </div>     <div class=\"ui-g-6\">       <label>{{'Lecture'|translate}}</label>       <p-editor [(ngModel)]=\"lecture.transcript\" [style]=\"{'height':'200px'}\" name=\"content\">       </p-editor>     </div>   </div> </div> <div *ngIf=\"mode=='preview'\">   <video id=\"camera\" width=\"100%\" #camera autoplay poster=\"assets/images/logo-vietinterview.png\" src=\"{{lecture.video_url}}\"></video>   <div [innerHTML]=\"lecture.transcript\"></div> </div> <div *ngIf=\"mode=='study'\">   <video id=\"camera\" width=\"100%\" height=\"410\" #camera autoplay poster=\"assets/images/logo-vietinterview.png\" src=\"{{lecture.video_url}}\"></video>   <div [innerHTML]=\"lecture.transcript\" class=\"lecture-transcript\"></div> </div>",
            styles: [""],
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'video'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], VideoLectureCourseUnitComponent);
    return VideoLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.VideoLectureCourseUnitComponent = VideoLectureCourseUnitComponent;
