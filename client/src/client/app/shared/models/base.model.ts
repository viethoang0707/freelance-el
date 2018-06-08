import  '../helpers/reflect';
import { APIContext } from './context';
import { MapUtils } from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';
import { MODEL_METADATA_KEY, ModelRegister, FieldProperty } from './decorator';
import * as _ from 'underscore';
import { CreateAPI } from '../services/api/create.api';
import { UpdateAPI } from '../services/api/update.api';
import { DeleteAPI } from '../services/api/delete.api';
import { BulkCreateAPI } from '../services/api/bulk-create.api';
import { BulkDeleteAPI } from '../services/api/bulk-delete.api';
import { BulkUpdateAPI } from '../services/api/bulk-update.api';
import { ListAPI } from '../services/api/list.api';
import { BulkListAPI } from '../services/api/bulk-list.api';
import { SearchCountAPI } from '../services/api/search-count.api';
import { BulkSearchCountAPI } from '../services/api/bulk-search-count.api';
import { SearchReadAPI } from '../services/api/search-read.api';
import { BulkSearchReadAPI } from '../services/api/bulk-search-read.api';
import { ExecuteAPI } from '../services/api/execute.api';
import { Cache } from '../helpers/cache.utils';


export abstract class BaseModel {
    id: number;
    @FieldProperty<Date>()
    create_date: Date;
    @FieldProperty<Date>()
    write_date: Date;
    create_uid: number;
    create_uid__DESC__: string;
    write_uid: number;
    write_uid__DESC__: string;
    active: boolean;

    constructor() {
        this.id = undefined;
        this.active = undefined;
        this.create_date = undefined;
        this.create_uid = undefined;
        this.create_uid__DESC__ = undefined;
        this.write_date = undefined;
        this.write_uid = undefined;
        this.write_uid__DESC__ = undefined;
    }

    static get Model(): string {
        return Reflect.getMetadata(MODEL_METADATA_KEY, this);
    }

    get Model(): string {
        return Reflect.getMetadata(MODEL_METADATA_KEY, this.constructor);
    }

    __api__create():CreateAPI {
        var model = this.Model;
        return new CreateAPI(model, MapUtils.serialize(this));
    }

    __api__update():UpdateAPI {
        var model = this.Model;
        return new UpdateAPI(model, this.id, MapUtils.serialize(this));
    }

    __api__delete():DeleteAPI {
        var model = this.Model;
        return new DeleteAPI(model, this.id);
    }

    static __api__get(ids: number[]):ListAPI {
        var model = this.Model;
        return new ListAPI(model, ids, []);
    }

    static __api__count(domain?: string):SearchCountAPI {
        var model = this.Model;
        return new SearchCountAPI(model, domain);
    }

    static __api__search(fields: string[], domain: string):SearchReadAPI {
        var model = this.Model;
        return new SearchReadAPI(model, fields, domain);
    }

    static __api__all():SearchReadAPI {
        return this.__api__search( [], "[]");
    }

    static __api__excute(method: string, paramsList: string[], paramsDict: any):ExecuteAPI {
        var model = this.Model;
        return new ExecuteAPI(model, method, paramsList,paramsDict);
    }

    static __api__bulk_create(apiList:CreateAPI[]):BulkCreateAPI {
        var api = new BulkCreateAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
    }

    static bulk_create(context:APIContext, ...apiList:CreateAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_create(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__bulk_update(apiList:UpdateAPI[]):BulkUpdateAPI {
        var api = new BulkUpdateAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
    }

    static bulk_update(context:APIContext, ...apiList:UpdateAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_update(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__bulk_delete(apiList:DeleteAPI[]):BulkDeleteAPI {
        var api = new BulkDeleteAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
    }

    static bulk_delete(context:APIContext, ...apiList:DeleteAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_delete(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__bulk_get(apiList:ListAPI[]):BulkListAPI {
        var api = new BulkListAPI();
        _.each(apiList, subApi=> {
            api.add(subApi)
        })
        return api;
    }

    static bulk_list(context:APIContext, ...apiList:ListAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_get(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__bulk_count(apiList:SearchCountAPI[]):BulkSearchCountAPI {
        var api = new BulkSearchCountAPI();
        _.each(apiList, subApi => {
            api.add(subApi)
        })
        return api;
    }

    static bulk_count(context:APIContext, ...apiList:SearchCountAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_count(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__bulk_search(apiList:SearchReadAPI[]):BulkSearchReadAPI {
        var api = new BulkSearchReadAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        })
        return api;
    }

    static bulk_search(context:APIContext, ...apiList:SearchReadAPI[]) {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__bulk_search(apiList), cloud_acc.id, cloud_acc.api_endpoint)
    }

    static __api__countAll(): SearchCountAPI {
        var model = this.Model;
        return new SearchCountAPI(model, "[]");
    }

    static countAll(context:APIContext):Observable<any> {
        var model = this.Model;
        if (Cache.hit(model))
            return Observable.of(Cache.load(model)).map(records=> {
                return records.length;
            });
        return this.count(context, "[]");
    }

    save(context: APIContext): Observable<any> {
        var cloud_acc = context.authService.CloudAcc;
        if (!this.id) {
            return context.apiService.execute(this.__api__create(), cloud_acc.id, cloud_acc.api_endpoint).map(data => {
                this.id = data.id;
                Cache.objectChage(this, 'CREATE');
                return this;
            });
        } else {
            return context.apiService.execute(this.__api__update(), cloud_acc.id, cloud_acc.api_endpoint).do(() => {
                Cache.objectChage(this, 'UPDATE');
            });
        }
    }  

    delete(context: APIContext): Observable<any> {
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__delete(), cloud_acc.id, cloud_acc.api_endpoint).do(() => {
            Cache.objectChage(this, 'DELETE');
        });
    }

    static get(context: APIContext, id: number): Observable<any> {
        if (!id)
            return Observable.of(null);
        var cloud_acc = context.authService.CloudAcc;
        var model = this.Model;
        return context.apiService.execute( this.__api__get([id]), cloud_acc.id, cloud_acc.api_endpoint).map(items => {
            items = this.toArray(items);
            if (items && items.length) {
                return items[0];
            } else
                return null;
        });
    }

    static toArray(jsonArr:any):any {
        var model = this.Model;
         return _.map(jsonArr, object=> {
            return MapUtils.deserializeModel(model, object);
        });
    }

    static count(context: APIContext, domain?: string): Observable<any[]> {
        if (!domain)
            domain = "[]";        
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__count(domain), cloud_acc.id, cloud_acc.api_endpoint);
    }

    static search(context: APIContext, fields: string[], domain: string): Observable<any[]> {
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__search( fields, domain), cloud_acc.id, cloud_acc.api_endpoint).map(objects => {
            return this.toArray(objects);
        });
    }

    static all(context: APIContext): Observable<any[]> {
        var model = this.Model;
        if (Cache.hit(model))
            return Observable.of(Cache.load(model))
        return this.search(context, [], '[]').do(records=> {
            Cache.save(model,records);
        });
    }

    static array(context: APIContext, ids: number[]): Observable<any[]> {
        if (ids.length == 0)
            return Observable.of([]);
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__get(ids), cloud_acc.id, cloud_acc.api_endpoint).map(objects => {
            return this.toArray(objects);
        });
    }

    static executeRemote(context: APIContext, method: string, paramsList: any[], paramsDict: any): Observable<any> {
        var model = this.Model;
        var cloud_acc = context.authService.CloudAcc;
        return context.apiService.execute(this.__api__excute(method, paramsList, paramsDict), cloud_acc.id, cloud_acc.api_endpoint);
    }

}
