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
import { CourseUnitPreviewDialog } from '../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component';
import { ProjectListDialog } from '../project-list/project-list.dialog.component';


@Component({
	moduleId: module.id,
	selector: 'course-manage',
	templateUrl: 'course-manage.component.html',
	styleUrls: ['course-manage.component.css']
})
export class CourseManageComponent extends BaseComponent implements OnInit {
	
	private course:Course;
	private members: CourseMember[];
	private selectedClass: CourseClass;
	private classes: CourseClass[];
	private selectedFaq: CourseFaq;
	private faqs: CourseFaq[];
	private selectedMaterial: CourseMaterial;
	private materials: CourseMaterial[];
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private selectedUnit:CourseUnit;
	private  sylUtils:SyllabusUtils;
	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(ClassConferenceDialog) conferenceDialog : ClassConferenceDialog;
	@ViewChild(ClassExamListDialog) examListDialog : ClassExamListDialog;
	@ViewChild(GradebookListDialog) gradebookListDialog: GradebookListDialog;
	@ViewChild(CourseUnitPreviewDialog) unitPreviewDialog: CourseUnitPreviewDialog;
	@ViewChild(ProjectListDialog) projectListDialog: ProjectListDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this. sylUtils = new SyllabusUtils();
		this.classes = [];
		this.faqs = [];
		this.materials = [];
		this.course = new Course();
	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
	        var courseId = +params['courseId']; 
	        this.startTransaction();
	        Course.get(this, courseId).subscribe(course => {
	        	CourseMember.byCourseAndUser(this, this.authService.UserProfile.id, courseId).subscribe(members=> {
	        		this.course = course;
	        		this.members = _.filter(members, (member:CourseMember)=> {
	        				return member.role =='teacher';
	        		});
					this.loadCourseClass();
					this.loadFaqs();
					this.loadMaterials();
					this.loadCourseSyllabus();
					this.closeTransaction();
	        	})
				
	        });
	    }); 
	}

	loadCourseClass() {
		CourseClass.listByCourse(this, this.course.id)
			.map(classList => {
				return _.filter(classList, (obj:CourseClass)=> {
					var member = _.find(this.members, (member:CourseMember)=> {
						return member.class_id == obj.id;
					});
					return member != null;
				});
			})
			.subscribe(classList => {
				this.classes =  classList;
			});
	}

	loadCourseSyllabus() {
		this.startTransaction();
    	CourseSyllabus.byCourse(this, this.course.id).subscribe(syl=> {
        	CourseUnit.listBySyllabus(this,syl.id).subscribe(units => {
				this.units = units;
				this.tree = this.sylUtils.buildGroupTree(units);
				this.closeTransaction();
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

	manageProject() {
		if (this.selectedClass) {
			this.projectListDialog.show(this.selectedClass);
		}
	}

	loadFaqs() {
		this.startTransaction();
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
				this.closeTransaction();
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
	}

	deleteFaq() {
		if (this.selectedFaq)
			this.confirm('Are you sure to delete ?', () => {
				this.startTransaction();
				this.selectedFaq.delete(this).subscribe(() => {
					this.loadFaqs();
					this.selectedFaq = null;
					this.closeTransaction();
				})
			});
	}

	loadMaterials() {
		this.startTransaction();
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
				this.closeTransaction();
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
	}

	deleteMaterial() {
		if (this.selectedMaterial)
			this.confirm('Are you sure to delete ?',() => {
				this.startTransaction();
				this.selectedMaterial.delete(this).subscribe(() => {
					this.loadMaterials();
					this.selectedMaterial = null;
					this.closeTransaction();
				})
			});
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.selectedUnit =  this.selectedNode.data;
		}
	}

	previewUnit() {
		if (this.selectedNode) {
			this.unitPreviewDialog.show(this.selectedNode.data);
		}
	}
}

