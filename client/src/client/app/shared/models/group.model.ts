
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';
import { GroupCategory } from './group-category.model';

@Model('res.groups')
export class Group extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.category_id = undefined;
		this.users = undefined;
		this.comment = undefined;
	}

    name:string;
    category_id: number;
    users: number[];
    comment: string;

}
