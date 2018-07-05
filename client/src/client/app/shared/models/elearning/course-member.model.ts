import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ConferenceMember } from './conference-member.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { Course } from './course.model';
import { Certificate } from './course-certificate.model';
import { CourseLog } from './log.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';
import { ExecuteAPI } from '../../services/api/execute.api';
import { CourseClass } from './course-class.model';

@Model('etraining.course_member')
export class CourseMember extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.course_id = undefined;
        this.class_id = undefined;
        this.date_register = undefined;
        this.status = undefined;
        this.role = undefined;
        this.name = undefined;
        this.course_name = undefined;
        this.course_code = undefined;
        this.course_mode = undefined;
        this.enroll_status = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.user_id = undefined;
        this.login = undefined;
        this.image = undefined;
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
        this.course = new Course();
        this.clazz =  new CourseClass();
        this.certificate =  new Certificate();
        this.certificate_id = undefined;
        this.conference_member_id = undefined;
        this.conference_member =  new ConferenceMember();
        this.course_review_state =  undefined;
    }

    course_id: number;
    course_review_state: string;
    conference_member_id: number;
    conference_member: ConferenceMember;
    course; Course;
    clazz: CourseClass;
    certificate_id: number;
    certificate: Certificate;
    user_id: number;
    class_id: number;
    status: string;
    role: string;
    name: string;
    login: string;
    image: string;
    course_name: string;
    course_mode: string;
    course_code: string;
    enroll_status: string;
    @FieldProperty<Date>()
    date_register: Date;
    email: string;
    phone: string;
    group_id: number;
    group_id__DESC__: string;

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser(context: APIContext, userId: number): Observable<any[]> {
        return CourseMember.search(context, [], "[('user_id','='," + userId + ")]");
    }

    static __api__listByClass(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('class_id','=',"+courseId+")]");
    }

    static listByClass(context: APIContext, classId: number): Observable<any[]> {
        return CourseMember.search(context, [], "[('class_id','='," + classId + ")]");
    }

    static __api__listByCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('course_id','=',"+courseId+")]");
    }

    static listByCourse(context: APIContext, courseId: number): Observable<any[]> {
        return CourseMember.search(context, [], "[('course_id','='," + courseId + ")]");
    }

    static __api__countTeacher(): SearchCountAPI {
        return new SearchCountAPI(CourseMember.Model, "[('role','=','teacher')]");
    }

    static countTeacher(context: APIContext) {
        return CourseMember.count(context, "[('role','=','teacher')]")
    }

    static __api__countStudent(): SearchCountAPI {
        return new SearchCountAPI(CourseMember.Model,  "[('role','=','student')]");
    }

    static countStudent(context: APIContext) {
        return CourseMember.count(context, "[('role','=','student')]")
    }

    static __api__byCourseAndUser(userId: number, courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    }

    static byCourseAndUser(context: APIContext, userId: number, courseId: number): Observable<any> {
        return CourseMember.search(context, [], "[('user_id','='," + userId + "),('course_id','='," + courseId + ")]");
    }

    static __api__courseEditor(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('role','=','editor'),('course_id','='," + courseId + ")]");
    }

    static courseEditor(context: APIContext, courseId: number): Observable<any> {
        return CourseMember.single(context, [], "[('role','=','editor'),('course_id','='," + courseId + ")]");
    }

    static __api__courseSupervisor(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model, [],"[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    }

    static courseSupervisor(context: APIContext, courseId: number): Observable<any> {
        return CourseMember.single(context, [], "[('role','=','supervisor'),('course_id','='," + courseId + ")]");
    }


    __api__populateCourse(): ListAPI {
        return new ListAPI(Course.Model, [this.course_id], []);
    }

    populateCourse(context: APIContext): Observable<any> {
        if (!this.course_id)
            return Observable.of(null);
        return Course.get(context, this.course_id).do(course => {
            this.course = course;
        });
    }

    static populateCourses(context: APIContext, members: CourseMember[]): Observable<any> {
        var courseIds = _.pluck(members,'course_id');
        courseIds = _.filter(courseIds, id=> {
            return id;
        });
        return Course.array(context, courseIds).do(courses=> {
            _.each(members, (member:CourseMember)=> {
                member.course =  _.find(courses, (course:Course)=> {
                    return member.course_id == course.id;
                });
            });
        });
    }

    __api__complete_course(memberId: number, certificateId: number): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'complete_course',{memberId:memberId, certificateId:certificateId}, null);
    }

    completeCourse(context:APIContext, certificateId: number):Observable<any> {
        return context.apiService.execute(this.__api__complete_course(this.id, certificateId), 
            context.authService.LoginToken);
    }


    __api__populateClass(): ListAPI {
        return new ListAPI(CourseClass.Model, [this.class_id], []);
    }

    populateClass(context: APIContext): Observable<any> {
        if (!this.course_id)
            return Observable.of(null);
        return CourseClass.get(context, this.class_id).do(clazz => {
            this.clazz = clazz;
        });
    }

    static populateClasses(context: APIContext, members: CourseMember[]): Observable<any> {
        var classIds = _.pluck(members,'class_id');
        classIds = _.filter(classIds, id=> {
            return id;
        });
        return CourseClass.array(context, classIds).do(classList=> {
            _.each(members, (member:CourseMember)=> {
                member.clazz =  _.find(classList, (clazz:CourseClass)=> {
                    return member.class_id == clazz.id;
                });
            });
        });
    }

    __api__populateConferenceMember(): ListAPI {
        return new ListAPI(ConferenceMember.Model, [this.conference_member_id], []);
    }

    populateConferenceMember(context: APIContext): Observable<any> {
        if (!this.conference_member_id)
            return Observable.of(null);
        return ConferenceMember.get(context, this.conference_member_id).do(member => {
            this.conference_member = member;
        });
    }

    static populateConferenceMembers(context: APIContext, members: CourseMember[]): Observable<any> {
        var memberIds = _.pluck(members,'conference_member_id');
        memberIds = _.filter(memberIds, id=> {
            return id;
        });
        return ConferenceMember.array(context, memberIds).do(memberList=> {
            _.each(members, (member:CourseMember)=> {
                member.conference_member =  _.find(memberList, (confMember:ConferenceMember)=> {
                    return member.conference_member_id == confMember.id;
                });
            });
        });
    }

}
