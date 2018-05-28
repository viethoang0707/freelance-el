import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Group } from '../../models/elearning/group.model';
import { BaseComponent } from '../base/base.component';
import { Question } from '../../models/elearning/question.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, QUESTION_TYPE } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'select-question-dialog',
	templateUrl: 'select-question-dialog.component.html',
	styleUrls: ['select-question-dialog.component.css'],
})
export class SelectQuestionsDialog extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private selectedQuestions: Question[];
	private questions: Question[];
	private display: boolean;
	QUESTION_TYPE = QUESTION_TYPE;
	private treeUtils: TreeUtils;
	private selectedGroupNodes: TreeNode[];

	private onSelectQuestionsReceiver: Subject<any> = new Subject();
	onSelectQuestions: Observable<any> = this.onSelectQuestionsReceiver.asObservable();

	constructor() {
		super();
		this.display = false;
		this.selectedQuestions = [];
		this.questions = [];
		this.treeUtils = new TreeUtils();
	}

	hide() {
		this.display = false;
	}

	nodeSelect(event: any) {
		if (this.selectedGroupNodes) {
			var groupNodes = [];
			this.selectedGroupNodes.forEach(node => {
				groupNodes.push(node.data.id);
			});
			Question.listByGroups(this, groupNodes).subscribe(questions => {
				this.questions = questions;
			});
		}
	}

	show() {
		this.display = true;
		this.selectedQuestions = [];
		// , GROUP_CATEGORY.QUESTION
		Group.listQuestionGroup(this).subscribe(groups => {
			this.tree = this.treeUtils.buildGroupTree(groups);
		});
	}

	selectCourse() {
		this.onSelectQuestionsReceiver.next(this.selectedQuestions);
		this.hide();
	}


}

