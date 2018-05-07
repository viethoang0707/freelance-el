import { APIContext } from './context';
import { MapUtils }  from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';
import { MODEL_METADATA_KEY, ModelRegister,FieldProperty } from './decorator';
import * as _ from 'underscore';


export abstract class BaseModel {
    id		:	number;
    @FieldProperty<Date>()
    create_date: Date;
    @FieldProperty<Date>()
    write_date: Date;
    create_uid: number;
    create_uid__DESC__: string;
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
        var cloud_acc = context.authService.CloudAcc;
        var success =  context.dataAccessService.checkPermission(this,'CREATE');
        if (!success)
            return Observable.throw('Data access forbidden');
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
        var cloud_acc = context.authService.CloudAcc;
        var success =  context.dataAccessService.checkPermission(this,'DELETE');
        if (!success)
            return Observable.throw('Data access forbidden');
    	return context.apiService.delete(model, this.id, cloud_acc.id, cloud_acc.api_endpoint);
    }

    static get(context:APIContext,id:number):Observable<any> {
    	var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
    	return context.apiService.get(model, id, [],cloud_acc.id, cloud_acc.api_endpoint).do(item => {
             var record =   MapUtils.deserializeModel(model, item);
             var success =  context.dataAccessService.checkPermission(record,'GET');
             if (!success)
                return Observable.throw('Data access forbidden');
             else
                return Observable.of(record);
        });
    }

    static count(context:APIContext, domain?:string):Observable<any[]> {
        var domain = domain?domain:"[]";
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.count(model, domain, cloud_acc.id, cloud_acc.api_endpoint);
    }


    static search(context:APIContext, fields:string[], domain:string):Observable<any[]> {
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.search(model, fields, domain, cloud_acc.id, cloud_acc.api_endpoint).do(items => {
            var records = _.map(items, (item)=> {
               return  MapUtils.deserializeModel(model, item);
            });
            return _.filter(records, (record => {
                return context.dataAccessService.checkPermission(record,'GET');
            }));
        });
    }

    static all( context:APIContext): Observable<any[]> {
        return this.search(context,[],'[]');
    }

    static array(context:APIContext,ids: number[]): Observable<any[]> {
        if (ids.length == 0)
            return Observable.of([]);
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.list(model,ids,[],cloud_acc.id, cloud_acc.api_endpoint).map(items => {
            var records = _.map(items, (item)=> {
               return  MapUtils.deserializeModel(model, item);
            });
            return _.filter(records, (record => {
                return context.dataAccessService.checkPermission(record,'GET');
            }));
        });
    }

    static allWithInactive(context:APIContext):Observable<any[]> {
        var domain = "['|',('active','=',True),('active','=',False)]";
        return this.search(context,[], domain);
    }


    static executeRemote(context:APIContext, method:string, paramsList: string[], paramsDict: any):Observable<any> {
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(model, method, paramsList, paramsDict, cloud_acc.id, cloud_acc.api_endpoint);
    }

}
