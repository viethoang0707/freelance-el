import { APIContext } from '../context';
import { CompetencyCache } from '../../services/cache.service';
import { Model,FieldProperty } from '../decorator';
import { Exam } from './exam.model';
import { Course } from './course.model';
import { User } from './user.model';
import { Competency } from './competency.model';
import { CompetencyLevel } from './competency-level.model';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseModel } from '../base.model';
import { CloudAccount } from '../cloud/cloud-account.model';
import { MapUtils } from '../../helpers/map.utils';
import * as _ from 'underscore';

@Model('etraining.achivement')
export class Achivement extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.course_id = undefined;
		this.exam_id = undefined;
		this.user_id = undefined;
		this.date_acquire = undefined;
		this.competency_id = undefined;
		this.competency_name = undefined;
		this.competency_group_id =  undefined;
		this.competency_group_name =  undefined;
		this.competency_level_id =  undefined;
		this.competency_level_name =  undefined;
	}

    course_id:number;
    exam_id: number;
	user_id: number;
	@FieldProperty<Date>()
	date_acquire: number;
	competency_id: number;
	competency_name: string;
	competency_group_id: number;
	competency_group_name: string;
	competency_level_id: number;
	competency_level_name: string;


}