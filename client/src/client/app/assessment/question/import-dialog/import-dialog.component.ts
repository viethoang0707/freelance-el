import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'question-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class QuestionImportDialog extends BaseComponent {

	private display: boolean;
	private fileName: string;
	private records: any[];
	private percentage: number;
	private completed: number;
	private total: number;

	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();

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
		Group.listQuestionGroup(this).subscribe(groups => {
			for (var i = 0; i < this.records.length;) {
				var record = this.records[i];
				var question = new Question();
				Object.assign(question, record);
				var group = _.find(groups, (obj: Group) => {
					return obj.code == record["group_code"];
				});
				var type = record["type"];
				if (group && type) {
					question.group_id = group.id;
					question.type = type;
					var options = [];
					var optionLength = 1;
					while (i + optionLength < this.records.length && !this.records[i + optionLength]["group_code"]) 
						optionLength++;
					if ((type == "sc" || type == "mc") && optionLength) {
						for (var j = 0; j < optionLength && i < this.records.length; j++) {
							var optionRecord = this.records[j + i];
							var option = new QuestionOption();
							option.is_correct = optionRecord["correct"] == 'Y';
							option.content = optionRecord["option"];
							options.push(option);
						}
						options = _.shuffle(options);
						var subscription = question.createWithOption(this, options);
						subscriptions.push(subscription);
					}
					i += optionLength;
				} else
					i++;
			}
			this.startTransaction();
			Observable.merge(...subscriptions).subscribe(
				() => {
					this.completed++;
					this.percentage = Math.floor(this.completed / this.total * 100);
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.onImportCompleteReceiver.next();
					this.hide();
					this.closeTransaction();
				});
		});
	}

	changeListner(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.total = this.records.length;
			console.log(this.records);
		})
	}


}