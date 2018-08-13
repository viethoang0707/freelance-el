import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { SearchReadAPI } from './search-read.api';

@Method('/api/bulk_search_read')
export class BulkSearchReadAPI extends BaseAPI{

    constructor(){
        super();
        this.params = {stacks:[]};
	}

	add(api: SearchReadAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api.params);
	}

}