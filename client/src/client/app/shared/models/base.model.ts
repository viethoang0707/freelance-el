
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

     get Model():string {
        return Reflect.getMetadata(MODEL_METADATA_KEY, this.constructor);
    }

    save(context:APIContext):Observable<any> {
    	var model = this.Model;
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
    	var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
    	return context.apiService.delete(model, this.id, cloud_acc.id, cloud_acc.api_endpoint);
    }

    static get(context:APIContext,id:number):Observable<any> {
    	var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
    	return context.apiService.get(model, id, [],cloud_acc.id, cloud_acc.api_endpoint).map(item => {
             return   MapUtils.deserializeModel(model, item);
        });
    }

    static count(context:APIContext, domain?:string):Observable<any[]> {
        var domain = domain?domain:"[]";
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.count(model, domain, cloud_acc.id, cloud_acc.api_endpoint);
    }


    static search(context:APIContext, fields:string[], domain:string):Observable<any[]> {
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.search(model, fields, domain, cloud_acc.id, cloud_acc.api_endpoint).map(items => {
            return _.map(items, (item)=> {
               return  MapUtils.deserializeModel(model, item);
            });
        });
    }

    static all( context:APIContext): Observable<any[]> {
        return this.search(context,[],'[]');
    }

    static array(context:APIContext,ids: number[]): Observable<any[]> {
        if (ids.length == 0)
            return Observable.of([]);
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.list(model,ids,[],cloud_acc.id, cloud_acc.api_endpoint).map(items => {
            return _.map(items, (item)=> {
               return  MapUtils.deserializeModel(model, item);
            });
        });;
    }

    static allWithInactive(context:APIContext):Observable<any[]> {
        var domain = "['|',('active','=',True),('active','=',False)]";
        return this.search(context,[], domain);
    }


    static executeRemote(context:APIContext, method:string, paramsList: string[], paramsDict: any):Observable<any> {
        var model = this.Model;
        var cloud_acc = context.authService.StoredCredential.cloud_account;
        return context.apiService.execute(model, method, paramsList, paramsDict, cloud_acc.id, cloud_acc.api_endpoint);
    }



    


}
