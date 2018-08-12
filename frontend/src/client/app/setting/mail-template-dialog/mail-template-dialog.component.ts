import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../shared/services/api/model-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Group } from '../../shared/models/elearning/group.model';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { Competency } from '../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';
import { Mail } from '../../shared/models/elearning/mail.model';


@Component({
	moduleId: module.id,
	selector: 'mail-template-dialog',
	templateUrl: 'mail-template-dialog.component.html',
})
export class MailTemplateDialog extends BaseDialog<Competency>  {



	constructor() {
		super();
 	}

	
}


