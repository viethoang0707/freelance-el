import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CompetencyCache } from '../../services/cache.service';

@Model('etraining.competency')
export class Competency extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.group_id = undefined;
		this.category = undefined;
        this.group_id__DESC__ = undefined;
	}

    name:string;
    group_id: number;
    category: string;
    group_id__DESC__: string;

    static all( context:APIContext): Observable<any[]> {
        return CompetencyCache.all(context);
    }

}
