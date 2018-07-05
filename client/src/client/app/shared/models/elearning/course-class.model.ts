import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Conference } from './conference.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { ExecuteAPI } from '../../services/api/execute.api';
import * as _ from 'underscore';

@Model('etraining.course_class')
export class CourseClass extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.course_name = undefined;
		this.course_id = undefined;
        this.supervisor_id = undefined;
        this.supervisor_name = undefined;
        this.start = undefined;
        this.conference_id =  undefined;
        this.end = undefined;
        this.status = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
    conference_id: number;
    supervisor_id: number;
    status: string;

    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    get IsAvailable():boolean {
        if (this.status !='open')
            return false;
        var now = new Date();
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__listByCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseClass.Model, [],"[('course_id','=',"+courseId+")]");
    }

    static listByCourse(context:APIContext, courseId:number):Observable<any> {
        return CourseClass.search(context,[], "[('course_id','=',"+courseId+")]");
    }

    __api__enroll(classId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'enroll',{classId:classId,userIds:userIds}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);

    }

    static __api__listBySupervisor(supervisorId: number): SearchReadAPI {
        return new SearchReadAPI(CourseClass.Model, [],"[('supervisor_id','=',"+supervisorId+")]");
    }

    static listBySupervisor(context:APIContext, supervisorId: number):Observable<any> {
        if (Cache.hit(CourseClass.Model))
            return Observable.of(Cache.load(CourseClass.Model)).map(classList=> {
                return _.filter(classList, (clazz:CourseClass)=> {
                    return clazz.supervisor_id == supervisorId;
                });
            });
        return CourseClass.search(context,[],"[('supervisor_id','=',"+supervisorId+")]");
    }

    static __api__listBySupervisorAndDate(supervisorId: number, start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(CourseClass.Model, [],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+supervisorId+")]");
    }

    static listBySupervisorAndDate(context:APIContext, supervisorId: number, start:Date, end:Date):Observable<any> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        if (Cache.hit(CourseClass.Model))
            return Observable.of(Cache.load(CourseClass.Model)).map(classList=> {
                return _.filter(classList, (clazz:CourseClass)=> {
                    return clazz.start.getTime() >=  start.getTime() && clazz.start.getTime() <= end.getTime() && clazz.supervisor_id == supervisorId;
                });
            });
        return CourseClass.search(context,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+supervisorId+")]");
    }

    __api__open(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'open',{classId:classId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__open(this.id), 
            context.authService.LoginToken);
    }

    __api__close(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'close',{classId:classId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__close(this.id), 
            context.authService.LoginToken);
    }

}
