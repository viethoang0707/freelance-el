import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.survey_answer')
export class SurveyAnswer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.submission_id = undefined;
        this.question_type = undefined;
        this.text = undefined;
        this.json = undefined;
        this.survey_id =  undefined;
	}
    survey_id: number;
    question_id: number;
    option_id: number;
    submission_id: number;
    text:string;
    json:string;
    question_type: string;

    static listBySubmit( context:APIContext, submitId: number): Observable<any[]> {
        return SurveyAnswer.search(context,[],"[('submission_id','=',"+submitId+")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any[]> {
        return SurveyAnswer.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }

}
