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

@Model('etraining.exam_member')
export class ExamMember extends BaseModel{

    constructor(){
        super();
        
        this.exam_id = undefined;
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
        this.exam =  new Exam();
    }

    exam_id: number;
    exam: Exam;
    user_id: number;
    status: string;
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

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('exam_id','=','"+examId+"')]");
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
        return new SearchReadAPI(ExamMember.Model, [],"[('user_id','=','"+userId+"')]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__byExamAndUser(userId: number, examId:number): SearchReadAPI {
        return new SearchReadAPI(ExamMember.Model, [],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]");
    }

    static byExamAndUser( context:APIContext, userId: number, examId: number): Observable<any> {
        return ExamMember.search(context,[],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
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

    static populateExamForMembers(context: APIContext, members: ExamMember[]): Observable<any> {
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


}
