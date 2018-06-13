import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
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
	private members: CourseMember[];
	private certificates: Certificate[];
	private treeUtils: TreeUtils;
	private groups: Group[];
	private currentUser: User;

	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
		this.members = [];
		this.currentUser =  this.authService.UserProfile;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			BaseModel
			.bulk_search(this,
				Group.__api__listUserGroup(),
				CourseMember.__api__listByUser(object.id),
				Certificate.__api__listByUser(object.id))
			.subscribe((jsonArr)=> {
				this.groups = Group.toArray(jsonArr[0]);
				this.members =  CourseMember.toArray(jsonArr[1]);
				this.certificates =  Certificate.toArray(jsonArr[2]);
				this.displayGroupTree();
				this.displayCourseHistory();
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
		this.members =  _.filter(this.members, (member: CourseMember) => {
			return member.role == 'student';
		});
		_.each(this.members, (member: CourseMember) => {
			member["certificate"] = _.find(this.certificates, (cert:Certificate) => {
				return cert.member_id == member.id;
			});
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}

}

