import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { UserContentComponent } from './user-content.component';

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'child_ids'];

@Component({
	moduleId: module.id,
	selector: 'user-form-dialog',
	templateUrl: 'user-form-dialog.component.html',
})
export class UserFormDialog extends BaseDialog<User> {
	
	@ViewChild(UserContentComponent) formContent: UserContentComponent;


	constructor(private router: Router, private route: ActivatedRoute) {
		super();
	}


	ngOnInit() {
		this.onShow.subscribe(object=> {
			this.formContent.render(object);
		});
	}


	save() {
		if (this.object.IsNew) {
			User.register(this, this.object).subscribe(resp => {
				if (!resp["success"]) {
					this.error(this.translateService.instant(resp["message"]));
					return;
				}
				this.onCreateCompleteReceiver.next();
				this.hide();
			})
		}
		else {
			this.object.save(this).subscribe(() => {
				this.onUpdateCompleteReceiver.next();
				this.hide();
			});
		}
	}

}

