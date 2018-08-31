import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';

import { AuthService } from '.././shared/services/auth.service';
import { Group } from '.././shared/models/elearning/group.model';
import { BaseComponent } from '../shared/components/base/base.component';
import { Setting } from '.././shared/models/elearning/setting.model';
import * as _ from 'underscore';
import { TreeNode } from 'primeng/api';


@Component({
	moduleId: module.id,
	selector: 'setting-dialog',
	templateUrl: 'setting-dialog.component.html',
})
export class SettingDialog extends BaseComponent {

	private display: boolean;
	private dateFormat: Setting;

	constructor() {
		super();
		this.dateFormat =  new Setting();
	}

	show() {
		this.display =  true;
		Setting.dateFormat(this).subscribe(setting=> {
			this.dateFormat =  setting;
		});
	}

	hide() {
		this.display =  false;
	}

	save() {
		this.dateFormat.save(this).subscribe(()=> {
			this.success('Setting saved');
			this.hide();
		});
	}



}

