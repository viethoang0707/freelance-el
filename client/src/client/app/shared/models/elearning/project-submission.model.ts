
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.project_submission')
export class ProjectSubmission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.filename = undefined;
        this.file_url =  undefined;
        this.user_id = undefined;
        this.member_id = undefined;
        this.class_id = undefined;
        this.course_id = undefined;
        this.project_id =  undefined;
        this.end = undefined;
        this.start = undefined;
        this.score = undefined;
        this.date_submit =  undefined;
	}
   

    filename: string;
    file_url: string;
    class_id: number;
    course_id: number;
    user_id: number;
    member_id: number;
    project_id: number;
    @FieldProperty<Date>()
    date_submit: Date;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;
    score: number;

    static byUserAndProject( context:APIContext, userId: number, projectId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('user_id','=',"+userId+"),('project_id','=',"+projectId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static byMemberAndExam( context:APIContext, member_id: number, projectId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('member_id','=',"+member_id+"),('project_id','=',"+projectId+")]").map(submits =>{
            if (submits.length)
                return submits[0];
            else
                return null;
        });
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static listByProject( context:APIContext, projectId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('project_id','=',"+projectId+")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
