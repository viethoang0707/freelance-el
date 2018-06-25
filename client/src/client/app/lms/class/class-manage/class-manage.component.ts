import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DatePipe } from '@angular/common';
import * as _ from 'underscore';
import {
	EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS, PROJECT_STATUS,
	EXAM_STATUS, SURVEY_STATUS
} from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseLog } from '../../../shared/models/elearning/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';
import { TimeConvertPipe } from '../../../shared/pipes/time.pipe';
import { GradebookDialog } from '../gradebook/gradebook.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { LMSProfileDialog } from '../../course/lms-profile/lms-profile-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Course } from '../../../shared/models/elearning/course.model';
import { Project } from '../../../shared/models/elearning/project.model';
import { ExamDialog } from '../../../assessment/exam/exam-dialog/exam-dialog.component';
import { ProjectManageDialog } from '../project-manage/project-manage.dialog.component';
import { ProjectContentDialog } from '../../../cms/project/content-dialog/project-content.dialog.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ClassExamEnrollDialog } from '../class-exam-enroll/class-exam-enroll.dialog.component';
import { ExamContentDialog } from '../../../cms/exam/content-dialog/exam-content.dialog.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SurveyDialog } from '../../../assessment/survey/survey-dialog/survey-dialog.component';
import { SurveyContentDialog } from '../../../cms/survey/content-dialog/survey-content.dialog.component';
import { ClassSurveyEnrollDialog } from '../class-survey-enroll/class-survey-enroll.dialog.component';
import { SurveyStatsDialog } from '../../survey/survey-stats/survey-stats.dialog.component';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { Room } from '../../../shared/models/meeting/room.model';
import { RoomMember } from '../../../shared/models/meeting/room-member.model';

@Component({
	moduleId: module.id,
	selector: 'class-manage',
	templateUrl: 'class-manage.component.html',
	styleUrls: ['class-manage.component.css'],
})
export class ClassManageComponent extends BaseComponent {

	PROJECT_STATUS = PROJECT_STATUS;
	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	EXAM_STATUS = EXAM_STATUS;
	SURVEY_STATUS = SURVEY_STATUS;

	private studentRecords: any;
	private selectedRecord: any;
	private courseClass: CourseClass;
	private reportUtils: ReportUtils;
	private viewModes: SelectItem[];
	private viewMode: any;
	private course: Course;
	private memberId: number;

	private projects: Project[];
	private selectedProject: Project;
	private syl: CourseSyllabus;
	private courseMembers: CourseMember[];
	private certificates: Certificate[];
	private classExams: Exam[];
	private selectedClassExam: any;
	private classSurveys: Survey[];
	private selectedClassSurvey: any;
	private conference: Conference;
	private selectedMember: CourseMember;
	private room: Room;

	@ViewChild(GradebookDialog) gradebookDialog: GradebookDialog;
	@ViewChild(LMSProfileDialog) lmsProfileDialog: LMSProfileDialog;
	@ViewChild(ProjectContentDialog) projectContentDialog: ProjectContentDialog;
	@ViewChild(ProjectManageDialog) projectManageDialog: ProjectManageDialog;
	@ViewChild(ExamDialog) examDialog: ExamDialog;
	@ViewChild(ClassExamEnrollDialog) examEnrollDialog: ClassExamEnrollDialog;
	@ViewChild(ExamContentDialog) examContentDialog: ExamContentDialog;
	@ViewChild(SurveyDialog) surveyDialog: SurveyDialog;
	@ViewChild(ClassSurveyEnrollDialog) enrollDialog: ClassSurveyEnrollDialog;
	@ViewChild(SurveyContentDialog) surveyContentDialog: SurveyContentDialog;
	@ViewChild(SurveyStatsDialog) statsDialog: SurveyStatsDialog;

