import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.submission')
export class Submission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.picture = undefined;
        this.user_id = undefined;
        this.member_id = undefined;
        this.exam_id = undefined;
        this.end = undefined;
        this.start = undefined;
        this.score = undefined;
	    this.survey_id =  undefined;
    }
    
    survey_id: number;
    exam_id: number;
    user_id: number;
    member_id: number;
    picture: string;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;
    score: number;

    static __api__byUserAndExam(userId: number, examId: number): SearchReadAPI {
        return new SearchReadAPI(Submission.Model, [],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]");
    }

    static byUserAndExam( context:APIContext, userId: number, examId: number): Observable<any> {
        return Submission.search(context,[],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static __api__byMemberAndExam(memberId: number,examId:number): SearchReadAPI {
        return new SearchReadAPI(Submission.Model, [],"[('member_id','=',"+memberId+"),('exam_id','=',"+examId+")");
    }

    static byMemberAndExam( context:APIContext, memberId: number, examId: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+memberId+"),('exam_id','=',"+examId+")]");
    }

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Submission.Model, [],"[('user_id','=',"+userId+")]");
    }

    static byMemberAndSurvey( context:APIContext, member_id: number, surveyId: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+member_id+"),('survey_id','=',"+surveyId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return Submission.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(Submission.Model, [],"[('exam_id','=',"+examId+"),('exam_id','=',"+examId+")]");
    }

    static listByExam( context:APIContext, examId: number): Observable<any> {
        return Submission.search(context,[],"[('exam_id','=',"+examId+")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any> {
        return Submission.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
