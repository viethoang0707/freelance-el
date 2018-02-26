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
        this.group_id__DESC__ = undefined;
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
    group_id: number;
    group_id__DESC__: string;

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static countByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamQuestion.count(context,"[('exam_id','=',"+examId+")]");
    }

    static listOpenQuestionByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('exam_id','=',"+examId+"),('type','=','ext')]");
    }

    static byQuestion( context:APIContext, questionId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('question_id','=',"+questionId+")]").map(questions =>{
            return questions.length ? questions[0]: null;
        });
    }

}
