import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
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


@Component({
    moduleId: module.id,
    selector: 'user-profile-dialog',
    templateUrl: 'profile-dialog.component.html',
    styleUrls: ['profile-dialog.component.css'],
})
export class UserProfileDialog extends BaseDialog<User> {
	user: User;
    tree: TreeNode[];
    selectedNode: TreeNode;
    members: CourseMember[];
    treeUtils: TreeUtils;
    COURSE_MEMBER_ENROLL_STATUS =  COURSE_MEMBER_ENROLL_STATUS;

    @ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
		this.members = [];
	}

	nodeSelect(event:any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.user = this.authService.UserProfile;
		this.onShow.subscribe(object => {
			this.startTransaction();
			Group.listUserGroup(this).subscribe(groups => {
				this.tree = this.treeUtils.buildGroupTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
				this.closeTransaction();
			});
			this.startTransaction();
			CourseMember.listByUser(this, object.id)
				.map(members => {
					return _.filter(members, (member:CourseMember)=> {
						return member.role == 'student';
					});
				})
				.subscribe(members => {
					this.members = members;
					Certificate.listByUser(this, object.id).subscribe(certificates=> {
						_.each(members, (member:CourseMember)=> {
								member["certificate"] = _.find(certificates, (cert=> {
									return cert.member_id == member.id;
								}));
						});
					});
					this.closeTransaction();
				});
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}


}

