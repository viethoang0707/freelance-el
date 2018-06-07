import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { Company } from './company.model';
import { Permission } from './permission.model';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('res.users')
export class User extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.image = undefined;
		this.display_name = undefined;
        this.name = undefined;
		this.email = undefined;
        this.group_id = undefined;
        this.group_id__DESC__ = undefined;
		this.login = undefined;
        this.phone = undefined;
        this.is_admin = undefined;
        this.banned = undefined;
		this.company_id = undefined;
        this.permission_id = undefined;
        this.permission_id__DESC__ = undefined;
        this.supervisor_id = undefined;
        this.supervisor_id__DESC__ = undefined;
	}

    image:string;
    name:string;
    email: string;
    group_id: number;
    group_id__DESC__: string;
    login: string;
    phone: string;
    is_admin: boolean;
    banned: boolean;
    display_name: string;
    company_id: number;
    permission_id: number;
    permission_id__DESC__: string;
    supervisor_id: number;
    supervisor_id__DESC__: string;

    get IsAdmin() {
        return this.is_admin || this.login =='admin';
    }

    get IsSuperAdmin() {
        return this.login =='admin' || ( this.is_admin  && !this.supervisor_id) ;
    }

    getCompany(context:APIContext):Observable<any> {
        return Company.get(context, this.company_id);
    }

    getPermission(context:APIContext):Observable<any> {
        if (this.permission_id)
            return Permission.get(context, this.permission_id);
        else
            return Observable.of(new Permission());
    }

    static all( context:APIContext): Observable<any[]> {
        return UserCache.all(context);
    }

    static countAll( context:APIContext): Observable<any> {
        return UserCache.countAll(context);
    }

    static allAdmin( context:APIContext): Observable<any[]> {
        return UserCache.allAdmin(context);
    }

    static countAllAdmin( context:APIContext): Observable<any> {
        return UserCache.countAllAdmin(context);
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return UserCache.listByGroup(context, groupId);
    }

    static listByPermission(context:APIContext, permissionId):Observable<any> {
        return UserCache.listByPermission(context, permissionId);
    }

}
