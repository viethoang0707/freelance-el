import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem, SelectItem, Message } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_STATUS } from '../../../shared/models/constants';
import * as _ from 'underscore';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { Jsonp, RequestOptions, Http } from '@angular/http';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ExcelService } from '../../../shared/services/excel.service';

@Component({
	moduleId: module.id,
	selector: 'course-restore',
	templateUrl: 'course-restore.component.html',
	styleUrls: ['course-restore.component.css'],
})
export class CourseRestoreComponent extends BaseComponent {

	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private sylUtils: SyllabusUtils;
	private fileName: string;
	private data: string;
	private course: Course;
	private faqs: CourseFaq[];
	private downloadJsonHref;
	private materials: CourseMaterial[];
	private output: String;
	private uploadedFiles: any[] = [];
	private total: number;
	private http: Http;

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;

	constructor(private sanitizer: DomSanitizer, private excelService: ExcelService,private location: Location ,private router: Router, private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		this.units = [];
		this.faqs = [];
		this.materials = [];
		this.course = this.route.snapshot.data['course'];
		this.syl = this.route.snapshot.data['syllabus'];
	}

	back() {
		this.router.navigate(['/lms/course/edit', this.course.id]);
	}

	onUpload(event) {
		for (let file of event.files) {
			this.uploadedFiles.push(file);
		}
	}

	changeListner(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromJsonFile(file).subscribe(data => {
			this.data = data;
		});
	}

	restoreCourse() {
		var subscriptions = [];
		var output = JSON.parse(this.data);
		var course_faq = output.course_faq;
		var course_material =  output.course_material;
		var course_syllabus = output.course_syllabus;
		var course_unit = output.course_unit;
	}
}

