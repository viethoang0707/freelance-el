import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/read')
export class ListAPI extends BaseAPI{

    constructor( model:string, ids:number[], fields:string[]){
        super();
        this.params = { model: model,fields:fields, ids:ids };
        this.is_restricted =  false;
	}

}
