import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';

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
    }
    
    name:string;
    course_id: number;
    member_id: number;
    @FieldProperty<Date>()
    date_issue:Date;
    qualification: number;
    summary:string;

    static byMember( context:APIContext, memberId: number): Observable<any[]> {
        return this.search(context,[],"[('member_id','!=',"+memberId+")]")
        .map(certificates => {
            return certificates[0]}
         );
    }

}
