import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GroupDialog } from '../group-dialog/group-dialog.component';
import { GROUP_CATEGORY} from '../../../shared/models/constants';

@Component({
    moduleId: module.id,
    selector: 'etraining-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.css'],
})
export class GroupListComponent extends BaseComponent implements OnInit {

    @ViewChild(GroupDialog) groupDialog: GroupDialog;

    constructor(private treeUtils: TreeUtils) {
        super();
    }

    tree: TreeNode[];
    selectedNode: TreeNode;
    groups: Group[];

    ngOnInit() {
        this.loadTableData();
    }

    add() {
        var group =  new Group();
        group.category = GROUP_CATEGORY.USER;
        this.groupDialog.show(group);
        this.groupDialog.onCreateComplete.subscribe(()=> {
            this.loadTableData();
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
                    this.loadTableData();
                })
            }
        });
    }

    loadTableData() {
        Group.listUserGroup(this).subscribe(groups => {
            this.groups = groups;
            this.tree = this.treeUtils.buildTree(groups);
        });
    }
    

}
