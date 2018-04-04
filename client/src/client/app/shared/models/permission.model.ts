
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';
import { BaseModel } from './base.model';
import { Company } from './company.model';
import * as _ from 'underscore';

@Model('res.users')
export class Permission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.role = undefined;
	}

    role: string;
    
}
