import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { BaseModel } from '../../models/base.model';

@Method('/api/read')
export class ListAPI extends BaseAPI{

    constructor( model:string, ids:number[], fields?:string[]){
        super();
        if (fields)
            this.params = { model: model,fields:fields, ids:ids };
        else {
            var modelFields = BaseModel.fields(model);
            this.params = { model: model,fields:modelFields, ids:ids };
        }
        this.is_restricted =  false;
	}

}
