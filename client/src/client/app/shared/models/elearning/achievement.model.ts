import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.achivement')
export class Achivement extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.course_id = undefined;
		this.user_group_id = undefined;
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
	user_group_id: number;
	@FieldProperty<Date>()
	date_acquire: Date;
	competency_id: number;
	competency_name: string;
	competency_group_id: number;
	competency_group_name: string;
	competency_level_id: number;
	competency_level_name: string;

	static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return Achivement.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model, [],"[('user_group_id','=',"+groupId+")]");
    }

    static listByGroup( context:APIContext, groupId: number): Observable<any[]> {
        return Achivement.search(context,[],"[('user_group_id','=',"+groupId+")]");
    }


}