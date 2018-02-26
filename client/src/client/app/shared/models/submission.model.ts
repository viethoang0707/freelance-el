import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from './decorator';
import { APIContext } from './context';

@Model('etraining.submission')
export class Submission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.user_id = undefined;
        this.member_id = undefined;
        this.exam_id = undefined;
        this.end = undefined;
        this.start = undefined;
	}
    exam_id: number;
    user_id: number;
    member_id: number;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;

    static byUser( context:APIContext, userId: number): Observable<any> {
        return Submission.search(context,[],"[('user_id','=',"+userId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static byMember( context:APIContext, member_id: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+member_id+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }
}
