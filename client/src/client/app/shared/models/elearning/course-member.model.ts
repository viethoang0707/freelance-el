import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ConferenceMember } from './conference-member.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { Course } from './course.model';
import { CourseLog } from './log.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';

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
    }

    course_id: number;
    course; Course;
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

    static populateCourseForArray(context: APIContext, members: CourseMember[]): Observable<any> {
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

}
