
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.submission')
export class Submission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.picture = undefined;
        this.user_id = undefined;
        this.member_id = undefined;
        this.exam_id = undefined;
        this.end = undefined;
        this.start = undefined;
        this.score = undefined;
	}
    exam_id: number;
    user_id: number;
    member_id: number;
    picture: string;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;
    score: number;

    static byUserAndExam( context:APIContext, userId: number, examId: number): Observable<any> {
        return Submission.search(context,[],"[('user_id','=',"+userId+"),('examId','=',"+examId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static byMemberAndExam( context:APIContext, member_id: number, examId: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+member_id+"),('exam_id','=',"+examId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return Submission.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static listByExam( context:APIContext, examId: number): Observable<any> {
        return Submission.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return Submission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
