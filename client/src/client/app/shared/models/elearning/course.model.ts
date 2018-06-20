import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import * as _ from 'underscore';

@Model('etraining.course')
export class Course extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.description = undefined;
		this.code = undefined;
        this.status = undefined;
        this.mode = undefined;
        this.logo = undefined;
        this.group_id = undefined;
        this.author_id = undefined;
        this.author_name = undefined;
        this.syllabus_id = undefined;
        this.group_id__DESC__ = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id =  undefined;
        this.competency_group_name =  undefined;
        this.competency_level_id =  undefined;
        this.competency_level_name =  undefined;
        this.prequisite_course_id = undefined;
        this.prequisite_course_id__DESC__ = undefined;
        this.complete_unit_by_order = undefined;
        this.competency_group_id = undefined;
        this.competency_group_name = undefined;
	}

    complete_unit_by_order: boolean;
    competency_id: number;
    competency_name: string;
    competency_group_id: number;
    competency_group_name: string;
    competency_level_id: number;
    competency_level_name: string;
    prequisite_course_id:number;
    prequisite_course_id__DESC__:string;
    name:string;
    syllabus_id:number;
    group_id:number;
    supervisor_id: number;
    supervisor_name: string;
    group_id__DESC__: string;
    author_name:string;
    author_id:number;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;


    static __api__listByAuthor(authorId: number): SearchReadAPI {
        return new SearchReadAPI(Course.Model, [],"[('author_id','=',"+authorId+")]");
    }

    static listByAuthor(context:APIContext, authorId):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.author_id == authorId;
                });
            });
        return Course.search(context,[],"[('author_id','=',"+authorId+")]");
    }

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Course.Model, [],"[('group_id','=',"+groupId+")]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId;
                });
            });
        return Course.search(context,[],"[('group_id','=',"+groupId+")]");
    }

    static __api__listByCompetency(competencyId: number): SearchReadAPI {
        return new SearchReadAPI(Course.Model, [],"[('competency_id','=',"+competencyId+")]");
    }

    static listByCompetency(context:APIContext, competencyId):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.competency_id == competencyId;
                });
            });
        return Course.search(context,[],"[('competency_id','=',"+competencyId+")]");
    }

    static __api__listByGroupAndMode(groupId: number, mode:string): SearchReadAPI {
        return new SearchReadAPI(Course.Model, [],"[('group_id','=',"+groupId+"),('mode','=','"+mode+"')]");
    }

    static listByGroupAndMode(context:APIContext, groupId, mode:string):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId && course.mode == mode;
                });
            });
        return Course.search(context,[],"[('group_id','=',"+groupId+"),('mode','=','"+mode+"')]");
    }

    static __api__searchByDate(start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Course.Model, [],"[('create_date','>=','"+startDateStr+"'),('create_date','<=','"+endDateStr+"')]");
    }

    static searchByDate(context:APIContext, start:Date, end:Date):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.create_date.getTime() >=  start.getTime() && course.create_date.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Course.search(context,[],"[('create_date','>=','"+startDateStr+"'),('create_date','<=','"+endDateStr+"')]");
    }

    __api__enroll(courseId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'enroll',{courseId:courseId,userIds:userIds}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(this.__api__enroll(this.id, userIds), 
            context.authService.CloudAcc.id, context.authService.CloudAcc.api_endpoint);
    }

}
