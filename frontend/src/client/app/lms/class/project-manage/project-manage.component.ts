import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem, MenuItem } from 'primeng/api';
import {
    GROUP_CATEGORY, PROJECT_STATUS
} from '../../../shared/models/constants'
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { Project } from '../../../shared/models/elearning/project.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { ProjectSubmission } from '../../../shared/models/elearning/project-submission.model';
import { ExamQuestion } from '../../../shared/models/elearning/exam-question.model';
import { ProjectMarkingDialog } from '../project-marking/project-marking.dialog.component';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { Http, Response } from '@angular/http';
import { QuestionSheet } from '../../../shared/models/elearning/question-sheet.model';
import { BaseModel } from '../../../shared/models/base.model';


@Component({
	moduleId: module.id,
	selector: 'project-manage',
	templateUrl: 'project-manage.component.html',
    styleUrls: ['project-manage.component.css'],
})
export class ProjectManageComponent extends BaseComponent {

    PROJECT_STATUS = PROJECT_STATUS;

	private project: Project;
    private submits: ProjectSubmission[];
    private members: CourseMember[];
    private selectedMember: any;

    @ViewChild(ProjectMarkingDialog) projectMarkDialog: ProjectMarkingDialog;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.project = new Project();
	}

    ngOnInit() {
        this.project = this.route.snapshot.data['project'];
        BaseModel.bulk_search(this,
            Project.__api__listSubmissios(this.project.id),
            CourseClass.__api__listMembers(this.project.class_id))
            .subscribe(jsonArr => {
                this.submits = ProjectSubmission.toArray(jsonArr[0]);
                this.members = CourseMember.toArray(jsonArr[1]);
            });
    }

	mark() {
        var submit = this.getProjectSubmit(this.selectedMember);
        if (!submit.IsNew)
            this.projectMarkDialog.show(submit);
    }

    getProjectSubmit(member: CourseMember) {
        return _.find(this.submits, (submit: ProjectSubmission) => {
            return submit.member_id == member.id;
        }) || new ProjectSubmission();
    }

    close() {
        this.router.navigate(['/lms/class/manage', this.project.class_id]);
    }

}

