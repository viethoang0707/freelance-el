import { BaseAPI } from './base.api';
import { Observable, Subject } from 'rxjs/Rx';
import { Method } from './decorator';
import { BaseModel } from '../../models/base.model';

@Method('/api/search_read')
export class SearchReadAPI extends BaseAPI{

    constructor( model:string, fields:string[], domain:string,limit?:any, offset?:any, order?:any){
        super();
        if (!fields || fields.length==0)
            fields =  BaseModel.fields(model);
        this.params = { model: model,fields:fields, domain: domain, limit: limit, offset: offset, order: order};
	}

}

@Method('/api/search_read')
export class SearchAllAPI extends SearchReadAPI{

    constructor( model:string,fields?:string[]){
        super(model, [],"[]");
        if (fields)
            this.params = { model: model,fields:fields, domain: "[]"};
        else {
            var modelFields = BaseModel.fields(model);
            this.params = { model: model,fields:modelFields, domain: "[]"};
        }
	}

}

