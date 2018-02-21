import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

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
	}

    name:string;
    syllabus_id:number;
    group_id:number;
    group_id__DESC__: string;
    author_name:string;
    author_id:number;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;

    static listByAuthor(context:APIContext, authorId):Observable<any> {
        return Course.search(context,[], "[('author_id','=',"+authorId+")]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return Course.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByGroupAndMode(context:APIContext, groupId, mode):Observable<any> {
        return Course.search(context,[], "[('group_id','=',"+groupId+"),('mode','=','"+mode+"')]");
    }

}
