import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService, EXCEL_TYPE } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'etraining-user-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class UserImportDialog extends BaseComponent {

	display: boolean;
	fileType: string;
	fileName: string;
	users: User[];
	importing: boolean;

	private onImportCompleteReceiver: Subject<any> = new Subject();
    onImportComplete:Observable<any> =  this.onImportCompleteReceiver.asObservable();

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.importing = false;
		this.records = [];
		this.fileType = EXCEL_TYPE;
	}

	show(users: any) {
		this.display = true;
	}

	hide() {
		this.display = false;
	}

	import() {
		var subscriptions = [];
		var self = this;
		Group.listUserGroup(this).subscribe(groups => {
			this.importing = true;
			_.each(this.records, function(record) {
				var user = new User();
				Object.assign(user, record);
				user.password = DEFAULT_PASSWORD;
				var group = _.find(groups, function(obj:Group) {
					return obj.code == record["group_code"];
				});
				if (group) {
					user.group_id = group.id;
					subscriptions.push(user.save(self));
				}
			});
			Observable.forkJoin(...subscriptions).subscribe(()=> {
				this.importing = false;
				this.hide();
			});
		});
	}

	changeListner(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
		})
	}


}

