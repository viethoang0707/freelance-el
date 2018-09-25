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

const GROUP_FIELDS = ['name', 'category', 'parent_id', 'child_ids'];

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
		BaseModel.bulk_search(this, ...apiList)
			.map(jsonArray => {
				return _.flatten(jsonArray);
			}).subscribe(users => {
				var data = _.map(users, (user) => {
					var userData = {};
					_.each(this.selectedFields, (field) => {
						userData[field] = user[field];
					});
					return userData;
				});
				var i;
				for (i = 0; i < data.length; i++) {
					if (data[i]['login'] || data[i]['login'] == "") {
						data[i]['Username / Tên truy cập'] = data[i]['login'];
						delete data[i]['login'];
					}
					if (data[i]['name'] || data[i]['name'] == "") {
						data[i]['Fullname / Tên đầy đủ'] = data[i]['name'];
						delete data[i]['name'];
					}
					if (data[i]['social_id'] || data[i]['social_id'] == "") {
						data[i]['IDNo / Số CMND'] = data[i]['social_id'];
						delete data[i]['social_id'];
					}
					if (data[i]['group_name'] || data[i]['group_name'] == "") {
						data[i]['Dealer / Đại lý'] = data[i]['group_name'];
						delete data[i]['group_name'];
					}
					if (data[i]['group_code'] || data[i]['group_code'] == "") {
						data[i]['Dealer Code / Mã đại lý'] = data[i]['group_code'];
						delete data[i]['group_code'];
					}
					if (data[i]['position'] || data[i]['position'] == "") {
						data[i]['Position / Vị trí'] = data[i]['position'];
						delete data[i]['position'];
					}
					if (data[i]['dob'] || data[i]['dob'] == "") {
						data[i]['Date of birth / Ngày sinh'] = data[i]['dob'];
						delete data[i]['dob'];
					}
					if (data[i]['gender'] || data[i]['gender'] == "") {
						data[i]['Gender / Giới tính'] = data[i]['gender'];
						delete data[i]['gender'];
					}
					if (data[i]['phone'] || data[i]['phone'] == "") {
						data[i]['Phone / Số điện thoại'] = data[i]['phone'];
						delete data[i]['phone'];
					}
					if (data[i]['email'] || data[i]['email'] == "") {
						data[i]['Email'] = data[i]['email'];
						delete data[i]['email'];
					}
					if (data[i]['ban_date'] || data[i]['ban_date'] == "") {
						data[i]['Deactivate date / Ngày hủy kích hoạt'] = data[i]['ban_date'];
						delete data[i]['ban_date'];
					}
					if (data[i]['unban_date'] || data[i]['unban_date'] == "") {
						data[i]['Activate date / Ngày kích hoạt'] = data[i]['unban_date'];
						delete data[i]['unban_date'];
					}
				}
				this.excelService.exportAsExcelFile(data, 'user_export');
				this.hide();
			});
	}

}

