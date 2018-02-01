import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.syllabus')
export class Syllabus extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
		this.unit_ids = undefined;
		this.member_ids = undefined;
        this.material_ids = undefined;
        this.faq_ids = undefined;
	}

    name:string;
    course_id: number;
    unit_ids: number[];
    member_ids: number[];
    faq_ids: number[];
    material_ids: number[];
}
