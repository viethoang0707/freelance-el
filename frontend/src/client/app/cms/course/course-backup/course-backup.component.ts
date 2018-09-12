import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import * as _ from 'underscore';
import { Jsonp } from '@angular/http';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseModel } from '../../../shared/models/base.model';

@Component({
	moduleId: module.id,
	selector: 'course-backup',
	templateUrl: 'course-backup.component.html',
	styleUrls: ['course-backup.component.css'],
})
export class CourseBackupComponent extends BaseComponent implements OnInit {

	private display: boolean;
	private syl: CourseSyllabus;
	private units: CourseUnit[];
	private course: Course;
	private faqs: CourseFaq[];
	private downloadJsonHref;
	private materials: CourseMaterial[];
	private output: any;


	constructor(private sanitizer: DomSanitizer, private location: Location, private router: Router, private route: ActivatedRoute) {
		super();

	}

	ngOnInit() {
		this.units = [];
		this.faqs = [];
		this.materials = [];
		this.course = this.route.snapshot.data['course'];
		this.syl = this.route.snapshot.data['syllabus'];
	}


	backupCourse() {
		BaseModel.bulk_search(this,
			Course.__api__listFaqs(this.course.id),
			Course.__api__listMaterials(this.course.id),
			Course.__api__listUnits(this.course.id))
			.subscribe(jsonArr => {
				this.faqs = CourseFaq.toArray(jsonArr[0]);
				this.materials = CourseFaq.toArray(jsonArr[1]);
				this.units = CourseFaq.toArray(jsonArr[2]);
				this.output = { "course_faq": this.faqs, "course_material": this.materials, "course_syllabus": this.syl, "course_unit": this.units };
				let dataStr = JSON.stringify(this.output);
				let data = "text/json;charset=utf-8," + encodeURIComponent(dataStr);
				let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(dataStr));
				this.downloadJsonHref = uri;
			});
	}

	back() {
		this.location.back();
	}
}

