import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { CourseMember } from '../../../shared/models/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CourseMemberDialog } from '../member-dialog/member-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-member-list',
    templateUrl: 'member-list.component.html',
    styleUrls: ['member-list.component.css'],
})
export class CourseMemberListComponent extends BaseComponent implements OnInit {

    @ViewChild(CourseMemberDialog) memberDialog: CourseMemberDialog;

    constructor(private treeUtils: TreeUtils) {
        super();
    }

    selectedMember: CourseMember;
    members: CourseMember[];

    ngOnInit() {
        this.loadTableData();
    }

    add() {
        var member =  new CourseMember();
        this.memberDialog.show(CourseMember);
        this.memberDialog.onCreateComplete.subscribe(()=> {
            this.loadTableData();
        })
    }

    edit() {
        if (this.selectedMember)
            this.memberDialog.show(this.selectedMember);
    }

    delete() {
        if (this.selectedMember)
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to delete ?'),
            accept: () => {
                this.selectedMember.data.delete(this).subscribe(()=> {
                    this.loadTableData();
                })
            }
        });
    }

    loadTableData() {
        CourseMember.all(this).subscribe(members => {
            this.members = members;
        });
    }
    

}
