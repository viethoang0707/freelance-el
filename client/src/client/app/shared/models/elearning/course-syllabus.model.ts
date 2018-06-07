import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.syllabus')
export class CourseSyllabus extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
        this.prequisite_course_id = undefined;
        this.prequisite_course_id__DESC__ = undefined;
        this.complete_unit_by_order = undefined;
        this.status = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
	}    

    name:string;
    status:string;
    course_id: number;
    prequisite_course_id:number;
    prequisite_course_id__DESC__:string;
    complete_unit_by_order: boolean;
    supervisor_id: number;
    supervisor_name: string;

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
