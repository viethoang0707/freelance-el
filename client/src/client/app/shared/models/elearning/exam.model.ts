import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { ExecuteAPI } from '../../services/api/execute.api';

@Model('etraining.exam')
export class Exam extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.selector_id = undefined;
        this.status = undefined;
        this.duration = undefined;
        this.publish_score = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id =  undefined;
        this.competency_group_name =  undefined;
        this.competency_level_id =  undefined;
        this.competency_level_name =  undefined;
        this.is_public =  undefined;
        this.review_state = undefined;
        this.course_class_id = undefined;
	}

    review_state:string;
    course_class_id:number;
    competency_id: number;
    competency_name: string;
    competency_group_id: number;
    competency_group_name: string;
    competency_level_id: number;
    competency_level_name: string;
    name:string;
    is_public:boolean;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    selector_id: number;
    status: string;
    duration: number;
    publish_score: boolean;
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

    static __api__searchByDate(start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Exam.Model, [],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"')]");
    }

    static searchByDate(context:APIContext, start:Date, end:Date):Observable<any> {
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.start.getTime() >=  start.getTime() && exam.start.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Exam.search(context,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"')]");
    }

    static __api__allForEnroll(): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('review_state','=','approved'),('status','=','open')]");
    }

    static allForEnroll(context:APIContext):Observable<any> {
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.review_state == 'approved' ;
                });
            });
        return Exam.search(context,[],"[('review_state','=','approved'),('status','=','open')]");
    }

    __api__enroll(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Exam.Model, 'enroll',{userIds:userIds, examId:examId}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__listPublicExam(): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('is_public','=',True)");
    }

    static listPublicExam(context:APIContext):Observable<any> {
        return Exam.search(context,[],"[('is_public','=',True)]");
    }

    static __api__listBySupervisor(supervisorId: number): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('supervisor_id','=',"+supervisorId+")]");
    }

    static listBySupervisor(context:APIContext, supervisorId: number):Observable<any> {
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.supervisor_id == supervisorId;
                });
            });
        return Exam.search(context,[],"[('supervisor_id','=',"+supervisorId+")]");
    }

    static __api__listBySupervisorAndDate(supervisorId: number, start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Exam.Model, [],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+supervisorId+")]");
    }

    static listBySupervisorAndDate(context:APIContext, supervisorId: number, start:Date, end:Date):Observable<any> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.start.getTime() >=  start.getTime() && exam.start.getTime() <= end.getTime() && exam.supervisor_id == supervisorId;
                });
            });
        return Exam.search(context,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+supervisorId+")]");
    }

    static __api__listByClass(classId: number): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('course_class_id','=',"+classId+")]");
    }

    static listByClass(context:APIContext, classId: number):Observable<any> {
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.supervisor_id == classId;
                });
            });
        return Exam.search(context,[],"[('course_class_id','=',"+classId+")]");
    }
}
