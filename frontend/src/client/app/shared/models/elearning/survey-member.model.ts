import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Survey } from './survey.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { User } from './user.model';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { SurveySubmission } from './survey-submission.model';

@Model('etraining.survey_member')
export class SurveyMember extends BaseModel{

    constructor(){
        super();
        
        this.survey_id = undefined;
        this.course_member_id =  undefined;
        this.date_register = undefined;
        this.name = undefined;
        this.login = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.user_id = undefined;
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
        this.enroll_status = undefined;
        this.role = undefined;
        this.survey =  new Survey();
        this.submission_id = undefined;
        this.survey_review_state =  undefined;
        this.user = new User();
        this.submit =  new SurveySubmission();
    }

    user: User;
    submission_id:number;
    course_member_id: number;
    role: string;
    survey_id: number;
    survey_review_state: string;
    survey: Survey;
    user_id: number;
    login: string;
    name: string;
    @FieldProperty<Date>()
    date_register: Date;
    email: string;
    phone: string;
    group_id: number;
    group_id__DESC__: string;
    enroll_status: string;
    submit: SurveySubmission;

    static __api__listBySurvey(surveyId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('survey_id','=',"+surveyId+")]");
    }

    static __api__bySurveyAndUser(surveyId: number,userId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('user_id','=',"+userId+"),('survey_id','=',"+surveyId+")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any[]> {
        return SurveyMember.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }


    static bySurveyAndUser( context:APIContext, userId: number, surveyId: number): Observable<any> {
        return SurveyMember.single(context,[],"[('user_id','=',"+userId+"),('survey_id','=',"+surveyId+")]");
    }
    
    __api__populateSurvey(): ListAPI {
        return new ListAPI(Survey.Model, [this.survey_id], []);
    }

    populateSurvey(context: APIContext): Observable<any> {
        if (!this.survey_id)
            return Observable.of(null);
        return Survey.get(context, this.survey_id).do(survey => {
            this.survey = survey;
        });
    }

    static populateSurveys(context: APIContext, members: SurveyMember[]): Observable<any> {
        var surveyIds = _.pluck(members,'survey_id');
        surveyIds = _.filter(surveyIds, id=> {
            return id;
        });
        return Survey.array(context, surveyIds).do(surveys=> {
            _.each(members, (member:SurveyMember)=> {
                member.survey =  _.find(surveys, (survey:Survey)=> {
                    return member.survey_id == survey.id;
                });
            });
        });
    }

    static __api__surveyEditor(surveyId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    }

    static surveyEditor(context: APIContext, surveyId: number): Observable<any> {
        return SurveyMember.single(context, [], "[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    }


    static __api__populateUser(user_id: number): ListAPI {
        return new ListAPI(User.Model, [user_id], []);
    }

    populateUser(context: APIContext): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        return User.get(context, this.user_id).do(user => {
            this.user = user;
        });
    }

    static __api__populateSubmission(submission_id: number): ListAPI {
        return new ListAPI(SurveySubmission.Model, [submission_id], []);
    }

    populateSubmission(context: APIContext): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        return SurveySubmission.get(context, this.submission_id).do(submit => {
            this.submit = submit;
        });
    }
}
