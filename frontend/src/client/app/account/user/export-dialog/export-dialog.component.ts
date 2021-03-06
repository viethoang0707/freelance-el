import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { ExcelService } from '../../../shared/services/excel.service';
import * as _ from 'underscore';
import { WindowRef } from '../../../shared/helpers/windonw.ref';
declare var $: any;

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'user_count'];

@Component({
	moduleId: module.id,
	selector: 'user-export-dialog',
	templateUrl: 'export-dialog.component.html',
})
export class UserExportDialog extends BaseComponent {

	WINDOW_HEIGHT: any;

	private tree: TreeNode[];
	private selectedGroupNodes: TreeNode[];
	private fields: SelectItem[];
	private selectedFields: string[];
	private selectedAllFields: string[];
	private display: boolean;

	@Input() lang: string;

	constructor(private excelService: ExcelService) {
		super();
		this.fields = [
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
			{ value: 'ban_date', label: this.translateService.instant('Deactivate date') },
			{ value: 'unban_date', label: this.translateService.instant('Activate date') },
		];
		this.selectedFields = [];
		this.selectedGroupNodes = [];
		this.display = false;
		this.WINDOW_HEIGHT = $(window).height();
	}

	show() {
		this.display = true;
		Group.listUserGroup(this, GROUP_FIELDS).subscribe(groups => {
			let treeUtils = new TreeUtils();
			this.tree = treeUtils.buildGroupTree(groups);
		});
	}

	hide() {
		this.display = false;
	}

	export() {
		this.lang = this.translateService.currentLang;
		var apiList = _.map(this.selectedGroupNodes, (node: TreeNode) => {
			return Group.__api__listUsers(node.data["id"], this.selectedFields);
		});
		this.selectedGroupNodes = [];
		BaseModel.bulk_search(this, ...apiList)
			.map(jsonArray => {
				return _.flatten(jsonArray);
			}).subscribe(users => {
				var data = _.map(users, (user) => {
					var userData = {};
					_.each(this.selectedFields, (field) => {
						var exportField = _.find(this.fields, obj=> {
								return obj["value"] == field;
						})
						userData[exportField["label"]] = user[field];
					});
					return userData;
				});
				this.excelService.exportAsExcelFile(data, 'user_export');
				this.hide();
			});
	}

	selectedAll() {
		if (this.selectedAllFields.length != 0) {
			this.selectedFields = ["login", "name", "social_id", "group_name", "group_code", "position", "dob", "gender", "phone", "email", "ban_date", "unban_date"];
		} else {
			this.selectedFields = [];
		}

	}
}

