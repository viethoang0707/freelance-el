import { Question } from '../../../shared/models/question.model';
import { QuestionOption } from '../../../shared/models/option.model';
import { Answer } from '../../../shared/models/answer.model';
import { Observable, Subject } from 'rxjs/Rx';

export interface IQuestion {
	mode: any;
	render(question:Question, answer?:Answer);
	saveEditor():Observable<any>;
	concludeAnswer();
}