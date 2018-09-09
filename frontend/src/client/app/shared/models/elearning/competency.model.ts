import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, UnserializeProperty,ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CompetencyLevel } from './competency-level.model';
import { Course } from './course.model';

@Model('etraining.competency')
export class Competency extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

		this.name = undefined;
		this.group_id = undefined;
		this.category = undefined;
        this.group_name = undefined;
        this.level_summary = undefined;
	}

    name: string;
    group_name: string;
    group_id: number;
    category: string;
    level_summary: string;


    static __api__listLevels(competencyId, fields?:string[]): SearchReadAPI {
        return CompetencyLevel.__api__search(fields,"[('competency_id','=',"+ competencyId + ")]");
    }

    listLevels(context: APIContext,fields?:string[]): Observable<any> {
        if (this.id)
            return CompetencyLevel.search(context, fields,"[('competency_id','=',"+ this.id + ")]");
        return Observable.of([]);
    }

}
