import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseClass } from '../../../shared/models/course-class.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
	moduleId: module.id,
	selector: 'etraining-class-dialog',
	templateUrl: 'class-dialog.component.html',
})
export class CourseClassDialog extends BaseDialog<CourseClass>  {

	constructor(private treeUtils: TreeUtils) {
		super();
	}

}


