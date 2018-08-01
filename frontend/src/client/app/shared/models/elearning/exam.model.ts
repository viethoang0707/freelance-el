import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
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
        this.selector_id = undefined;
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
        this.answer_ids = [];
        this.clazz =  new CourseClass();
        this.member_ids = [];
        this.grade_ids = [];
        this.setting =  new ExamSetting();
        this.setting_id =  undefined;
        this.sheet =  new QuestionSheet();
        this.question_ids = [];
	}

    clazz: CourseClass;
    setting: ExamSetting;
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
    selector_id: number;
    status: string;
    duration: number;
    publish_score: boolean;
    supervisor_id: number;
    supervisor_name: string;
    answer_ids: number[];
    member_ids: number[];
    grade_ids: number[];
    question_ids: number[];

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


    static __api__allForEnrollPublic(): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static allForEnrollPublic(context:APIContext):Observable<any> {
        if (Cache.hit(Exam.Model))
            return Observable.of(Cache.load(Exam.Model)).map(exams=> {
                return _.filter(exams, (exam:Exam)=> {
                    return exam.review_state == 'approved'  && exam.is_public;
                });
            });
        return Exam.search(context,[],"[('review_state','=','approved'),('is_public','=',True)]");
    }

    static __api__enroll(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Exam.Model, 'enroll',{userIds:userIds, examId:examId}, null);
    }

    enroll(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Exam.__api__enroll(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__listPublicExam(): SearchReadAPI {
        return new SearchReadAPI(Exam.Model, [],"[('is_public','=',True)");
    }

    static listPublicExam(context:APIContext):Observable<any> {
        return Exam.search(context,[],"[('is_public','=',True)]");
    }

    static __api__open(examId: number): ExecuteAPI {
        return new ExecuteAPI(Exam.Model, 'open',{examId:examId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(Exam.__api__open(this.id), 
            context.authService.LoginToken);
    }

    static __api__close(examId: number): ExecuteAPI {
        return new ExecuteAPI(Exam.Model, 'close',{examId:examId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Exam.__api__close(this.id), 
            context.authService.LoginToken);
    }

    static __api__enroll_supervior(examId: number, userIds: number[]): SearchReadAPI {
        return new ExecuteAPI(Exam.Model, 'enroll_supervisor',{userIds:userIds, examId:examId}, null);
    }

    enrollSupervisor(context:APIContext, userIds: number[]):Observable<any> {
        return context.apiService.execute(Exam.__api__enroll_supervior(this.id, userIds), 
            context.authService.LoginToken);
    }

    static __api__listAnswers(answer_ids: number[]): ListAPI {
        return new ListAPI(Answer.Model, answer_ids,[]);
    }

    listAnswers( context:APIContext): Observable<any[]> {
        return Answer.array(context,this.answer_ids);
    }

    static __api__populateClass(course_class_id: number): ListAPI {
        return new ListAPI(CourseClass.Model, [course_class_id], []);
    }

    populateClass(context: APIContext): Observable<any> {
        if (!this.course_class_id)
            return Observable.of(null);
        return CourseClass.get(context, this.course_class_id).do(clazz => {
            this.clazz = clazz;
        });
    }

    static __api__populateSetting(setting_id: number): ListAPI {
        return new ListAPI(ExamSetting.Model, [setting_id], []);
    }

    populateSetting(context: APIContext): Observable<any> {
        if (!this.setting_id)
            return Observable.of(null);
        return ExamSetting.get(context, this.setting_id).do(setting => {
            this.setting = setting;
        });
    }

    static __api__populateQuestionSheet(sheet_id: number): ListAPI {
        return new ListAPI(QuestionSheet.Model, [sheet_id], []);
    }

    populateQuestionSheet(context: APIContext): Observable<any> {
        if (!this.sheet_id)
            return Observable.of(null);
        return QuestionSheet.get(context, this.sheet_id).do(sheet => {
            this.sheet = sheet;
        });
    }

    static __api__listMembers(member_ids: number[]): ListAPI {
        return new ListAPI(ExamMember.Model, member_ids,[]);
    }

    listMembers( context:APIContext): Observable<any[]> {
        return ExamMember.array(context,this.member_ids);
    }

    static __api__listGrades(grade_ids: number[]): ListAPI {
        return new ListAPI(ExamGrade.Model, grade_ids,[]);
    }

    listGrades( context:APIContext): Observable<any[]> {
        return ExamGrade.array(context,this.grade_ids);
    }

    static __api__listCandidates(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('exam_id','=',"+examId+"),('role','=','candidate')]");
    }

    listCandidates( context:APIContext): Observable<any[]> {
        return ExamMember.search(context,[],"[('exam_id','=',"+this.id+"),('role','=','candidate')]");
    }

    static __api__examEditor(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('role','=','editor'),('exam_id','='," + examId + ")]");
    }

    examEditor(context: APIContext): Observable<any> {
        return ExamMember.single(context, [], "[('role','=','editor'),('exam_id','='," + this.id + ")]");
    }


    
}
