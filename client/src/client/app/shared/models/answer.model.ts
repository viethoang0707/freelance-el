import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from './decorator';
import { APIContext } from './context';

@Model('etraining.answer')
export class Answer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.is_correct = undefined;
        this.submission_id = undefined;
        this.text = undefined;
        this.score = undefined;
	}
    question_id: number;
    option_id: number;
    score: number;
    is_correct: boolean;
    submission_id: number;
    text:string;


    static listBySubmit( context:APIContext, submitId: number): Observable<any[]> {
        return Answer.search(context,[],"[('submission_id','=',"+submitId+")]");
    }

}
