import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.course_class')
export class CourseClass extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
        this.supervisor_id = undefined;
		this.member_ids = undefined;
        this.enroll_start = undefined;
        this.enroll_end = undefined;
	}

    name:string;
    course_id: number;
    supervisor_id: number;
    member_ids: number[];
    enroll_start: Date;
    enroll_end: Date
}
