import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

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

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Competency.Model, [],"[('group_id','=',"+groupId+")]");
    }

    static listByGroup(context:APIContext, groupId:number):Observable<any> {
        return Competency.listByGroup(context, groupId);
    }

    static __api__listByGroups(groupIds: number[]): SearchReadAPI[] {
        var apiList = [];
        _.each(groupIds, (groupId)=> {
            apiList.push(Competency.__api__listByGroup(groupId));
        });
        return apiList
    }

    static listByGroups(context:APIContext, groupIds:number[]):Observable<any> {
        var apiList = [];
        _.each(groupIds, (groupId)=> {
            apiList.push(Competency.__api__listByGroup(groupId));
        });
        return context.apiService.execute(Competency.__api__bulk_search(apiList), context.authService.CloudAcc.id, context.authService.CloudAcc.api_endpoint).map(questionArrs => {
            return _.flatten(questionArrs);
        });
    }

}
