import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { Cache } from '../../helpers/cache.utils';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT} from '../constants';

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
	}

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

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        var now = new Date();
        if (this.start.getTime() > now.getTime())
            return false;
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__listPublicSurvey(): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, [],"[('is_public','=',True)");
    }

    static listPublicSurvey(context:APIContext):Observable<any> {
        return Survey.search(context,[],"[('is_public','=',True)]");
    }

    static __api__allForEnroll(): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, [],"[('review_state','=','approved')]");
    }

    static allForEnroll(context:APIContext):Observable<any> {
        if (Cache.hit(Survey.Model))
            return Observable.of(Cache.load(Survey.Model)).map(surveys=> {
                return _.filter(surveys, (survey:Survey)=> {
                    return survey.review_state == 'approved' ;
                });
            });
        return Survey.search(context,[],"[('review_state','=','approved')]");
    }

    static __api__listByClass(classId: number): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, [],"[('course_class_id','=',"+classId+")]");
    }

    static listByClass(context:APIContext, classId: number):Observable<any> {
        if (Cache.hit(Survey.Model))
            return Observable.of(Cache.load(Survey.Model)).map(surveys=> {
                return _.filter(surveys, (survey:Survey)=> {
                    return survey.supervisor_id == classId;
                });
            });
        return Survey.search(context,[],"[('course_class_id','=',"+classId+")]");
    }

    __api__open(surveyId: number): ExecuteAPI {
        return new ExecuteAPI(Survey.Model, 'open',{surveyId:surveyId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__open(this.id), 
            context.authService.LoginToken);
    }

    __api__close(surveyId: number): ExecuteAPI {
        return new ExecuteAPI(Survey.Model, 'close',{surveyId:surveyId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__close(this.id), 
            context.authService.LoginToken);
    }

    __api__enroll(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Survey.Model, 'enroll',{userIds:userIds, examId:examId}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

}
