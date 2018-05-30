
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

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
    }

    survey_id: number;
    user_id: number;
    login: string;
    name: string;
    @FieldProperty<Date>()
    date_register: Date;
    email: string;
    phone: string;
    group_id: number;
    group_id__DESC__: string;

    static listBySurvey( context:APIContext, surveyId: number): Observable<any[]> {
        return SurveyMember.search(context,[],"[('survey_id','=',"+surveyId+")]");
    }


    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return SurveyMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static bySurveyAndUser( context:APIContext, userId: number, surveyId: number): Observable<any> {
        return SurveyMember.search(context,[],"[('user_id','=',"+userId+"),('survey_id','=',"+surveyId+")]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

}
