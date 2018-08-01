import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../services/api/model-api.service';
import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { Competency } from '../../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-competency-dialog',
	templateUrl: 'select-competency-dialog.component.html',
	styleUrls: ['select-competency-dialog.component.css'],
})
export class SelectCompetencyDialog extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedCompetency: Competency;
	private competencies:Competency[];
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectCompetencyReceiver: Subject<any> = new Subject();
    onSelectCompetency:Observable<any> =  this.onSelectCompetencyReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.competencies = [];
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.selectedNode.data.listCompetencies(this).subscribe(competencies => {
				this.competencies = competencies;
			});
		}
	}

	show() {
		this.display = true;
		// , GROUP_CATEGORY.COURSE
		Group.listCompetencyGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
		});
	}

	selectCompetency() {
		this.onSelectCompetencyReceiver.next(this.selectedCompetency);
		this.hide();
	}


}

