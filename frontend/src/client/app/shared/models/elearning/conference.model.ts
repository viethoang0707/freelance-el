import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ExecuteAPI } from '../../services/api/execute.api';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';

@Model('etraining.conference')
export class Conference extends BaseModel{

    constructor(){
        super();
        this.class_id = undefined;
        this.room_ref = undefined;
        this.name = undefined;
        this.status = undefined;
        this.room_pass = undefined;
    }

    class_id: number;
    room_ref: string;
    room_pass: string;
    status: string;
    name: string;

    static __api__listOpenConference(classId: number): SearchReadAPI {
        return new SearchReadAPI(Conference.Model, [],"[('status','=','open')]");
    }

    static listOpenConference(context:APIContext):Observable<any> {
        return Conference.search(context,[],"[('status','=','open')]");
    }

    __api__open(conferenceId: number): ExecuteAPI {
        return new ExecuteAPI(Conference.Model, 'open',{conferenceId:conferenceId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__open(this.id), 
            context.authService.LoginToken);
    }

    __api__close(conferenceId: number): ExecuteAPI {
        return new ExecuteAPI(Conference.Model, 'close',{conferenceId:conferenceId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(this.__api__close(this.id), 
            context.authService.LoginToken);
    }
}