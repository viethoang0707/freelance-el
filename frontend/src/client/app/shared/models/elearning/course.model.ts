import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import * as _ from 'underscore';
import { CourseMember } from './course-member.model';
import { ListAPI } from '../../services/api/list.api';
import { CourseClass } from './course-class.model';
import { CourseFaq } from './course-faq.model';
import { CourseMaterial } from './course-material.model';
import { CourseUnit } from './course-unit.model';
import { CourseSyllabus } from './course-syllabus.model';


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
        this.syllabus_id = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id =  undefined;
        this.competency_group_name =  undefined;
        this.competency_level_id =  undefined;
        this.competency_level_name =  undefined;
        this.prequisite_course_id = undefined;
        this.prequisite_course_name= undefined;
        this.complete_unit_by_order = undefined;
        this.competency_group_id = undefined;
        this.competency_group_name = undefined;
        this.review_state = undefined;
        this.syllabus_id = undefined;
        this.unit_count = undefined;
        this.syllabus_status = undefined;
        this.syl =  new CourseSyllabus();
        this.group_name = undefined;
	}

    complete_unit_by_order: boolean;
    competency_id: number;
    syllabus_id: number;
    unit_count: number;
    syllabus_status: string;
    competency_name: string;
    review_state: string;
    competency_group_id: number;
    competency_group_name: string;
    competency_level_id: number;
    competency_level_name: string;
    prequisite_course_id:number;
    prequisite_course_name: string;
    name:string;
    group_id:number;
    group_name: string;
    supervisor_id: number;
    supervisor_name: string;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;
    @UnserializeProperty()
    syl: CourseSyllabus;

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        return true;
    }

    static __api__allForEnroll(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Course.Model, fields,"[('review_state','=','approved')]");
    }

    static allForEnroll(context:APIContext,fields?:string[]):Observable<any> {
        return Course.search(context,fields,"[('review_state','=','approved')]");
    }

    static __api__listByCompetency(competencyId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Course.Model, fields,"[('competency_id','=',"+competencyId+")]");
    }

    static listByCompetency(context:APIContext, competencyId,fields?:string[]):Observable<any> {
        return Course.search(context,fields,"[('competency_id','=',"+competencyId+")]");
    }

    static __api__enroll(courseId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'enroll',{courseId:courseId,userIds:userIds}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Course.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__enroll_staff(courseId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'enroll_staff',{courseId: courseId,userIds:userIds}, null);
    }

    enrollStaff(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Course.__api__enroll_staff(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__open(courseId: number): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'open',{courseId:courseId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(Course.__api__open(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = 'open';
            });
    }

    static __api__close(courseId: number): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'close',{courseId:courseId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Course.__api__close(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = 'closed';
            });
    }

    static __api__listMembers(courseId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model,fields, "[('course_id','=',"+courseId+")]");
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseMember.search(context,fields,"[('course_id','=',"+this.id+")]");
    }

    static __api__listClasses(courseId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseClass.Model,fields,"[('course_id','=',"+courseId+")]");
    }

    listClasses( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseClass.search(context,fields,"[('course_id','=',"+this.id+")]");
    }

    static __api__listFaqs(courseId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseFaq.Model,fields,"[('course_id','=',"+courseId+")]");
    }

    listFaqs( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseFaq.search(context,fields,"[('course_id','=',"+this.id+")]");
    }

    static __api__listMaterials(courseId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMaterial.Model,fields,"[('course_id','=',"+courseId+")]");
    }

    listMaterials( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseMaterial.search(context,fields,"[('course_id','=',"+this.id+")]");
    }

    static __api__listUnits(courseId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseUnit.Model,fields,"[('course_id','=',"+courseId+")]");
    }

    listUnits( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseUnit.search(context,fields,"[('course_id','=',"+this.id+")]");
    }



    static __api__courseEditor(course_id: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, fields,"[('role','=','editor'),('course_id','='," + course_id + ")]");
    }

    courseEditor(context: APIContext,fields?:string[]): Observable<any> {
        return CourseMember.single(context, fields, "[('role','=','editor'),('course_id','='," + this.id + ")]");
    }

}
