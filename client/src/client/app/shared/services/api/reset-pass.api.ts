import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/resetpass')
export class ResetPassAPI extends BaseAPI{

    constructor( email: string){
        super();
        this.params = {email: email};
	}

}
