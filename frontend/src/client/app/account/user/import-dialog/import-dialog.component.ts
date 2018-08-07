import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, SERVER_DATE_FORMAT, GENDER } from '../../../shared/models/constants';
import { TreeNode, SelectItem } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';
import * as moment from 'moment';


@Component({
	moduleId: module.id,
	selector: 'user-import-dialog',
	templateUrl: 'import-dialog.component.html',
	styleUrls: ['import-dialog.component.css']
})
export class UserImportDialog extends BaseComponent {

	USER_FIELDS = ['login', 'name', 'social_id', 'group_name', 'group_code', 'position', 'dob', 'gender', 'phone', 'email']

	private display: boolean;
	private fileName: string;
	private records: any[];
	private columnMappings: any;
	private fields: SelectItem[];
	private statusMessages: string[];
	private users: User[];
	private step: number;

	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
		this.statusMessages = [];
		this.fields = [
			{ value: 'login', label: this.translateService.instant('Login') },
			{ value: 'name', label: this.translateService.instant('Name') },
			{ value: 'social_id', label: this.translateService.instant('Social ID') },
			{ value: 'group_name', label: this.translateService.instant('Group') },
			{ value: 'group_code', label: this.translateService.instant('Group code ') },
			{ value: 'position', label: this.translateService.instant('Position') },
			{ value: 'dob', label: this.translateService.instant('Date of birth') },
			{ value: 'gender', label: this.translateService.instant('Gender') },
			{ value: 'phone', label: this.translateService.instant('Phone') },
			{ value: 'email', label: this.translateService.instant('Email') },

		];
		this.columnMappings = {};
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
			var isValid = true;
			var userFields = [];
			var user = new User();
			for (var i = 0, keys = Object.keys(record); i < keys.length; i++) {
				var key = keys[i];
				user[this.columnMappings[i].value] = record[key];
				userFields.push(this.columnMappings[i].value);
			}
			user["password"] = DEFAULT_PASSWORD;
			var group = _.find(groups, (obj: Group) => {
				return obj.code == user["group_code"];
			});
			if (group) {
				user.group_id = group.id;
			} else {
				isValid = false;
				this.statusMessages.push(`Record ${index}: Group ${record["group_code"]} is not defined`);
			}
			if (userFields.includes('dob')) {
				if (user.dob && moment(user.dob, SERVER_DATE_FORMAT)["_isValid"])
					user.dob = moment(user.dob, SERVER_DATE_FORMAT).toDate();
				else {
					isValid = false;
					this.statusMessages.push(`Record ${index}: Invalid date of birth format. Require ${SERVER_DATE_FORMAT}`);
				}
			}
			if (userFields.includes('gender')) {
				isValid = user['gender'] in GENDER;
			}
			if (isValid)
				this.users.push(user);
		});
		if (this.statusMessages.length)
			return Observable.of(true);
		else
			return Observable.of(true);
	}

	uploadData() {
		User.createArray(this, this.users).subscribe(() => {
			this.onImportCompleteReceiver.next();
			this.success(`Import ${this.users.length} users successfully`);
		});

	}

	selectFile(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.columnMappings = {};
			for (var i = 0; i < Object.keys(this.records[0]).length; i++)
				this.columnMappings[i] = this.fields[i % (this.fields.length)];
			this.step = 2;
		});
	}


}

