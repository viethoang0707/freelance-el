import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DatePipe } from '@angular/common';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
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

@Component({
	moduleId: module.id,
	selector: 'class-student-list',
	templateUrl: 'class-student-list.component.html',
	styleUrls: ['class-student-list.component.css'],
})
export class ClassStudentListComponent extends BaseComponent {

	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	private records: any;
	private selectedRecord: any;
	private courseClass: CourseClass;
	private reportUtils: ReportUtils;
	private viewModes: SelectItem[];
	private viewMode: any;
	private course: Course;

	@ViewChild(GradebookDialog) gradebookDialog: GradebookDialog;
	@ViewChild(LMSProfileDialog) lmsProfileDialog: LMSProfileDialog;

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
			this.viewMode = "outline";
			this.lmsService.init(this).subscribe(() => {
				this.lmsService.initCourseContent(this).subscribe(() => {
					this.lmsService.initClassContent(this).subscribe(() => {
						this.courseClass = this.lmsService.getCourseClass(classId);
						this.course = this.lmsService.getCourse(courseId);
						var syl = this.lmsService.getCourseSyllabusFromCourse(courseId)
						
						BaseModel.bulk_search(this,
							CourseMember.__api__listByClass(this.courseClass.id),
							CourseLog.__api__classActivity(this.courseClass.id),
							Certificate.__api__listByClass(this.courseClass.id))
							.subscribe(jsonArr => {
								var members = CourseMember.toArray(jsonArr[0]);
								var logs = CourseLog.toArray(jsonArr[1]);
								var certificates = Certificate.toArray(jsonArr[2]);
								this.loadMemberStats(members, syl, logs, certificates);
							})

					});
				});
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

	loadMemberStats(members: CourseMember[], syl: CourseSyllabus, logs: CourseLog[], certificates: Certificate[]) {
		this.records = _.filter(members, (member) => {
			return member.role == 'student';
		});
		var courseUnits = this.lmsService.getSyllabusUnit(syl.id)
		var totalUnit = courseUnits.length;
		_.each(this.records, (record => {
			var certificate = _.find(certificates, (cert: Certificate) => {
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

}
