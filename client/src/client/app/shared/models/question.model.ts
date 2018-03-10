import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';
import * as _ from 'underscore';

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
	}

    title:string;
    content: string;
    explanation: string;
    type: string;
    level: number;
    group_id: number;

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return Question.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByGroups(context:APIContext, groupIds):Observable<any> {
        var subscriptions = [];
        _.each(groupIds, (groupId)=> {
            subscriptions.push(Question.listByGroup(context,groupId));
        });
        return Observable.zip(...subscriptions).map(questionArrs => {
            return _.flatten(questionArrs);
        });
    }

}
