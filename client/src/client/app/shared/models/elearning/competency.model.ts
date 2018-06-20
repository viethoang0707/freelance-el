import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CompetencyLevel } from './competency-level.model';

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
        this.levels = [];
	}

    name:string;
    group_name:string;
    group_id: number;
    category: string;
    group_id__DESC__: string;
    levels: CompetencyLevel[];

    levelSummary():string {
        return  _.reduce(this.levels, function(memo, level) { return memo + level["name"] + ','; }, '');
    }

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Competency.Model, [],"[('group_id','=',"+groupId+")]");
    }

    static listByGroup(context:APIContext, groupId:number):Observable<any> {
        return Competency.search(context, [],"[('group_id','=',"+groupId+")]");
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
        return context.apiService.execute(Competency.__api__bulk_search(apiList), context.authService.LoginToken).map(questionArrs => {
            return _.flatten(questionArrs);
        });
    }


    __api__populateLevel(): SearchReadAPI {
        return CompetencyLevel.__api__listByCompetency(this.id);
    }

    populateLevel(context:APIContext):Observable<any> {
        return CompetencyLevel.listByCompetency(context,this.id).map(levels=> {
            this.levels =  levels;
            return this;
        })
    }

    static populateLevels(context:APIContext, competencies: Competency[]):Observable<any> {
        var apiList = _.map(competencies,(question:Competency)=> {
            return question.__api__populateLevel();
        });
        return BaseModel.bulk_search(context, ...apiList)
        .map(jsonArr => {
            return _.flatten(jsonArr);
        })
        .do(jsonArr=> {
            var levels = CompetencyLevel.toArray(jsonArr);
            _.each(competencies, (competency:Competency)=> {
                competency.levels =  _.filter(levels, (level:CompetencyLevel)=> {
                    return level.competency_id == competency.id;
                });
            });
        })
    }

}
