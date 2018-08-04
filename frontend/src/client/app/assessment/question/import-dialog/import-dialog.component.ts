import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, QUESTION_LEVEL, QUESTION_TYPE } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';


@Component({
	moduleId: module.id,
	selector: 'question-import-dialog',
	templateUrl: 'import-dialog.component.html',
})
export class QuestionImportDialog extends BaseComponent {

	private statusMessages: string[];
	private questionList: Question[];
	private optionList: QuestionOption[];
	private step: number;
	private display: boolean;
	private fileName: string;
	private records: any[];
	private onImportCompleteReceiver: Subject<any> = new Subject();
	onImportComplete: Observable<any> = this.onImportCompleteReceiver.asObservable();

	constructor(private excelService: ExcelService) {
		super();
		this.display = false;
		this.records = [];
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
		Group.listQuestionGroup(this).subscribe(groups => {
			this.step = 2;
			this.parseData(groups).subscribe(success => {
				if (success && this.questionList.length)
					this.uploadData();
			});
		});
	}

	parseData(groups: Group[]):Observable<any> {
		this.questionList = [];
		this.optionList = [];
		this.statusMessages = [];
		for (var i = 0; i < this.records.length;) {
			var record = this.records[i];
			var question = new Question();
			Object.assign(question, record);
			var group = _.find(groups, (obj: Group) => {
				return obj.code == record["group_code"];
			});
			if (!group)
				this.statusMessages.push(`Record ${index}: Group ${record["group_code"]} is not defined`);
			var type = record["type"];
			if (!type || !QUESTION_TYPE[type])
				this.statusMessages.push(`Record ${index}: Type ${record["type"]} is not defined`);
			var level = record["level"];
			if (!level || !QUESTION_LEVEL[level])
				this.statusMessages.push(`Record ${index}: Type ${record["level"]} is not defined`);
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
					this.optionList.push(_.shuffle(options));
				} else
					this.optionList.push([])
				i += optionLength;
			} else
				i++;
			this.questionList.push(question);
		}
		if (this.statusMessages.length)
			return Observable.of(false);
		else
			return Observable.of(true);
	}

	uploadData() {
		Question.importQuestion(this, this.questionList, this.optionList).subscribe(() => {
			this.onImportCompleteReceiver.next();
			this.success('Import question successfully');
			this.hide();
		}, () => {
			this.error('Import error. Please check data format again!')
		})
	}

	selectFile(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.step = 1;
		})
	}


}