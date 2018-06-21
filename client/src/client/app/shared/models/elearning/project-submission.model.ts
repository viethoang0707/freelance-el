import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';

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

    static __api__byMemberAndProject(member_id: number, projectId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model, [],"[('member_id','=',"+member_id+"),('project_id','=',"+projectId+")]");
    }

    static byMemberAndProject( context:APIContext, member_id: number, projectId: number): Observable<any> {
        return ProjectSubmission.single(context,[],"[('member_id','=',"+member_id+"),('project_id','=',"+projectId+")]");
    }

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__listByProject(projectId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model, [],"[('project_id','=',"+projectId+")]");
    }

    static listByProject( context:APIContext, projectId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('project_id','=',"+projectId+")]");
    }

    static __api__listByMember(memberId: number): SearchReadAPI {
        return new SearchReadAPI(ProjectSubmission.Model, [],"[('member_id','=',"+memberId+")]");
    }

    static listByMember( context:APIContext, memberId: number): Observable<any> {
        return ProjectSubmission.search(context,[],"[('member_id','=',"+memberId+")]");
    }
}
