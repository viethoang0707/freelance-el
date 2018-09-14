import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { UserContentComponent } from './user-content.component';

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'child_ids'];

@Component({
	moduleId: module.id,
	selector: 'user-form',
	templateUrl: 'user-form.component.html',
})
export class UserFormComponent extends BaseComponent {

	@ViewChild(UserContentComponent) formContent: UserContentComponent;

	private user: User;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.user = new User();
	}

	ngOnInit() {
		this.user = this.route.snapshot.data['user'];
		this.formContent.render(this.user);
	}

	save() {
		if (this.user.IsNew) {
			User.register(this, this.user).subscribe(resp => {
				if (!resp["success"]) {
					this.error(this.translateService.instant(resp["message"]));
					return;
				}
				this.user.id = +resp["user_id"];
				this.router.navigate(['/account/user/view', this.user.id]);
			})
		}
		else {
			this.user.save(this).subscribe(() => {
				this.router.navigate(['/account/user/view', this.user.id]);
			});
		}
	}

	cancel() {
		if (this.user.IsNew)
			this.router.navigate(['/account/users']);
		else
			this.router.navigate(['/account/user/view', this.user.id]);
	}
}

