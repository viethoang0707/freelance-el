import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.submission')
export class Submission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.user_id = undefined;
        this.log_id = undefined;
        this.content_id = undefined;
        this.answer_ids = undefined;
	}
    log_id: number;
    content_id: number;
    user_id: number;
    answer_ids: number[];
}
