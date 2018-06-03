import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
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
        this.status = undefined;
	}

    name:string;
    course_name:string;
    supervisor_name:string;
    course_id: number;
    supervisor_id: number;
    status: string;

    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    get IsAvailable():boolean {
        if (this.status !='open')
            return false;
        var now = new Date();
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static listByCourse(context:APIContext, courseId):Observable<any> {
        return CourseClass.search(context,[], "[('course_id','=',"+courseId+")]");
    }

    deleteClass(context:APIContext):Observable<any> {
        return Conference.byClass(context,this.id).flatMap(conference => {
            if (!conference)
                return this.delete(context);
            else {
                return Observable.zip(this.delete(context), conference.deleteConference(context))
            }
        });
    }
}
