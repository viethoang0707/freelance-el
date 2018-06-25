import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
	SURVEY_STATUS, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, PROJECT_STATUS,
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

	private course: Course;
	private courseClass: CourseClass;
	private member: CourseMember;
	private faqs: CourseFaq[];
	private materials: CourseMaterial[];
	private tree: TreeNode[];
	private syl: CourseSyllabus;
	private selectedNode: TreeNode;
	private units: CourseUnit[];
	private selectedUnit: CourseUnit;
	private examMembers: ExamMember[];
	private completedMembers: ExamMember[];
	private certificate: Certificate;
	private conference: Conference;
	private conferenceMember: ConferenceMember;
	private treeList: TreeNode[];
	private sylUtils: SyllabusUtils;
	private reportUtils: ReportUtils;
	private projects: Project[];
	private componentRef: any;
	private studyMode: boolean;
	private enableLogging: boolean;
	private logs: CourseLog[];
	private surveys: Survey[];

	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;
	@ViewChild(ExamStudyDialog) examStudyDialog: ExamStudyDialog;
	@ViewChild(AnswerPrintDialog) answerSheetDialog: AnswerPrintDialog;
	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;
	@ViewChild(CourseUnitContainerDirective) unitHost: CourseUnitContainerDirective;
	@ViewChild(ProjectSubmissionDialog) projectSubmitDialog: ProjectSubmissionDialog;
	@ViewChild(SurveyStudyDialog) surveyDialog: SurveyStudyDialog;

	constructor(private router: Router, private route: ActivatedRoute,
		private meetingSerivce: MeetingService, private componentFactoryResolver: ComponentFactoryResolver) {
		super();
		this.reportUtils = new ReportUtils();
		this.sylUtils = new SyllabusUtils();
		this.course = new Course();
		this.member = new CourseMember();
		this.certificate = new Certificate();
		this.conference = new Conference();
		this.conferenceMember = new ConferenceMember();
		this.studyMode = false;
		this.enableLogging = false;
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var memberId = +params['memberId'];
			var courseId = +params['courseId'];
			Observable.concat(this.lmsService.init(this),
				this.lmsService.initCourseContent(this),
				this.lmsService.initClassContent(this)
			).subscribe(() => {
				this.course = this.lmsService.getCourse(courseId);
						this.member = this.lmsService.getCourseMember(memberId);
						this.faqs = this.lmsService.getCourseFaqs(courseId);
						this.materials = this.lmsService.getCourseMaterials(courseId);
						this.syl = this.lmsService.getCourseSyllabusFromCourse(courseId);
						this.units = this.lmsService.getSyllabusUnit(this.syl.id);
						var apiList = [
							CourseLog.__api__memberStudyActivity(memberId, courseId),
							Certificate.__api__byMember(this.member.id),
						];
						if (this.member.class_id) {
							apiList.push(Submission.__api__listByMember(this.ContextUser.id));
							apiList.push(ProjectSubmission.__api__listByMember(this.member.id));
						}
						BaseModel.bulk_search(this, ...apiList).subscribe(jsonArr => {
							this.logs = CourseLog.toArray(jsonArr[0]);
							var certList = Certificate.toArray(jsonArr[1]);
							if (certList.length)
								this.certificate = certList[0];
							this.displayCouseSyllabus();
							this.conferenceMember = this.lmsService.getClassConferenceMember(memberId);
							if (this.conferenceMember)
								this.conference = this.conferenceMember.conference;
							if (this.member.class_id) {
								var classExams = this.lmsService.getClassExams(this.member.class_id);
								var examMembers = this.lmsService.getClassExamMember(memberId);
								var submits = Submission.toArray(jsonArr[2]);
								this.displayExam(classExams, examMembers, submits);
								var projects = this.lmsService.getClassProjects(this.member.class_id);
								var projectSubmits = ProjectSubmission.toArray(jsonArr[3]);
								this.displayProject(projects, projectSubmits);
								this.surveys = this.lmsService.getClassSurveys(this.member.class_id);
							}
						});
					});
		});
	}

	displayCouseSyllabus() {
		this.units = _.filter(this.units, (unit: CourseUnit) => {
			return unit.status == 'published';
		});
		_.each(this.units, (unit: CourseUnit) => {
			var log = _.find(this.logs, (obj: CourseLog) => {
				return obj.res_id == unit.id && obj.res_model == CourseUnit.Model && obj.code == 'COMPLETE_COURSE_UNIT';
			});
			if (log)
				unit["completed"] = true;
		});
		this.tree = this.sylUtils.buildGroupTree(this.units);
		this.treeList = this.sylUtils.flattenTree(this.tree);
		var last_attempt = _.max(this.logs, (log: CourseLog) => {
			return log.start.getTime();
		});
		if (last_attempt) {
			this.selectedNode = this.sylUtils.findTreeNode(this.tree, last_attempt.res_id);
		}
		if (this.syl.status !='published')
			this.warn('Cours syllabus is not published');
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
			if (this.studyMode == true) {
				this.studyMode = false;
			}
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
			if (this.enableLogging)
				CourseLog.stopCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
			var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
			this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
			this.selectedUnit = this.selectedNode.data;
			this.studyMode = false;
			this.unloadCurrentUnit();
		}
	}

	nextUnit() {
		if (this.selectedUnit) {
			if (this.enableLogging)
				CourseLog.stopCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
			var nextUnit = this.computedNextUnit(this.selectedUnit.id);
			this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
			this.selectedUnit = this.selectedNode.data;
			this.studyMode = false;
			this.unloadCurrentUnit();
		}
	}

	completeUnit() {
		if (this.selectedUnit) {
			if (this.enableLogging)
				CourseLog.completeCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
			this.selectedUnit["completed"] = true;
			this.studyMode = false;
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

	studyUnit() {
		if (this.selectedUnit) {
			if (this.course.complete_unit_by_order) {
				let prevUnit: CourseUnit = this.computedPrevUnit(this.selectedUnit.id);
				if (prevUnit) {
					var log = _.find(this.logs, (obj: CourseLog) => {
						return obj.res_id == prevUnit.id && obj.res_model == CourseUnit.Model && obj.code == 'COMPLETE_COURSE_UNIT';
					});
					if (log) {
						this.openUnit(this.selectedUnit);
						if (this.enableLogging)
							CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
					}
					else
						this.error(this.translateService.instant('You have not completed previous unit'));
				}
				else {
					this.openUnit(this.selectedUnit);
					CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
				}
			}
			else {
				this.openUnit(this.selectedUnit);
				if (this.enableLogging)
					CourseLog.startCourseUnit(this, this.member.id, this.selectedUnit.id).subscribe();
			}
		}
	}


	openUnit(unit: CourseUnit) {
		var detailComponent = CourseUnitRegister.Instance.lookup(unit.type);
		let viewContainerRef = this.unitHost.viewContainerRef;
		if (detailComponent) {
			let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
			viewContainerRef.clear();
			this.componentRef = viewContainerRef.createComponent(componentFactory);
			(<ICourseUnit>this.componentRef.instance).mode = 'study';
			(<ICourseUnit>this.componentRef.instance).render(unit);
			this.studyMode = true;
		} else {
			viewContainerRef.clear();
			this.componentRef = null;
		}
	}

	displayExam(classExams: Exam[], members: ExamMember[], submits: Submission[]) {
		var examIds = _.pluck(classExams, 'id');
		members = _.filter(members, member => {
			return member.enroll_status != 'completed' && _.contains(examIds, member.exam_id);
		});
		ExamGrade.listByExams(this, examIds).subscribe(grades => {
			_.each(members, (member: ExamMember) => {
				var examGrades = _.filter(grades, (grade: ExamGrade) => {
					return grade.exam_id == member.exam_id;
				});
				member["submit"] = _.find(submits, (submit: Submission) => {
					return submit.member_id == member.id && submit.exam_id == member.exam.id;
				});
				if (!member["submit"])
					member["score"] = ''
				else {
					member["score"] = member["submit"].score;
					member["grade"] = ExamGrade.gradeScore(examGrades, member["score"]);
				}
				ExamQuestion.countByExam(this, member.exam.id).subscribe(count => {
					member["question_count"] = count;
				});
			});
			members.sort((m1: ExamMember, m2: ExamMember): any => {
				return (m1.exam.create_date.getTime() - m2.exam.create_date.getTime());
			});
			this.examMembers = members;
			this.completedMembers = _.filter(members, (member: ExamMember) => {
				return member.enroll_status == 'completed';
			});
		});
	}


	displayProject(projects: Project[], submits: ProjectSubmission[]) {
		this.projects = projects;
		_.each(projects, (project: Project) => {
			project["submit"] = _.find(submits, (submit: ProjectSubmission) => {
				return submit.project_id == project.id;
			});
			if (project["submit"]) {
				if (project["submit"].score != null)
					project["score"] = project["submit"].score;
				else
					project["score"] = '';
			}
		});
	}

	startExam(exam: Exam, member: ExamMember) {
		var now = new Date();
		if (exam.start && exam.start.getTime() > now.getTime()) {
			this.warn(this.translateService.instant('Exam has not been started'));
			return;
		}
		if (exam.end && exam.end.getTime() < now.getTime()) {
			this.warn(this.translateService.instant('Exam has ended'));
			return;
		}
		this.confirm(this.translateService.instant('Are you sure to start?'), () => {
			this.examStudyDialog.show(exam, member);
		}
		);
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


	startSurvey(survey: Survey, member: SurveyMember) {
		if (!survey.IsAvailable) {
			this.warn('Survey is not available');
			return;
		}
		if (this.member.enroll_status == 'completed') {
			this.warn('You have completed the survey');
			return;
		}
		if (this.member.enroll_status != 'completed' && survey.IsAvailable) {
			this.surveyDialog.show(survey, member);
		}
	}
}
