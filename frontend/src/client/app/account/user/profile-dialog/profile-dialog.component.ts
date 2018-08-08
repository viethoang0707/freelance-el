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
import { CertificatePrintDialog } from '../../../lms/course/certificate-print/certificate-print.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { Achivement } from '../../../shared/models/elearning/achievement.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Submission } from '../../../shared/models/elearning/submission.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';

const COURSE_MEMBER_FIELDS = ['course_name', 'role', 'enroll_status', 'date_register'];
const EXAM_MEMBER_FIELDS = ['exam_name', 'grade', 'enroll_status', 'date_register', 'status', 'exam_id', 'role'];

@Component({
	moduleId: module.id,
	selector: 'user-profile-dialog',
	templateUrl: 'profile-dialog.component.html',
	styleUrls: ['profile-dialog.component.css'],
})
export class UserProfileDialog extends BaseDialog<User> {

	COURSE_MEMBER_ENROLL_STATUS = COURSE_MEMBER_ENROLL_STATUS;
	EXAM_MEMBER_ENROLL_STATUS = EXAM_MEMBER_ENROLL_STATUS;

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private courseMembers: CourseMember[];
	private examMembers: ExamMember[];
	private certificates: Certificate[];
	private skills: Achivement[];
	private treeUtils: TreeUtils;
	private groups: Group[];

	@ViewChild(CertificatePrintDialog) certPrintDialog: CertificatePrintDialog;

	constructor() {
		super();
		this.treeUtils = new TreeUtils();
		this.courseMembers = [];
		this.skills = [];
		this.examMembers = [];
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_name = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.onShow.subscribe((object: User) => {
			this.courseMembers = [];
			this.skills = [];
			this.examMembers = [];
			this.displayGroupTree();
			BaseModel
				.bulk_list(this,
					User.__api__listCourseMembers(object.course_member_ids, COURSE_MEMBER_FIELDS),
					User.__api__listCertificates(object.certificate_ids),
					User.__api__listAchivements(object.achivement_ids),
					User.__api__listExamMembers(object.exam_member_ids, EXAM_MEMBER_FIELDS))
				.subscribe((jsonArr) => {
					this.courseMembers = CourseMember.toArray(jsonArr[0]);
					this.certificates = Certificate.toArray(jsonArr[1]);
					this.skills = Achivement.toArray(jsonArr[2]);
					this.examMembers = ExamMember.toArray(jsonArr[3]);
					this.displayExams();
					this.displayCourseHistory();
					this.displaySkills();
				});
		});
	}

	displayGroupTree() {
		Group.listUserGroup(this).subscribe(groups => {
			this.groups =  groups;
			this.tree = this.treeUtils.buildGroupTree(this.groups);
			if (this.object.group_id) {
				this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.object.group_id);
			}
		})

	}

	displayCourseHistory() {
		this.courseMembers = _.filter(this.courseMembers, (member: CourseMember) => {
			return member.role == 'student';
		});
		_.each(this.courseMembers, (member: CourseMember) => {
			member["certificate"] = _.find(this.certificates, (cert: Certificate) => {
				return cert.member_id == member.id;
			});
		});
	}

	displaySkills() {
		this.skills = _.sortBy(this.skills, (skill: Achivement) => {
			return skill.date_acquire.getTime()
		});
	}


	displayExams() {
		this.examMembers = _.filter(this.examMembers, (member: ExamMember) => {
			return (member.exam_id && member.status == 'active' && member.role == 'candidate');
		});
		this.examMembers = _.sortBy(this.examMembers, (member: ExamMember) => {
			return member.date_register.getTime()
		});
	}

	printCertificate(certificate) {
		this.certPrintDialog.show(certificate);
	}

}

