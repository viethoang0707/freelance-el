
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.survey_submission')
export class SurveySubmission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
        this.user_id = undefined;
        this.member_id = undefined;
        this.end = undefined;
        this.start = undefined;
	    this.survey_id =  undefined;
    }
    
    survey_id: number;
    user_id: number;
    member_id: number;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;


    static byMemberAndSurvey( context:APIContext, member_id: number, surveyId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('member_id','=',"+member_id+"),('survey_id','=',"+surveyId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('user_id','=',"+userId+")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
