import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';

@Model('etraining.syllabus')
export class CourseSyllabus extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;        
        this.status = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.review_state =  undefined;
        this.unit_count = undefined;
        this.complete_unit_by_order =  undefined;
	}    

    review_state: string;
    name:string;
    status:string;
    course_id: number;
    supervisor_id: number;
    supervisor_name: string;
    unit_count: number;
    complete_unit_by_order: boolean;

    static __api__listByCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseSyllabus.Model, [],"[('course_id','=',"+courseId+")]");
    }

    static listByCourse( context:APIContext, courseId: number): Observable<any[]> {
        return CourseSyllabus.search(context,[],"[('course_id','=',"+courseId+")]");
    }

}
