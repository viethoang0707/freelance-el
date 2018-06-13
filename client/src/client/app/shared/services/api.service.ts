import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseAPI } from './api/base.api';
import { LoadingService } from './loading.service';

@Injectable()
export class APIService {
    constructor(private http: Http, private loadingService: LoadingService) { }

    execute(api: BaseAPI,cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var params = api.params;
        params["cloudid"] = cloudid;
        var endpoint = api_endpoint + api.Method;
        this.loadingService.start();
        return this.http.post(endpoint, JSON.stringify(params), options)
            .map((response: Response) => response.json()).do(()=> {
                this.loadingService.finish();
            });
    }


}
