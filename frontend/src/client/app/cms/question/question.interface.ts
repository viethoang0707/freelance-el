import { Question } from '../../../shared/models/elearning/question.model';
import { QuestionOption } from '../../../shared/models/elearning/option.model';
import { Answer } from '../../../shared/models/elearning/answer.model';
import { Observable, Subject } from 'rxjs/Rx';

export interface IQuestion {
	mode: any;
	isValid(): boolean;
	render(question:Question, answer?:any);
	saveEditor():Observable<any>;
	concludeAnswer();
}