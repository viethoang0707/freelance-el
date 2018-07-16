import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomTranslationLoader implements TranslateLoader {

	constructor(private http: Http) {}

    public getTranslation(lang: string): any {
        return this.http.get(`/assets/i18n/${lang}.json`)
            .map((res: Response) => res.json());
    }


}