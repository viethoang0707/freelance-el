import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { ListAPI } from './list.api';

@Method('/api/bulk_read')
export class BulkListAPI extends BaseAPI{

    constructor( ){
        super();
        this.params = {stacks:[]};
	}

	add(api: ListAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api.params);
	}

}
