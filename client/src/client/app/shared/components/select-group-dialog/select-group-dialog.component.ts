import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-group-dialog',
	templateUrl: 'select-group-dialog.component.html',
	styleUrls: ['select-group-dialog.component.css'],
})
export class SelectGroupDialog extends BaseComponent {

	@Input() category: string;
	tree: TreeNode[];
	selectedNode: TreeNode;
	display: boolean;

	private onSelectGroupReceiver: Subject<any> = new Subject();
    onSelectGroup:Observable<any> =  this.onSelectGroupReceiver.asObservable();

	constructor(private treeUtils: TreeUtils) {
		super();
		this.display = false;
	}

	hide() {
		this.display = false;
	}

	show() {
		this.display = true;
		this.selectedNode = null;
		Group.listByCategory(this, this.category).subscribe(groups => {
			this.tree = this.treeUtils.buildTree(groups);
		});
	}

	select() {
		this.onSelectGroupReceiver.next(this.selectedNode.data);
		this.hide();
	}


}

