import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.question')
export class Question extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.title = undefined;
		this.content = undefined;
		this.explanation = undefined;
		this.type = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.option_ids = undefined;
	}

    title:string;
    content: string;
    explanation: string;
    type: string;
    level: number;
    group_id: number;
    option_ids: number[];

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return Question.search([], "[('group_id','=',"+groupId+")]",context);
    }

}
