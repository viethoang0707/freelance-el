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
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-multi-group-dialog',
	templateUrl: 'select-multi-group-dialog.component.html',
	styleUrls: ['select-multi-group-dialog.component.css'],
})
export class SelectMultiGroupDialog extends BaseComponent {

	@Input() category: string;
	private tree: TreeNode[];
	private selectedNodes: any;
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectGroupsReceiver: Subject<any> = new Subject();
    onSelectGroups:Observable<any> =  this.onSelectGroupsReceiver.asObservable();

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
		this.selectedNodes = [];
		var subscription = null;
        if(this.category == "course")
            subscription =  Group.listCourseGroup(this);
        if(this.category == "organization")
            subscription =  Group.listUserGroup(this);
        if(this.category == "question")
            subscription =  Group.listQuestionGroup(this);
        if (subscription)  
            subscription.subscribe(groups => {
                this.tree = this.treeUtils.buildGroupTree(groups);
            });
        //}
	}

	select() {
		var groups = _.map(this.selectedNodes, selectedNode=> {
			return selectedNode["data"];
		})
		this.onSelectGroupsReceiver.next(groups);
		this.hide();
	}


}

