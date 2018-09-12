import { Component, OnInit, AfterViewInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
import { SelectItem, MenuItem } from 'primeng/api';
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
import { ProjectSubmissionDialog } from '../../class/project-submit/project-submission.dialog.component';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { BaseModel } from '../../../shared/models/base.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SurveyStudyDialog } from '../../survey/survey-study/survey-study.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExamRecord } from '../../../shared/models/elearning/exam-record.model';
import { GradebookDialog } from '../../class/gradebook/gradebook.dialog.component';
import { CourseUnitStudyDialog } from '../course-unit-study-dialog/course-unit-study-dialog.component';


@Component({
	moduleId: module.id,
	selector: 'course-study',
	templateUrl: 'course-study.component.html',
	styleUrls: ['course-study.component.css'],
})
export class CourseStudyComponent extends BaseComponent implements OnInit {

	COURSE_UNIT_TYPE = COURSE_UNIT_TYPE;
	EXAM_STATUS = EXAM_STATUS;
	PROJECT_STATUS = PROJECT_STATUS;
	SURVEY_STATUS = SURVEY_STATUS;
	COURSE_STATUS = COURSE_STATUS;
	COURSE_MODE = COURSE_MODE;

	private course: Course;
	private courseClass: CourseClass;
	private member: CourseMember;
	private faqs: CourseFaq[];
	private materials: CourseMaterial[];
	private syl: CourseSyllabus;
	private units: CourseUnit[];
	private examMembers: ExamMember[];
	private certificate: Certificate;
	private conference: Conference;
	private conferenceMember: ConferenceMember;
	private projects: Project[];
	private projectSubmits: ProjectSubmission[];

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;
	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;
	@ViewChild(ProjectSubmissionDialog) projectSubmitDialog: ProjectSubmissionDialog;
	@ViewChild(GradebookDialog) gradebookDialog: GradebookDialog;
	@ViewChild(CourseUnitStudyDialog) unitStudyDialog: CourseUnitStudyDialog;

	constructor(private location: Location, private router: Router, private route: ActivatedRoute,
		private meetingSerivce: MeetingService, private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.course = new Course();
		this.member = new CourseMember();
		this.certificate = new Certificate();
		this.conference = new Conference();
		this.conferenceMember = new ConferenceMember();
		this.syl = new CourseSyllabus();
	}

	ngOnInit() {
		this.course = this.route.snapshot.data['course'];
		this.member = this.route.snapshot.data['member'];
		if (this.course.syllabus_status != 'published') {
			this.error(this.translateService.instant('Syllabus has not been published'));
			return;
		}
		this.lmsProfileService.init(this).subscribe(() => {
			this.certificate = this.lmsProfileService.certificateByMember(this.member.id);
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
					})
				});
			if (this.member.class_id) {
				this.examMembers = this.lmsProfileService.examMembersByClassId(this.member.class_id);
				this.conferenceMember = this.lmsProfileService.conferenceMemberByClassId(this.member.class_id);
				if (this.conferenceMember)
					Conference.get(this, this.conferenceMember.conference_id).subscribe(conference => {
						this.conference = conference;
					})
				this.projectSubmits = this.lmsProfileService.projectSubmitsByMember(this.member.id);
				BaseModel.bulk_search(this,
					CourseClass.__api__listProjects(this.member.class_id))
					.subscribe(jsonArr => {
						this.projects = Project.toArray(jsonArr[0]);
					})
				ExamMember.populateExams(this, this.examMembers).subscribe();
			}
		});
	}

	viewGradebook() {
		CourseClass.get(this, this.member.class_id).subscribe(courseClass => {
			this.gradebookDialog.show(this.member, courseClass, this.member);
		})

	}

	study() {
		this.unitStudyDialog.show(this.member, this.course, this.syl, this.units, this.faqs, this.materials);
	}

	getProjectSubmit(project: Project) {
		return _.find(this.projectSubmits, (submit: ProjectSubmission) => {
			return submit.project_id == project.id;
		}) || new ProjectSubmission();
	}

	joinConference() {
		if (this.conference.id && this.conferenceMember.id && this.conferenceMember.is_active)
			this.meetingSerivce.join(this.conference.room_ref, this.conferenceMember.room_member_ref)
		else
			this.error(this.translateService.instant('You are  not allowed to join the conference'));
	}

	submitProject(project: Project) {
		this.projectSubmitDialog.show(project, this.member);
	}

	startExam(exam: Exam, member: ExamMember) {
		this.confirm(this.translateService.instant('Are you sure to start?'), () => {
			exam.populate(this).subscribe(() => {
				exam.populateSetting(this).subscribe(() => {
					this.examStudyDialog.show(exam, exam.setting, member);
				})
			});
		});
	}

	back() {
		this.location.back();
	}

}
