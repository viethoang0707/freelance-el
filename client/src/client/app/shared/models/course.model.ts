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
	}

    name:string;
    group_id:number;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    logo: string;

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return Course.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByGroupAndMode(context:APIContext, groupId, mode):Observable<any> {
        return Course.search(context,[], "[('group_id','=',"+groupId+"),('mode','=','"+mode+"')]");
    }

}
