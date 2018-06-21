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
import { GROUP_CATEGORY, COURSE_MEMBER_ROLE, COURSE_MEMBER_ENROLL_STATUS } from '../../../shared/models/constants';
import { CertificatePrintDialog } from '../../../lms/course/certificate-print/certificate-print.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { Achivement } from '../../../shared/models/elearning/achievement.model';


@Component({
	moduleId: module.id,
	selector: 'user-profile-dialog',
	templateUrl: 'profile-dialog.component.html',
	styleUrls: ['profile-dialog.component.css'],
})
export class UserProfileDialog extends BaseDialog<User> {

	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private courseMembers: CourseMember[];
	private certificates: Certificate[];
	private skills: Achivement[];
	private treeUtils: TreeUtils;
	private groups: Group[];
	private currentUser: User;

	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
		this.courseMembers = [];
		this.currentUser =  this.authService.UserProfile;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_id__DESC__ = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			BaseModel
			.bulk_search(this,
				Group.__api__listUserGroup(),
				CourseMember.__api__listByUser(object.id),
				Certificate.__api__listByUser(object.id),
				Achivement.__api__listByUser(object.id))
			.subscribe((jsonArr)=> {
				this.groups = Group.toArray(jsonArr[0]);
				this.courseMembers =  CourseMember.toArray(jsonArr[1]);
				this.certificates =  Certificate.toArray(jsonArr[2]);
				this.skills =  Achivement.toArray(jsonArr[3]);
				this.displayGroupTree();
				this.displayCourseHistory();
				this.displaySkills();
			});
		});
	}

	displayGroupTree() {
		this.tree = this.treeUtils.buildGroupTree(this.groups);
		if (this.object.group_id) {
			this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.object.group_id);
		}
	}

	displayCourseHistory() {
		this.courseMembers =  _.filter(this.courseMembers, (member: CourseMember) => {
			return member.role == 'student';
		});
		_.each(this.courseMembers, (member: CourseMember) => {
			member["certificate"] = _.find(this.certificates, (cert:Certificate) => {
				return cert.member_id == member.id;
			});
		});
	}

	displaySkills() {
		this.skills.sort((s1:Achivement,s2:Achivement)=> {
			return s1.date_acquire.getTime() - s2.date_acquire.getTime();
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}

}

