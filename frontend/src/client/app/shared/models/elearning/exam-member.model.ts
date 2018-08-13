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
        this.submission_ids = [];
    }

    @UnserializeProperty()
    user: User;
    @UnserializeProperty()
    submit: Submission;
    submission_id: number;
    @ReadOnlyProperty()
    submission_ids: number[];
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

    static __api__populateExam(exam_id: number,fields?:string[]): ListAPI {
        return new ListAPI(Exam.Model, [exam_id], fields);
    }

    populateExam(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.exam_id)
            return Observable.of(null);
        if (!this.exam.IsNew)
            return Observable.of(this);
        return Exam.get(context, this.exam_id,fields).do(exam => {
            this.exam = exam;
        });
    }

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

    static __api__populateUser(user_id: number,fields?:string[]): ListAPI {
        return new ListAPI(User.Model, [user_id], fields);
    }

    populateUser(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        if (!this.user.IsNew)
            return Observable.of(this);
        return User.get(context, this.user_id,fields).do(user => {
            this.user = user;
        });
    }

    static __api__populateSubmission(submission_id: number,fields?:string[]): ListAPI {
        return new ListAPI(Submission.Model, [submission_id], fields);
    }

    populateSubmission(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.user_id)
            return Observable.of(null);
        if (!this.submit.IsNew)
            return Observable.of(this);
        return Submission.get(context, this.submission_id,fields).do(submit => {
            this.submit = submit;
        });
    }

    static __api__listSubmissions(submission_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Submission.Model, submission_ids,fields);
    }

    listSubmissions( context:APIContext,fields?:string[]): Observable<any[]> {
        return Submission.array(context,this.submission_ids,fields);
    }
}
