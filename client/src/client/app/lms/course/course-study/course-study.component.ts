import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE,
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
import { GradebookListDialog } from '../gradebook-list/gradebook-list.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';

@Component({
    moduleId: module.id,
    selector: 'course-study',
    templateUrl: 'course-study.component.html',
})
export class CourseStudyComponent extends BaseComponent implements OnInit{

	course:Course;
	member: CourseMember;
	selectedClass: CourseClass;
	classes: CourseClass[];
	selectedFaq: CourseFaq;
	faqs: CourseFaq[];
	selectedMaterial: CourseMaterial;
	materials: CourseMaterial[];
	tree: TreeNode[];
	syl: CourseSyllabus;
	selectedNode: TreeNode;
	units: CourseUnit[];
	selectedUnit:CourseUnit;
	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;

	constructor(private router: Router, private route: ActivatedRoute, private sylUtils:SyllabusUtils) {
		super();
		this.course = new Course();
		this.member = new CourseMember();
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
	        var memberId = +params['memberId']; 
	        var courseId = +params['courseId']; 
	        Course.get(this, courseId).subscribe(course => {
	        	CourseMember.get(this, memberId).subscribe(member => {
	        		this.member =  member;
					this.course =  course;
					CourseClass.listByCourse(this, course.id)
					.map(classList => {
						return _.filter(classList, (obj:CourseClass)=> {
							return member.class_id == obj.id;
						});
					})
					.subscribe(classList => {
						this.classes =  classList;
					});
					this.loadFaqs();
					this.loadMaterials();
	        	});
	        	CourseSyllabus.byCourse(this, course.id).subscribe(syl=> {
		        	CourseUnit.listBySyllabus(this,syl.id).subscribe(units => {
						this.units = units;
						this.tree = this.sylUtils.buildTree(units);
			        });
		        });
	        });
	        
	    }); 
	}

	loadFaqs() {
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
			})
	}

	loadMaterials() {
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
			});
	}
}
