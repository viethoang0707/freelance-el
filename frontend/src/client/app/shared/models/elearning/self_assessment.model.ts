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
import { User } from './user.model';

@Model('etraining.self_assessment')
export class SelfAssessment extends BaseModel {

	// Default constructor will be called by mapper
	constructor() {
		super();

		this.exam_id = undefined;
		this.unit_id = undefined;
		this.exam = new Exam();
	}

	exam_id: number;
	unit_id: number;
	@UnserializeProperty()
	exam: Exam;

	static __api__populateExam(exam_id: number, fields?: string[]): ListAPI {
		return new ListAPI(Exam.Model, [exam_id], fields);
	}

	populateExam(context: APIContext, fields?: string[]): Observable<any> {
		if (!this.exam_id)
			return Observable.of(null);
		return Exam.get(context, this.exam_id, fields).do(exam => {
			this.exam = exam;
		});
	}

}