import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { Question } from '../../../shared/models/question.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY } from '../../../shared/models/constants';
import { QuestionContainerDirective } from '../question-template/question-container.directive';
import { IQuestion } from '../question-template/question.interface';
import { QuestionRegister } from '../question-template/question.decorator';

@Component({
	moduleId: module.id,
	selector: 'etraining-question-dialog',
	templateUrl: 'question-dialog.component.html',
})
export class QuestionDialog extends BaseDialog<Question> {

	tree: TreeNode[];
	selectedNode: TreeNode;
	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;
	componentRef: any;

	constructor(private treeUtils: TreeUtils, private componentFactoryResolver: ComponentFactoryResolver) {
		super();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			Group.listByCategory(this, GROUP_CATEGORY.QUESTION).subscribe(groups => {
				this.tree = this.treeUtils.buildTree(groups);
				if (object.group_id) {
					this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
				}
			});
			var detailComponent = QuestionRegister.Instance.lookup(object.type);
			let viewContainerRef = this.questionHost.viewContainerRef;
			if (detailComponent) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<IQuestion>this.componentRef.instance).mode = 'edit';
				(<IQuestion>this.componentRef.instance).render(object);
			} else {
				viewContainerRef.clear();
				this.componentRef = null;
			}

		});
		this.onUpdateComplete.subscribe(object => {
			if (this.componentRef)
				(<IQuestion>this.componentRef.instance).saveEditor().subscribe(() => {
					this.messageService.add({ severity: 'success', summary: 'Success', detail: this.translateService.instant('Question saved.') });
				});
		})
	}


}


