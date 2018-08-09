import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.self_assessment')
export class SelfAssessment extends BaseModel {

	// Default constructor will be called by mapper
	constructor() {
		super();

		this.exam_id = undefined;
		this.unit_id = undefined;
	}

	exam_id: number;
	unit_id: number;

}