

import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


export class InterceptHttp extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    post(url: string , data: string, options: RequestOptions): Observable<Response> {
        return super.post(url, data, options).catch((error: Response) => {
            if (error.status >=400 ) {
                console.log(error);
            }
            return Observable.throw(error);
        });
    }

}
