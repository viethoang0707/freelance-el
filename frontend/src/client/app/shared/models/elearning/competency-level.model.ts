import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';

@Model('etraining.competency_level')
export class CompetencyLevel extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.order = undefined;
		this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id = undefined;
        this.competency_group_name = undefined;
        this.achivement_ids = [];
	}

    name:string;
    order: number;
    competency_id: number;
    competency_name: string;
    competency_group_id: number;
    competency_group_name: string;
    @ReadOnlyProperty()
    achivement_ids: number[];


}
