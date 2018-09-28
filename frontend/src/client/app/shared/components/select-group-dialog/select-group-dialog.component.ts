import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

const GROUP_FIELDS = ['name', 'category' ,'parent_id'];

@Component({
	moduleId: module.id,
	selector: 'select-group-dialog',
	templateUrl: 'select-group-dialog.component.html',
	styleUrls: ['select-group-dialog.component.css'],
})
export class SelectGroupDialog extends BaseComponent {

	@Input() category: string;
	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectGroupReceiver: Subject<any> = new Subject();
	onSelectGroup: Observable<any> = this.onSelectGroupReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	show() {
		this.display = true;
		this.selectedNode = null;
		var subscription = null;
		if (this.category == "course")
			subscription = Group.listCourseGroup(this,GROUP_FIELDS);
		if (this.category == "organization")
			subscription = Group.listUserGroup(this,GROUP_FIELDS);
		if (this.category == "question")
			subscription = Group.listQuestionGroup(this,GROUP_FIELDS);
		if (subscription)
			subscription.subscribe(groups => {
				this.tree = this.treeUtils.buildGroupTree(groups);
			});
	}

	select() {
		this.onSelectGroupReceiver.next(this.selectedNode.data);
		this.hide();
	}

	nodeSelect(event: any) {
		if (!this.selectedNode) {
			this.selectedNode = event.node;
			return;
		} else {
			if (this.selectedNode["id"] != event.node["id"])
				this.selectedNode = event.node;
			else
				this.selectedNode = null;
		}
		
	}


}

