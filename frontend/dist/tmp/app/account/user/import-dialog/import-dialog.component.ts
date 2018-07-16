import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'user-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class UserImportDialog extends BaseComponent {

	private display: boolean;
	private fileName: string;
	private records: any[];
	private total: number;
	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
		this.total = 0;
	}

	show() {
		this.display = true;
	}

	hide() {
		this.display = false;
	}

	import() {
		Group.listUserGroup(this).subscribe(groups => {
			var users = _.map(this.records, (record) => {
				var user = new User();
				Object.assign(user, record);
				user["password"] = DEFAULT_PASSWORD;
				var group = _.find(groups, (obj: Group) => {
					return obj.code == record["group_code"];
				});
				if (group) {
					user.group_id = group.id;
				}
				return user;
			});
			User.createArray(this, users).subscribe(() => {
				this.onImportCompleteReceiver.next();
				this.hide();
			});
		});
	}

	changeListner(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.total = this.records.length;
		});
	}


}

