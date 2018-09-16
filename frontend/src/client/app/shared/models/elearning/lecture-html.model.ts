
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.html_lecture')
export class HtmlLecture extends BaseModel {

	// Default constructor will be called by mapper
	constructor() {
		super();

		this.content = undefined;
		this.unit_id = undefined;
		this.course_id = undefined;
	}

	content: string;
	unit_id: number;
	course_id: number;

}
