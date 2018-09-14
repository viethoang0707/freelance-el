import { Observable, Subject } from 'rxjs/Rx';
import { Model,ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { User } from './user.model';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Group } from './group.model';
import { ListAPI } from '../../services/api/list.api';

@Model('etraining.permission')
export class Permission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.name = undefined;
		this.user_group_ids = undefined;
		this.menu_access = undefined;
        this.user_count =  undefined;
	}

    name: string;
    user_group_ids: number[];
    menu_access: string;
    user_count: number;


    static __api__listUsers(permissionId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(User.Model, fields, "[('permission_id','='," + permissionId + ")]");
    }

    listUsers(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.id)
            return Observable.of([]);
        return User.search(context, fields, "[('permission_id','='," + this.id + ")]");
    }

    static __api__listGroups(groupIds: number[],fields?:string[]): SearchReadAPI {
        return new ListAPI(Group.Model, groupIds, fields);
    }

    listGroups(context: APIContext,fields?:string[]): Observable<any> {
        return Group.array(context, this.user_group_ids, fields);
    }
}

