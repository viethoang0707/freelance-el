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
import { SearchReadAPI, SearchAllAPI } from '../services/api/search-read.api';
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


    get IsNew() {
        return this.id != null;
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

    static __api__get(ids: any[]):ListAPI {
        var model = this.Model;
        return new ListAPI(model,ids, []);
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
        var model = this.Model;
        return new SearchAllAPI(model);
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

    static __api__bulk_update(apiList:UpdateAPI[]):BulkUpdateAPI {
        var api = new BulkUpdateAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
    }

    static __api__bulk_delete(apiList:DeleteAPI[]):BulkDeleteAPI {
        var api = new BulkDeleteAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
    }

    static __api__bulk_list(apiList:ListAPI[]):BulkListAPI {
        var api = new BulkListAPI();
        _.each(apiList, subApi=> {
            api.add(subApi)
        })
        return api;
    }

    static __api__bulk_count(apiList:SearchCountAPI[]):BulkSearchCountAPI {
        var api = new BulkSearchCountAPI();
        _.each(apiList, subApi => {
            api.add(subApi)
        })
        return api;
    }

    static __api__bulk_search(apiList:SearchReadAPI[]):BulkSearchReadAPI {
        var api = new BulkSearchReadAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        })
        return api;
    }

    static __api__countAll(): SearchCountAPI {
        var model = this.Model;
        return new SearchCountAPI(model, "[]");
    }

    static bulk_create(context:APIContext, ...apiList:CreateAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_create(apiList), token).do(jsonArr=> {
            var resp = _.flatten(jsonArr);
            for(var i=0;i<resp.length;i++) {
                var api = apiList[i];
                var object =  MapUtils.deserializeModel(api.params["model"], api.params["values"]);
                object["id"] == +resp[i]["id"];
                Cache.objectCreate(object);
            }
        });
    }

    static bulk_update(context:APIContext, ...apiList:UpdateAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_update(apiList), token).do(()=> {
            for(var i=0;i<apiList.length;i++) {
                var api = apiList[i];
                var object =  MapUtils.deserializeModel(api.params["model"], api.params["values"]);
                Cache.objectUpdate(object;
            }
        });
    }

    static bulk_delete(context:APIContext, ...apiList:DeleteAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_delete(apiList), token).do(()=> {
            for(var i=0;i<apiList.length;i++) {
                var api = apiList[i];
                Cache.objectDelete(api.params["model"], api.params["id"]);
            }
        });
    }

    static bulk_list(context:APIContext, ...apiList:ListAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_list(apiList), token).do(jsonArr=> {
            for(var i=0;i<apiList.length;i++) {
                var objArr = jsonArr[i];
                var api = apiList[i];
                var model = api.params["model"];
                _.each(objArr, jsonObj=> {
                    var object =  MapUtils.deserializeModel(model, jsonObj);
                    Cache.objectUpdate(object);
                });
            }
        });
    }

    static bulk_count(context:APIContext, ...apiList:SearchCountAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_count(apiList), token)
    }

    static bulk_search(context:APIContext, ...apiList:SearchReadAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_search(apiList), token).do(jsonArr=> {
            for(var i=0;i<apiList.length;i++) {
                var api = apiList[i];
                if (api instanceof SearchAllAPI) {
                    var objArr = jsonArr[i];
                    var model = api.params["model"];
                    var objects = _.map(objArr, jsonObj=> {
                        return MapUtils.deserializeModel(model, jsonObj);
                    });
                    Cache.save(model,objects);
                }
                
            }
        });
    }

    static countAll(context:APIContext):Observable<any> {
        var model = this.Model;
        if (Cache.hit(model))
            return Observable.of(Cache.load(model)).map(records=> {
                return records.length;
            });
        return this.count(context, "[]");
    }

    refresh(context: APIContext): Observable<any> {
        if (this.id) {
            return BaseModel.get(context, this.id).do(object=> {
                Object.assign(this, object);
                Cache.objectUpdate(this);
            });
        } else
            return Observable.of(this)

    }

    save(context: APIContext): Observable<any> {
        var token = context.authService.LoginToken;
        if (!this.id) {
            return context.apiService.execute(this.__api__create(), token).map(data => {
                this.id = data.id;
                Cache.objectCreate(this);
                return this;
            });
        } else {
            return context.apiService.execute(this.__api__update(),token).do(() => {
                Cache.objectUpdate(this);
            });
        }
    }  

    delete(context: APIContext): Observable<any> {
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__delete(), token).do(() => {
            Cache.objectDelete(this.Model, this.id);
        });
    }

    static single(context: APIContext, fields: string[], domain: string): Observable<any[]> {
        var model = this.Model;
        return this.search(context, fields, domain).map(objects => {
            var records = this.toArray(objects);
            if (records.length)
                return records[0];
            return null;
        });
    }

    static createArray(context: APIContext,objects:any): Observable<any> {
        var apiList = _.map(objects, (object:BaseModel) => {
            return object.__api__create();
        });
        return BaseModel.bulk_create(context, ...apiList);
    }

    static updateArray(context: APIContext,objects:any): Observable<any> {
        var apiList = _.map(objects, (object:BaseModel) => {
            return object.__api__update();
        });
        return BaseModel.bulk_update(context, ...apiList);
    }

    static deleteArray(context: APIContext,objects:any): Observable<any> {
        var apiList = _.map(objects, (object:BaseModel) => {
            return object.__api__delete();
        });
        return BaseModel.bulk_delete(context, ...apiList);
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
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__count(domain), token);
    }

    static search(context: APIContext, fields: string[], domain: string): Observable<any[]> {
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__search( fields, domain), token).map(objects => {
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

    static get(context: APIContext, id: number): Observable<any> {
        if (!id)
            return Observable.of(null);
        var model = this.Model;
        if (Cache.hit(model)) {
            var records = Cache.load(model);
            var record = _.find(records, obj=> {
                return obj["id"]==id;
            });
            if (record)
                return Observable.of(record);
        }
        return this.array(context,[id]).map(items => {
            items = this.toArray(items);
            if (items && items.length) {
                var record = items[0];
                Cache.objectUpdate(items);
                return record;
            } else
                return null;
        });
    }

    static array(context: APIContext, ids: number[]): Observable<any[]> {
        if (ids.length == 0)
            return Observable.of([]);
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__get(ids), token).map(objects => {
            return this.toArray(objects);
        });
    }

    static executeRemote(context: APIContext, method: string, paramsList: any[], paramsDict: any): Observable<any> {
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__excute(method, paramsList, paramsDict), token);
    }

}
