import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';
import { CourseUnit } from './course-unit.model';
import * as _ from 'underscore';

@Model('res.groups')
export class Group extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.category = undefined;
		this.order = undefined;
		this.code = undefined;
        this.parent_id = undefined;
	}

    name:string;
    category: string;
    code: string;
    order: string;
    parent_id: number;

    static listByCategory(context:APIContext, category):Observable<any> {
        return Group.search(context,[], "[('category','=','"+category+"')]");
    }

    static listBySyllabus(context:APIContext, sylId:number):Observable<any> {
        return CourseUnit.listBySyllabus(context, sylId).flatMap(units => {
            var groupIds = _.pluck(units, 'group_id');
            return Group.array(context, groupIds);
        });
    }

}
