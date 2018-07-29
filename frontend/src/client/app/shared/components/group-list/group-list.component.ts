import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../services/api/model-api.service';
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

    constructor( private route: ActivatedRoute) {
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
        this.confirm('Are you sure to delete ?', () => {
            this.selectedNode.data.delete(this).subscribe(()=> {
                this.loadGroups();
            }, ()=> {
                this.error('Permission denied');
            });
        });
    }

    delete() {
        var subscription = null;
        if(this.category == "course")
            subscription =  this.selectedNode.data.listCourses(this);
        if(this.category == "organization")
            subscription =  this.selectedNode.data.listUsers(this);
        if(this.category == "question")
            subscription =  this.selectedNode.data.listQuestions(this);
        if(this.category == "competency")
            subscription =  this.selectedNode.data.listCompetencies(this);
        if(subscription)
        {
            subscription.subscribe(items => {
                if(items && items.length > 0){
                    this.warn('The group is used by another content.');
                }
                else{
                    this.confirmDelete();
                }
            });
        }
    }

    loadGroups() {
        var subscription = null;
        if(this.category == "course")
            subscription =  Group.listCourseGroup(this);
        if(this.category == "organization")
            subscription =  Group.listUserGroup(this);
        if(this.category == "question")
            subscription =  Group.listQuestionGroup(this);
        if(this.category == "competency")
            subscription =  Group.listCompetencyGroup(this);
        if (subscription)  
            subscription.subscribe(groups => {
                this.groups = groups;
                this.tree = this.treeUtils.buildGroupTree(groups);
            });
    }
    
}
