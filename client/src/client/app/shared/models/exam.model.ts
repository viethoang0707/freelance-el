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
        this.selector_id = undefined;
        this.status = undefined;
        this.scale = undefined;
        this.duration = undefined;
        this.max_attempt = undefined;
        this.allow_navigation = undefined;
        this.question_selection = undefined;
	}

    name:string;
    summary: string;
    instruction: string;
    start: Date;
    end: Date;
    selector_id: number;
    scale: number;
    status: string;
    duration: number;
    max_attempt: number;
    allow_navigation: boolean;
    question_selection: string;

}
