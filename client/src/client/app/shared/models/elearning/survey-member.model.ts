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

@Model('etraining.survey_member')
export class SurveyMember extends BaseModel{

    constructor(){
        super();
        
        this.survey_id = undefined;
        this.date_register = undefined;
        this.name = undefined;
        this.login = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.user_id = undefined;
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
        this.enroll_status = undefined;
        this.survey =  new Survey();
    }

    survey_id: number;
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

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('user_id','=',"+userId+")]");
    }

    static __api__listBySurvey(surveyId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('survey_id','=',"+surveyId+")]");
    }

    static __api__bySurveyAndUser(surveyId: number,userId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, [],"[('user_id','=',"+userId+"),('survey_id','=',"+surveyId+")]");
    }


    static listBySurvey( context:APIContext, surveyId: number): Observable<any[]> {
        return SurveyMember.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }


    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return SurveyMember.search(context,[],"[('user_id','=',"+userId+")]");
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




}
