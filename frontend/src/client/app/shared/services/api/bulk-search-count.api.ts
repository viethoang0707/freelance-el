import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { SearchCountAPI } from './search-count.api';

@Method('/api/bulk_search_count')
export class BulkSearchCountAPI extends BaseAPI{

    constructor(){
        super();
        this.params = {stacks:[]};
        this.is_restricted =  false;
	}

	add(api: SearchCountAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api.params);
	}

}