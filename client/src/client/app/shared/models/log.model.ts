import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.log')
export class Log extends BaseModel{

    constructor(){
        super();
        
        this.user_id = undefined;
        this.res_id = undefined;
        this.res_model = undefined;
        this.note = undefined;
        this.end = undefined;
        this.start = undefined;
        this.attachment_url = undefined;
        this.attachment_id = undefined;
    }

    res_id: number;
    user_id: number;
    res_model: string;
    note: string;
    end: Date;
    start: Date;
    attachment_url: string;
    attachment_id: number;
}
