import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { Competency } from '../../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, CONTENT_STATUS } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';
import { CompetencyLevel } from '../../../shared/models/elearning/competency-level.model';

const GROUP_FIELDS = ['name', 'category' ,'parent_id'];
const COMPETENCY_FIELDS = ['name', 'group_id'];
const COMPETENCY_LEVEL_FIELDS = ['name', 'competency_id' ,'competency_name'];


@Component({
	moduleId: module.id,
	selector: 'select-competency-level-dialog',
	templateUrl: 'select-competency-level-dialog.component.html',
	styleUrls: ['select-competency-level-dialog.component.css'],
})
export class SelectCompetencyLevelDialog extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedLevel: any;
	private levels: CompetencyLevel[];
	private displayLevels: CompetencyLevel[];
	private display: boolean;
	private treeUtils: TreeUtils;

	private onSelectCompetencyLevelReceiver: Subject<any> = new Subject();
	onSelectCompetencyLevel: Observable<any> = this.onSelectCompetencyLevelReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.levels = [];
		this.displayLevels = [];
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.displayLevels = [];
			this.selectedNode.data.listCompetencies(this, COMPETENCY_FIELDS).subscribe(competencies => {
				_.each(competencies, (competency: Competency) => {
					var levels = _.filter(this.levels, (level: CompetencyLevel) => {
						return level.competency_id == competency.id;
					});
					this.displayLevels = this.displayLevels.concat(levels);
				});
			});
		}
	}

	show() {
		this.display = true;
		Group.listCompetencyGroup(this, GROUP_FIELDS).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
			CompetencyLevel.all(this, COMPETENCY_LEVEL_FIELDS).subscribe(levels => {
				this.levels = levels;
			});
		});
	}

	selectLevel() {
		this.onSelectCompetencyLevelReceiver.next(this.selectedLevel);
		this.hide();
	}


}

