import { SearchReadAPI } from '../../services/api/search-read.api';
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


    static __api__byMemberAndSurvey(member_id: number, surveyId: number): SearchReadAPI {
        return new SearchReadAPI(SurveySubmission.Model, [], "[('member_id','='," + member_id + "),('survey_id','='," + surveyId + ")]");
    }

    static byMemberAndSurvey( context:APIContext, member_id: number, surveyId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('member_id','=',"+member_id+"),('survey_id','=',"+surveyId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(SurveySubmission.Model, [], "[('user_id','='," + userId + ")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__listBySurvey(surveyId: number): SearchReadAPI {
        return new SearchReadAPI(SurveySubmission.Model, [], "[('survey_id','='," + surveyId + ")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }

    static __api__listByMemer(memberId: number): SearchReadAPI {
        return new SearchReadAPI(SurveySubmission.Model, [], "[('member_id','='," + memberId + ")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return SurveySubmission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
