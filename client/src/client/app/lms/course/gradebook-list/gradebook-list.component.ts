import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { UserLog } from '../../../shared/models/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-gradebook-list-dialog',
    templateUrl: 'gradebook-list.component.html',
})
export class GradebookListDialog extends BaseComponent {

	COURSE_MEMBER_ENROLL_STATUS =  COURSE_MEMBER_ENROLL_STATUS;
	records: any;
	selectedRecord: any;
	display: boolean;
	courseClass: CourseClass;

	constructor(private reportUtils: ReportUtils) {
		super();
	}

	ngOnInit() {
	}

	hide() {
		this.display = false;
	}

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass = courseClass;
		CourseMember.listByClass(this, this.courseClass.id).subscribe(members => {
			this.records = _.filter(members, (member)=> {
				return member.role =='student';
			});
			_.each(this.records,(record)=> {
				UserLog.userStudyActivity(this,record.user_id, this.courseClass.id).subscribe(logs => {
					this.reportUtils.analyzeCourseActivity(logs)
				});
			});
		});
	}
}
