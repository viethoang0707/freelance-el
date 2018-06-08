import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { DeleteAPI } from './delete.api';

@Method('/api/bulk_delete')
export class BulkDeleteAPI extends BaseAPI{

    constructor(){
        super();
        this.params = {stacks:[]};
	}

	add(api: DeleteAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api.params);
	}

}