import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { Company } from './company.model';
import { Permission } from './permission.model';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { ListAPI } from '../../services/api/list.api';
import { Achivement } from './achievement.model';
import { CourseMember } from './course-member.model';
import { ExamMember } from './exam-member.model';
import { Certificate } from './course-certificate.model';
import { SurveyMember } from './survey-member.model';
import { ConferenceMember } from './conference-member.model';
import { ExamRecord } from './exam-record.model';
import { Submission } from './submission.model';
import { ProjectSubmission } from './project-submission.model';
import { Course } from './course.model';
import { CourseClass } from './course-class.model';
import { Exam } from './exam.model';
import { Survey } from './survey.model';
import { Ticket } from './ticket.model';
import {SERVER_DATETIME_FORMAT} from '../constants';
import * as moment from 'moment';
import * as _ from 'underscore';

@Model('res.users')
export class User extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.image = undefined;
        this.display_name = undefined;
        this.name = undefined;
        this.gender = undefined;
        this.dob = undefined;
        this.position = undefined;
        this.email = undefined;
        this.group_id = undefined;
        this.group_code = undefined;
        this.group_id__DESC__ = undefined;
        this.login = undefined;
        this.phone = undefined;
        this.is_admin = undefined;
        this.banned = undefined;
        this.social_id = undefined;
        this.company_id = undefined;
        this.permission_id = undefined;
        this.permission_id__DESC__ = undefined;
        this.supervisor_id = undefined;
        this.supervisor_id__DESC__ = undefined;
        this.achivement_ids = [];
        this.course_member_ids = [];
        this.exam_member_ids = [];
        this.certificate_ids = [];
        this.survey_member_ids = [];
        this.conference_member_ids = [];
        this.exam_record_ids = [];
        this.submission_ids = [];
        this.project_submission_ids = [];
        this.manage_course_ids = [];
        this.manage_class_ids = [];
        this.manage_exam_ids = [];
        this.manage_survey_ids = [];
        this.submit_ticket_ids = [];
        this.review_ticket_ids = [];
    }

    image: string;
    name: string;
    group_code: string;
    gender: boolean;
    @FieldProperty<Date>()
    dob: Date;
    position: string;
    email: string;
    group_id: number;
    group_id__DESC__: string;
    login: string;
    phone: string;
    is_admin: boolean;
    banned: boolean;
    display_name: string;
    company_id: number;
    permission_id: number;
    permission_id__DESC__: string;
    supervisor_id: number;
    supervisor_id__DESC__: string;
    social_id: string;

    achivement_ids: number[];
    course_member_ids: number[];
    exam_member_ids: number[];
    survey_member_ids: number[];
    conference_member_ids: number[];
    certificate_ids: number[];
    exam_record_ids: number[];
    submission_ids: number[];
    project_submission_ids: number[];
    manage_course_ids: number[];
    manage_class_ids: number[];
    manage_exam_ids: number[];
    manage_survey_ids: number[];
    submit_ticket_ids: number[];
    review_ticket_ids: number[];

    get IsAdmin() {
        return this.is_admin || this.login == 'admin';
    }

    get IsSuperAdmin() {
        return this.login == 'admin' || (this.is_admin && !this.supervisor_id);
    }

    getPermission(context: APIContext): Observable<any> {
        if (this.permission_id)
            return Permission.get(context, this.permission_id);
        else
            return Observable.of(new Permission());
    }

    static __api__listAllAdmin(userId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__all(): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('login','!=','admin')]");
    }

    static all(context:APIContext):Observable<any[]> {
        return User.search(context, [], "[('login','!=','admin')]");
    }


    static listAllAdmin(context: APIContext): Observable<any[]> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.IsAdmin;
                });
            });
        return User.search(context, [], "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__countAllAdmin(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static countAllAdmin(context: APIContext): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var admins = _.filter(users, (user: User) => {
                    return user.IsAdmin;
                });
                return admins.length;
            });
        return User.count(context, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__countActive(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('banned','=',False)]");
    }

    static countActive(context: APIContext): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var actives = _.filter(users, (user: User) => {
                    return !user.banned;
                });
                return actives.length;
            });
        return User.count(context, "[('banned','=',False)]");
    }

    static __api__countBanned(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('banned','=',True)]");
    }

    static countBanned(context: APIContext): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var banned = _.filter(users, (user: User) => {
                    return !user.banned;
                });
                return banned.length;
            });
        return User.count(context, "[('banned','=',True)]");
    }


    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('group_id','='," + groupId + ")]");
    }

    static listByGroup(context: APIContext, groupId: number): Observable<any[]> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.group_id == groupId;
                });
            });
        return User.search(context, [], "[('group_id','='," + groupId + ")]");

    }

    static __api__listByPermission(permissionId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('permission_id','='," + permissionId + ")]");
    }

    static listByPermission(context: APIContext, permissionId: number): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.permission_id == permissionId;
                });
            });
        return User.search(context, [], "[('permission_id','='," + permissionId + ")]");
    }

    static __api__countByPermission(permissionId: number): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('permission_id','='," + permissionId + ")]");
    }

    static countByPermission(context: APIContext, permissionId: number): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var records = _.filter(users, (user: User) => {
                    return user.permission_id == permissionId;
                });
                return records.length;
            });
        return User.count(context, "[('permission_id','='," + permissionId + ")]");
    }

    static __api__listAchivements(achivement_ids: number[]): ListAPI {
        return new ListAPI(Achivement.Model, achivement_ids,[]);
    }

    listAchivements( context:APIContext): Observable<any[]> {
        return Achivement.array(context,this.achivement_ids);
    }

    static __api__listCourseMembers(course_member_ids: number[]): ListAPI {
        return new ListAPI(CourseMember.Model, course_member_ids,[]);
    }

    listCourseMembers( context:APIContext): Observable<any[]> {
        return CourseMember.array(context,this.course_member_ids);
    }

    static __api__listCertificates(certificate_ids: number[]): ListAPI {
        return new ListAPI(Certificate.Model, certificate_ids,[]);
    }

    listCertificates( context:APIContext): Observable<any[]> {
        return Certificate.array(context,this.certificate_ids);
    }

    static __api__listExamMembers(exam_member_ids: number[]): ListAPI {
        return new ListAPI(ExamMember.Model, exam_member_ids,[]);
    }

    listExamMembers( context:APIContext): Observable<any[]> {
        return ExamMember.array(context,this.exam_member_ids);
    }

    static __api__listSurveyMembers(survey_member_ids: number[]): ListAPI {
        return new ListAPI(SurveyMember.Model, survey_member_ids,[]);
    }

    listSurveyMembers( context:APIContext): Observable<any[]> {
        return SurveyMember.array(context,this.survey_member_ids);
    }

    static __api__listConferenceMembers(conference_member_ids: number[]): ListAPI {
        return new ListAPI(ConferenceMember.Model, conference_member_ids,[]);
    }

    listConferenceMembers( context:APIContext): Observable<any[]> {
        return ConferenceMember.array(context,this.conference_member_ids);
    }

    static __api__listExamRecords(exam_record_ids: number[]): ListAPI {
        return new ListAPI(ExamRecord.Model, exam_record_ids,[]);
    }

    listExamRecords( context:APIContext): Observable<any[]> {
        return ExamRecord.array(context,this.exam_record_ids);
    }

    static __api__listSubmissions(submission_ids: number[]): ListAPI {
        return new ListAPI(Submission.Model, submission_ids,[]);
    }

    listSubmissions( context:APIContext): Observable<any[]> {
        return Submission.array(context,this.submission_ids);
    }

    static __api__listProjectSubmissions(project_submission_ids: number[]): ListAPI {
        return new ListAPI(ProjectSubmission.Model, project_submission_ids,[]);
    }

    listProjectSubmissions( context:APIContext): Observable<any[]> {
        return ProjectSubmission.array(context,this.project_submission_ids);
    }

    static __api__listManageCourses(manage_course_ids: number[]): ListAPI {
        return new ListAPI(Course.Model, manage_course_ids,[]);
    }

    listManageCourses( context:APIContext): Observable<any[]> {
        return Course.array(context,this.manage_course_ids);
    }

    static __api__listManageCourseClasses(manage_class_ids: number[]): ListAPI {
        return new ListAPI(CourseClass.Model, manage_class_ids,[]);
    }

    listManageCourseClasses( context:APIContext): Observable<any[]> {
        return CourseClass.array(context,this.manage_class_ids);
    }

    static __api__listManageExams(manage_exam_ids: number[]): ListAPI {
        return new ListAPI(Exam.Model, manage_exam_ids,[]);
    }

    listManageExams( context:APIContext): Observable<any[]> {
        return Exam.array(context,this.manage_exam_ids);
    }

    static __api__searchManageExamsByDate(userId, start:Date, end:Date): ListAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Exam.Model, [],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageExamsByDate( context:APIContext,start:Date, end:Date): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Exam.search(context,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }

    static __api__searchManageClassesByDate(userId: number,start:Date, end:Date): ListAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(CourseClass.Model, [],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageClassesByDate( context:APIContext,start:Date, end:Date): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return CourseClass.search(context,[],"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }


    static __api__listManageSurveys(manage_survey_ids: number[]): ListAPI {
        return new ListAPI(Survey.Model, manage_survey_ids,[]);
    }

    listManageSurveys( context:APIContext): Observable<any[]> {
        return Survey.array(context,this.manage_survey_ids);
    }

    static __api__listReviewTickets(review_ticket_ids: number[]): ListAPI {
        return new ListAPI(Ticket.Model, review_ticket_ids,[]);
    }

    listReviewTickets( context:APIContext): Observable<any[]> {
        return Ticket.array(context,this.review_ticket_ids);
    }

    static __api__listSubmitTickets(submit_ticket_ids: number[]): ListAPI {
        return new ListAPI(Ticket.Model, submit_ticket_ids,[]);
    }

    listSubmitTickets( context:APIContext): Observable<any[]> {
        return Ticket.array(context,this.submit_ticket_ids);
    }

    static __api__searchPendingReviewTickets(userId): ListAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('approve_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingReviewTickets( context:APIContext): Observable<any[]> {
        return Ticket.search(context,[], "[('approve_user_id','=',"+this.id+"),('status','=','pending')]");
    }

    static __api__searchPendingSubmitTickets(userId): ListAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('submit_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingSubmitTickets( context:APIContext): Observable<any[]> {
        return Ticket.search(context,[], "[('submit_user_id','=',"+this.id+"),('status','=','pending')]");
    }

}
