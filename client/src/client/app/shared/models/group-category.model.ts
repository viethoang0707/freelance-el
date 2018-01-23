
import { BaseModel } from './base.model';
import { Model } from './decorator';

@Model('ir.module.category')
export class GroupCategory extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
    	super();
		
		this.name = undefined;
	}

    name:string;
}
