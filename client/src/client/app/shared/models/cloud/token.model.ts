import { BaseModel } from '../base.model';
import { MODEL_METADATA_KEY, Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Observable, Subject } from 'rxjs/Rx';

@Model('erpcloud.login_token')
export class Token extends BaseModel{
    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.code = undefined;
		this.login = undefined;
		this.email = undefined;
		this.date_expire = undefined;
        this.cloud_id = undefined;
	}

    code:string;
    login:string;
    email:string;
    cloud_id:number;
    date_expire: number;

    get IsValid():boolean {
        var now = new Date();
        var expireDate = new Date(this.date_expire);
        if (expireDate.getTime() > now.getTime())
            return true;
        return false;
    }

}
