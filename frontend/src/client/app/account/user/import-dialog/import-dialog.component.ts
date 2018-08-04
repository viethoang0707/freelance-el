import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../shared/models/constants';
import { TreeNode, SelectItem } from 'primeng/api';
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
	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();

	private columnMappings: any;
	private fields: SelectItem[];
	private statusMessages: string[];
	private users: User[];

	private step: number;
	private percent: number;

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
		this.percent = 0;
		this.statusMessages = [];
		this.fields = [
			{ value: 'name', label: this.translateService.instant('Name') },
			{ value: 'email', label: this.translateService.instant('Email') },
			{ value: 'login', label: this.translateService.instant('Login') },
			{ value: 'social_id', label: this.translateService.instant('Social ID') },
			{ value: 'group_code', label: this.translateService.instant('Group') },
			{ value: 'phone', label: this.translateService.instant('Phone') },
			{ value: 'dob', label: this.translateService.instant('Date of birth') },
			{ value: 'gender', label: this.translateService.instant('Gender') },
			{ value: 'position', label: this.translateService.instant('Position') }
		];
		this.columnMappings = {};
		for (var i = 0; i < this.fields.length; i++)
			this.columnMappings[i] = this.fields[i];
	}

	show() {
		this.display = true;
		this.step = 1;
		this.percent = 0;
		this.statusMessages = [];
	}

	hide() {
		this.display = false;
	}

	import() {
		Group.listUserGroup(this).subscribe(groups => {
			this.step = 3;
			this.parseData(groups).subscribe(success => {
				if (success && this.users.length)
					this.uploadData();
			});
		});
	}

	parseData(groups: Group[]): Observable<any> {
		this.users = [];
		this.statusMessages = [];
		_.each(this.records, (record, index) => {
			var user = new User();
			for (var i = 0, keys = Object.keys(record); i < keys.length; i++) {
				var key = keys[i];
				if (i < this.fields.length)
					user[this.columnMappings[i].value] = record[key];
			}
			user["password"] = DEFAULT_PASSWORD;
			var group = _.find(groups, (obj: Group) => {
				return obj.code == record["group_code"];
			});
			if (group) {
				user.group_id = group.id;
				this.users.push(user);
			} else {
				this.statusMessages.push(`Record ${index}: Group ${record["group_code"]} is not defined`);
			}
		});
		if (this.statusMessages.length)
			return Observable.of(false);
		else
			return Observable.of(true);
	}

	uploadData() {
		var saveActions = _.map(this.users, (user: User) => {
			return user.save(this);
		});
		var successRow = 0;
		var failedRow = 0;
		Observable.concat(saveActions).subscribe(
			() => {
				successRow += 1;
				this.percent = Math.floor(successRow * 100 / this.users.length);
			}, () => {
				failedRow += 1;
			}, () => {
				this.onImportCompleteReceiver.next();
				this.success(`Import ${successRow} users successfully`);
			});

	}

	selectFile(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.step = 2;
		});
	}


}

