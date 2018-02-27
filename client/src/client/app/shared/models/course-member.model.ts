import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from './decorator';
import { APIContext } from './context';
import { ConferenceMember } from './conference-member.model';

@Model('etraining.course_member')
export class CourseMember extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
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
        this.etraining_group_id = undefined;
        this.etraining_group_id__DESC__ = undefined;
	}

    course_id: number;
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
    etraining_group_id: number;
    etraining_group_id__DESC__: string;

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return CourseMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static listByClass( context:APIContext, classId: number): Observable<any[]> {
        return CourseMember.search(context,[],"[('class_id','=',"+classId+")]");
    }

    static listByCourse( context:APIContext, courseId: number): Observable<any[]> {
        return CourseMember.search(context,[],"[('course_id','=',"+courseId+")]");
    }

    static countTeacher(context: APIContext) {
        return CourseMember.count(context, "[('role','=','teacher')]")
    }

    static countStudent(context: APIContext) {
        return CourseMember.count(context, "[('role','=','student')]")
    }

    static byCourseAndUser( context:APIContext, userId: number, courseId: number): Observable<any> {
        return CourseMember.search(context,[],"[('user_id','=',"+userId+"),('course_id','=',"+courseId+")]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

    delete(context:APIContext):Observable<any> {
        return ConferenceMember.byCourseMember(context,this.id).flatMap(conferenceMember => {
            if (!conferenceMember)
                return this.delete(context);
            else {
                return Observable.zip(this.delete(context), conferenceMember.delete(context))
            }
        });
    }
}
