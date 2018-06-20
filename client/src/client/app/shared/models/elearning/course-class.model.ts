import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Conference } from './conference.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
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
        this.end = undefined;
        this.status = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
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


}
