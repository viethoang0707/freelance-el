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
        this.group_id__DESC__ = undefined;
        this.course = new Course();
        this.clazz =  new CourseClass();
        this.certificate =  new Certificate();
        this.certificate_id = undefined;
        this.conference_member_id = undefined;
        this.conference_member =  new ConferenceMember();
        this.course_review_state =  undefined;
        this.user = new User();
        this.exam_record_ids = [];
        this.project_submission_ids = [];
        this.exam_member_ids = [];
        this.survey_member_ids = [];
    }

    user: User;
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
    project_submission_ids: number[];
    exam_record_ids: number[];
    group_id__DESC__: string;
    exam_member_ids:number[];
    survey_member_ids:number[];

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

    static __api__populateCertificate(certificate_id: number): ListAPI {
        return new ListAPI(Certificate.Model, [certificate_id], []);
    }

    populateCertificate(context: APIContext): Observable<any> {
        if (!this.certificate_id)
            return Observable.of(null);
        return Certificate.get(context, this.certificate_id).do(certificate => {
            this.certificate = certificate;
        });
    }

    static __api__populateCourse(course_id: number): ListAPI {
        return new ListAPI(Course.Model, [course_id], []);
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

    static __api__complete_course(memberId: number, certificateId: number): ExecuteAPI {
        return new ExecuteAPI(CourseMember.Model, 'complete_course',{memberId:memberId, certificateId:certificateId}, null);
    }

    completeCourse(context:APIContext, certificateId: number):Observable<any> {
        return context.apiService.execute(CourseMember.__api__complete_course(this.id, certificateId), 
            context.authService.LoginToken);
    }


    static __api__populateClass(class_id: number): ListAPI {
        return new ListAPI(CourseClass.Model, [class_id], []);
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

    static __api__populateConferenceMember(conference_member_id: number): ListAPI {
        return new ListAPI(ConferenceMember.Model, [conference_member_id], []);
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

    static __api__populateUser(user_id: number): ListAPI {
        return new ListAPI(User.Model, [user_id], []);
    }

    populateUser(context: APIContext): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        return User.get(context, this.user_id).do(user => {
            this.user = user;
        });
    }

    static __api__listProjectSubmissions(project_submission_ids: number[]): SearchReadAPI {
        return new ListAPI(ProjectSubmission.Model, project_submission_ids, []);
    }

    listProjectSubmissions(context: APIContext): Observable<any[]> {
        return ProjectSubmission.array(context, this.project_submission_ids);
    }

    static __api__listExamRecords(exam_record_ids: number[]): SearchReadAPI {
        return new ListAPI(ExamRecord.Model, exam_record_ids, []);
    }

    listExamRecords(context: APIContext): Observable<any[]> {
        return ExamRecord.array(context, this.exam_record_ids);
    }

    static __api__listExamMembers(exam_member_ids: number[]): SearchReadAPI {
        return new ListAPI(ExamMember.Model, exam_member_ids, []);
    }

    listExamMembers(context: APIContext): Observable<any[]> {
        return ExamMember.array(context, this.exam_member_ids);
    }

    static __api__listSurveyMembers(survey_member_ids: number[]): SearchReadAPI {
        return new ListAPI(SurveyMember.Model, survey_member_ids, []);
    }

    listSurveyMembers(context: APIContext): Observable<any[]> {
        return SurveyMember.array(context, this.survey_member_ids);
    }

}
