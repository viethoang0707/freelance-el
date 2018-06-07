import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';

@Model('etraining.competency_level')
export class CompetencyLevel extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.order = undefined;
		this.competency_id = undefined;
        this.competency_name = undefined;
        this.competency_group_id = undefined;
        this.competency_group_name = undefined;
	}

    name:string;
    order: number;
    competency_id: number;
    competency_name: string;
    competency_group_id: number;
    competency_group_name: string;

    static all( context:APIContext): Observable<any[]> {
        if (Cache.hit(CompetencyLevel.Model))
            return Observable.of(Cache.load(CompetencyLevel.Model));
        return CompetencyLevel.search(context,[],"[]");
    }

    static __api__listByCompetency(competencyId: number): SearchReadAPI {
        return new SearchReadAPI(CompetencyLevel.Model, [],"[('competency_id','=',"+competencyId+")]");
    }

    static listByCompetency(context:APIContext, competencyId:number):Observable<any> {
        if (Cache.hit(CompetencyLevel.Model)) {
            var levels = Cache.load(CompetencyLevel.Model);
            levels =  _.filter(levels, (level:CompetencyLevel)=> {
                return level.competency_id ==  competencyId;
            });
            return Observable.of(levels);
        }
        return CompetencyLevel.search(context,[], "[('competency_id','=',"+competencyId+")]");
    }

}
