import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Survey } from './survey.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty,UnserializeProperty, ReadOnlyProperty } from '../decorator';
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
        this.enroll_status = undefined;
        this.role = undefined;
        this.survey =  new Survey();
        this.submission_id = undefined;
        this.survey_review_state =  undefined;
        this.user = new User();
        this.submit =  new SurveySubmission();
        this.group_name = undefined;
        this.class_id = undefined;
        this.sheet_id = undefined;
    }

    @UnserializeProperty()
    user: User;
    submission_id:number;
    course_member_id: number;
    role: string;
    survey_id: number;
    survey_review_state: string;
    @UnserializeProperty()
    survey: Survey;
    user_id: number;
    login: string;
    name: string;
    @FieldProperty<Date>()
    date_register: Date;
    email: string;
    phone: string;
    group_id: number;
    enroll_status: string;
    @UnserializeProperty()
    submit: SurveySubmission;
    group_name: string;
    class_id: number;
    sheet_id: number;
    
    static populateSurveys(context: APIContext, members: SurveyMember[],fields?:string[]): Observable<any> {
        members = _.filter(members, (member:SurveyMember)=> {
            return member.survey.IsNew;
        });
        var surveyIds = _.pluck(members,'survey_id');
        surveyIds = _.filter(surveyIds, id=> {
            return id;
        });
        return Survey.array(context, surveyIds,fields).do(surveys=> {
            _.each(members, (member:SurveyMember)=> {
                member.survey =  _.find(surveys, (survey:Survey)=> {
                    return member.survey_id == survey.id;
                });
            });
        });
    }

    static __api__listSubmissions(memberId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveySubmission.Model,fields,"[('member_id','=',"+memberId+")]");
    }

    listSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveySubmission.search(context,fields,"[('member_id','=',"+this.id+")]");
    }

    static __api__join_survey(memberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(SurveyMember.Model, 'join_survey',{memberId:memberId}, null);
    }

    joinSurvey(context:APIContext,fields?:string[]):Observable<any> {
        return context.apiService.execute(SurveyMember.__api__join_survey(this.id), 
            context.authService.LoginToken).do(()=> {
                this.enroll_status = 'in-progress';
            });
    }
}
