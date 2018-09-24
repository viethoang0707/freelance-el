import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { Setting } from '../../../shared/models/elearning/setting.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, SERVER_DATE_FORMAT, GENDER } from '../../../shared/models/constants';
import { TreeNode, SelectItem } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';
import * as moment from 'moment';


@Component({
	moduleId: module.id,
	selector: 'user-import',
	templateUrl: 'user-import.component.html',
	styleUrls: ['user-import.component.css']
})
export class UserImportComponent extends BaseComponent implements OnInit {

	USER_FIELDS = ['login', 'name', 'social_id', 'group_name', 'group_code', 'position', 'dob', 'gender', 'phone', 'email']

	private fileName: string;
	private records: any[];
	private columnMappings: any;
	private modelFields: SelectItem[];
	private dataFields: string[];
	private statusMessages: string[];
	private groups: Group[];
	private dateFormat: Setting;

	constructor(private excelService: ExcelService, private router: Router, private route: ActivatedRoute) {
		super();
		this.records = [];
		this.dataFields = [];
		this.statusMessages = [];
		this.columnMappings = {};
		this.modelFields = [
			{ value: 'login', label: this.translateService.instant('Username') },
			{ value: 'name', label: this.translateService.instant('Fullname') },
			{ value: 'social_id', label: this.translateService.instant('IDNo') },
			{ value: 'group_name', label: this.translateService.instant('Dealer') },
			{ value: 'group_code', label: this.translateService.instant('Dealer Code') },
			{ value: 'position', label: this.translateService.instant('Position') },
			{ value: 'dob', label: this.translateService.instant('Date of birth') },
			{ value: 'gender', label: this.translateService.instant('Gender') },
			{ value: 'phone', label: this.translateService.instant('Phone') },
			{ value: 'email', label: this.translateService.instant('Email') },
		];
	}

	ngOnInit() {
		this.groups = this.route.snapshot.data['groups'];
		this.dateFormat = this.route.snapshot.data['dateFormat'];
		this.records = [];
		this.dataFields = [];
		this.statusMessages = [];
		this.columnMappings = {};
	}

	import() {
		this.parseData().subscribe(users => {
			this.uploadData(users);
		});
	}

	parseData(): Observable<any> {
		var users = [];
		_.each(this.records, (record, index) => {
			var user = new User();
			var isValid = true;
			_.each(this.dataFields, field => {
				var modelField = this.columnMappings[field];
				if (modelField)
					user[modelField.value] = record[field];
			});
			user["password"] = DEFAULT_PASSWORD;
			var group = _.find(this.groups, (obj: Group) => {
				return obj.code == user["group_code"];
			});
			if (group) {
				user.group_id = group.id;
			} else {
				isValid = false;
				this.statusMessages.push(`Record ${index + 1}: Group ${record["group_code"]} is not defined`);
			}
			if (user.dob)
				if (moment(user.dob, this.dateFormat.value)["_isValid"])
					user.dob = moment(user.dob, this.dateFormat.value).toDate();
				else {
					isValid = false;
					this.statusMessages.push(`Record ${index + 1}: Invalid date format`);
				}
			isValid = user['gender'] in GENDER;
			if (!isValid)
				this.statusMessages.push(`Record ${index + 1}: Invalid gender. Valid values: ${Object.keys(GENDER)}`);
			else
				users.push(user);
		});
		return Observable.of(users);
	}

	uploadData(users: User[]) {
		User.createArray(this, users).subscribe(() => {
			var string = this.translateService.instant('Import') + users.length + this.translateService.instant('users successfully');
			this.success(string);
		});
	}

	selectFile(event: any) {
		this.columnMappings = {};
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.dataFields = Object.keys(this.records[0]);
			_.each(this.dataFields, (field, index) => {
				this.columnMappings[field] = this.modelFields[index % this.modelFields.length];
			});
		});
	}

	cancel() {
		this.router.navigate(['/account/users']);
	}

}

