import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CourseLog } from './log.model';

@Model('etraining.course_unit')
export class CourseUnit extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.lecture = undefined;
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
    lecture: string;
    type: string;

    completedByUser(context:APIContext, userId: number):Observable<any> {
        var domain = "[('user_id','=',"+userId+"),('res_id','=',"+this.id+"),('res_model','=','"+CourseUnit.Model+"'),('code','=','COMPLETE_COURSE_UNIT')]";
        return CourseLog.search(context,[], domain ).flatMap(logs=> {
            if (logs.length ==0)
                return Observable.of(false);
            else 
                return Observable.of(true);
        });
    }

    static listBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.search(context,[], "[('syllabus_id','=',"+sylId+")]");
    }

    static countBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.count(context, "[('syllabus_id','=',"+sylId+")]");
    }
}
