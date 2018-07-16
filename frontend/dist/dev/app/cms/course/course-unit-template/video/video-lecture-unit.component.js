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
            templateUrl: 'video-lecture-unit.component.html',
            styleUrls: ['video-lecture-unit.component.css'],
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'video'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], VideoLectureCourseUnitComponent);
    return VideoLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.VideoLectureCourseUnitComponent = VideoLectureCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3ZpZGVvL3ZpZGVvLWxlY3R1cmUtdW5pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJGO0FBQzNGLDhCQUE4QztBQUc5QywrRkFBdUY7QUFDdkYsb0ZBQWtGO0FBSWxGLG9EQUF1RDtBQUd2RCxxQ0FBdUM7QUFZdkM7SUFBcUQsbURBQWE7SUFhakUseUNBQW9CLE1BQWM7UUFBbEMsWUFDQyxpQkFBTyxTQUVQO1FBSG1CLFlBQU0sR0FBTixNQUFNLENBQVE7UUFKbEMsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFNL0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtDQUFZLEVBQUUsQ0FBQzs7SUFDbkMsQ0FBQztJQUVELHlEQUFlLEdBQWY7UUFDQyxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDdkQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELGdEQUFNLEdBQU4sVUFBTyxJQUFnQjtRQUF2QixpQkFZQztRQVhBLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtDQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBcUI7WUFDeEUsSUFBSSxPQUFPO2dCQUNWLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2lCQUNuQjtnQkFDSixJQUFJLE9BQU8sR0FBRyxJQUFJLGtDQUFZLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDL0Is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TyxFQUFFLENBQUM7UUFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUF4SFE7UUFBUixZQUFLLEVBQUU7O2lFQUFNO0lBU087UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7O2tFQUFXO0lBWG5CLCtCQUErQjtRQVQzQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO1FBQ0QsbUNBQWtCLENBQUM7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDYixDQUFDO3lDQWMyQixhQUFNO09BYnRCLCtCQUErQixDQTZIM0M7SUFBRCxzQ0FBQztDQTdIRCxBQTZIQyxDQTdIb0QsOEJBQWEsR0E2SGpFO0FBN0hZLDBFQUErQiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS92aWRlby92aWRlby1sZWN0dXJlLXVuaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL29wdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBWaWRlb0xlY3R1cmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLXZpZGVvLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlVW5pdFRlbXBsYXRlIH0gZnJvbSAnLi4vdW5pdC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi91bml0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0ICogYXMgUmVjb3JkUlRDIGZyb20gJ3JlY29yZHJ0Yyc7XG5cblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAndmlkZW8tbGVjdHVyZS1jb3Vyc2UtdW5pdCcsXG5cdHRlbXBsYXRlVXJsOiAndmlkZW8tbGVjdHVyZS11bml0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3ZpZGVvLWxlY3R1cmUtdW5pdC5jb21wb25lbnQuY3NzJ10sXG59KVxuQENvdXJzZVVuaXRUZW1wbGF0ZSh7XG5cdHR5cGU6ICd2aWRlbydcbn0pXG5leHBvcnQgY2xhc3MgVmlkZW9MZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBJQ291cnNlVW5pdCB7XG5cblx0QElucHV0KCkgbW9kZTtcblx0cHJpdmF0ZSB1bml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIGxlY3R1cmU6IFZpZGVvTGVjdHVyZTtcblx0cHJpdmF0ZSB1cGxvYWRJbnByb2dyZXNzOiBib29sZWFuO1xuXHRwcml2YXRlIHN0cmVhbTogYW55O1xuXHRwcml2YXRlIHJlY29yZFJUQzogYW55O1xuXHRwcml2YXRlIHNob3dUb29sYmFyOiBib29sZWFuO1xuXHRvcGVuRmlsZVN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdEBWaWV3Q2hpbGQoJ2NhbWVyYScpIHZpZGVvOiBhbnlcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmxlY3R1cmUgPSBuZXcgVmlkZW9MZWN0dXJlKCk7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0bGV0IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50O1xuXHRcdHZpZGVvLm11dGVkID0gZmFsc2U7XG5cdFx0dmlkZW8uY29udHJvbHMgPSB0cnVlO1xuXHRcdHZpZGVvLmF1dG9wbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRyZW5kZXIodW5pdDogQ291cnNlVW5pdCkge1xuXHRcdHRoaXMudW5pdCA9IHVuaXQ7XG5cdFx0VmlkZW9MZWN0dXJlLmJ5Q291cnNlVW5pdCh0aGlzLCB1bml0LmlkKS5zdWJzY3JpYmUoKGxlY3R1cmU6IFZpZGVvTGVjdHVyZSkgPT4ge1xuXHRcdFx0aWYgKGxlY3R1cmUpXG5cdFx0XHRcdHRoaXMubGVjdHVyZSA9IGxlY3R1cmU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmFyIGxlY3R1cmUgPSBuZXcgVmlkZW9MZWN0dXJlKCk7XG5cdFx0XHRcdGxlY3R1cmUudW5pdF9pZCA9IHRoaXMudW5pdC5pZDtcblx0XHRcdFx0dGhpcy5sZWN0dXJlID0gbGVjdHVyZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0pO1xuXHR9XG5cblx0c2F2ZUVkaXRvcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiBPYnNlcnZhYmxlLmZvcmtKb2luKHRoaXMudW5pdC5zYXZlKHRoaXMpLCB0aGlzLmxlY3R1cmUuc2F2ZSh0aGlzKSk7XG5cdH1cblxuXHR1cGxvYWRGaWxlKGZpbGUpIHtcblx0XHR0aGlzLm9wZW5GaWxlU3RhdHVzID0gdHJ1ZTtcblx0XHR0aGlzLmZpbGVBcGlTZXJ2aWNlLnVwbG9hZChmaWxlLCB0aGlzLmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4uY2xvdWRfaWQpLnN1YnNjcmliZShcblx0XHRcdGRhdGEgPT4ge1xuXHRcdFx0XHRpZiAoZGF0YVtcInJlc3VsdFwiXSkge1xuXHRcdFx0XHRcdHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmxlY3R1cmUudmlkZW9fdXJsID0gZGF0YVtcInVybFwiXTtcblx0XHRcdFx0XHRcdHRoaXMub3BlbkZpbGVTdGF0dXMgPSBmYWxzZTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGNoYW5nZUZpbGUoZXZlbnQ6IGFueSkge1xuXHRcdGxldCBmaWxlID0gZXZlbnQuZmlsZXNbMF07XG5cdFx0dGhpcy51cGxvYWRGaWxlKGZpbGUpO1xuXHR9XG5cblxuXHRzdGFydFJlY29yZGluZygpIHtcblx0XHRsZXQgbWVkaWFDb25zdHJhaW50cyA9IHtcblx0XHRcdHZpZGVvOiB0cnVlLFxuXHRcdFx0YXVkaW86IHRydWVcblx0XHR9O1xuXHRcdG5hdmlnYXRvci5tZWRpYURldmljZXNcblx0XHRcdC5nZXRVc2VyTWVkaWEobWVkaWFDb25zdHJhaW50cylcblx0XHRcdC50aGVuKHRoaXMuc3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyksIHRoaXMuZXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHN0b3BSZWNvcmRpbmcoKSB7XG5cdFx0bGV0IHJlY29yZFJUQyA9IHRoaXMucmVjb3JkUlRDO1xuXHRcdHJlY29yZFJUQy5zdG9wUmVjb3JkaW5nKHRoaXMucHJvY2Vzc1ZpZGVvLmJpbmQodGhpcykpO1xuXHRcdGxldCBzdHJlYW0gPSB0aGlzLnN0cmVhbTtcblx0XHRzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG5cdFx0c3RyZWFtLmdldFZpZGVvVHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuXHR9XG5cblx0Y2FuY2VsUmVjb3JkaW5nKCkge1xuXHRcdGxldCByZWNvcmRSVEMgPSB0aGlzLnJlY29yZFJUQztcblx0XHRyZWNvcmRSVEMuc3RvcFJlY29yZGluZygpO1xuXHRcdGxldCBzdHJlYW0gPSB0aGlzLnN0cmVhbTtcblx0XHRzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG5cdFx0c3RyZWFtLmdldFZpZGVvVHJhY2tzKCkuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuXHR9XG5cblx0c3VjY2Vzc0NhbGxiYWNrKHN0cmVhbTogTWVkaWFTdHJlYW0pIHtcblx0XHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdG1pbWVUeXBlOiAndmlkZW8vd2VibScsIC8vIG9yIHZpZGVvL3dlYm1cXDtjb2RlY3M9aDI2NCBvciB2aWRlby93ZWJtXFw7Y29kZWNzPXZwOVxuXHRcdFx0YXVkaW9CaXRzUGVyU2Vjb25kOiAxMjgwMDAsXG5cdFx0XHR2aWRlb0JpdHNQZXJTZWNvbmQ6IDEyODAwMCxcblx0XHRcdGJpdHNQZXJTZWNvbmQ6IDEyODAwMCAvLyBpZiB0aGlzIGxpbmUgaXMgcHJvdmlkZWQsIHNraXAgYWJvdmUgdHdvXG5cdFx0fTtcblx0XHR0aGlzLnN0cmVhbSA9IHN0cmVhbTtcblx0XHR0aGlzLnJlY29yZFJUQyA9IFJlY29yZFJUQyhzdHJlYW0sIG9wdGlvbnMpO1xuXHRcdHRoaXMucmVjb3JkUlRDLnN0YXJ0UmVjb3JkaW5nKCk7XG5cdFx0bGV0IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50ID0gdGhpcy52aWRlby5uYXRpdmVFbGVtZW50O1xuXHRcdHZpZGVvLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG5cdFx0dGhpcy50b2dnbGVDb250cm9scygpO1xuXHR9XG5cblx0ZXJyb3JDYWxsYmFjayhlcnJvcikge1xuXHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0fVxuXG5cdHRvZ2dsZUNvbnRyb2xzKCkge1xuXHRcdGxldCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudDtcblx0XHR2aWRlby5tdXRlZCA9ICF2aWRlby5tdXRlZDtcblx0XHR2aWRlby5jb250cm9scyA9ICF2aWRlby5jb250cm9scztcblx0XHR2aWRlby5hdXRvcGxheSA9ICF2aWRlby5hdXRvcGxheTtcblx0fVxuXG5cdHByb2Nlc3NWaWRlbyhhdWRpb1ZpZGVvV2ViTVVSTCkge1xuXHRcdGxldCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudDtcblx0XHR2aWRlby5zcmMgPSBhdWRpb1ZpZGVvV2ViTVVSTDtcblx0XHR0aGlzLnRvZ2dsZUNvbnRyb2xzKCk7XG5cdFx0dmFyIHJlY29yZGVkQmxvYiA9IHRoaXMucmVjb3JkUlRDLmdldEJsb2IoKTtcblx0XHR2YXIgZmlsZSA9IG5ldyBGaWxlKFtyZWNvcmRlZEJsb2JdLCBcInZpZGVvLndlYm1cIik7XG5cdFx0dGhpcy51cGxvYWRGaWxlKGZpbGUpO1xuXHR9XG5cblxufVxuXG4iXX0=
