import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CompetencyCache } from '../../services/cache.service';
import * as _ from 'underscore';

@Model('etraining.competency')
export class Competency extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.group_id = undefined;
		this.category = undefined;
        this.group_id__DESC__ = undefined;
        this.group_name =  undefined;
	}

    name:string;
    group_name:string;
    group_id: number;
    category: string;
    group_id__DESC__: string;

    static all( context:APIContext): Observable<any[]> {
        return CompetencyCache.all(context);
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return CompetencyCache.listByGroup(context, groupId);
    }

    static listByGroups(context:APIContext, groupIds):Observable<any> {
        var subscriptions = [];
        _.each(groupIds, (groupId)=> {
            subscriptions.push(Competency.listByGroup(context,groupId));
        });
        return Observable.zip(...subscriptions).map(questionArrs => {
            return _.flatten(questionArrs);
        });
    }

}
