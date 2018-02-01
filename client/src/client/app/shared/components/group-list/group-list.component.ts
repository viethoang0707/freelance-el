import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../models/group.model';
import { BaseComponent } from '../base/base.component';
import { TreeUtils } from '../../helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GroupDialog } from '../group-dialog/group-dialog.component';
import { GROUP_CATEGORY} from '../../models/constants';

@Component({
    moduleId: module.id,
    selector: 'etraining-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.css'],
})
export class GroupListComponent extends BaseComponent implements OnInit {

    @ViewChild(GroupDialog) groupDialog: GroupDialog;

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

    delete() {
        if (this.selectedNode)
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to delete ?'),
            accept: () => {
                this.selectedNode.data.delete(this).subscribe(()=> {
                    this.loadGroups();
                })
            }
        });
    }

    loadGroups() {
        Group.listByCategory(this, this.category).subscribe(groups => {
            this.groups = groups;
            this.tree = this.treeUtils.buildTree(groups);
        });
    }
    

}
