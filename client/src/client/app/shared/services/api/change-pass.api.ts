import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/changepass')
export class ChangePassAPI extends BaseAPI{

    constructor(user_id: number, old_pass: string, new_pass:string){
        super();
        this.params = {user_id: user_id, old_pass: old_pass, new_pass: new_pass };
	}

}
