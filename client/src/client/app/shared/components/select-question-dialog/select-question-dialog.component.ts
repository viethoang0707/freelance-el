import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Group } from '../../models/group.model';
import { BaseComponent } from '../base/base.component';
import { Question } from '../../models/question.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, QUESTION_TYPE } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'etraining-select-question-dialog',
	templateUrl: 'select-question-dialog.component.html',
})
export class SelectQuestionsDialog extends BaseComponent {

	tree: TreeNode[];
	selectedNode: TreeNode;
	selectedQuestions: Question[];
	questions:Question[];
	display: boolean;
	QUESTION_TYPE =  QUESTION_TYPE;

	private onSelectQuestionsReceiver: Subject<any> = new Subject();
    onSelectQuestions:Observable<any> =  this.onSelectQuestionsReceiver.asObservable();

	constructor(private treeUtils: TreeUtils) {
		super();
		this.display = false;
		this.selectedQuestions = [];
		this.questions = [];
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			Question.listByGroup(this,this.selectedNode.data.id).subscribe(questions => {
				this.questions = questions;
			});
		}
	}

	show() {
		this.display = true;
		Group.listByCategory(this, GROUP_CATEGORY.QUESTION).subscribe(groups => {
			this.tree = this.treeUtils.buildTree(groups);
		});
	}

	selectCourse() {
		this.onSelectQuestionsReceiver.next(this.selectedQuestions);
		this.hide();
	}


}

