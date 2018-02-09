import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.option')
export class QuestionOption extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.question_id = undefined;
		this.content = undefined;
		this.is_correct = undefined;
	}

    is_correct:boolean;
    content: string;
    question_id: number;

    static listByQuestion(context:APIContext, questionId):Observable<any> {
        return QuestionOption.search(context,[], "[('question_id','=',"+questionId+")]");
    }

}
