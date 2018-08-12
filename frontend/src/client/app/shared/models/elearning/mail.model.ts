import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';


@Model('mail.template')
export class Mail extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.name = undefined;
        this.subject = undefined;
        this.email_from = undefined;
        this.email_to =  undefined;
        this.body_html = undefined;
    }

    name: string;
    subject: string;
    email_from: string;
    email_to: string;
    body_html:string;


    static __api__getCourseRegisterTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning course registration')]");
    }

    getCourseRegisterTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning course registration')]")
    }

    static __api__getCourseOpenTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning course open')]");
    }

    getCourseOpenTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning course open')]")
    }

    static __api__getCourseCloseTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning course close')]");
    }

    getCourseCloseTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning course close')]")
    }

    static __api__getClassRegisterTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning class registration')]");
    }

    getClassRegisterTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning class registration')]")
    }

    static __api__getClassOpenTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning class open')]");
    }

    getClassOpenTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning class open')]")
    }

    static __api__getClassCloseTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning class close')]");
    }

    getClassCloseTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning class close')]")
    }

    static __api__getExamRegisterTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning exam registration')]");
    }

    getExamRegisterTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning exam registration')]")
    }

    static __api__getExamOpenTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning exam open')]");
    }

    getExamOpenTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning exam open')]")
    }

    static __api__getExamCloseTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning exam close')]");
    }

    getExamCloseTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning exam close')]")
    }

    static __api__getSurveyInvitationTemplate(): SearchReadAPI {
        return new SearchReadAPI(Mail.Model, [], "[('name','=','E-learning survey invitation')]");
    }

    getSurveyInvitationTemplate(context:APIContext):Observable<any> {
        return Mail.single(context, [], "[('name','=','E-learning survey invitation')]")
    }
}

