import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exam_question')
export class ExamQuestion extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.title = undefined;
		this.content = undefined;
		this.explanation = undefined;
		this.type = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.question_id = undefined;
        this.exam_id = undefined;
        this.score = undefined;
        this.order = undefined;
	}
    question_id: number;
    exam_id: number;
    score: number;
    order: number;
    level: number;
    title:string;
    content: string;
    explanation: string;
    type: string;
    level: number;
    group_id: number;

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('exam_id','=',"+examId+")]");
    }

}
