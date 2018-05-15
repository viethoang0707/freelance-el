
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { ExamGrade } from './exam-grade.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

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
    }

    exam_id: number;
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

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static listCandidateByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('exam_id','=',"+examId+"),('role','=','candidate')]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ExamMember.search(context,[],"[('user_id','=',"+userId+")]");
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

    examScore(context:APIContext, examId:number):Observable<any> {
        return Submission.byMember(context, this.id).flatMap(submit => {
            if (!submit)
                return Observable.of(0);
            else
                return Answer.listBySubmit(context, submit.id).map(answers => {
                    return _.reduce(answers,  (sum, ans)=> {
                        return sum + (+ans.score);
                    },0); 
                });
        });
    }

    examGrade(grades:ExamGrade[], score:number) {
        return _.find(grades, (obj)=> {
            return obj.min_score <= score && obj.max_score >= score;
        });
    }

}
