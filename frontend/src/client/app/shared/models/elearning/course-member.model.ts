import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty,UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { ConferenceMember } from './conference-member.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { Course } from './course.model';
import { Certificate } from './course-certificate.model';
import { CourseLog } from './log.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';
import { ExecuteAPI } from '../../services/api/execute.api';
import { CourseClass } from './course-class.model';
import { User } from './user.model';
import { ProjectSubmission } from './project-submission.model';
import { ExamRecord } from './exam-record.model';
import { ExamMember } from './exam-member.model';
import { SurveyMember } from './survey-member.model';

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
        this.group_name = undefined;
        this.course = new Course();
        this.clazz =  new CourseClass();
        this.certificate =  new Certificate();
        this.certificate_id = undefined;
        this.conference_member_id = undefined;
        this.conference_member =  new ConferenceMember();
        this.course_review_state =  undefined;
        this.user = new User();

    }

    @UnserializeProperty()
    user: User;
    course_id: number;
    course_review_state: string;
    conference_member_id: number;
    @UnserializeProperty()
    conference_member: ConferenceMember;
    course; Course;
    @UnserializeProperty()
    clazz: CourseClass;
    certificate_id: number;
    @UnserializeProperty()
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
    group_name: string;


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

    static __api__populateCertificate(certificate_id: number,fields?:string[]): ListAPI {
        return new ListAPI(Certificate.Model, [certificate_id],fields);
    }

    populateCertificate(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.certificate_id)
            return Observable.of(null);
        return Certificate.get(context, this.certificate_id,fields).do(certificate => {
            this.certificate = certificate;
        });
    }

    static __api__populateCourse(course_id: number,fields?:string[]): ListAPI {
        return new ListAPI(Course.Model, [course_id],fields);
    }

    populateCourse(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.course_id)
            return Observable.of(null);
        return Course.get(context, this.course_id,fields).do(course => {
            this.course = course;
        });
    }

    static populateCourses(context: APIContext, members: CourseMember[],fields?:string[]): Observable<any> {
        members = _.filter(members, (member:CourseMember)=> {
            return member.course.IsNew;
        });
        var courseIds = _.pluck(members,'course_id');
        courseIds = _.filter(courseIds, id=> {
            return id;
        });
        return Course.array(context, courseIds,fields).do(courses=> {
            _.each(members, (member:CourseMember)=> {
                member.course =  _.find(courses, (course:Course)=> {
                    return member.course_id == course.id;
                });
            });
        });
    }

    static __api__complete_course(memberId: number, certificateId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'complete_course',{memberId:memberId, certificateId:certificateId}, null);
    }

    completeCourse(context:APIContext, certificateId: number,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__complete_course(this.id, certificateId), 
            context.authService.LoginToken);
    }

    static __api__do_assessment(memberId: number, assessmentId: number,examMemberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'do_assessment',{memberId:memberId, assessmentId:assessmentId, examMemberId:examMemberId}, null);
    }

    doAssessment(context:APIContext, assessmentId: number,examMemberId: number,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__do_assessment(this.id, assessmentId,examMemberId), 
            context.authService.LoginToken);
    }

    static __api__join_assessment(memberId: number, assessmentId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'join_assessment',{memberId:memberId, assessmentId:assessmentId}, null);
    }

    joinAssessment(context:APIContext, assessmentId: number,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__join_assessment(this.id, assessmentId), 
            context.authService.LoginToken);
    }


    static __api__populateClass(class_id: number,fields?:string[]): ListAPI {
        return new ListAPI(CourseClass.Model, [class_id],fields);
    }

    populateClass(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.class_id)
            return Observable.of(null);
        return CourseClass.get(context, this.class_id,fields).do(clazz => {
            this.clazz = clazz;
        });
    }

    static populateClasses(context: APIContext, members: CourseMember[],fields?:string[]): Observable<any> {
        members = _.filter(members, (member:CourseMember)=> {
            return member.clazz.IsNew;
        });
        var classIds = _.pluck(members,'class_id');
        classIds = _.filter(classIds, id=> {
            return id;
        });
        return CourseClass.array(context, classIds,fields).do(classList=> {
            _.each(members, (member:CourseMember)=> {
                member.clazz =  _.find(classList, (clazz:CourseClass)=> {
                    return member.class_id == clazz.id;
                });
            });
        });
    }

    static __api__populateConferenceMember(conference_member_id: number,fields?:string[]): ListAPI {
        return new ListAPI(ConferenceMember.Model, [conference_member_id],fields);
    }

    populateConferenceMember(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.conference_member_id)
            return Observable.of(null);
        return ConferenceMember.get(context, this.conference_member_id,fields).do(member => {
            this.conference_member = member;
        });
    }

    static populateConferenceMembers(context: APIContext, members: CourseMember[],fields?:string[]): Observable<any> {
        var memberIds = _.pluck(members,'conference_member_id');
        memberIds = _.filter(memberIds, id=> {
            return id;
        });
        return ConferenceMember.array(context, memberIds,fields).do(memberList=> {
            _.each(members, (member:CourseMember)=> {
                member.conference_member =  _.find(memberList, (confMember:ConferenceMember)=> {
                    return member.conference_member_id == confMember.id;
                });
            });
        });
    }

    static __api__populateUser(user_id: number,fields?:string[]): ListAPI {
        return new ListAPI(User.Model, [user_id],fields);
    }

    populateUser(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        return User.get(context, this.user_id,fields).do(user => {
            this.user = user;
        });
    }

    static __api__listProjectSubmissions(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model,fields, "[('member_id','=',"+memberId+")]");
    }

    listProjectSubmissions(context: APIContext,fields?:string[]): Observable<any[]> {
        return ProjectSubmission.search(context,fields,"[('member_id','=',"+this.id+")]");
    }

    static __api__listExamRecords(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listExamRecords(context: APIContext,fields?:string[]): Observable<any[]> {
        return ExamRecord.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

    static __api__listExamMembers(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listExamMembers(context: APIContext,fields?:string[]): Observable<any[]> {
        return ExamMember.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

    static __api__listSurveyMembers(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listSurveyMembers(context: APIContext,fields?:string[]): Observable<any[]> {
        return SurveyMember.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

}
