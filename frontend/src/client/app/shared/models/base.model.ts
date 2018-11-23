import  '../helpers/reflect';
import { APIContext } from './context';
import { MapUtils } from '../helpers/map.utils';
import { Observable, Subject } from 'rxjs/Rx';
import { MODEL_METADATA_KEY, UNSERIALIZE_METADATA_KEY,ModelRegister, FieldProperty } from './decorator';
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
import { BulkExecuteAPI } from '../services/api/bulk-execute.api';


export abstract class BaseModel {
    id: number;
    @FieldProperty<Date>()
    create_date: Date;
    @FieldProperty<Date>()
    write_date: Date;
    create_uid: number;
    write_uid: number;
    active: boolean;

    constructor() {
        this.id = undefined;
        this.active = undefined;
        this.create_date = undefined;
        this.create_uid = undefined;
        this.write_date = undefined;
        this.write_uid = undefined;
    }

    static fields(model:string):string[] {
        var fieldArr = []; 
        let obj:any = ModelRegister.Instance.instantiateObject(model);
        Object.keys(obj).forEach((key) => {
            let unserializeMetadata = Reflect.getMetadata(UNSERIALIZE_METADATA_KEY, obj, key);
            if (!unserializeMetadata)
                fieldArr.push(key);
        });
        return fieldArr;
    }


    get IsNew() {
        return this.id == null;
    }

    get Exist() {
        return this.id != null;
    }

    static get Model(): string {
        return Reflect.getMetadata(MODEL_METADATA_KEY, this);
    }

    get Model(): string {
        return Reflect.getMetadata(MODEL_METADATA_KEY, this.constructor);
    }

    __api__create(fields?:string[]):CreateAPI {
        var model = this.Model;
        return new CreateAPI(model, MapUtils.serialize(this,fields));
    }

    __api__update(fields?:string[]):UpdateAPI {
        var model = this.Model;
        return new UpdateAPI(model, this.id, MapUtils.serialize(this,fields));
    }

    __api__delete():DeleteAPI {
        var model = this.Model;
        return new DeleteAPI(model, this.id);
    }

    static __api__get(ids: any[], fields?:string[]):ListAPI {
        var model = this.Model;
        return new ListAPI(model,ids,fields);
    }


    static __api__count(domain?: string):SearchCountAPI {
        var model = this.Model;
        return new SearchCountAPI(model, domain);
    }

    static __api__search(fields: string[], domain: string,limit?:any, offset?:any, order?:any):SearchReadAPI {
        var model = this.Model;
        return new SearchReadAPI(model, fields, domain,limit,offset,order);
    }

    static __api__all(fields?:string[]):SearchReadAPI {
        var model = this.Model;
        return new SearchAllAPI(model,fields);
    }

    static __api__excute(method: string, paramsList: string[], paramsDict: any):ExecuteAPI {
        var model = this.Model;
        return new ExecuteAPI(model, method, paramsList,paramsDict);
    }

    static __api__bulk_execute(apiList:ExecuteAPI[]):BulkExecuteAPI {
        var api = new BulkExecuteAPI();
        _.each(apiList, subApi=> {
            api.add(subApi);
        });
        return api;
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
        return context.apiService.execute(this.__api__bulk_create(apiList), token).map(jsonArr=> {
            var objects = [];
            var resp = _.flatten(jsonArr);
            for(var i=0;i<resp.length;i++) {
                var api = apiList[i];
                var object =  MapUtils.deserializeModel(api.params["model"], resp[i]["record"]);
                objects.push(object);
            }
            return objects;
        });
    }

    static bulk_execute(context:APIContext, ...apiList:ExecuteAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_execute(apiList), token).map(jsonArr=> {
            var resp = _.flatten(jsonArr);
            return resp;
        });
    }

    static toObject(vals) {
        var model = this.Model;
        return MapUtils.deserializeModel(model, vals);
    }

    static bulk_update(context:APIContext, ...apiList:UpdateAPI[]):Observable<any> {
        if (apiList.length==0)
            return Observable.of([]);
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__bulk_update(apiList), token).do(()=> {
            for(var i=0;i<apiList.length;i++) {
                var api = apiList[i];
                var object =  MapUtils.deserializeModel(api.params["model"], api.params["values"]);
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
                }
                
            }
        });
    }

    static countAll(context:APIContext):Observable<any> {
        var model = this.Model;
        return this.count(context, "[]");
    }

    populate(context: APIContext, fields?:string[]): Observable<any> {
        if (this.id) {
            var getApi = new ListAPI(this.Model, [this.id],fields);
            var token = context.authService.LoginToken;
            return context.apiService.execute(getApi, 
                token).do(items=> {
                var object = MapUtils.deserializeModel(this.Model, items[0]);
                Object.assign(this, object);
            });
        } else
            return Observable.of(this)
    }

    static populateArray(context: APIContext, objects:BaseModel[],fields?:string[]): Observable<any> {
        if (objects.length) {
            var objectIds = _.pluck(objects, 'id');
            var model = this.Model;
            var token = context.authService.LoginToken;
            return context.apiService.execute(this.__api__get(objectIds,fields), token).do(arr => {
                var objectArr =  this.toArray(arr);
                for (var i=0;i<objects.length; i++) {
                    var populatedObj = MapUtils.deserializeModel(model, objectArr[i]);
                    Object.assign(objects[i], populatedObj);
                }
            });
        } else
            return Observable.of([])
    }

    save(context: APIContext, fields?:string[]): Observable<any> {
        var token = context.authService.LoginToken;
        if (!this.id) {
            return context.apiService.execute(this.__api__create(fields), token).map(data => {
                var object = MapUtils.deserializeModel(this.Model, data.record);
                Object.assign(this, object);
                return this;
            });
        } else {
            return context.apiService.execute(this.__api__update(fields),token).do(() => {
            });
        }
    }  

    delete(context: APIContext): Observable<any> {
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__delete(), token).do(() => {
        });
    }

    static single(context: APIContext, fields: string[], domain: string): Observable<any> {
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

    static updateArray(context: APIContext,objects:any,fields?:string[]): Observable<any> {
        var apiList = _.map(objects, (object:BaseModel) => {
            return object.__api__update(fields);
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

    static search(context: APIContext, fields: string[], domain: string,limit?:any, offset?:any, order?:any): Observable<any[]> {
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__search( fields, domain, limit, offset, order), token).map(objects => {
            return this.toArray(objects);
        });
    }

    static all(context: APIContext,fields?: string[]): Observable<any[]> {
        var model = this.Model;
        return this.search(context, fields, '[]');
    }

    static get(context: APIContext, id: number,fields?: string[]): Observable<any> {
        if (!id)
            return Observable.of(null);
        var model = this.Model;
        return this.array(context,[id],fields).map(items => {
            items = this.toArray(items);
            if (items && items.length) {
                var record = items[0];
                return record;
            } else
                return null;
        });
    }

    static array(context: APIContext, ids: number[],fields?: string[]): Observable<any[]> {
        if (ids.length == 0)
            return Observable.of([]);
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__get(ids,fields), token).map(objects => {
            return this.toArray(objects);
        });
    }

    static executeRemote(context: APIContext, method: string, paramsList: any[], paramsDict: any): Observable<any> {
        var model = this.Model;
        var token = context.authService.LoginToken;
        return context.apiService.execute(this.__api__excute(method, paramsList, paramsDict), token);
    }

}
