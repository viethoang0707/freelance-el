import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseClass } from '../../../shared/models/course-class.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { DEFAULT_DATE_LOCALE } from '../../../shared/models/constants'


@Component({
	moduleId: module.id,
	selector: 'etraining-class-dialog',
	templateUrl: 'class-dialog.component.html',
})
export class CourseClassDialog extends BaseDialog<CourseClass> implements OnInit {

	rangeDates: Date[];
	locale:any;

	constructor(private treeUtils: TreeUtils, private http: Http) {
		super();
		this.locale = DEFAULT_DATE_LOCALE;
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
			if (object.start && object.end) {
				this.rangeDates = [new Date(object.start), new Date(object.end)];
			}
			var lang = this.translateService.currentLang;
			this.http.get(`/assets/i18n/calendar.${lang}.json`)
            .subscribe((res: Response) => {
            	this.locale = res.json();
            });
		});
	}

	onDateSelect($event) {
		if (this.rangeDates[0] && this.rangeDates[1]) {
			this.object.start = this.rangeDates[0];
			this.object.end = this.rangeDates[1];
		}
	}
}


