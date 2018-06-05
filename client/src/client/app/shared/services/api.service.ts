import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';


@Injectable()
export class APIService {
    constructor(private http: Http) { }


    login(username: string, password: string, cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/login', JSON.stringify({username: username, password: password, cloudid: cloudid}), options)
            .map((response: Response) => response.json());
    }

    resetPass(email: string, cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/resetpass', JSON.stringify({ email: email, cloudid: cloudid }), options)
            .map((response: Response) => response.json());
    }

    changePass(user_id: number, old_pass: string, new_pass:string,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/changepass', JSON.stringify({ user_id: user_id, old_pass: old_pass, new_pass: new_pass, cloudid: cloudid }), options)
            .map((response: Response) => response.json());
    }

    create(model:string, object:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/create', JSON.stringify({ model: model, values:object, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_create(stacks:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_create', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    update(model:string, id:number, object:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/update', JSON.stringify({ model: model, values:object, id:id, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_update(stacks:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_update', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    delete(model:string, id:number,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/delete', JSON.stringify({ model: model, id:id, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_delete(stacks:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_delete', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    search(model:string, fields:string[], domain:string,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/search_read', JSON.stringify({ model: model,fields:fields, domain: domain, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_search(stacks:any,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_search_read', JSON.stringify({stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    count(model:string, domain:string,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/search_count', JSON.stringify({ model: model, domain: domain, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_count(stacks:any,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_search_count', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    get(model:string, id:number, fields:string[], cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/read', JSON.stringify({ model: model,fields:fields, ids:[id], cloudid: cloudid  }), options)
            .map((response: Response) => response.json()[0]);
    }

    bulk_get(stacks:any, cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/bulk_read', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json()[0]);
    }

    list(model:string, ids:number[], fields:string[], cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/read', JSON.stringify({ model: model,fields:fields, ids:ids, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    bulk_list(stacks:any, cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/read', JSON.stringify({ stacks:stacks, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    execute(model:string, method :string, paramList: string[], paramdDict: any , cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/execute', JSON.stringify({ model: model, method: method, paramList: paramList, paramdDict: paramdDict, cloudid: cloudid  }), options)
            .map((response: Response) => {
                return response.json();
            });
    }

}
