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
        this.member_ids = [];
        this.class_ids = [];
        this.faq_ids = [];
        this.material_ids = [];
        this.unit_ids = [];
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
    @ReadOnlyProperty()
    member_ids: number[];
    @ReadOnlyProperty()
    class_ids: number[];
    @ReadOnlyProperty()
    faq_ids: number[];
    @ReadOnlyProperty()
    material_ids: number[];
    @ReadOnlyProperty()
    unit_ids: number[];
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
            context.authService.LoginToken);
    }

    static __api__close(courseId: number): ExecuteAPI {
        return new ExecuteAPI(Course.Model, 'close',{courseId:courseId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Course.__api__close(this.id), 
            context.authService.LoginToken);
    }

    static __api__listMembers(member_ids,fields?:string[]): ListAPI {
        return new ListAPI(CourseMember.Model, member_ids,fields);
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseMember.array(context,this.member_ids,fields);
    }

    static __api__listClasses(class_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseClass.Model, class_ids,fields);
    }

    listClasses( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseClass.array(context,this.class_ids,fields);
    }

    static __api__listFaqs(faq_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseFaq.Model, faq_ids,fields);
    }

    listFaqs( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseFaq.array(context,this.faq_ids,fields);
    }

    static __api__listMaterials(material_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseMaterial.Model, material_ids,fields);
    }

    listMaterials( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseMaterial.array(context,this.material_ids,fields);
    }

    static __api__listUnits(unit_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseUnit.Model, unit_ids,fields);
    }

    listUnits( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseUnit.array(context,this.unit_ids,fields);
    }

    static __api__populateSyllabus(syllabus_id: number,fields?:string[]): ListAPI {
        return new ListAPI(CourseSyllabus.Model, [syllabus_id], fields);
    }

    populateSyllabus(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.syllabus_id)
            return Observable.of(null);
        if (!this.syl.IsNew)
            return Observable.of(this);
        return CourseSyllabus.get(context, this.syllabus_id,fields).do(syl => {
            this.syl = syl;
        });
    }

    static __api__courseEditor(course_id: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, fields,"[('role','=','editor'),('course_id','='," + course_id + ")]");
    }

    courseEditor(context: APIContext,fields?:string[]): Observable<any> {
        return CourseMember.single(context, fields, "[('role','=','editor'),('course_id','='," + this.id + ")]");
    }

}
