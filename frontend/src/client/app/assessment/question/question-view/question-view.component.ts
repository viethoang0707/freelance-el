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
	selector: 'question-view',
	templateUrl: 'question-view.component.html',
})
export class QuestionViewComponent extends BaseComponent {

	private componentRef: any;
	private question: Question;

	@ViewChild(QuestionContainerDirective) questionHost: QuestionContainerDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetectionRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
		super();
		this.question =  new Question();
	}

	ngOnInit() {
		this.question = this.route.snapshot.data['question'];
			this.question.listOptions(this).subscribe((options)=> {
				this.question.options =  options;
				var detailComponent = QuestionRegister.Instance.lookup(this.question.type);
				let viewContainerRef = this.questionHost.viewContainerRef;
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(detailComponent);
				viewContainerRef.clear();
				this.componentRef = viewContainerRef.createComponent(componentFactory);
				(<IQuestion>this.componentRef.instance).mode = 'preview';
				(<IQuestion>this.componentRef.instance).render(this.question);
			});
	}

	editQuestion() {
		this.router.navigate(['/assessment/question/form', this.question.id]);
	}

	close() {
		this.router.navigate(['/assessment/questions']);
	}
}


