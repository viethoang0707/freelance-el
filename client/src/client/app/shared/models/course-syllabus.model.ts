import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.syllabus')
export class CourseSyllabus extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
	}

    name:string;
    course_id: number;

    static byCourse(context:APIContext, courseId: number):Observable<any> {
        return CourseSyllabus.search(context,[],"[('course_id','=',"+courseId+")]")
        .map(syllabi => {
            if (syllabi.length)
                return syllabi[0];
            else
                return null;
        });
    }
}
