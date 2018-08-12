import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/update')
export class UpdateAPI extends BaseAPI{

    constructor( model:string, id:number, object:any){
        super();
        this.params = {model: model, values:object, id:id };
	}

}
