import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.course_unit')
export class CourseUnit extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.group_id = undefined;
		this.syllabus_id = undefined;
		this.test_id = undefined;
        this.video_id = undefined;
        this.lecture = undefined;
        this.video_url = undefined;
        this.type = undefined;
	}

    name:string;
    group_id: number;
    syllabus_id: number;
    test_id: number;
    video_id: number;
    lecture: string;
    video_url: string;
    type: string;
}
