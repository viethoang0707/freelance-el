import { BaseModel } from '../base.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Exam } from './exam.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty, UnserializeProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { QuestionSheet } from './question-sheet.model';

@Model('etraining.self_assessment')
export class SelfAssessment extends BaseModel {

	// Default constructor will be called by mapper
	constructor() {
		super();

		this.exam_id = undefined;
		this.sheet_id = undefined;
		this.unit_id = undefined;
		this.exam = new Exam();
	}

	exam_id: number;
	sheet_id: number;
	unit_id: number;
	@UnserializeProperty()
	exam: Exam;
	@UnserializeProperty()
	sheet: QuestionSheet;



}