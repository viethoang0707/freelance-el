import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../../shared/services/api.service';
import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { Course } from '../../../../shared/models/elearning/course.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectCoursesDialog } from '../../../../shared/components/select-course-dialog/select-course-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { MemberByCourseReportComponent } from './member-by-course-report.component';

@Component({
    moduleId: module.id,
    selector: 'member-by-course-report-container',
	templateUrl: 'member-by-course-report-container.component.html',
})
@Report({
    title:'Member by course report',
    category:REPORT_CATEGORY.COURSE
})
export class MemberByCourseReportContainerComponent extends BaseComponent{

    @ViewChild(SelectGroupDialog) groupDialog : SelectGroupDialog;
    @ViewChild(SelectCoursesDialog) courseDialog : SelectCoursesDialog;
	@ViewChild(MemberByCourseReportComponent) memberReport: MemberByCourseReportComponent;

    constructor() {
        super();
    }

    export() {
    	this.memberReport.export)_;
    }

    selectCourseGroup() {
    	this.groupDialog.show();
    	this.groupDialog.onSelectGroup.subscribe((group:Group) => {
            this.startTransaction();
    		Course.listByGroup(this, group.id).subscribe((courses:Course[]) => {
    			this.memberReport.render(courses);
                this.closeTransaction();
    		});
    	});
    }

    selectIndividualCourses() {
		this.courseDialog.show();
    	this.courseDialog.onSelectCourses.subscribe((courses:Course[]) => {
			this.memberReport.render(courses);
		});
    }
}
