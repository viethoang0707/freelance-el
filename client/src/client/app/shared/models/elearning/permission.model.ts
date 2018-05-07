
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { Company } from './company.model';
import * as _ from 'underscore';

@Model('etraining.permission')
export class Permission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.role = undefined;
		this.user_group_id = undefined;
		this.user_group_id__DESC__ = undefined;
		this.menu_access = undefined;
	}

    name: string;
    user_group_id: number;
    user_group_id__DESC__: string;
    menu_access: string;
    
}
