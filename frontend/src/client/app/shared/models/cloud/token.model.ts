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
		this.date_expire = undefined;
        this.cloud_id = undefined;
        this.cloud_code = undefined;
	}

    code:string;
    cloud_id:number;
    cloud_code: string;
    date_expire: number;

}
