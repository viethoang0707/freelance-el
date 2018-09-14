import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import * as _ from 'underscore';
import { DEFAULT_PASSWORD, GROUP_CATEGORY, QUESTION_LEVEL, QUESTION_TYPE } from '../../../shared/models/constants';
import { TreeNode } from 'primeng/api';
import { ExcelService } from '../../../shared/services/excel.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
	moduleId: module.id,
	selector: 'question-import-component',
	templateUrl: 'question-import.component.html',
})
export class QuestionImportComponent extends BaseComponent implements OnInit {

	private optionList: any;
	private fileName: string;
	private records: any[];
	private dataFields: string[];
	private statusMessages: string[];
	private groups: Group[];

	constructor(private router: Router, private route: ActivatedRoute, private excelService: ExcelService) {
		super();

	}

	ngOnInit() {
		this.statusMessages = [];
		this.records = [];
		this.dataFields = [];
		this.groups = this.route.snapshot.data['groups'];
	}

	import() {
		this.parseData().subscribe(result => {
			this.uploadData(result["questions"], result["options"]);
		});
	}

	parseData(): Observable<any> {
		var questionList = [];
		var optionList = [];
		this.statusMessages = [];
		for (var i = 0; i < this.records.length;) {
			var isValid = true;
			var record = this.records[i];
			var question = new Question();
			Object.assign(question, record);
				var group = _.find(this.groups, (obj: Group) => {
					return obj.code == record["group_code"];
				});
				if (group) {
					question.group_id = group.id;
				} else {
					isValid = false;
					this.statusMessages.push(`Record ${i + 1}: Group ${record["group_code"]} is not defined`);
				}

				var type = record["type"];
				if (!type || !QUESTION_TYPE[type]) {
					isValid = false;
					this.statusMessages.push(`Record ${i}: Type ${record["type"]} is not defined`);
				}

				var level = record["level"];
				if (!level || !QUESTION_LEVEL[level]) {
					isValid = false;
					this.statusMessages.push(`Record ${i}: Type ${record["level"]} is not defined`);
				}

			if (isValid) {
				var questionOptions = [];
				var optionLength = 1;
				while (i + optionLength < this.records.length && !this.records[i + optionLength]["group_code"])
					optionLength++;
				if ((type == "sc" || type == "mc") && optionLength) {
					for (var j = 0; j < optionLength && i < this.records.length; j++) {
						var optionRecord = this.records[j + i];
						var option = new QuestionOption();
						option.is_correct = optionRecord["correct"] == 'Y';
						option.content = optionRecord["option"];
						questionOptions.push(option);
					}
					this.optionList.push(_.shuffle(questionOptions));
				} else
					this.optionList.push([])
				i += optionLength;
			} else
				i++;
			questionList.push(question);
		}
		return Observable.of({ questions: questionList, options: optionList });
	}

	uploadData(questions: Question[], options: QuestionOption[]) {
		Question.importQuestion(this, questions, options).subscribe(() => {
			this.success(this.translateService.instant('Import question successfully'));
			this.router.navigate(['/assessment/questions']);
		}, () => {
			this.error(this.translateService.instant('Import error. Please check data format again!'))
		})
	}


	selectFile(event: any) {
		var file = event.files[0];
		this.fileName = file.name;
		this.excelService.importFromExcelFile(file).subscribe(data => {
			this.records = data;
			this.dataFields = Object.keys(this.records[0]);
		});
	}

	cancel() {
		this.router.navigate(['/assessment/questions']);
	}
}