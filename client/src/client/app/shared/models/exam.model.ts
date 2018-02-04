import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exam')
export class Exam extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.content_id = undefined;
        this.status = undefined;
        this.scale = undefined;
	}

    name:string;
    summary: string;
    instruction: string;
    start: Date;
    end: Date;
    content_id: number;
    scale: number;
    status: string;

}
