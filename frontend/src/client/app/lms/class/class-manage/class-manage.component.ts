import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
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
import { ProjectDialog } from '../project-dialog/project-dialog.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamEditorDialog } from '../../../cms/exam/exam-editor/exam-editor.dialog.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { SurveyEditorDialog } from '../../../cms/survey/survey-editor/survey-editor.dialog.component';
import { SurveyStatsDialog } from '../../survey/survey-stats/survey-stats.dialog.component';
import { Conference } from '../../../shared/models/elearning/conference.model';
import { ConferenceMember } from '../../../shared/models/elearning/conference-member.model';
import { ClassMemberActivityDialog } from '../class-member-activity/class-member-activity.dialog.component';
import { ProjectMarkingDialog } from '../project-marking/project-marking.dialog.component';
import { ExamDialog } from '../../../assessment/exam/exam-form/exam-dialog.component';
import { SurveyDialog } from '../../../assessment/survey/survey-form/survey-dialog.component';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { SurveySheet } from '../../../shared/models/elearning/survey-sheet.model';

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
	private projects: Project[];
	private selectedProject: Project;
	private courseMembers: CourseMember[];
	private certificates: Certificate[];
	private classExams: Exam[];
	private selectedClassExam: any;
	private classSurveys: Survey[];
	private selectedClassSurvey: any;
	private conference: Conference;
	private selectedMember: CourseMember;
	private courseContent: any;
	private member: CourseMember;

	@ViewChild(GradebookDialog) gradebookDialog: GradebookDialog;
	@ViewChild(LMSProfileDialog) lmsProfileDialog: LMSProfileDialog;
	@ViewChild(ProjectDialog) projectDialog: ProjectDialog;
	@ViewChild(ExamEditorDialog) examContentDialog: ExamEditorDialog;
	@ViewChild(SurveyEditorDialog) surveyContentDialog: SurveyEditorDialog;
	@ViewChild(SurveyStatsDialog) statsDialog: SurveyStatsDialog;
	@ViewChild(ClassMemberActivityDialog) memberActivityChart: ClassMemberActivityDialog;
	@ViewChild(ProjectMarkingDialog) projectMarkingDialog: ProjectMarkingDialog;
	@ViewChild(ExamDialog) examDialog: ExamDialog;
	@ViewChild(ExamDialog) surveyDialog: SurveyDialog;

	constructor(private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
		this.reportUtils = new ReportUtils();
		this.viewModes = [
			{ value: 'outline', title: this.translateService.instant('Outline'), icon: 'ui-icon-dehaze' },
			{ value: 'detail', title: this.translateService.instant('Detail'), icon: 'ui-icon-apps' },
		];
		this.viewModes = this.viewModes.map(viewMode => {
			return {
				label: viewMode.title,
				value: viewMode.value,
			}
		});
		this.classSurveys = [];
		this.classExams = [];
		this.courseClass = new CourseClass();
	}

	ngOnInit() {
		this.courseClass = this.route.snapshot.data['courseClass'];
		this.viewMode = "outline";
		this.lmsProfileService.init(this).subscribe(() => {
			BaseModel.bulk_search(this,
				CourseClass.__api__listProjects(this.courseClass.id),
				CourseClass.__api__listExams(this.courseClass.id),
				CourseClass.__api__listSurveys(this.courseClass.id),
				CourseClass.__api__listMembers(this.courseClass.id),
				CourseClass.__api__listCertificates(this.courseClass.id))
				.subscribe(jsonArr => {
					this.projects = Project.toArray(jsonArr[0]);
					this.classExams = Exam.toArray(jsonArr[0]);
					this.classSurveys = Survey.toArray(jsonArr[0]);
					this.courseMembers = CourseMember.toArray(jsonArr[3]);
					this.certificates = Certificate.toArray(jsonArr[4]);
					CourseLog.classActivity(this, this.courseClass.id).subscribe(logs => {
						this.loadMemberStats(logs);
					});
				});
		});
	}

	viewChart(member: CourseMember) {
		this.memberActivityChart.show(member);
	}

	viewGradebook(student: CourseMember) {
		this.gradebookDialog.show(this.member, this.courseClass, student);
	}

	viewLMSProfile(member: CourseMember) {
		this.lmsProfileDialog.show(member);
	}

	loadMemberStats(logs: CourseLog[]) {
		this.studentRecords = _.filter(this.courseMembers, (member: CourseMember) => {
			return member.role == 'student';
		});
		var totalUnit = this.courseClass.unit_count;
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
			return this.translateService.instant('Finished');
		else
			return this.translateService.instant('Unfinished');
	}

	addProject() {
		var project = new Project();
		project.class_id = this.courseClass.id;
		project.course_id = this.courseClass.course_id;
		this.projectDialog.show(project);
		this.projectDialog.onCreateComplete.first().subscribe(() => {
			this.projects.push(project);
		});
	}

	editProject(project: Project) {
		this.projectDialog.show(project);
	}

	deleteProject(project: Project) {
		this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
			project.delete(this).subscribe(() => {
				this.success(this.translateService.instant('Project deleted'));
				this.projects = _.reject(this.projects, (obj: Project) => {
					return obj.id == project.id;
				})
			});
		});
	}

	markProject(project: Project) {
		this.projectMarkingDialog.show(project);
	}

	addExam() {
		var exam = new Exam();
		exam.is_public = false;
		exam.supervisor_id = this.ContextUser.id;
		exam.course_class_id = this.courseClass.id;
		this.examDialog.show(exam);
		this.examDialog.onCreateComplete.first().subscribe(() => {
			this.classExams.push(exam);
		});
	}

	editExam(exam: Exam) {
		this.examDialog.show(exam);
	}

	enrollExam(exam: Exam) {
		this.router.navigate(['/lms/class/manage/exam', this.courseClass.id, exam.id]);
	}

	manageExam(exam: Exam) {
		var member = this.lmsProfileService.getExamMemberByRole('supervisor', exam.id) || this.lmsProfileService.getExamMemberByRole('teacher', exam.id);
		this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
	}

	editExamContent(exam: Exam) {
		QuestionSheet.get(this, exam.sheet_id).subscribe(sheet=> {
			this.examContentDialog.show(exam, sheet);
		});
	}


	enrollSurvey(survey: Survey) {
		this.router.navigate(['/lms/class/manage/survey', this.courseClass.id, survey.id]);
	}

	addSurvey() {
		var survey = new Survey();
		survey.is_public = false;
		survey.supervisor_id = this.ContextUser.id;
		survey.course_class_id = this.courseClass.id;
		this.surveyDialog.show(survey);
		this.surveyDialog.onCreateComplete.first().subscribe(() => {
			this.classSurveys.push(survey);
		});
	}

	editSurvey(survey: Survey) {
		this.surveyDialog.show(survey);
	}

	viewReportSurvey(survey: Survey) {
		this.statsDialog.show(survey);
	}

	editSurveyContent(survey: Survey) {
		Survey.get(this, survey.sheet_id).subscribe(sheet=> {
			this.surveyContentDialog.show(survey, sheet);
		});
	}

}
