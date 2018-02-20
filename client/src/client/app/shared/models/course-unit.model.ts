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
        this.video_id = undefined;
        this.lecture = undefined;
        this.video_url = undefined;
        this.type = undefined;
        this.order = undefined;
        this.parent_id = undefined;
        this.syllabus_id = undefined;
        this.icon = undefined;
	}

    name:string;
    parent_id: number;
    order: number;
    icon: string;
    syllabus_id: number;
    video_id: number;
    lecture: string;
    video_url: string;
    type: string;

    static listBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.search(context,[], "[('syllabus_id','=',"+sylId+")]");
    }

    static countBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.count(context, "[('syllabus_id','=',"+sylId+")]");
    }
}
