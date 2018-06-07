import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.slide_lecture')
export class SlideLecture extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.filename = undefined;
        this.slide_url = undefined;
        this.unit_id = undefined;
	}

    filename:string;
    slide_url:string;
    unit_id: number;

    static __api__byCourseUnit(unitId:number): SearchReadAPI {
        return new SlideLecture(SCORMLecture.Model, [],"[('unit_id','=',"+unitId+")]");
    }
    
    static byCourseUnit(context:APIContext, unitId: number):Observable<any> {
        return SlideLecture.search(context,[],"[('unit_id','=',"+unitId+")]")
        .map(lectures => {
            if (lectures.length)
                return lectures[0];
            else
                return null;
        });
    }


}
