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
import { Submission } from './submission.model';

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

    static __api__request_certificate(memberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'request_certificate',{memberId:memberId}, null);
    }

    requestCertificate(context:APIContext,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__request_certificate(this.id), 
            context.authService.LoginToken);
    }

    static __api__join_course(memberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'join_course',{memberId:memberId}, null);
    }

    joinCourse(context:APIContext,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__join_course(this.id), 
            context.authService.LoginToken);
    }

    static __api__do_assessment(memberId: number, assessmentId: number,examMemberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'do_assessment',{memberId:memberId, assessmentId:assessmentId, examMemberId:examMemberId}, null);
    }

    doAssessment(context:APIContext, assessmentId: number,examMemberId: number,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__do_assessment(this.id, assessmentId,examMemberId), 
            context.authService.LoginToken);
    }

    static __api__get_assessment_info(memberId: number, assessmentId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'get_assessment_info',{memberId:memberId, assessmentId:assessmentId}, null);
    }

    getAssessmentInfo(context:APIContext, assessmentId: number,fields?:string[]):Observable<any> {
        return context.apiService.execute(CourseMember.__api__get_assessment_info(this.id, assessmentId), 
            context.authService.LoginToken);
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

    static __api__listProjectSubmissions(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model,fields, "[('member_id','=',"+memberId+")]");
    }

    listProjectSubmissions(context: APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ProjectSubmission.search(context,fields,"[('member_id','=',"+this.id+")]");
    }

    static __api__listExamRecords(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listExamRecords(context: APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamRecord.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

    static __api__listExamMembers(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listExamMembers(context: APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamMember.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

    static __api__listSurveyMembers(memberId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model,fields,"[('course_member_id','=',"+memberId+")]");
    }

    listSurveyMembers(context: APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyMember.search(context,fields,"[('course_member_id','=',"+this.id+")]");
    }

    static __api__listExamSubmissions(examId: number,userId: number, fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Submission.Model,fields,"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]");
    }

    listExamSubmissions( context:APIContext,examId: number,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Submission.search(context,fields,"[('user_id','=',"+this.user_id+"),('exam_id','=',"+examId+")]");
    }

}
