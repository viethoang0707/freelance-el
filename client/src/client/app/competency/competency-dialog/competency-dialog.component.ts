import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Competency } from '../../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants';
import { QuestionContainerDirective } from '../question-template/question-container.directive';
import { IQuestion } from '../question-template/question.interface';
import { QuestionRegister } from '../question-template/question.decorator';

@Component({
	moduleId: module.id,
	selector: 'competency-dialog',
	templateUrl: 'competency-dialog.component.html',
})
export class CompetencyDialog extends BaseDialog<Question>  {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private treeUtils: TreeUtils;
	private obj: any;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetectionRef: ChangeDetectorRef) {
		super();
		this.treeUtils = new TreeUtils();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			this.obj = { selectedNode: object.group_id, title: object.title, level: object.level };
			Group.listCompetencyGroup(this).subscribe(groups => {
				this.tree = this.treeUtils.buildGroupTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
			});

		});
	}

}


