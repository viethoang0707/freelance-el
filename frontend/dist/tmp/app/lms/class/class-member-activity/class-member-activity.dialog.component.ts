import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Certificate } from '../../../shared/models/elearning/course-certificate.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { EXAM_MEMBER_ENROLL_STATUS, COURSE_MEMBER_ROLE, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants';
import { BaseModel } from '../../../shared/models/base.model';
import { Achivement } from '../../../shared/models/elearning/achievement.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { ExcelService } from '../../../shared/services/excel.service';
import { CourseMemberActivityChartComponent } from '../../../analysis/chart/course-member-activity-chart/course-member-activity-chart.component';

@Component({
	moduleId: module.id,
	selector: 'class-member-activity-dialog',
	templateUrl: 'class-member-activity.dialog.component.html',
	styleUrls: ['class-member-activity.dialog.component.css'],
})
export class ClassMemberActivityDialog extends BaseDialog<CourseMember> {


	@ViewChild(CourseMemberActivityChartComponent) chart: CourseMemberActivityChartComponent;

	constructor() {
		super();
	}


	ngOnInit() {
		this.onShow.subscribe(object => {
			this.chart.drawChart(object, 30);
		});
	}

}

