import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Question } from '../../../shared/models/elearning/question.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants';
import { QuestionContainerDirective } from '../../../cms/question/question-container.directive';
import { IQuestion } from '../../../cms/question/question.interface';
import { QuestionRegister } from '../../../cms/question/question.decorator';
import { WindowRef } from '../../../shared/helpers/windonw.ref';


@Component({
	moduleId: module.id,
	selector: 'question-form',
	templateUrl: 'question-form.component.html',
})
export class QuestionFormComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private componentRef: any;
	private question: Question;

	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetectionRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
		super();
		this.question =  new Question();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.question.group_id = this.selectedNode.data.id;
			this.question.group_name = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.question = this.route.snapshot.data['question'];
			Group.listQuestionGroup(this).subscribe(groups => {
				var treeUtils = new TreeUtils();
				this.tree = treeUtils.buildGroupTree(groups);
				if (this.question.group_id) {
					this.selectedNode = treeUtils.findTreeNode(this.tree, this.question.group_id);
				}
			this.question.listOptions(this).subscribe((options)=> {
				this.question.options =  options;
				var detailComponent = QuestionRegister.Instance.lookup(this.question.type);
				let viewContainerRef = this.questionHost.viewContainerRef;
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<IQuestion>this.componentRef.instance).mode = 'edit';
				(<IQuestion>this.componentRef.instance).render(this.question);
			});
		});
	}

	save() {
		this.question.save(this).subscribe(()=> {
			if (this.componentRef)
				(<IQuestion>this.componentRef.instance).saveEditor().subscribe(()=> {
					this.router.navigate(['/assessment/question/view', this.question.id]);
				});
		});
	}

	cancel() {
		if (this.question.IsNew)
			this.router.navigate(['/assessment/questions']);
		else
			this.router.navigate(['/assessment/question/view', this.question.id]);
	}
}


