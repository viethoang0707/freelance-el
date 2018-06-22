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
import { LMSProfileDialog } from '../lms-profile/lms-profile-dialog.component';

@Component({
	moduleId: module.id,
	selector: 'class-manage-dialog',
	templateUrl: 'class-manage.component.html',
	styleUrls: ['class-manage.component.css'],
})
export class ClassManageDialog extends BaseComponent {

	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	private records: any;
	private selectedRecord: any;
	private display: boolean;
	private courseClass: CourseClass;
	private reportUtils: ReportUtils;
	private viewModes: SelectItem[];
	private viewMode: any;
	private courseUnits: CourseUnit[];
	@ViewChild(GradebookDialog) gradebookDialog: GradebookDialog;
	@ViewChild(LMSProfileDialog) lmsProfileDialog : LMSProfileDialog;

	constructor(private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
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

	}

	hide() {
		this.display = false;
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
		CourseUnit.listBySyllabus(this, syl.id).subscribe(courseUnits => {
			this.courseUnits = _.filter(courseUnits, unit => {
				return unit.type != 'folder';
			});
			var totalUnit = this.courseUnits.length;
			_.each(this.records, (record => {
				var certificate = _.find(certificates, (cert:Certificate)=> {
					return cert.member_id == record["id"];
				});
				if (certificate)
					record["certificate"] = certificate.name;
				else
					record["certificate"] = '';
				var memberLogs = _.filter(logs, (log:CourseLog)=> {
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
		});
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

	show(courseClass: CourseClass) {
		this.display = true;
		this.viewMode = "outline";
		this.courseClass = courseClass;
		BaseModel.bulk_search(this,
			CourseMember.__api__listByClass(this.courseClass.id),
			CourseSyllabus.__api__byCourse(this.courseClass.course_id),
			CourseLog.__api__classActivity(this.courseClass.id),
			Certificate.__api__listByClass(this.courseClass.id))
			.subscribe(jsonArr => {
				var members = CourseMember.toArray(jsonArr[0]);
				var sylList = CourseSyllabus.toArray(jsonArr[1]);
				var logs = CourseLog.toArray(jsonArr[2]);
				var certificates = Certificate.toArray(jsonArr[3]);
				this.loadMemberStats(members, sylList[0], logs, certificates);
			})
	}
}
