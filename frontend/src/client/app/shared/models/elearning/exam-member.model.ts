import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Exam } from './exam.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { ExecuteAPI } from '../../services/api/execute.api';

@Model('etraining.exam_member')
export class ExamMember extends BaseModel{

    constructor(){
        super();
        
        this.exam_id = undefined;
        this.exam_name = undefined;
        this.date_register = undefined;
        this.status = undefined;
        this.enroll_status = undefined;
        this.role = undefined;
        this.name = undefined;
        this.login = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.user_id = undefined;
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
        this.course_member_id =  undefined;
        this.exam =  new Exam();
        this.submission_id = undefined;
        this.class_id =  undefined;
        this.exam_review_state =  undefined;
        this.score =  undefined;
        this.grade =  undefined;
    }

    submission_id: number;
    exam_id: number;
    course_member_id: number;
    exam_name: string;
    exam: Exam;
    user_id: number;
    class_id: number;
    status: string;
    exam_review_state: string;
    enroll_status: string;
    role: string;
    login: string;
    name: string;
    @FieldProperty<Date>()
    date_register: Date;
    email: string;
    phone: string;
    group_id: number;
    group_id__DESC__: string;
    score: number;
    grade: string;

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('exam_id','=',"+examId+")]");
    }

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static __api__listCandidateByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('exam_id','=',"+examId+"),('role','=','candidate')]");
    }

    static listCandidateByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('exam_id','=',"+examId+"),('role','=','candidate')]");
    }

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__byExamAndUser(userId: number, examId:number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]");
    }

    static byExamAndUser( context:APIContext, userId: number, examId: number): Observable<any> {
        return ExamMember.single(context,[],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]")
    }

    __api__populateExam(): ListAPI {
        return new ListAPI(Exam.Model, [this.exam_id], []);
    }

    populateExam(context: APIContext): Observable<any> {
        if (!this.exam_id)
            return Observable.of(null);
        return Exam.get(context, this.exam_id).do(exam => {
            this.exam = exam;
        });
    }

    static populateExams(context: APIContext, members: ExamMember[]): Observable<any> {
        var examIds = _.pluck(members,'exam_id');
        examIds = _.filter(examIds, id=> {
            return id;
        });
        return Exam.array(context, examIds).do(exams=> {
            _.each(members, (member:ExamMember)=> {
                member.exam =  _.find(exams, (exam:Exam)=> {
                    return member.exam_id == exam.id;
                });
            });
        });
    }

    static __api__examEditor(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('role','=','editor'),('exam_id','='," + examId + ")]");
    }

    static examEditor(context: APIContext, examId: number): Observable<any> {
        return ExamMember.single(context, [], "[('role','=','editor'),('exam_id','='," + examId + ")]");
    }

    static __api__examSupervisor(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    }

    static examSupervisor(context: APIContext, examId: number): Observable<any> {
        return ExamMember.single(context, [], "[('role','=','supervisor'),('exam_id','='," + examId + ")]");
    }

    __api__submit_score(memberId: number): ExecuteAPI {
        return new ExecuteAPI(ExamMember.Model, 'submit_exam',{memberId:memberId}, null);
    }

    submitScore(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__submit_score(this.id), 
            context.authService.LoginToken);
    }


}
