import { Component, OnInit, AfterViewInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { ExamStudyDialog } from '../../exam/exam-study/exam-study.dialog.component';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { Route, } from '@angular/router';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { MeetingService } from '../../../shared/services/meeting.service';
import { CourseUnitRegister } from '../../../cms/course/course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../../../cms/course/course-unit-template/unit-container.directive';
import { ICourseUnit } from '../../../cms/course/course-unit-template/unit.interface';
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

	constructor(private router: Router, private route: ActivatedRoute,
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
		this.route.params.subscribe(params => {
			var memberId = +params['memberId'];
			var courseId = +params['courseId'];
			this.lmsProfileService.init(this).subscribe(() => {
				this.member = this.lmsProfileService.courseMemberById(memberId);
				this.certificate = this.lmsProfileService.certificateByMember(memberId);
				this.member.populateCourse(this).subscribe(() => {
					this.course = this.member.course;
					if (this.course.syllabus_status != 'published') {
						this.error('Syllabus has not been published');
						return;
					}
					this.lmsProfileService.getCourseContent(this.course).subscribe(content => {
						this.syl = content["syllabus"];
						this.faqs = content["faqs"];
						this.materials = content["materials"];
						this.units = content["units"];
						if (this.member.class_id) {
							this.examMembers = this.lmsProfileService.examMembersByClassId(this.member.class_id);
							this.conferenceMember = this.lmsProfileService.conferenceMemberByClassId(this.member.class_id);
							if (this.conferenceMember)
								this.conference = this.conferenceMember.conference;
							this.projectSubmits = this.lmsProfileService.projectSubmitsByMember(this.member.id);
							this.member.populateClass(this).subscribe(() => {
								this.lmsProfileService.getClassContent(this.member.clazz).subscribe(content => {
									this.projects = content["projects"];
								});
							})
							ExamMember.populateExams(this, this.examMembers).subscribe();
						}
					});
				});
			});
		});
	}

	viewGradebook() {
		this.gradebookDialog.show(this.member, this.member);
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
			this.error('You are  not allowed to join the conference');
	}

	submitProject(project: Project) {
		this.projectSubmitDialog.show(project, this.member);
	}

	startExam(exam: Exam, member: ExamMember) {
		this.confirm('Are you sure to start ?', () => {
			exam.populate(this).subscribe(() => {
				this.examStudyDialog.show(exam, member);
			});

		});
	}

}
