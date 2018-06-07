import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';

@Method('/api/execute')
export class ExecuteAPI extends BaseAPI{

    constructor( model:string, method :string, paramList: string[], paramdDict: any ){
        super();
        this.params = {model: model, method: method, paramList: paramList, paramdDict: paramdDict};
	}

}
