import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/delete')
export class DeleteAPI extends BaseAPI{

    constructor(model:string, id:number){
        super();
        this.params = { model: model, id:id};
        this.is_restricted =  true;
	}

}
