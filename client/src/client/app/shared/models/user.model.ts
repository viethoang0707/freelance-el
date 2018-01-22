
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';
import { BaseModel } from './base.model';
import { Company } from './company.model';
import * as _ from 'underscore';

@Model('res.users')
export class User extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.image = undefined;
		this.display_name = undefined;
        this.name = undefined;
		this.email = undefined;
        this.gender = undefined;
		this.login = undefined;
        this.mobile = undefined;
        this.group_ids = undefined;
        this.ui_access_group = undefined;
		this.company_id = undefined;
	}

    image:string;
    name:string;
    email: string;
    gender: string;
    login: string;
    mobile: string;
    ui_access_group: number;
    display_name: string;
    company_id: number;
    group_ids: number[];



}
