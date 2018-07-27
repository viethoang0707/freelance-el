import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/search_read')
export class SearchReadAPI extends BaseAPI{

    constructor( model:string, fields:string[], domain:string){
        super();
        this.is_restricted =  false;
        this.params = { model: model,fields:fields, domain: domain};
	}

}

@Method('/api/search_read')
export class SearchAllAPI extends SearchReadAPI{

    constructor( model:string){
        super(model, [],"[]");
        this.is_restricted =  false;
        this.params = { model: model,fields:[], domain: "[]"};
	}

}

