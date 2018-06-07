import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { CreateAPI } from './create.api';

@Method('/api/bulk_create')
export class BulkCreateAPI extends BaseAPI{

    constructor(){
        super();
        this.params = {stacks:[]};
	}

	add(api: CreateAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api);
	}

}
