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

    static byUser( context:APIContext, userId: number): Observable<any[]> {
        return Submission.search(context,[],"[('user_id','=',"+userId+")]").map(submits =>{
            return submits.length ? submits[0]: null;
        });
    }

    static byMember( context:APIContext, member_id: number): Observable<any[]> {
        return Submission.search(context,[],"[('member_id','=',"+member_id+")]").map(submits =>{
            return submits.length ? submits[0]: null;
        });
    }
}
