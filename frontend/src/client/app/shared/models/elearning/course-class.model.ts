import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Conference } from './conference.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { ExecuteAPI } from '../../services/api/execute.api';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { Certificate } from './course-certificate.model';
import { CourseMember } from './course-member.model';
import { Project } from './project.model';
import { Exam } from './exam.model';
import { Survey } from './survey.model';

@Model('etraining.course_class')
export class CourseClass extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.course_name = undefined;
		this.course_id = undefined;
        this.supervisor_id = undefined;
        this.supervisor_name = undefined;
        this.start = undefined;
        this.conference_id =  undefined;
        this.end = undefined;
        this.status = undefined;
        this.certificate_ids = [];
        this.member_ids = [];
        this.project_ids = [];
        this.exam_ids = [];
        this.survey_ids = [];
        this.member_count = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
    conference_id: number;
    supervisor_id: number;
    status: string;
    certificate_ids: number[];
    member_ids: number[];
    project_ids: number[];
    exam_ids: number[];
    survey_ids: number[];
    member_count: number;
    
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    get IsAvailable():boolean {
        if (this.status !='open')
            return false;
        if (!this.end)
            return false;
        var now = new Date();
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__enroll(classId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'enroll',{classId:classId,userIds:userIds}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(CourseClass.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);

    }

    static __api__enroll_staff(classId: number, userIds: number[]): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'enroll_staff',{classId:classId,userIds:userIds}, null);
    }

    enrollStaff(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(CourseClass.__api__enroll_staff(this.id, userIds), 
            context.authService.LoginToken);

    }

    static __api__open(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'open',{classId:classId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(CourseClass.__api__open(this.id), 
            context.authService.LoginToken);
    }

    static __api__close(classId: number): ExecuteAPI {
        return new ExecuteAPI(CourseClass.Model, 'close',{classId:classId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(CourseClass.__api__close(this.id), 
            context.authService.LoginToken);
    }

    static __api__listCertificates(certificate_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Certificate.Model, certificate_ids,fields);
    }

    listCertificates( context:APIContext,fields?:string[]): Observable<any[]> {
        return Certificate.array(context,this.certificate_ids,fields);
    }

    static __api__listMembers(member_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(CourseMember.Model, member_ids,fields);
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return CourseMember.array(context,this.member_ids,fields);
    }

    static __api__listProjects(project_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Project.Model, project_ids,fields);
    }

    listProjects( context:APIContext,fields?:string[]): Observable<any[]> {
        return Project.array(context,this.project_ids,fields);
    }

    static __api__listExams(exam_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Exam.Model, exam_ids,fields);
    }

    listExams( context:APIContext,fields?:string[]): Observable<any[]> {
        return Exam.array(context,this.exam_ids,fields);
    }


    static __api__listSurveys(survey_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Survey.Model, survey_ids,fields);
    }

    listSurveys( context:APIContext,fields?:string[]): Observable<any[]> {
        return Survey.array(context,this.survey_ids,fields);
    }


}
