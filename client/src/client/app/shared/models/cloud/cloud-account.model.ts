import { BaseModel } from '../base.model';
import { MODEL_METADATA_KEY, Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Observable, Subject } from 'rxjs/Rx';

@Model('erpcloud.account')
export class CloudAccount extends BaseModel{
    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.code = undefined;
		this.api_endpoint = undefined;
		this.domain = undefined;
		this.name = undefined;
		this.db = undefined;
        this.logo_url = undefined;
		this.date_expire = undefined;
	}

    code:string;
    db:string;
    domain:string;
    logo_url:string;
    api_endpoint: string;
    @FieldProperty<Date>()
    date_expire: Date;
    name: number;

}
