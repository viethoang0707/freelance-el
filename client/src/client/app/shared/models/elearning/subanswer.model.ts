import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.subanswer')
export class SubAnswer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.answer_id = undefined;
	}
    question_id: number;
    option_id: number;
    answer_id: number;


    static listByAnswer( context:APIContext, answerId: number): Observable<any[]> {
        return Answer.search(context,[],"[('answer_id','=',"+answerId+")]");
    }

}
