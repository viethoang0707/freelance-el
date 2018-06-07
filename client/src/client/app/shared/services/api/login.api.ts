import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/login')
export class LoginAPI extends BaseAPI{

    constructor( username: string,  password: string){
        super();
        this.params = {username: username, password: password};
	}

}
