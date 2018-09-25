import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Exam } from './exam.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty,UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { User } from './user.model';


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
        this.group_name = undefined;
        this.course_member_id =  undefined;
        this.exam =  new Exam();
        this.submission_id = undefined;
        this.class_id =  undefined;
        this.exam_review_state =  undefined;
        this.score =  undefined;
        this.grade =  undefined;
        this.user =  new User();
        this.submit =  new Submission();
        this.sheet_id = undefined;
    }

    @UnserializeProperty()
    user: User;
    @UnserializeProperty()
    submit: Submission;
    submission_id: number;
    exam_id: number;
    course_member_id: number;
    exam_name: string;
    @UnserializeProperty()
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
    group_name: string;
    score: number;
    grade: string;
    sheet_id: number;

    static populateExams(context: APIContext, members: ExamMember[],fields?:string[]): Observable<any> {
        members = _.filter(members, (member:ExamMember)=> {
            return member.exam.IsNew;
        });
        var examIds = _.pluck(members,'exam_id');
        examIds = _.filter(examIds, id=> {
            return id;
        });
        return Exam.array(context, examIds,fields).do(exams=> {
            _.each(members, (member:ExamMember)=> {
                member.exam =  _.find(exams, (exam:Exam)=> {
                    return member.exam_id == exam.id;
                });
            });
        });
    }

    static __api__submit_score(memberId: number): ExecuteAPI {
        return new ExecuteAPI(ExamMember.Model, 'submit_exam',{memberId:memberId}, null);
    }

    submitScore(context:APIContext):Observable<any> {
        return context.apiService.execute(ExamMember.__api__submit_score(this.id), 
            context.authService.LoginToken);
    }

    static __api__redo_exam(memberId: number): ExecuteAPI {
        return new ExecuteAPI(ExamMember.Model, 'redo_exam',{memberId:memberId}, null);
    }

    redoExam(context:APIContext):Observable<any> {
        return context.apiService.execute(ExamMember.__api__redo_exam(this.id), 
            context.authService.LoginToken);
    }

    static __api__join_exam(memberId: number,fields?:string[]): ExecuteAPI {
        return new ExecuteAPI(ExamMember.Model, 'join_exam',{memberId:memberId}, null);
    }

    joinExam(context:APIContext,fields?:string[]):Observable<any> {
        return context.apiService.execute(ExamMember.__api__join_exam(this.id), 
            context.authService.LoginToken).do(()=> {
                this.enroll_status = 'in-progress';
            });
    }

    static __api__listSubmissions(memberId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Submission.Model,fields,"[('member_id','=',"+memberId+")]");
    }

    listSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Submission.search(context,fields,"[('member_id','=',"+this.id+")]");
    }
}
