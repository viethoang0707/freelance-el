import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CourseLog } from './log.model';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { SearchCountAPI } from '../../services/api/search-count.api';

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
        this.status = undefined;
	}

    name:string;
    parent_id: number;
    order: number;
    icon: string;
    syllabus_id: number;
    lecture: string;
    type: string;
    status: string;

    static __api__listBySyllabus(sylId: number): SearchReadAPI {
        return new SearchReadAPI(CourseUnit.Model, [],"[('syllabus_id','=',"+sylId+")]");
    }

    static listBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.search(context,[], "[('syllabus_id','=',"+sylId+")]");
    }

    static __api__countBySyllabus(sylId: number): SearchCountAPI {
        return new SearchCountAPI(CourseUnit.Model, "[('syllabus_id','=',"+sylId+"),('type','!=','folder')]");
    }

    static countBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.count(context, "[('syllabus_id','=',"+sylId+"),('type','!=','folder')]");
    }
}
