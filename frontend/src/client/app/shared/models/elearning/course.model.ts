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
    prequisite_course_id__DESC__:string;
    name:string;
    group_id:number;
    supervisor_id: number;
    supervisor_name: string;
    group_id__DESC__: string;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;
    member_ids: number[];
    class_ids: number[];
    faq_ids: number[];
    material_ids: number[];
    unit_ids: number[];
    syl: CourseSyllabus;

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        return true;
    }

    static __api__allForEnroll(): SearchReadAPI {
        return new SearchReadAPI(Course.Model, [],"[('review_state','=','approved')]");
    }

    static allForEnroll(context:APIContext):Observable<any> {
        if (Cache.hit(Course.Model))
            return Observable.of(Cache.load(Course.Model)).map(courses=> {
                return _.filter(courses, (course:Course)=> {
                    return course.review_state == 'approved' ;
                });
            });
        return Course.search(context,[],"[('review_state','=','approved')]");
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

    static __api__listMembers(member_ids): ListAPI {
        return new ListAPI(CourseMember.Model, member_ids,[]);
    }

    listMembers( context:APIContext): Observable<any[]> {
        return CourseMember.array(context,this.member_ids);
    }

    static __api__listClasses(class_ids: number[]): ListAPI {
        return new ListAPI(CourseClass.Model, class_ids,[]);
    }

    listClasses( context:APIContext): Observable<any[]> {
        return CourseClass.array(context,this.class_ids);
    }

    static __api__listFaqs(faq_ids: number[]): ListAPI {
        return new ListAPI(CourseFaq.Model, faq_ids,[]);
    }

    listFaqs( context:APIContext): Observable<any[]> {
        return CourseFaq.array(context,this.faq_ids);
    }

    static __api__listMaterials(material_ids: number[]): ListAPI {
        return new ListAPI(CourseMaterial.Model, material_ids,[]);
    }

    listMaterials( context:APIContext): Observable<any[]> {
        return CourseMaterial.array(context,this.class_ids);
    }

    static __api__listUnits(unit_ids: number[]): ListAPI {
        return new ListAPI(CourseUnit.Model, unit_ids,[]);
    }

    listUnits( context:APIContext): Observable<any[]> {
        return CourseUnit.array(context,this.unit_ids);
    }

    static __api__populateSyllabus(syllabus_id: number): ListAPI {
        return new ListAPI(CourseSyllabus.Model, [syllabus_id], []);
    }

    populateSyllabus(context: APIContext): Observable<any> {
        if (!this.syllabus_id)
            return Observable.of(null);
        return CourseSyllabus.get(context, this.syllabus_id).do(syl => {
            this.syl = syl;
        });
    }

    static __api__courseEditor(course_id: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('role','=','editor'),('course_id','='," + course_id + ")]");
    }

    courseEditor(context: APIContext): Observable<any> {
        return CourseMember.single(context, [], "[('role','=','editor'),('course_id','='," + this.id + ")]");
    }

}
