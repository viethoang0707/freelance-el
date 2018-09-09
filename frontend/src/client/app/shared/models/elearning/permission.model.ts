import { Observable, Subject } from 'rxjs/Rx';
import { Model,ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { User } from './user.model';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.permission')
export class Permission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.name = undefined;
		this.user_group_id = undefined;
		this.menu_access = undefined;
        this.user_count =  undefined;
        this.user_group_name =  undefined;
	}

    name: string;
    user_group_id: number;
    menu_access: string;
    user_count: number;
    user_group_name: string;


    static __api__listUsers(permissionId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(User.Model, fields, "[('permission_id','='," + permissionId + ")]");
    }

    listUsers(context: APIContext,fields?:string[]): Observable<any> {
        return User.search(context, fields, "[('permission_id','='," + this.id + ")]");
    }
}
