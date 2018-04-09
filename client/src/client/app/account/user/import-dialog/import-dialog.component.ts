import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
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

	display: boolean;
	fileName: string;
	records: any[];
	percentage: number ;
	completed:number;
	total: number;

	private onImportCompleteReceiver: Subject<any> = new Subject();
    onImportComplete:Observable<any> =  this.onImportCompleteReceiver.asObservable();

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
	}

	show() {
		this.display = true;
		this.percentage = 0;
		this.completed = 0;
		this.total = 0;
	}

	hide() {
		this.display = false;
	}

	import() {
		var subscriptions = [];
		Group.listByCategory(this, GROUP_CATEGORY.USER).subscribe(groups => {
			this.importing = true;
			_.each(this.records, (record)=> {
				var user = new User();
				Object.assign(user, record);
				user["password"] = DEFAULT_PASSWORD;
				var group = _.find(groups, (obj:Group)=> {
					return obj.code == record["group_code"];
				});
				if (group) {
					user.group_id = group.id;
					subscriptions.push(user.save(this));
				}
			});
			Observable.merge(...subscriptions).subscribe(
				()=> {
					this.completed++;
					this.percentage = Math.floor(this.completed /  this.total *100);
				},
				(error)=> {
					console.log(error);
				},
				()=> {
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

