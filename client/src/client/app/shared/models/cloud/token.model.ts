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
    @FieldProperty<Date>()
    date_expire: Date;

    get IsValid():boolean {
        var now = new Date();
        if (this.date_expire.getTime() > now.getTime())
            return true;
        return false;
    }

}
