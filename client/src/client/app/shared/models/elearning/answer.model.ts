import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.answer')
export class Answer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.is_correct = undefined;
        this.submission_id = undefined;
        this.question_type = undefined;
        this.question_level = undefined;
        this.text = undefined;
        this.score = undefined;
        this.exam_id =  undefined;
        this.json = undefined;
        this.survey_id =  undefined;
	}
    survey_id: number;
    exam_id: number;
    question_id: number;
    option_id: number;
    score: number;
    is_correct: boolean;
    submission_id: number;
    text:string;
    json:string;
    question_level: string;
    question_type: string;

    static __api__listBySubmit(submitId: number): SearchReadAPI {
        return new SearchReadAPI(Answer.Model, [],"[('submission_id','=',"+submitId+")]");
    }

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(Answer.Model, [],"[('exam_id','=',"+examId+")]");
    }

    static listBySubmit( context:APIContext, submitId: number): Observable<any[]> {
        return Answer.search(context,[],"[('submission_id','=',"+submitId+")]");
    }

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return Answer.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static listBySurvey( context:APIContext, surveyId: number): Observable<any[]> {
        return Answer.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }

}
