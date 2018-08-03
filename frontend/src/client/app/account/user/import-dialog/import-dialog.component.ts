import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../shared/models/constants';
import { TreeNode,SelectItem } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'user-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class UserImportDialog extends BaseComponent {

	USER_FIELDS = ['login', 'name', 'social_id', 'group_code', 'position', 'dob', 'gender', 'phone', 'email']

	private display: boolean;
	private fileName: string;
	private records: any[];
	private total: number;
	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();
	private step: number;
	private columnMappings: any;
	private fields: SelectItem[];
	private statusMessages:string[];

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
		this.total = 0;
		this.statusMessages = [];
		this.fields = [
			{ value: 'name', label: this.translateService.instant('Name') },
			{ value: 'email', label: this.translateService.instant('Email') },
			{ value: 'login', label: this.translateService.instant('Login') },
			{ value: 'social_id', label: this.translateService.instant('Social ID') },
			{ value: 'group_code', label: this.translateService.instant('Group') },
			{ value: 'phone', label: this.translateService.instant('Phone') }
			{ value: 'dob', label: this.translateService.instant('Date of birth') }
			{ value: 'gender', label: this.translateService.instant('Gender') }
			{ value: 'position', label: this.translateService.instant('Position') }
		];
		this.columnMappings = {};
		for (var i=0;i< this.fields.length; i++)
			this.columnMappings[i] = this.fields[i];
	}

	show() {
		this.display = true;
		this.step = 1;
		this.statusMessages = [];
	}

	hide() {
		this.display = false;
	}

	import() {
		Group.listUserGroup(this).subscribe(groups => {
			this.step = 3;
			var users  =[];
			_.each(this.records, (record, index) => {
				var user = new User();
				_.each(record, (field, value, fieldIndex)=> {
					if (fieldIndex < this.fields.length) {
						user[this.columnMappings[fieldIndex].value] = value;
					}
				});
				user["password"] = DEFAULT_PASSWORD;
				var group = _.find(groups, (obj: Group) => {
					return obj.code == record["group_code"];
				});
				if (group) {
					user.group_id = group.id;
					users.push(user);
				} else {
					this.statusMessages.push(`Record ${index}: Group ${record["group_code"]} is not defined`);
				}
			});
			User.createArray(this, users).subscribe(() => {
				this.onImportCompleteReceiver.next();
				this.success('Import users successfully');
			});
		});
	}

	changeFileListner(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.total = this.records.length;
			this.step = 2;
		});
	}


}

