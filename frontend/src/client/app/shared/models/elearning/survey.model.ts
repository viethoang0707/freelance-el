import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty,UnserializeProperty ,ReadOnlyProperty} from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ExecuteAPI } from '../../services/api/execute.api';

import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT} from '../constants';
import { ListAPI } from '../../services/api/list.api';
import { SurveyAnswer } from './survey-answer.model';
import { SurveyMember } from './survey-member.model';
import { CourseClass } from './course-class.model';
import { SurveySheet } from './survey-sheet.model';

@Model('etraining.survey')
export class Survey extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.status = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.is_public =  undefined;
        this.review_state = undefined;
        this.course_class_id = undefined;
        this.sheet_id =  undefined;
        this.question_count = undefined;
        this.sheet_status = undefined;
        this.answer_ids = [];
        this.member_ids = [];
        this.clazz =  new CourseClass();
        this.sheet =  new SurveySheet();
        this.question_ids = [];
	}

    @UnserializeProperty()
    clazz: CourseClass;
    @UnserializeProperty()
    sheet: SurveySheet;
    sheet_id: number;
    question_count: number;
    sheet_status: string;
    course_class_id: number;
    review_state:string;
    name:string;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    status: string;
    is_public: boolean;
    supervisor_id: number;
    supervisor_name: string;
    @ReadOnlyProperty()
    answer_ids: number[];
    @ReadOnlyProperty()
    member_ids: number[];
    @ReadOnlyProperty()
    question_ids: number[];
    

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        if (!this.end)
            return false;
        var now = new Date();
        if (this.start.getTime() > now.getTime())
            return false;
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__listPublicSurvey(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, fields,"[('is_public','=',True)");
    }

    static listPublicSurvey(context:APIContext,fields?:string[]):Observable<any> {
        return Survey.search(context,fields,"[('is_public','=',True)]");
    }

    static __api__allForEnrollPublic(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, fields,"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static allForEnrollPublic(context:APIContext,fields?:string[]):Observable<any> {
        return Survey.search(context,fields,"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static __api__open(surveyId: number): ExecuteAPI {
        return new ExecuteAPI(Survey.Model, 'open',{surveyId:surveyId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(Survey.__api__open(this.id), 
            context.authService.LoginToken);
    }

    static __api__close(surveyId: number): ExecuteAPI {
        return new ExecuteAPI(Survey.Model, 'close',{surveyId:surveyId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Survey.__api__close(this.id), 
            context.authService.LoginToken);
    }

    static __api__enroll(surveyId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Survey.Model, 'enroll',{userIds:userIds, surveyId:surveyId}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Survey.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__enroll_supervior(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Survey.Model, 'enroll_supervisor',{userIds:userIds, examId:examId}, null);
    }

    enrollSupervisor(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Survey.__api__enroll_supervior(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__listAnswers(answer_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(SurveyAnswer.Model, answer_ids,fields);
    }

    listAnswers( context:APIContext,fields?:string[]): Observable<any[]> {
        return SurveyAnswer.array(context,this.answer_ids,fields);
    }

    static __api__listMembers(member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(SurveyMember.Model, member_ids,fields);
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return SurveyMember.array(context,this.member_ids,fields);
    }

    static __api__populateClass(class_id:number,fields?:string[]): ListAPI {
        return new ListAPI(CourseClass.Model, [class_id], fields);
    }

    populateClass(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.course_class_id)
            return Observable.of(null);
        if (!this.clazz.IsNew)
            return Observable.of(this);
        return CourseClass.get(context, this.course_class_id,fields).do(clazz => {
            this.clazz = clazz;
        });
    }

    static __api__surveyEditor(surveyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, fields,"[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    }

    surveyEditor(context: APIContext,fields?:string[]): Observable<any> {
        return SurveyMember.single(context, fields, "[('role','=','editor'),('survey_id','='," + this.id + ")]");
    }

    static __api__populateQuestionSheet(sheet_id: number,fields?:string[]): ListAPI {
        return new ListAPI(SurveySheet.Model, [sheet_id], fields);
    }

    populateQuestionSheet(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.sheet_id)
            return Observable.of(null);
        if (!this.sheet.IsNew)
            return Observable.of(this);
        return SurveySheet.get(context, this.sheet_id,fields).do(sheet => {
            this.sheet = sheet;
        });
    }
}
