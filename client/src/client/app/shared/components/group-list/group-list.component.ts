import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../services/api.service';
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

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.css'],
})
export class GroupListComponent extends BaseComponent implements OnInit {

    @ViewChild(GroupDialog) groupDialog: GroupDialog;
    actionItems: MenuItem[]; 

    constructor(private treeUtils: TreeUtils, private route: ActivatedRoute) {
        super();
    }

    tree: TreeNode[];
    selectedNode: TreeNode;
    groups: Group[];
    category: string;

    ngOnInit() {
        this.category = this.route.snapshot.data['category']
        this.loadGroups();
        this.actionItems = [
            {label: this.translateService.instant('Edit'), icon: 'ui-icon-mode-edit', command: (event) => this.edit()},
            {label: this.translateService.instant('Delete'), icon: 'ui-icon-delete', command: (event) => this.delete()}
        ];
    }

    add() {
        var group =  new Group();
        group.category = this.category;
        this.groupDialog.show(group);
        this.groupDialog.onCreateComplete.subscribe(()=> {
            this.loadGroups();
        })
    }

    edit() {
        if (this.selectedNode)
            this.groupDialog.show(this.selectedNode.data);
    }

    confirmDelete() {
        this.confirm.confirm('Are you sure to delete ?', () => {
            this.selectedNode.data.delete(this).subscribe(()=> {
                this.loadGroups();
            });
        });
    }

    delete() {
        if(this.selectedNode.data.category == "course")
        {
            Course.listByGroup(this, this.selectedNode.data.id).subscribe(courses => {
                if(courses.length > 0){
                    this.warn('The group contains course.');
                }
                else{
                    this.confirmDelete();
                }
            });
        }
        if(this.selectedNode.data.category == "organization")
        {
            User.listByGroup(this, this.selectedNode.data.id).subscribe(users => {
               if(users.length > 0){
                    this.warn('The group contains user.');
                }
                else{
                    this.confirmDelete();
                }
            });
        }

        if(this.selectedNode.data.category == "question")
        {
            Question.listByGroup(this, this.selectedNode.data.id).subscribe(questions => {
                if(questions.length > 0){
                    this.warn('The group contains question.');
                }
                else{
                    this.confirmDelete();
                }
            });
        }
    }

    loadGroups() {
        Group.listByCategory(this, this.category).subscribe(groups => {
            this.groups = groups;
            this.tree = this.treeUtils.buildTree(groups);
        });
    }
    
}
