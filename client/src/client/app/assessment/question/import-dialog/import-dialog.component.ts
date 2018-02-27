import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Question } from '../../../shared/models/question.model';
import { QuestionOption } from '../../../shared/models/option.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService, EXCEL_TYPE } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'etraining-question-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class QuestionImportDialog extends BaseComponent {

	display: boolean;
	fileType: string;
	fileName: string;
	records: any[];
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

	show() {
		this.display = true;
	}

	hide() {
		this.importing = false;
		this.display = false;
	}

	import() {
		var subscriptions = [];
		Group.listByCategory(this, GROUP_CATEGORY.QUESTION).subscribe(groups => {
			this.importing = true;
			for (var i=0; i < this.records.length;) {
				var record = this.records[i];
				var question = new Question();
				Object.assign(question, record);
				var group = _.find(groups, (obj:Group)=> {
					return obj.code == record["group_code"];
				});
				var type = record["type"];
				if (group && type) {
					question.group_id = group.id;
					var options = [];
					var optionLength =record["option"]? +record["option"]:0;
					if (type =="sc" && optionLength) {
						for (var j=1;j<= optionLength && i < this.records.length;j++) {
							var optionRecord = this.records[j+i];
							var option = new QuestionOption();
							option.is_correct = j==0;
							option.content = optionRecord["option"];
							options.push(option);
						}
						var subscription =  question.save(this).flatMap(() => {
							var optionSubscription = [];
							_.each(options, (obj:QuestionOption)=> {
								obj.question_id =  question.id;
								optionSubscription.push(option.save(this));
							});
							return Observable.forkJoin(...optionSubscription);
						});
						subscriptions.push(subscription);
					} 
					else
						subscriptions.push(question.save(this));
					i += optionLength + 1;
				} else
					i++;
			}
			Observable.forkJoin(...subscriptions).subscribe(()=> {
				this.importing = false;
				this.hide();
				this.onImportCompleteReceiver.next();
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

