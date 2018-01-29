import { BaseModel } from './base.model';
import { MODEL_METADATA_KEY, Model } from './decorator';
import { APIContext } from './context';
import { MapUtils }  from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';

@Model('ir.mail_server')
export class SMTP extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.smtp_host = undefined;
		this.smtp_user = undefined;
		this.smtp_pass = undefined;
		this.smtp_encryption = undefined;
		this.smtp_port = undefined;
	}

    name:string;
    smtp_host: string;
    smtp_user: string;
    smtp_pass: string;
    smtp_encryption: string;
    smtp_port: number;
    
}
