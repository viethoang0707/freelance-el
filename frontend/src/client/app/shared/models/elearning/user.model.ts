import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { Company } from './company.model';
import { Permission } from './permission.model';
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
import { CourseLog } from './log.model';
import { Ticket } from './ticket.model';
import { ExecuteAPI } from '../../services/api/execute.api';
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
        this.group_name = undefined;
        this.login = undefined;
        this.phone = undefined;
        this.is_admin = undefined;
        this.banned = undefined;
        this.ban_date =  undefined;
        this.social_id = undefined;
        this.company_id = undefined;
        this.permission_id = undefined;
        this.permission_name = undefined;
        this.supervisor_id = undefined;
        this.supervisor_name = undefined;
        this.permission_name = undefined;
        this.permission_group_id = undefined;
        this.unban_date =  undefined;
    }

    permission_group_id: number;
    image: string;
    name: string;
    group_code: string;
    gender: string;
    @FieldProperty<Date>()
    dob: Date;
    @FieldProperty<Date>()
    ban_date: Date;
    @FieldProperty<Date>()
    unban_date: Date;
    position: string;
    email: string;
    group_id: number;
    group_name: string;
    login: string;
    phone: string;
    is_admin: boolean;
    banned: boolean;
    display_name: string;
    company_id: number;
    permission_id: number;
    permission_id__name: string;
    supervisor_id: number;
    supervisor_name: string;
    social_id: string;
    permission_name: string;

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

    static __api__listAllAdmin(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(User.Model, fields, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__all(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(User.Model, fields, "[('login','!=','admin')]");
    }

    static all(context:APIContext,fields?:string[]):Observable<any[]> {
        return User.search(context, fields, "[('login','!=','admin')]");
    }


    static listAllAdmin(context: APIContext,fields?:string[]): Observable<any[]> {
        return User.search(context, fields, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__countAllAdmin(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static countAllAdmin(context: APIContext): Observable<any> {
        return User.count(context, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__countActive(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('banned','=',False)]");
    }

    static countActive(context: APIContext): Observable<any> {
        return User.count(context, "[('banned','=',False)]");
    }

    static __api__countBanned(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('banned','=',True)]");
    }

    static countBanned(context: APIContext): Observable<any> {
        return User.count(context, "[('banned','=',True)]");
    }


    static __api__listAchivements(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listAchivements( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Achivement.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listCourseMembers(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseMember.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listCourseMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseMember.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listCertificates(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Certificate.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listCertificates( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Certificate.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listExamMembers(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listExamMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamMember.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listSurveyMembers(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyMember.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listSurveyMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyMember.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listConferenceMembers(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listConferenceMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ConferenceMember.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listExamRecords(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamRecord.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listExamRecords( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamRecord.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listSubmissions(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Submission.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Submission.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listProjectSubmissions(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model,fields,"[('user_id','=',"+userId+")]");
    }

    listProjectSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ProjectSubmission.search(context,fields,"[('user_id','=',"+this.id+")]");
    }

    static __api__listManageCourses(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Course.Model,fields,"[('supervisor_id','=',"+userId+")]");
    }

    listManageCourses( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Course.search(context,fields,"[('supervisor_id','=',"+this.id+")]");
    }

    static __api__listManageCourseClasses(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(CourseClass.Model,fields,"[('supervisor_id','=',"+userId+")]");
    }

    listManageCourseClasses( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return CourseClass.search(context,fields,"[('supervisor_id','=',"+this.id+")]");
    }

    static __api__listManageExams(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Exam.Model,fields,"[('supervisor_id','=',"+userId+")]");
    }

    listManageExams( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Exam.search(context,fields,"[('supervisor_id','=',"+this.id+")]");
    }

    static __api__listManageSurveys(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Survey.Model,fields,"[('supervisor_id','=',"+userId+")]");
    }

    listManageSurveys( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Survey.search(context,fields,"[('supervisor_id','=',"+this.id+")]");
    }

    static __api__listReviewTickets(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model,fields,"[('approve_user_id','=',"+userId+")]");
    }

    listReviewTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Ticket.search(context,fields,"[('approve_user_id','=',"+this.id+")]");
    }

    static __api__listSubmitTickets(userId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model,fields,"[('submit_user_id','=',"+userId+")]");
    }

    listSubmitTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Ticket.search(context,fields,"[('submit_user_id','=',"+this.id+")]");
    }


    static __api__searchManageExamsByDate(userId, start:Date, end:Date,fields?:string[]): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Exam.Model, fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageExamsByDate( context:APIContext,start:Date, end:Date,fields?:string[]): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Exam.search(context,fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }

    static __api__searchManageClassesByDate(userId: number,start:Date, end:Date,fields?:string[]): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(CourseClass.Model, fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageClassesByDate( context:APIContext,start:Date, end:Date,fields?:string[]): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return CourseClass.search(context,fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }

    static __api__searchPendingReviewTickets(userId,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, fields,"[('approve_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingReviewTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.search(context,fields, "[('approve_user_id','=',"+this.id+"),('status','=','pending')]");
    }

    static __api__searchPendingSubmitTickets(userId,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, fields,"[('submit_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingSubmitTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.search(context,fields, "[('submit_user_id','=',"+this.id+"),('status','=','pending')]");
    }

    lastCourseUnitAttempt(context: APIContext):Observable<any> {
        return CourseLog.search(context,[],"[('user_id','=',"+this.id+ ")]",1,null,'id desc').map(logs=> {
            if (logs.length)
                return logs[0];
            else
                return null;
        });
    }

    static __api__register(user: User): ExecuteAPI {
        return new ExecuteAPI(User.Model, 'register',{user:user}, null);
    }

    static register(context:APIContext, user:User):Observable<any> {
        return context.apiService.execute(User.__api__register(user), 
            context.authService.LoginToken);
    }

    static __api__changePassword(userId: number, old_pass: string, new_pass:string): ExecuteAPI {
        return new ExecuteAPI(User.Model, 'change_password',{userId: userId,old_pass:old_pass,new_pass:new_pass}, null);
    }

    changePassword(context:APIContext, old_pass: string, new_pass:string):Observable<any> {
        return context.apiService.execute(User.__api__changePassword(this.id, old_pass, new_pass), 
            context.authService.LoginToken);
    }


}
