import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.project_record')
export class ProjectRecord extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.score = undefined;
		this.member_id = undefined;
        this.user_id =  undefined;
        this.project_id =  undefined;
        this.class_id =  undefined;
        this.course_id =  undefined;
	}

    score: number;
    member_id: number;
    user_id: number;
    course_id: number;
    class_id: number;
    project_id: number;

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectRecord.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser(context: APIContext, userId: number): Observable<any[]> {
        return ProjectRecord.search(context, [], "[('user_id','='," + userId + ")]");
    }

    static __api__listByMember(memberId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectRecord.Model, [],"[('member_id','=',"+memberId+")]");
    }

    static listByMember(context: APIContext, memberId: number): Observable<any[]> {
        return ProjectRecord.search(context, [], "[('member_id','='," + memberId + ")]");
    }

}
