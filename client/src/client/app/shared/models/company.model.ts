
import { BaseModel } from './base.model';
import { MODEL_METADATA_KEY, Model } from './decorator';
import { APIContext } from './context';
import { MapUtils }  from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';

@Model('res.company')
export class Company extends BaseModel{


    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.logo = undefined;
		this.bank_account = undefined;
		this.email = undefined;
		this.name = undefined;
		this.country_id = undefined;
		this.currency_id = undefined;
		this.fax = undefined;
		this.phone = undefined;
		this.street = undefined;
		this.state_id = undefined;
		this.city = undefined;
		this.vat = undefined;
		this.website = undefined;
		this.registry = undefined;
		this.mobile = undefined;
	}

    logo:string;
    email: string;
    bank_account: string;
    name: string;
    country_id: number;
    currency_id: number;
    fax:string;
    phone: string;
    state_id: number;
    city:string;
    street: string;
    vat: string;
    website: string;
    registry: string;
    mobile: string;

    
}
