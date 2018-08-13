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
    @ReadOnlyProperty()
    achivement_ids: number[];
    @ReadOnlyProperty()
    course_member_ids: number[];
    @ReadOnlyProperty()
    exam_member_ids: number[];
    @ReadOnlyProperty()
    survey_member_ids: number[];
    @ReadOnlyProperty()
    conference_member_ids: number[];
    @ReadOnlyProperty()
    certificate_ids: number[];
    @ReadOnlyProperty()
    exam_record_ids: number[];
    @ReadOnlyProperty()
    submission_ids: number[];
    @ReadOnlyProperty()
    project_submission_ids: number[];
    @ReadOnlyProperty()
    manage_course_ids: number[];
    @ReadOnlyProperty()
    manage_class_ids: number[];
    @ReadOnlyProperty()
    manage_exam_ids: number[];
    @ReadOnlyProperty()
    manage_survey_ids: number[];
    @ReadOnlyProperty()
    submit_ticket_ids: number[];
    @ReadOnlyProperty()
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


    static __api__listAchivements(achivement_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Achivement.Model, achivement_ids,fields);
    }

    listAchivements( context:APIContext,fields?:string[]): Observable<any[]> {
        return Achivement.array(context,this.achivement_ids,fields);
    }

    static __api__listCourseMembers(course_member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseMember.Model, course_member_ids,fields);
    }

    listCourseMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseMember.array(context,this.course_member_ids,fields);
    }

    static __api__listCertificates(certificate_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Certificate.Model, certificate_ids,fields);
    }

    listCertificates( context:APIContext,fields?:string[]): Observable<any[]> {
        return Certificate.array(context,this.certificate_ids,fields);
    }

    static __api__listExamMembers(exam_member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(ExamMember.Model, exam_member_ids,fields);
    }

    listExamMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return ExamMember.array(context,this.exam_member_ids,fields);
    }

    static __api__listSurveyMembers(survey_member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(SurveyMember.Model, survey_member_ids,fields);
    }

    listSurveyMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return SurveyMember.array(context,this.survey_member_ids,fields);
    }

    static __api__listConferenceMembers(conference_member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(ConferenceMember.Model, conference_member_ids,fields);
    }

    listConferenceMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return ConferenceMember.array(context,this.conference_member_ids,fields);
    }

    static __api__listExamRecords(exam_record_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(ExamRecord.Model, exam_record_ids,fields);
    }

    listExamRecords( context:APIContext,fields?:string[]): Observable<any[]> {
        return ExamRecord.array(context,this.exam_record_ids,fields);
    }

    static __api__listSubmissions(submission_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Submission.Model, submission_ids,fields);
    }

    listSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        return Submission.array(context,this.submission_ids,fields);
    }

    static __api__listProjectSubmissions(project_submission_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(ProjectSubmission.Model, project_submission_ids,fields);
    }

    listProjectSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        return ProjectSubmission.array(context,this.project_submission_ids,fields);
    }

    static __api__listManageCourses(manage_course_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Course.Model, manage_course_ids,fields);
    }

    listManageCourses( context:APIContext,fields?:string[]): Observable<any[]> {
        return Course.array(context,this.manage_course_ids,fields);
    }

    static __api__listManageCourseClasses(manage_class_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseClass.Model, manage_class_ids,fields);
    }

    listManageCourseClasses( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseClass.array(context,this.manage_class_ids,fields);
    }

    static __api__listManageExams(manage_exam_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Exam.Model, manage_exam_ids,fields);
    }

    listManageExams( context:APIContext,fields?:string[]): Observable<any[]> {
        return Exam.array(context,this.manage_exam_ids,fields);
    }

    static __api__searchManageExamsByDate(userId, start:Date, end:Date,fields?:string[]): ListAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Exam.Model, fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageExamsByDate( context:APIContext,start:Date, end:Date,fields?:string[]): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Exam.search(context,fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }

    static __api__searchManageClassesByDate(userId: number,start:Date, end:Date,fields?:string[]): ListAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(CourseClass.Model, fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+userId+")]");
    }

    searchManageClassesByDate( context:APIContext,start:Date, end:Date,fields?:string[]): Observable<any[]> {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return CourseClass.search(context,fields,"[('start','>=','"+startDateStr+"'),('start','<=','"+endDateStr+"'),('supervisor_id','=',"+this.id+")]");
    }


    static __api__listManageSurveys(manage_survey_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Survey.Model, manage_survey_ids,fields);
    }

    listManageSurveys( context:APIContext,fields?:string[]): Observable<any[]> {
        return Survey.array(context,this.manage_survey_ids,fields);
    }

    static __api__listReviewTickets(review_ticket_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Ticket.Model, review_ticket_ids,fields);
    }

    listReviewTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.array(context,this.review_ticket_ids,fields);
    }

    static __api__listSubmitTickets(submit_ticket_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Ticket.Model, submit_ticket_ids,fields);
    }

    listSubmitTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.array(context,this.submit_ticket_ids,fields);
    }

    static __api__searchPendingReviewTickets(userId,fields?:string[]): ListAPI {
        return new SearchReadAPI(Ticket.Model, fields,"[('approve_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingReviewTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.search(context,fields, "[('approve_user_id','=',"+this.id+"),('status','=','pending')]");
    }

    static __api__searchPendingSubmitTickets(userId,fields?:string[]): ListAPI {
        return new SearchReadAPI(Ticket.Model, fields,"[('submit_user_id','=',"+userId+"),('status','=','pending')]");
    }

    searchPendingSubmitTickets( context:APIContext,fields?:string[]): Observable<any[]> {
        return Ticket.search(context,fields, "[('submit_user_id','=',"+this.id+"),('status','=','pending')]");
    }

    lastCourseUnitAttempt(context: APIContext):Observable<any> {
        return CourseLog.search(context,[],"[('user_id','=',"+this.id+ ")]",1,null,'id desc');
    }

}
