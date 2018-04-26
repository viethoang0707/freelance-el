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
 COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
import { GradebookListDialog } from '../gradebook-list/gradebook-list.component';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';


@Component({
	moduleId: module.id,
	selector: 'course-manage',
	templateUrl: 'course-manage.component.html',
})
export class CourseManageComponent extends BaseComponent implements OnInit {
	
	course:Course;
	member: CourseMember;
	selectedClass: CourseClass;
	classes: CourseClass[];
	selectedFaq: CourseFaq;
	faqs: CourseFaq[];
	selectedMaterial: CourseMaterial;
	materials: CourseMaterial[];
	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(ClassConferenceDialog) conferenceDialog : ClassConferenceDialog;
	@ViewChild(ClassExamListDialog) examListDialog : ClassExamListDialog;
	@ViewChild(GradebookListDialog) gradebookListDialog: GradebookListDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.classes = [];
		this.faqs = [];
		this.materials = [];
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
	        });
	    }); 

		
	}

	manageConference() {
		if (this.selectedClass) {
			this.conferenceDialog.show(this.selectedClass);
		}
	}

	manageStudent() {
		if (this.selectedClass) {
			this.gradebookListDialog.show(this.selectedClass);
		}
	}

	manageExam() {
		if (this.selectedClass) {
			this.examListDialog.show(this.selectedClass);
		}
	}

	loadFaqs() {
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
			})
	}

	addFaq() {
		var faq = new CourseFaq();
		faq.course_id = this.course.id;
		this.faqDialog.show(faq);
		this.faqDialog.onCreateComplete.subscribe(() => {
			this.loadFaqs();
		});
	}

	editFaq() {
		if (this.selectedFaq)
			this.faqDialog.show(this.selectedFaq);
		this.faqDialog.onUpdateComplete.subscribe(() => {
			this.loadFaqs();
		});
	}

	deleteFaq() {
		if (this.selectedFaq)
			this.confirm('Are you sure to delete ?', () => {
					this.selectedFaq.delete(this).subscribe(() => {
						this.loadFaqs();
						this.selectedFaq = null;
					})
				});
	}

	loadMaterials() {
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
			});
	}


	addMaterial() {
		var material = new CourseMaterial();
		material.course_id = this.course.id;
		this.materialDialog.show(material);
		this.materialDialog.onCreateComplete.subscribe(() => {
			this.loadMaterials();
		});


	}

	editMaterial() {
		if (this.selectedMaterial)
			this.materialDialog.show(this.selectedMaterial);
		this.materialDialog.onUpdateComplete.subscribe(() => {
			this.loadMaterials();
		});
	}

	deleteMaterial() {
		if (this.selectedMaterial)
			this.confirm('Are you sure to delete ?',() => {
					this.selectedMaterial.delete(this).subscribe(() => {
						this.loadMaterials();
						this.selectedMaterial = null;
					})
				});
	}
}

