import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DatePipe } from '@angular/common';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { UserLog } from '../../../shared/models/elearning/log.model';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import { SelectItem } from 'primeng/api';
import { TimeConvertPipe} from '../../../shared/pipes/time.pipe';
import { GradebookDialog } from '../gradebook/gradebook.dialog.component';

@Component({
    moduleId: module.id,
    selector: 'gradebook-list-dialog',
    templateUrl: 'gradebook-list.component.html',
})
export class GradebookListDialog extends BaseComponent {

	COURSE_MEMBER_ENROLL_STATUS =  COURSE_MEMBER_ENROLL_STATUS;
	records: any;
	selectedRecord: any;
	display: boolean;
	courseClass: CourseClass;
	@ViewChild(GradebookDialog) gradebookDialog : GradebookDialog;


	constructor(private reportUtils: ReportUtils,private datePipe: DatePipe, private timePipe: TimeConvertPipe) {
		super();
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

	show(courseClass: CourseClass) {
		this.display = true;
		this.courseClass = courseClass;
		CourseMember.listByClass(this, this.courseClass.id).subscribe(members => {
			this.records = _.filter(members, (member)=> {
				return member.role =='student';
			});
			CourseSyllabus.byCourse(this, courseClass.course_id).subscribe(syllabus=> {
				CourseUnit.countBySyllabus(this, syllabus.id).subscribe(totalUnit=> {
					_.each(this.records,(record)=> {
						UserLog.userStudyActivity(this,record.user_id, this.courseClass.id).subscribe(logs => {
							var result = this.reportUtils.analyzeCourseActivity(logs);
						    if (result[0] != Infinity)
						    	record["first_attempt"] =  this.datePipe.transform(result[0],EXPORT_DATETIME_FORMAT);
					    	if (result[1] != Infinity)
						    	record["last_attempt"] =  this.datePipe.transform(result[1],EXPORT_DATETIME_FORMAT);
						    record["time_spent"] =  this.timePipe.transform(+result[2],'min');
						    record["completion"] = totalUnit == 0 ? 0 : Math.floor(result[3]*100/totalUnit);
						});
					});
				});
			});
		});
	}
}
