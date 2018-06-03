import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CompetencyLevelCache } from '../../services/cache.service';

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
        return CompetencyLevelCache.all(context);
    }

    static listByCompetency(context:APIContext, competencyId):Observable<any> {
        return CompetencyLevelCache.listByCompetency(context, competencyId);
    }

}