	constructor(private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.reportUtils = new ReportUtils();
		this.viewModes = [
			{ value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
			{ value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
		];
		this.viewModes = this.viewModes.map(viewMode => {
			return {
				label: viewMode.title,
				value: viewMode.value,
			}
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			var courseId = +params['courseId'];
			var classId = +params['classId'];
			this.memberId = +params['memberId'];
			this.viewMode = "outline";
			Observable.concat(this.lmsService.init(this),
				this.lmsService.initCourseContent(this),
				this.lmsService.initClassContent(this)
			).last().subscribe(() => {
				this.courseClass = this.lmsService.getCourseClass(classId);
				this.course = this.lmsService.getCourse(courseId);
				this.syl = this.lmsService.getCourseSyllabusFromCourse(courseId);
				this.projects = this.lmsService.getClassProjects(classId);
				this.classExams = this.lmsService.getClassExams(classId);
				this.classSurveys =  this.lmsService.getClassSurveys(classId);
				BaseModel.bulk_search(this,
					CourseMember.__api__listByClass(this.courseClass.id),
					CourseLog.__api__classActivity(this.courseClass.id),
					Certificate.__api__listByClass(this.courseClass.id))
					.subscribe(jsonArr => {
						this.courseMembers = CourseMember.toArray(jsonArr[0]);
						var logs = CourseLog.toArray(jsonArr[1]);
						this.certificates = Certificate.toArray(jsonArr[2]);
						this.loadMemberStats(logs);
					})
			});
		});
	}


	viewGradebook() {
		if (this.selectedRecord)
			this.gradebookDialog.show(this.selectedRecord);
	}

	viewLMSProfile() {
		if (this.selectedRecord)
			this.lmsProfileDialog.show(this.selectedRecord);
	}

	loadMemberStats(logs: CourseLog[]) {
		this.studentRecords = _.filter(this.courseMembers, (member: CourseMember) => {
			return member.role == 'student';
		});
		var courseUnits = this.lmsService.getSyllabusUnit(this.syl.id)
		var totalUnit = courseUnits.length;
		_.each(this.studentRecords, (record => {
			var certificate = _.find(this.certificates, (cert: Certificate) => {
				return cert.member_id == record["id"];
			});
			if (certificate)
				record["certificate"] = certificate.name;
			else
				record["certificate"] = '';
			var memberLogs = _.filter(logs, (log: CourseLog) => {
				return log.member_id == record["id"];
			})
			var result = this.reportUtils.analyzeCourseMemberActivity(memberLogs);
			if (result[0])
				record["first_attempt"] = this.datePipe.transform(result[0], EXPORT_DATETIME_FORMAT);
			if (result[1])
				record["last_attempt"] = this.datePipe.transform(result[1], EXPORT_DATETIME_FORMAT);
			record["time_spent"] = this.timePipe.transform(+result[2], 'min');
			if (totalUnit)
				record["completion"] = Math.floor(+result[3] * 100 / +totalUnit);
			else
				record["completion"] = 0;
			record["logs"] = memberLogs;
		}));
	}

	checkUnitComplete(record, unit) {
		let log: CourseLog = _.find(record["logs"], log => {
			return log.res_model == CourseUnit.Model && log.res_id == unit.id && log.code == 'COMPLETE_COURSE_UNIT';
		});
		if (log)
			return 'Finished';
		else
			return 'Unfinished';
	}

	addProject() {
		var project = new Project();
		project.class_id = this.courseClass.id;
		project.course_id = this.courseClass.course_id;
		this.projectContentDialog.show(project);
		this.projectContentDialog.onCreateComplete.subscribe(() => {
			this.projects.push(project);
			this.lmsService.invalidateClassContent();
		});
	}

	editProject() {
		this.projectContentDialog.show(this.selectedProject);
	}

	deleteProject() {
		this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
			this.selectedProject.delete(this).subscribe(() => {
				this.success(this.translateService.instant('Project deleted'));
				this.projects = _.reject(this.projects, (project: Project) => {
					return project.id == this.selectedProject.id;
				});
				this.lmsService.invalidateClassContent();
			});
		});
	}

	markProject() {
		this.projectManageDialog.show(this.selectedProject);
	}

	addExam() {
		var exam = new Exam();
		exam.is_public = false;
		exam.supervisor_id = this.ContextUser.id;
		exam.course_class_id = this.courseClass.id;
		this.examDialog.show(exam);
		this.examDialog.onCreateComplete.subscribe(() => {
			this.classExams.push(exam);
			this.lmsService.invalidateClassContent();
		})
	}

	editExam() {
		this.examDialog.show(this.selectedClassExam);
	}

	manageExam() {
		var examMembers = this.lmsService.getClassExamMember(this.memberId);
		var supervisor = _.find(examMembers, (examMember: ExamMember) => {
			return examMember.role == 'supervisor';
		});
		if (supervisor)
			this.router.navigate(['/lms/exams/manage', this.selectedClassExam.id, supervisor.id]);
	}

	editExamContent() {
		this.examContentDialog.show(this.selectedClassExam);
	}


	enrollSurvey() {
		this.enrollDialog.show(this.selectedClassSurvey, this.courseClass);
	}

	addSurvey() {
		var survey = new Survey();
		survey.is_public = false;
		survey.supervisor_id = this.ContextUser.id;
		survey.course_class_id = this.courseClass.id;
		this.surveyDialog.show(survey);
		this.surveyDialog.onCreateComplete.subscribe(() => {
			this.classSurveys.push(survey);
		});
	}

	editSurvey() {
		this.surveyDialog.show(this.selectedClassSurvey);
	}

	viewReportSurvey() {
		this.statsDialog.show(this.selectedClassSurvey);

	}

	editSurveyContent() {
		this.surveyContentDialog.show(this.selectedClassSurvey);
	}

}
