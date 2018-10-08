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
        this.clazz =  new CourseClass();
        this.sheet =  new SurveySheet();
        this.supervisor_group_id = undefined;
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
    supervisor_group_id: number;
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
            context.authService.LoginToken).do(()=> {
                this.status = "open";
            });
    }

    static __api__close(surveyId: number): ExecuteAPI {
        return new ExecuteAPI(Survey.Model, 'close',{surveyId:surveyId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Survey.__api__close(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = "closed";
            });
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



    static __api__surveyEditor(surveyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, fields,"[('role','=','editor'),('survey_id','='," + surveyId + ")]");
    }

    surveyEditor(context: APIContext,fields?:string[]): Observable<any> {
        return SurveyMember.single(context, fields, "[('role','=','editor'),('survey_id','='," + this.id + ")]");
    }



    static __api__listCandidates(surveyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model, fields,"[('survey_id','=',"+surveyId+"),('role','=','candidate')]");
    }

    listCandidates( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyMember.search(context,fields,"[('survey_id','=',"+this.id+"),('role','=','candidate')]");
    }

    static __api__listAnswers(surveyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyAnswer.Model,fields,"[('survey_id','=',"+surveyId+")]");
    }

    listAnswers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyAnswer.search(context,fields,"[('survey_id','=',"+this.id+")]");
    }

    static __api__listMembers(surveyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model,fields,"[('survey_id','=',"+surveyId+")]");
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyMember.search(context,fields,"[('survey_id','=',"+this.id+")]");
    }
}
