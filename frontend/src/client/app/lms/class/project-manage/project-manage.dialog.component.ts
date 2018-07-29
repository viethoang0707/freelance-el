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
import { ProjectRecord } from '../../../shared/models/elearning/project-record.model';


@Component({
	moduleId: module.id,
	selector: 'project-manage-dialog',
	templateUrl: 'project-manage.dialog.component.html',
    styleUrls: ['project-manage.dialog.component.css'],
})
export class ProjectManageDialog extends BaseComponent {

    PROJECT_STATUS = PROJECT_STATUS;
    
    private display: boolean;
	private project: Project;
    private courseClass: CourseClass;
    private submits: ProjectSubmission[];
    private members: CourseMember[];
    private selectedMember: any;
    
    @ViewChild(ProjectMarkingDialog) projectMarkDialog: ProjectMarkingDialog;

	constructor() {
		super();
		this.project = new Project();
        this.courseClass = new CourseClass();
	}

	show(project: Project, courseClass: CourseClass) {
        this.project = project;
        this.courseClass =  courseClass;
        this.display = true;
        BaseModel.bulk_list(this,
            Project.__api__listSubmissios(this.project.submission_ids),
            CourseClass.__api__listMembers(this.courseClass.member_ids))
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

    hide() {
        this.display = false;
    }

}

