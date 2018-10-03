import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { ExecuteAPI } from './execute.api';

@Method('/api/bulk_execute')
export class BulkExecuteAPI extends BaseAPI{

    constructor(){
        super();
        this.params = {stacks:[]};
	}

	add(api: ExecuteAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api.params);
	}

}
