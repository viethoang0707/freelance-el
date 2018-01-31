import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.course')
export class Course extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.description = undefined;
		this.code = undefined;
        this.status = undefined;
        this.mode = undefined;
        this.image_url = undefined;
        this.syllabus_ids = undefined;
	}

    name:string;
    summary: string;
    code: string;
    description: string;
    status: string;
    mode: string;
    image_url: string;
    syllabus_ids: number[];

}
