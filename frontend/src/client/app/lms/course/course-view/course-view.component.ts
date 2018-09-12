import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Conference } from '../../../shared/models/elearning/conference.model'; import {
	SURVEY_STATUS, COURSE_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, PROJECT_STATUS,
	COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE, EXAM_STATUS
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { CourseFaq } from '../../../shared/models/elearning/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { CourseLog } from '../../../shared/models/elearning/log.model';
import { SelectItem } from 'primeng/api';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ExamStudyDialog } from '../../exam/exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, } from '@angular/router';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { MeetingService } from '../../../shared/services/meeting.service';
import { CourseUnitRegister } from '../../../cms/course/course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../../../cms/course/course-unit-template/unit-container.directive';
import { ICourseUnitDesign } from '../../../cms/course/course-unit-template/unit.interface';
import { Project } from '../../../shared/models/elearning/project.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { BaseModel } from '../../../shared/models/base.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SurveyStudyDialog } from '../../survey/survey-study/survey-study.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';

@Component({
	moduleId: module.id,
	selector: 'course-view',
	templateUrl: 'course-view.component.html',
	styleUrls: ['course-view.component.css'],
})
export class CourseViewComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	COURSE_STATUS = COURSE_STATUS;
	COURSE_MODE = COURSE_MODE;

	private course: Course;
	private member: CourseMember;
	private faqs: CourseFaq[];
	private materials: CourseMaterial[];
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private selectedUnit: CourseUnit;
	private treeList: TreeNode[];
	private sylUtils: SyllabusUtils;
	private componentRef: any;

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;


	constructor(private location: Location, private router: Router, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.sylUtils = new SyllabusUtils();
		this.course = new Course();
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		BaseModel.bulk_search(this,
			Course.__api__listFaqs(this.course.id),
			Course.__api__listMaterials(this.course.id),
			Course.__api__listUnits(this.course.id))
			.subscribe(jsonArr => {
				this.faqs = CourseFaq.toArray(jsonArr[0]);
				this.materials = CourseMaterial.toArray(jsonArr[1]);
				this.units = CourseUnit.toArray(jsonArr[2]);
				CourseSyllabus.get(this, this.course.syllabus_id).subscribe(syl => {
					this.syl = syl;
					this.displayCouseSyllabus();
				})
			});
	}

	displayCouseSyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
		if (this.syl.status != 'published')
			this.warn('Cours syllabus is not published');
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
			this.unloadCurrentUnit();
		}
	}

	unloadCurrentUnit() {
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (viewContainerRef)
			viewContainerRef.clear();
	}

	prevUnit() {
		if (this.selectedUnit) {
			var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
			this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
			this.selectedUnit = this.selectedNode.data;
			this.unloadCurrentUnit();
		}
	}

	nextUnit() {
		if (this.selectedUnit) {
			var nextUnit = this.computedNextUnit(this.selectedUnit.id);
			this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
			this.selectedUnit = this.selectedNode.data;
			this.unloadCurrentUnit();
		}
	}


	computedPrevUnit(currentUnitId: number): CourseUnit {
		var currentNodeIndex = 0;
		for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex--;
		while (currentNodeIndex >= 0) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type != 'folder')
				break;
			currentNodeIndex--;
		}
		return (currentNodeIndex >= 0 ? this.treeList[currentNodeIndex].data : null);
	}

	computedNextUnit(currentUnitId: number): CourseUnit {
		var currentNodeIndex = 0;
		for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.id == currentUnitId)
				break;
		}
		currentNodeIndex++;
		while (currentNodeIndex < this.treeList.length) {
			var node = this.treeList[currentNodeIndex];
			if (node.data.type != 'folder')
				break;
			currentNodeIndex++;
		}
		return (currentNodeIndex < this.treeList.length ? this.treeList[currentNodeIndex].data : null);
	}

	back() {
		this.location.back();
	}
}
