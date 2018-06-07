import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { UpdateAPI } from './update.api';

@Method('/api/bulk_update')
export class BulkUpdateAPI extends BaseAPI{

    constructor( ){
        super();
        this.params = {stacks:[]};
	}

	add(api: UpdateAPI) {
		var stacks = this.params["stacks"];
		stacks.push(api);
	}

}