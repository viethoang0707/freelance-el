import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs/Rx';

import { ReportUtils } from '../../../../shared/helpers/report.utils';
import { Group } from '../../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { User } from '../../../../shared/models/elearning/user.model';
import { CourseLog } from '../../../../shared/models/elearning/log.model';
import { CourseMember } from '../../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { EXPORT_DATETIME_FORMAT, REPORT_CATEGORY, GROUP_CATEGORY, COURSE_MODE, COURSE_MEMBER_ENROLL_STATUS, EXPORT_DATE_FORMAT } from '../../../../shared/models/constants'
import { Report } from '../../report.decorator';
import { SelectGroupDialog } from '../../../../shared/components/select-group-dialog/select-group-dialog.component';
import { SelectUsersDialog } from '../../../../shared/components/select-user-dialog/select-user-dialog.component';
import { TimeConvertPipe} from '../../../../shared/pipes/time.pipe';
import { ExcelService } from '../../../../shared/services/excel.service';
import { CourseByMemberReportComponent } from './course-by-member-report.component';

const USER_FIELDS = ['name'];

@Component({
    moduleId: module.id,
    selector: 'course-by-member-report-container',
	templateUrl: 'course-by-member-report-container.component.html',
})
@Report({
    title:'Course by member report',
    category:REPORT_CATEGORY.COURSE
})
export class CourseByMemberReportContainerComponent extends BaseComponent{

	@ViewChild(SelectGroupDialog) groupDialog : SelectGroupDialog;
	@ViewChild(SelectUsersDialog) userDialog : SelectUsersDialog;
    @ViewChild(CourseByMemberReportComponent) courseReport:CourseByMemberReportComponent;
    GROUP_CATEGORY =  GROUP_CATEGORY;
    
    constructor() {
        super();
    }

    export() {
    	this.courseReport.export();
    }

    selectUserGroup() {
    	this.groupDialog.show();
    	this.groupDialog.onSelectGroup.first().subscribe((group:Group) => {
    		group.listUsers(this,USER_FIELDS).subscribe(users => {
                this.courseReport.clear();
    			this.courseReport.render(users);
			});	
    	});
    }

    selectIndividualUsers() {
    	this.userDialog.show();
    	this.userDialog.onSelectUsers.first().subscribe((users:User[]) => {
            this.courseReport.clear();
            this.courseReport.render(users);
		});
    }

}
