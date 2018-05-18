import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CourseCache } from '../../services/cache.service';

@Model('etraining.course')
export class Course extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.description = undefined;
		this.code = undefined;
        this.status = undefined;
        this.mode = undefined;
        this.logo = undefined;
        this.group_id = undefined;
        this.author_id = undefined;
        this.author_name = undefined;
        this.syllabus_id = undefined;
        this.group_id__DESC__ = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
	}

    name:string;
    syllabus_id:number;
    group_id:number;
    supervisor_id: number;
    supervisor_name: string;
    group_id__DESC__: string;
    author_name:string;
    author_id:number;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;
    
    static all( context:APIContext): Observable<any[]> {
        return CourseCache.all(context);
    }

    static listByAuthor(context:APIContext, authorId):Observable<any> {
        return CourseCache.listByAuthor(context, authorId);
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return CourseCache.listByGroup(context,groupId);
    }

    static listByGroupAndMode(context:APIContext, groupId, mode):Observable<any> {
        return CourseCache.listByGroupAndMode(context,groupId, mode);
    }

}
