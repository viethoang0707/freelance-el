import { Model } from '../decorator';
import { APIContext } from '../context';
import { CompetencyCache } from '../../services/cache.service';
import { Model,FieldProperty } from '../decorator';
import { Exam } from './exam.model';
import { Course } from './course.model';
import { User } from './user.model';
import { Competency } from './competency.model';
import { CompetencyLevel } from './competency-level.model';


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

	populate(context:APIContext):Observable<any> {
		var subscriptions = [];
		subscriptions.push(Course.get(context, this.course_id));
		subscriptions.push(Exam.get(context, this.exam_id));
		subscriptions.push(Competency.get(context, this.competency_id));
		subscriptions.push(CompetencyLevel.get(context, this.competency_level_id));
		return Obserable.forkJoin(subscriptions);
	}

	static populateArray() {

	}



}