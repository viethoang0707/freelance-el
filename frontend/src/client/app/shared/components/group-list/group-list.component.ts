import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { TreeUtils } from '../../helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { GroupDialog } from '../group-dialog/group-dialog.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { User } from '../../../shared/models/elearning/user.model';
import { Question } from '../../../shared/models/elearning/question.model';
import { Competency } from '../../../shared/models/elearning/competency.model';

const GROUP_FIELDS = ['name', 'code', 'parent_id']

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.css'],
})
export class GroupListComponent extends BaseComponent implements OnInit {

    @ViewChild(GroupDialog) groupDialog: GroupDialog;
    private actionItems: MenuItem[];
    private treeUtils: TreeUtils;

    constructor(private route: ActivatedRoute) {
        super();
        this.treeUtils = new TreeUtils();
    }

    tree: TreeNode[];
    selectedNode: TreeNode;
    groups: Group[];
    category: string;

    ngOnInit() {
        this.category = this.route.snapshot.data['category']
        this.loadGroups();
        this.actionItems = [
            { label: this.translateService.instant('Edit'), icon: 'ui-icon-mode-edit', command: (event) => this.edit() },
            { label: this.translateService.instant('Delete'), icon: 'ui-icon-delete', command: (event) => this.delete() }
        ];
    }

    add() {
        var group = new Group();
        group.category = this.category;
        this.groupDialog.show(group);
        this.groupDialog.onCreateComplete.first().subscribe(() => {
            this.loadGroups();
        })
    }

    edit() {
        if (this.selectedNode)
            this.groupDialog.show(this.selectedNode.data);
    }

    confirmDelete() {
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            this.selectedNode.data.delete(this).subscribe(() => {
                this.loadGroups();
            }, () => {
                this.error(this.translateService.instant('Permission denied'));
            });
        });
    }

    delete() {
        var sub_item = 0;
        if (this.category == "course")
            sub_item = this.selectedNode.data.course_count;
        if (this.category == "organization")
            sub_item = this.selectedNode.data.user_count;
        if (this.category == "question")
            sub_item = this.selectedNode.data.question_count;
        if (this.category == "competency")
            sub_item = this.selectedNode.data.competency_count;
        if (sub_item) {
            this.error(this.translateService.instant('The group is used by another content.'));
        }
        else {
            this.confirmDelete();
        }

    }

    loadGroups() {
        var subscription = null;
        if (this.category == "course")
            subscription = Group.listCourseGroup(this,GROUP_FIELDS);
        if (this.category == "organization")
            subscription = Group.listUserGroup(this,GROUP_FIELDS);
        if (this.category == "question")
            subscription = Group.listQuestionGroup(this,GROUP_FIELDS);
        if (this.category == "competency")
            subscription = Group.listCompetencyGroup(this,GROUP_FIELDS);
        if (subscription)
            subscription.subscribe(groups => {
                this.groups = groups;
                this.tree = this.treeUtils.buildGroupTree(groups);
            });
    }

}
