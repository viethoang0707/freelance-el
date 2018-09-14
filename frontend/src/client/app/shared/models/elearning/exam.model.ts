import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty ,UnserializeProperty, ReadOnlyProperty} from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import * as _ from 'underscore';
import { Submission } from './submission.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { ExecuteAPI } from '../../services/api/execute.api';
import { ListAPI } from '../../services/api/list.api';
import { Project } from './project.model';
import { Answer } from './answer.model';
import { CourseClass } from './course-class.model';
import { ExamMember } from './exam-member.model';
import { ExamGrade } from './exam-grade.model';
import { ExamSetting } from './exam-setting.model';
import { QuestionSheet } from './question-sheet.model';

@Model('etraining.exam')
export class Exam extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.status = undefined;
        this.duration = undefined;
        this.publish_score = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id =  undefined;
        this.competency_group_name =  undefined;
        this.competency_level_id =  undefined;
        this.competency_level_name =  undefined;
        this.is_public =  undefined;
        this.review_state = undefined;
        this.course_class_id = undefined;
        this.sheet_id =  undefined;
        this.question_count = undefined;
        this.sheet_status = undefined;
        this.clazz =  new CourseClass();
        this.setting =  new ExamSetting();
        this.setting_id =  undefined;
        this.sheet =  new QuestionSheet();

	}

    @UnserializeProperty()
    clazz: CourseClass;
    @UnserializeProperty()
    setting: ExamSetting;
    @UnserializeProperty()
    sheet: QuestionSheet;
    setting_id: number;
    sheet_id: number;
    question_count: number;
    sheet_status: string;
    review_state:string;
    course_class_id:number;
    competency_id: number;
    competency_name: string;
    competency_group_id: number;
    competency_group_name: string;
    competency_level_id: number;
    competency_level_name: string;
    name:string;
    is_public:boolean;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    status: string;
    duration: number;
    publish_score: boolean;
    supervisor_id: number;
    supervisor_name: string;

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        if (!this.end)
            return false;
        var now = new Date();
        if (this.start.getTime() > now.getTime())
            return false;
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }


    static __api__allForEnrollPublic(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, fields,"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static allForEnrollPublic(context:APIContext,fields?:string[]):Observable<any> {
        return Exam.search(context,fields,"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static __api__enroll(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Exam.Model, 'enroll',{userIds:userIds, examId:examId}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Exam.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__listPublicExam(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, fields,"[('is_public','=',True)");
    }

    static listPublicExam(context:APIContext,fields?:string[]):Observable<any> {
        return Exam.search(context,fields,"[('is_public','=',True)]");
    }

    static __api__open(examId: number): ExecuteAPI {
        return new ExecuteAPI(Exam.Model, 'open',{examId:examId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(Exam.__api__open(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = "open";
            });
    }

    static __api__close(examId: number): ExecuteAPI {
        return new ExecuteAPI(Exam.Model, 'close',{examId:examId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Exam.__api__close(this.id), 
            context.authService.LoginToken).do(()=> {
                this.status = "closed";
            });
    }

    static __api__enroll_supervior(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Exam.Model, 'enroll_supervisor',{userIds:userIds, examId:examId}, null);
    }

    enrollSupervisor(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Exam.__api__enroll_supervior(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__examEditor(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, fields,"[('role','=','editor'),('exam_id','='," + examId + ")]");
    }

    examEditor(context: APIContext,fields?:string[]): Observable<any> {
        return ExamMember.single(context, fields, "[('role','=','editor'),('exam_id','='," + this.id + ")]");
    }

    static __api__listMembers(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model,fields, "[('exam_id','=',"+examId+")]");
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamMember.search(context,fields,"[('exam_id','=',"+this.id+")]");
    }

    static __api__listGrades(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamGrade.Model,fields, "[('exam_id','=',"+examId+")]");
    }

    static __api__listAnswers(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Answer.Model,fields,"[('exam_id','=',"+examId+")]");
    }

    listAnswers( context:APIContext,fields?:string[]): Observable<any[]> {
        return Answer.search(context,fields,"[('exam_id','=',"+this.id+")]");
    }

    listGrades( context:APIContext,fields?:string[]): Observable<any[]> {
        return ExamGrade.search(context,fields,"[('exam_id','=',"+this.id+")]");
    }

    static __api__listCandidates(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, fields,"[('exam_id','=',"+examId+"),('role','=','candidate')]");
    }

    listCandidates( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamMember.search(context,fields,"[('exam_id','=',"+this.id+"),('role','=','candidate')]");
    }

    static __api__listSubmissions(examId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Submission.Model, fields,"[('exam_id','=',"+examId+")]");
    }

    listSubmissions(context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Submission.search(context,fields,"[('exam_id','=',"+this.id+")]");
    }


    
}
