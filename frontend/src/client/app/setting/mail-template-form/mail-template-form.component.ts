import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { Group } from '../../shared/models/elearning/group.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Competency } from '../../shared/models/elearning/competency.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';
import { Mail } from '../../shared/models/elearning/mail.model';


@Component({
	moduleId: module.id,
	selector: 'mail-template-form',
	templateUrl: 'mail-template-form.component.html',
})
export class MailTemplateFormComponent extends BaseComponent implements OnInit {

	private template: Mail;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.template = new Mail();
 	}

 	ngOnInit() {
		this.template = this.route.snapshot.data['template'];
	}

 	save() {
		this.template.save(this).subscribe(() => {
				this.router.navigate(['/settings/mail/view', this.template.id]);
		});
	}

	cancel() {
		this.router.navigate(['/settings/mails']);
	}

	
}


