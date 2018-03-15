import { Component, OnInit, Input, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Question } from '../../../../shared/models/question.model';
import { QuestionOption } from '../../../../shared/models/option.model';
import { VideoLecture } from '../../../../shared/models/lecture-video.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { CourseUnitTemplate } from '../unit.decorator';
import { ICourseUnit } from '../unit.interface';
import { CourseUnit } from '../../../../shared/models/course-unit.model';
import * as RecordRTC from 'recordrtc';


@Component({
	moduleId: module.id,
	selector: 'etraining-video-lecture-course-unit',
	templateUrl: 'video-lecture-unit.component.html',
})
@CourseUnitTemplate({
	type: 'video'
})
export class VideoLectureCourseUnitComponent extends BaseComponent implements AfterViewInit, ICourseUnit {

	unit: CourseUnit;
	lecture: VideoLecture;
	uploadInprogress: boolean;
	stream: any;
	recordRTC: any;
	showToolbar: boolean;

	@ViewChild('camera') video: any

	constructor(private ngZone: NgZone) {
		super();
		this.lecture = new VideoLecture();
	}

	ngAfterViewInit() {
		let video: HTMLVideoElement = this.video.nativeElement;
		video.muted = false;
		video.controls = true;
		video.autoplay = false;
	}

	render(unit: CourseUnit) {
		this.unit = unit;
		VideoLecture.byCourseUnit(this, unit.id).subscribe((lecture: VideoLecture) => {
			if (lecture)
				this.lecture = lecture;
			else {
				var lecture = new VideoLecture();
				lecture.unit_id = this.unit.id;
				this.lecture = lecture;
			}
		});
	}

	saveEditor(): Observable<any> {
		return Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
	}

	uploadFile(file) {
		this.uploadInprogress = true;
		this.apiService.upload(file, this.authService.StoredCredential.cloud_account.id).subscribe(
			data => {
				this.uploadInprogress = false;
				if (data["result"]) {
					this.ngZone.run(()=> {
						this.lecture.video_url = data["url"];
					})
				}
			},
			() => {
				this.uploadInprogress = false;
			}
		);
	}

	changeFile(event: any) {
		let file = event.files[0];
		this.uploadFile(file);
	}


	startRecording() {
		var self = this;
		let mediaConstraints = {
			video: true,
			audio: true
		};
		navigator.mediaDevices
			.getUserMedia(mediaConstraints)
			.then(this.successCallback.bind(this), self.errorCallback.bind(this));
	}

	stopRecording() {
		let recordRTC = this.recordRTC;
		recordRTC.stopRecording(this.processVideo.bind(this));
		let stream = this.stream;
		stream.getAudioTracks().forEach(track => track.stop());
		stream.getVideoTracks().forEach(track => track.stop());
	}

	cancelRecording() {
		let recordRTC = this.recordRTC;
		recordRTC.stopRecording();
		let stream = this.stream;
		stream.getAudioTracks().forEach(track => track.stop());
		stream.getVideoTracks().forEach(track => track.stop());
	}

	successCallback(stream: MediaStream) {
		var options = {
			mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
			audioBitsPerSecond: 128000,
			videoBitsPerSecond: 128000,
			bitsPerSecond: 128000 // if this line is provided, skip above two
		};
		this.stream = stream;
		this.recordRTC = RecordRTC(stream, options);
		this.recordRTC.startRecording();
		let video: HTMLVideoElement = this.video.nativeElement;
		video.src = window.URL.createObjectURL(stream);
		this.toggleControls();
	}

	errorCallback(error) {
		console.log(error);
	}

	toggleControls() {
		let video: HTMLVideoElement = this.video.nativeElement;
		video.muted = !video.muted;
		video.controls = !video.controls;
		video.autoplay = !video.autoplay;
	}

	processVideo(audioVideoWebMURL) {
		let video: HTMLVideoElement = this.video.nativeElement;
		video.src = audioVideoWebMURL;
		this.toggleControls();
		var recordedBlob = this.recordRTC.getBlob();
		var file = new File([recordedBlob], "video.webm");
		this.uploadFile(file);
	}


}

