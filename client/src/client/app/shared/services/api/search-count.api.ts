import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/search_count')
export class SearchCountAPI extends BaseAPI{

    constructor( model:string, domain:string){
        super();
        this.params = { model: model, domain: domain };
	}

}
