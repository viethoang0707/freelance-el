import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.html_lecture')
export class HtmlLecture extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.content = undefined;
        this.unit_id = undefined;
	}

    content:string;
    unit_id: number;


    static byCourseUnit(context:APIContext, unitId: number):Observable<any> {
        return HtmlLecture.search(context,[],"[('unit_id','=',"+unitId+")]")
        .map(lectures => {
            if (lectures.length)
                return lectures[0];
            else
                return null;
        });
    }


}
