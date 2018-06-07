import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

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
