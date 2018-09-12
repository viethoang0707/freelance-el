import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, UnserializeProperty,ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { Conference } from './conference.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { ExecuteAPI } from '../../services/api/execute.api';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { Certificate } from './course-certificate.model';
import { CourseMember } from './course-member.model';
import { Project } from './project.model';
import { Exam } from './exam.model';
import { Survey } from './survey.model';

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
        this.member_count = undefined;
        this.unit_count = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
    conference_id: number;
    supervisor_id: number;
    status: string;
    member_count: number;
    unit_count: number;

    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    get IsAvailable():boolean {
        if (this.status !='open')
            return false;
        if (!this.end)
            return false;
        var now = new Date();
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__enroll(classId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'enroll',{classId:classId,userIds:userIds}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(CourseClass.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);

    }

    static __api__enroll_staff(classId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'enroll_staff',{classId:classId,userIds:userIds}, null);
    }

    enrollStaff(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(CourseClass.__api__enroll_staff(this.id, userIds), 
            context.authService.LoginToken);

    }

    static __api__open(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'open',{classId:classId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(CourseClass.__api__open(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = 'open';
            });
    }

    static __api__close(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'close',{classId:classId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(CourseClass.__api__close(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = 'closed';
            });
    }

    static __api__listCertificates(classId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Certificate.Model,fields,"[('class_id','=',"+classId+ ")]");
    }

    listCertificates( context:APIContext,fields?:string[]): Observable<any[]> {
        return Certificate.search(context,fields,"[('class_id','=',"+this.id+ ")]");
    }

    static __api__listMembers(classId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model,fields,"[('class_id','=',"+classId+ ")]");
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseMember.search(context,fields,"[('class_id','=',"+this.id+ ")]");
    }

    static __api__listProjects(classId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Project.Model,fields,"[('class_id','=',"+classId+ ")]");
    }

    listProjects( context:APIContext,fields?:string[]): Observable<any[]> {
        return Project.search(context,fields,"[('class_id','=',"+this.id+ ")]");
    }

    static __api__listExams(classId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Exam.Model,fields,"[('course_class_id','=',"+classId+ ")]");
    }

    listExams( context:APIContext,fields?:string[]): Observable<any[]> {
        return Exam.search(context,fields, "[('course_class_id','=',"+this.id+ ")]");
    }

    static __api__listSurveys(classId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Survey.Model,fields,"[('course_class_id','=',"+classId+ ")]");
    }

    listSurveys( context:APIContext,fields?:string[]): Observable<any[]> {
        return Survey.search(context,fields, "[('course_class_id','=',"+this.id+ ")]");
    }


}
