import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exam_member')
export class ExamMember extends BaseModel{

    constructor(){
        super();
        
        this.exam_id = undefined;
        this.date_register = undefined;
        this.status = undefined;
        this.role = undefined;
        this.name = undefined;
        this.login = undefined;
        this.email = undefined;
        this.phone = undefined;
        this.user_id = undefined;
        this.etraining_group_id = undefined;
        this.etraining_group_id__DESC__ = undefined;
    }

    exam_id: number;
    user_id: number;
    status: string;
    role: string;
    login: string;
    name: string;
    date_register: Date;
    email: string;
    phone: string;
    etraining_group_id: number;
    etraining_group_id__DESC__: string;

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamMember.search([],"[('exam_id','=',"+examId+")]",context);
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return ExamMember.search([],"[('user_id','=',"+userId+")]",context);
    }

    static byExamAndUser( context:APIContext, userId: number, examId: number): Observable<any> {
        return ExamMember.search([],"[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]",context)
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

}
