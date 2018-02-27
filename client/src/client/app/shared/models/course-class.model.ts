import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from './decorator';
import { APIContext } from './context';
import { Conference } from './conference.model';

@Model('etraining.course_class')
export class CourseClass extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.course_name = undefined;
		this.course_id = undefined;
        this.supervisor_id = undefined;
        this.supervisor_name = undefined;
        this.start = undefined;
        this.end = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
    supervisor_id: number;

    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    static listByCourse(context:APIContext, courseId):Observable<any> {
        return CourseClass.search(context,[], "[('course_id','=',"+courseId+")]");
    }

    delete(context:APIContext):Observable<any> {
        return Conference.byClass(context,this.id).flatMap(conference => {
            if (!conference)
                return this.delete(context);
            else {
                return Observable.zip(this.delete(context), conference.delete(context))
            }
        });
    }
}
