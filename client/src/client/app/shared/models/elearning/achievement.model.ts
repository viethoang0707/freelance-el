import { Model } from '../decorator';
import { APIContext } from '../context';
import { CompetencyCache } from '../../services/cache.service';
import { Model,FieldProperty } from '../decorator';

@Model('etraining.achivement')
export class Achivement extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.course_id = undefined;
		this.competency_id = undefined;
		this.exam_id = undefined;
		this.user_id = undefined;
		this.date_acquire = undefined;
		this.competency_name = undefined;
		this.competency_group_id =  undefined;
	}

    course_id:number;
    competency_id: number;
    exam_id: number;
	user_id: number;
	@FieldProperty<Date>()
	date_acquire: number;
	competency_name: string;
	competency_group_id: number;

}