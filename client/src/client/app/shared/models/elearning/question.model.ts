import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { QuestionOption } from './option.model';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

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
    level: string;
    group_id: number;

    createWithOption(context: APIContext, options:QuestionOption[]):Observable<any> {
        return this.save(context).flatMap(()=> {
            var subscriptions = _.map(options,(opt)=> {
                opt.question_id = this.id;
                return opt.save(context);
            });
            return Observable.forkJoin(subscriptions);
        });
    }

    static all( context:APIContext): Observable<any[]> {
        return QuestionCache.all(context);
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return QuestionCache.listByGroup(context, groupId);
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
