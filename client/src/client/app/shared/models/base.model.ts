
import { APIContext } from './context';
import { MapUtils }  from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';
import { MODEL_METADATA_KEY, ModelRegister } from './decorator';
import * as _ from 'underscore';


export abstract class BaseModel {
    id		:	number;
    create_date: string;
    create_uid: number;
    create_uid__DESC__: string;
    write_date: string;
    write_uid: number;
    write_uid__DESC__: string;
    active    :    boolean;

    constructor() {
        this.id =  undefined;
        this.active = undefined;
        this.create_date =  undefined;
        this.create_uid =  undefined;
        this.create_uid__DESC__ =  undefined;
        this.write_date =  undefined;
        this.write_uid =  undefined;
        this.write_uid__DESC__ =  undefined;
    }

    static get Model():string {
    	return Reflect.getMetadata(MODEL_METADATA_KEY, this);
    }

    save(context:APIContext):Observable<any> {
    	var model = this.constructor.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
    	if (!this.id)
    		return context.apiService.create(model, MapUtils.serialize(this), cloud_acc.id, cloud_acc.api_endpoint).map(data=> {
                this.id = data.id;
                return this;
            });
        else
        	return context.apiService.update(model, this.id, MapUtils.serialize(this), cloud_acc.id, cloud_acc.api_endpoint);
    }

    delete(context:APIContext):Observable<any> {
    	var model = this.constructor.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
    	return context.apiService.delete(model, this.id, cloud_acc.id, cloud_acc.api_endpoint);
    }

    static get(id:number,context:APIContext):Observable<any> {
    	var self = this;
    	var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
    	return context.apiService.get(model, id, [],cloud_acc.id, cloud_acc.api_endpoint).map(item => {
             return   MapUtils.deserialize(self, item);
        });
    }


    static search(fields:string[], domain:string, context:APIContext):Observable<any[]> {
        var self = this;
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.search(model, fields, domain, cloud_acc.id, cloud_acc.api_endpoint).map(items => {
            return _.map(items, function(item) {
               return  MapUtils.deserialize(self, item);
            });
        });
    }

    static all( context:APIContext): Observable<any[]> {
        return this.search([],'[]',context);
    }

    static array(ids: number[], context:APIContext): Observable<any[]> {
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.list(model,ids,[],cloud_acc.id, cloud_acc.api_endpoint);
    }

    static allWithInactive(context:APIContext):Observable<any[]> {
        var domain = "['|',('active','=',True),('active','=',False)]";
        return this.search([], domain, context);
    }


    static executeRemote(method:string, paramsList: string[], paramsDict: any, context:APIContext):Observable<any> {
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.execute(model, method, paramsList, paramsDict, cloud_acc.id, cloud_acc.api_endpoint);
    }



    


}
