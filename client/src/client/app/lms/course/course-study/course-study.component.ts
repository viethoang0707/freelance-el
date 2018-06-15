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
	GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, PROJECT_STATUS,
	COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE, EXAM_STATUS
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassConferenceDialog } from '../class-conference/class-conference.dialog.component';
import { ClassExamListDialog } from '../class-exam-list/class-exam-list.dialog.component';
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
import { ClassExam } from '../../../shared/models/elearning/class-exam.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CertificatePrintDialog } from '../certificate-print/certificate-print.dialog.component';
import { AnswerPrintDialog } from '../../exam/answer-print/answer-print.dialog.component';
import { MeetingService } from '../../../shared/services/meeting.service';
import { CourseUnitRegister } from '../../../cms/course/course-unit-template/unit.decorator';
import { CourseUnitContainerDirective } from '../../../cms/course/course-unit-template/unit-container.directive';
import { ICourseUnit } from '../../../cms/course/course-unit-template/unit.interface';
import { Project } from '../../../shared/models/elearning/project.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { ProjectSubmissionDialog } from '../project-submit/project-submission.dialog.component';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { BaseModel } from '../../../shared/models/base.model';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { ClassSurvey } from '../../../shared/models/elearning/class-survey.model';
import { SurveyStudyDialog } from '../../survey/survey-study/survey-study.dialog.component';

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
	private exams: Exam[];
	private completedExams: Exam[];
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
	private currentUser: User;
	private logs: CourseLog[];
	
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
		this.currentUser = this.authService.UserProfile;
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var memberId = +params['memberId'];
			var courseId = +params['courseId'];
			BaseModel
				.bulk_list(this, Course.__api__get([courseId]), CourseMember.__api__get([memberId]))
				.subscribe(jsonArr => {
					this.course = Course.toArray(jsonArr[0])[0];
					this.member = CourseMember.toArray(jsonArr[1])[0];
					var apiList = [
						CourseLog.__api__memberStudyActivity(memberId, courseId),
						CourseFaq.__api__listByCourse(this.course.id),
						CourseMaterial.__api__listByCourse(this.course.id),
						CourseSyllabus.__api__byCourse(this.course.id),
						Certificate.__api__byMember(this.member.id),
						ConferenceMember.__api__byCourseMember(this.member.id),
					];
					if (this.member.class_id) {
						apiList.push(ClassExam.__api__listByClass(this.member.class_id));
						apiList.push(ExamMember.__api__listByUser(this.currentUser.id));
						apiList.push(Submission.__api__listByUser(this.currentUser.id));
						apiList.push(Project.__api__listByClass(this.member.class_id));
						apiList.push(ProjectSubmission.__api__listByMember(this.member.id));
						apiList.push(ClassSurvey.__api__listByClass(this.member.class_id));
						apiList.push(SurveyMember.__api__listByUser(this.currentUser.id));
					}
					BaseModel.bulk_search(this, ...apiList).subscribe(jsonArr1 => {
						this.logs = CourseLog.toArray(jsonArr1[0]);
						this.faqs = CourseFaq.toArray(jsonArr1[1]);
						this.materials = CourseMaterial.toArray(jsonArr1[2]);
						var sylList = CourseSyllabus.toArray(jsonArr1[3]);
						if (sylList.length) {
							this.displayCouseSyllabus(sylList[0]);
						}
						var certList = Certificate.toArray(jsonArr1[4]);
						if (certList.length)
							this.certificate = certList[0];
						var conferenceMemberList = ConferenceMember.toArray(jsonArr1[5]);
						if (conferenceMemberList.length) {
							this.conferenceMember = conferenceMemberList[0];
							this.conferenceMember.populateConference(this).subscribe(() => {
								this.conference = this.conferenceMember.conference;
							})
						}
						if (this.member.class_id) {
							var classExams = ClassExam.toArray(jsonArr1[6]);
							var examMembers = ExamMember.toArray(jsonArr1[7]);
							var submits = Submission.toArray(jsonArr1[8]);
							this.displayExam(classExams, examMembers, submits);
							var projects = Project.toArray(jsonArr1[9]);
							var projectSubmits = ProjectSubmission.toArray(jsonArr1[10]);
							this.displayProject(projects, projectSubmits);
							var classSurveys = ClassSurvey.toArray(jsonArr1[11]);
							var surveyMembers = SurveyMember.toArray(jsonArr1[12]);
							this.displaySurveys(classSurveys, surveyMembers);
						}
					});
				});
		});
	}

	displayCouseSyllabus(syl: CourseSyllabus) {
		this.syl = syl;
		CourseUnit.listBySyllabus(this, this.syl.id).subscribe(units => {
			this.units = _.filter(units, (unit: CourseUnit) => {
				return unit.status == 'published';
			});
			_.each(this.units, (unit: CourseUnit) => {
				var log = _.find(this.logs, (obj: CourseLog) => {
					return obj.res_id == unit.id && obj.res_model == CourseUnit.Model && obj.code == 'COMPLETE_COURSE_UNIT';
				});
				if (log)
					unit["completed"] = true;
			});
			this.tree = this.sylUtils.buildGroupTree(units);
			this.treeList = this.sylUtils.flattenTree(this.tree);
			var last_attempt = _.max(this.logs, (log: CourseLog) => {
				return log.start.getTime();
			});
			if (last_attempt) {
				this.selectedNode = this.sylUtils.findTreeNode(this.tree, last_attempt.res_id);
			}
		});
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedUnit = this.selectedNode.data;
			if (this.studyMode == true) {
				this.studyMode = false;
				this.unloadCurrentUnit();
			}
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

	displayExam(classExams: ClassExam[], members: ExamMember[], submits: Submission[]) {
		var examIds = _.pluck(classExams, 'exam_id');
		members = _.filter(members, member => {
			return member.enroll_status != 'completed' && _.contains(examIds, member.exam_id);
		});
		ExamMember.populateExamForArray(this, members).subscribe(exams => {
			_.each(exams, (exam: ExamMember) => {
				exam["member"] = _.find(members, (member: ExamMember) => {
					return member.exam_id == exam.id;
				});
				exam["submit"] = _.find(submits, (submit: Submission) => {
					return submit.member_id == exam["member"].id && submit.exam_id == exam.id;
				});
				if (!exam["submit"])
					exam["score"] = ''
				else
					exam["score"] = exam["submit"].score;
				ExamQuestion.countByExam(this, exam.id).subscribe(count => {
					exam["question_count"] = count;
				});
			});
			exams.sort((exam1, exam2): any => {
				return (exam1.create_date < exam2.create_date);
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
		if (!project.IsAvailable)
			this.error('Project is not active');
		this.confirm(this.translateService.instant('Are you sure to start?'), () => {
			this.projectSubmitDialog.show(project, this.member);
		}
		);
	}

	displaySurveys(surveys: ClassSurvey[],members: SurveyMember[] ) {
        _.each(surveys, (survey:ClassSurvey)=> {
            survey["member"] = _.find(members, (m:SurveyMember)=> {
                return m.id == survey.survey_id && m.enroll_status !='completed';
            });
        });
    }

    startSurvey(survey: Survey, member: SurveyMember) {
    	if (this.member.enroll_status!='completed' && survey.IsAvailable) {
    		this.surveyDialog.show(survey, member);
    	}
    }
}
