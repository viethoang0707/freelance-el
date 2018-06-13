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
        this.status = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
	}    

    name:string;
    status:string;
    course_id: number;
    supervisor_id: number;
    supervisor_name: string;

    static __api__byCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseSyllabus.Model, [],"[('course_id','=',"+courseId+")]");
    }

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
