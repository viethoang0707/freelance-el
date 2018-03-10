import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class APIService {
    constructor(private http: Http) { }

    cloudInfo(code:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Config.CLOUD_ENDPOINT + '/cloud/account', JSON.stringify({code: code }), options)
            .map((response: Response) => response.json());
    }

    login(username: string, password: string, cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/login', JSON.stringify({ username: username, password: password, cloudid: cloudid }), options)
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

    update(model:string, id:number, object:any,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/update', JSON.stringify({ model: model, values:object, id:id, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    delete(model:string, id:number,  cloudid:number, api_endpoint:string):Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/delete', JSON.stringify({ model: model, id:id, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    search(model:string, fields:string[], domain:string,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/search_read', JSON.stringify({ model: model,fields:fields, domain: domain, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    count(model:string, domain:string,cloudid:number, api_endpoint:string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/search_count', JSON.stringify({ model: model, domain: domain, cloudid: cloudid  }), options)
            .map((response: Response) => response.json());
    }

    get(model:string, id:number, fields:string[], cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/read', JSON.stringify({ model: model,fields:fields, ids:[id], cloudid: cloudid  }), options)
            .map((response: Response) => response.json()[0]);
    }

    list(model:string, ids:number[], fields:string[], cloudid:number, api_endpoint:string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(api_endpoint + '/api/read', JSON.stringify({ model: model,fields:fields, ids:ids, cloudid: cloudid  }), options)
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

    upload(file: any, cloudid: number):Observable<any>{
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('cloudid', cloudid.toString());
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
       // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${Config.CLOUD_ENDPOINT}/cloud/file`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }
}
