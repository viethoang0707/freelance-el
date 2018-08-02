import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT } from '../constants';
import { Token } from '../cloud/token.model';
import { MapUtils } from '../../helpers/map.utils';
import * as _ from 'underscore';

@Model('etraining.achivement')
export class Achivement extends BaseModel {

	// Default constructor will be called by mapper
	constructor() {
		super();

		this.course_id = undefined;
		this.user_group_id = undefined;
		this.exam_id = undefined;
		this.user_id = undefined;
		this.date_acquire = undefined;
		this.competency_id = undefined;
		this.competency_name = undefined;
		this.competency_group_id = undefined;
		this.competency_group_name = undefined;
		this.competency_level_id = undefined;
		this.competency_level_name = undefined;
	}

	course_id: number;
	exam_id: number;
	user_id: number;
	user_group_id: number;
	@FieldProperty<Date>()
	date_acquire: Date;
	competency_id: number;
	competency_name: string;
	competency_group_id: number;
	competency_group_name: string;
	competency_level_id: number;
	competency_level_name: string;

	static __api__searchByDateAndCompetency(competencyId: number, start: Date, end: Date,fields?:string[]): SearchReadAPI {
		var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
		return new SearchReadAPI(Achivement.Model, fields, "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
	}

	static searchByDateAndCompetency(context: APIContext, competencyId: number, start: Date, end: Date,fields?:string[]): Observable<any> {
		var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
		var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
		return Achivement.search(context, fields, "[('date_acquire','>=','" + startDateStr + "'),('date_acquire','<=','" + endDateStr + "'),('competency_id','<='," + competencyId + ")]");
	}


}