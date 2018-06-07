import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';

@Model('etraining.course_faq')
export class CourseFaq extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.question = undefined;
		this.course_id = undefined;
        this.answer = undefined;
    }
    
    question:string;
    course_id: number;
    answer:string;

    static listByCourse(context:APIContext, courseId):Observable<any> {
        return CourseFaq.search(context,[], "[('course_id','=',"+courseId+")]");
    }
}
