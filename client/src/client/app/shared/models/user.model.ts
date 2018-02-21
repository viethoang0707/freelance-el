
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
        this.etraining_group_id = undefined;
        this.etraining_group_id__DESC__ = undefined;
		this.login = undefined;
        this.phone = undefined;
        this.is_admin = undefined;
        this.banned = undefined;
		this.company_id = undefined;
	}

    image:string;
    name:string;
    email: string;
    etraining_group_id: number;
    etraining_group_id__DESC__: string;
    login: string;
    phone: string;
    is_admin: boolean;
    banned: boolean;
    display_name: string;
    company_id: number;

    getCompany(context:APIContext):Observable<any> {
        return Company.get(context, this.company_id);
    }

    static all( context:APIContext): Observable<any[]> {
        return User.search(context,[],"[('login','!=','admin')]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        return User.search(context,[], "[('etraining_group_id','=',"+groupId+")]");
    }

}
