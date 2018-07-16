import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { BaseModel } from '../base.model';
import { Company } from './company.model';
import { Permission } from './permission.model';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import * as _ from 'underscore';

@Model('res.users')
export class User extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.image = undefined;
        this.display_name = undefined;
        this.name = undefined;
        this.gender = undefined;
        this.dob = undefined;
        this.position = undefined;
        this.email = undefined;
        this.group_id = undefined;
        this.group_code = undefined;
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

    image: string;
    name: string;
    group_code: string;
    gender: boolean;
    @FieldProperty<Date>()
    dob: Date;
    position: string;
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
        return this.is_admin || this.login == 'admin';
    }

    get IsSuperAdmin() {
        return this.login == 'admin' || (this.is_admin && !this.supervisor_id);
    }


    getPermission(context: APIContext): Observable<any> {
        if (this.permission_id)
            return Permission.get(context, this.permission_id);
        else
            return Observable.of(new Permission());
    }

    static __api__listAllAdmin(userId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__all(): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('login','!=','admin')]");
    }

    static all(context:APIContext):Observable<any[]> {
        return User.search(context, [], "[('login','!=','admin')]");
    }


    static listAllAdmin(context: APIContext): Observable<any[]> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.IsAdmin;
                });
            });
        return User.search(context, [], "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__countAllAdmin(): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static countAllAdmin(context: APIContext): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var admins = _.filter(users, (user: User) => {
                    return user.IsAdmin;
                });
                return admins.length;
            });
        return User.count(context, "[('login','!=','admin'),('is_admin','=',True)]");
    }

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('group_id','='," + groupId + ")]");
    }

    static listByGroup(context: APIContext, groupId: number): Observable<any[]> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.group_id == groupId;
                });
            });
        return User.search(context, [], "[('group_id','='," + groupId + ")]");

    }

    static __api__listByPermission(permissionId: number): SearchReadAPI {
        return new SearchReadAPI(User.Model, [], "[('permission_id','='," + permissionId + ")]");
    }

    static listByPermission(context: APIContext, permissionId: number): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                return _.filter(users, (user: User) => {
                    return user.permission_id == permissionId;
                });
            });
        return User.search(context, [], "[('permission_id','='," + permissionId + ")]");
    }

    static __api__countByPermission(permissionId: number): SearchCountAPI {
        return new SearchCountAPI(User.Model, "[('permission_id','='," + permissionId + ")]");
    }

    static countByPermission(context: APIContext, permissionId: number): Observable<any> {
        if (Cache.hit(User.Model))
            return Observable.of(Cache.load(User.Model)).map(users => {
                var records = _.filter(users, (user: User) => {
                    return user.permission_id == permissionId;
                });
                return records.length;
            });
        return User.count(context, "[('permission_id','='," + permissionId + ")]");
    }

}
