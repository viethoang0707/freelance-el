import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.course_member')
export class CourseMember extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.course_id = undefined;
        this.syllabus_id = undefined;
		this.class_id = undefined;
        this.date_register = undefined;
        this.status = undefined;
        this.role = undefined;
        this.enroll_status = undefined;
	}

    course_id: number;
    syllabus_id: number;
    class_id: number;
    status: string;
    role: string;
    enroll_status: string;
    date_register: Date
}
