import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';

@Model('etraining.course_certificate')
export class Certificate extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
        this.member_id = undefined;
        this.date_issue = undefined;
        this.qualification = undefined;
        this.summary = undefined;
        this.user_id = undefined;
        this.course_name = undefined;
        this.course_code = undefined;
        this.course_mode = undefined;
        this.member_name = undefined;
        this.member_login = undefined;
        this.member_image = undefined;

    }
    
    name:string;
    course_id: number;
    member_id: number;
    user_id:number;
    @FieldProperty<Date>()
    date_issue:Date;
    qualification: number;
    summary:string;
    member_name: string;
    member_login: string;
    member_image: string;
    course_name: string;
    course_mode: string;
    course_code: string;

    static byMember( context:APIContext, memberId: number): Observable<any[]> {
        return Certificate.search(context,[],"[('member_id','!=',"+memberId+")]")
        .map(certificates => {
            return certificates[0]}
         );
    }

    static listByUser(context: APIContext, userId: number): Observable<any[]> {
        return Certificate.search(context, [], "[('user_id','='," + userId + ")]");
    }

}
