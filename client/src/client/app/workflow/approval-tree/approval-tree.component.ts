import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { ModelAPIService } from '../../shared/services/api/model-api.service';
import { AuthService } from '../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY } from '../../shared/models/constants'
import { Permission } from '../../shared/models/elearning/permission.model';
import { SelectAdminDialog } from '../../shared/components/select-admin-dialog/select-admin-dialog.component';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode, SelectItem } from 'primeng/api';
import { Group } from '../../shared/models/elearning/group.model';
import { User } from '../../shared/models/elearning/user.model';

@Component({
    moduleId: module.id,
    selector: 'approval-tree',
    templateUrl: 'approval-tree.component.html',
    styleUrls: ['approval-tree.component.css'],
})
export class ApprovalTreeComponent extends BaseComponent {

    private tree: TreeNode[];
    private selectedNode: TreeNode;
    private selectedUser: User;
    private treeUtils: TreeUtils;
    private viewModes: SelectItem[];


    @Input() viewMode: string;
    @ViewChild(SelectAdminDialog) adminDialog: SelectAdminDialog;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
        this.viewModes = [
            { value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
            { value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
        ];
        this.viewModes = this.viewModes.map(viewMode => {
            return {
                label: viewMode.title,
                value: viewMode.value,
            }
        });
        this.viewMode = 'outline';
    }

    ngOnInit() {
        this.buildEscalationTree();
    }

    onNodeSelect(event) {
        if (event.node && event.node.data)
            this.selectedUser = event.node.data;
        else
            this.selectedUser = null;
    }

    onNodeUnselect(event) {
        this.selectedUser = null;
    }

    buildEscalationTree() {
        User.listAllAdmin(this).subscribe(users => {
            this.tree = this.treeUtils.buildApprovalTree(users);
            this.selectedUser = null;
        });
    }

    clearSupervisor() {
        if (this.selectedUser) {
            this.selectedUser.supervisor_id = null;
            this.selectedUser.save(this).subscribe(() => {
                this.buildEscalationTree();
            });
        }
    }

    selectSupervisor() {
        if (this.selectedUser)
            this.adminDialog.show();
        this.adminDialog.onSelectUsers.subscribe((admin: User) => {
            this.selectedUser.supervisor_id = admin.id;
            this.selectedUser.save(this).subscribe(() => {
                this.buildEscalationTree();
            });
        });
    }


}
