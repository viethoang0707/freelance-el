import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/create')
export class CreateAPI extends BaseAPI{

    constructor( model:string, object:any){
        super();
        this.params = {model: model, values:object };
	}

}
