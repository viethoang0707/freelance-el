import { BaseModel } from './base.model';
import { MODEL_METADATA_KEY, Model,FieldProperty } from './decorator';
import { APIContext } from './context';
import { MapUtils }  from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';

@Model('vieterp.cloud_account')
export class CloudAccount extends BaseModel{
    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.code = undefined;
		this.api_endpoint = undefined;
		this.domain = undefined;
		this.name = undefined;
		this.db = undefined;
		this.date_expire = undefined;
	}

    code:string;
    db:string;
    domain:string;
    api_endpoint: string;
    @FieldProperty<Date>()
    date_expire: Date;
    name: number;

}
