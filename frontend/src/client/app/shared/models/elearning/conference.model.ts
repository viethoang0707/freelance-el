import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { ConferenceMember } from './conference-member.model';

@Model('etraining.conference')
export class Conference extends BaseModel{

    constructor(){
        super();
        this.class_id = undefined;
        this.room_ref = undefined;
        this.name = undefined;
        this.status = undefined;
        this.room_pass = undefined;
        this.member_ids = [];
    }

    class_id: number;
    room_ref: string;
    room_pass: string;
    status: string;
    name: string;
    member_ids: number[];

    static __api__listMembers(member_ids: number[]): ListAPI {
        return new ListAPI(ConferenceMember.Model, member_ids,[]);
    }

    listMembers( context:APIContext): Observable<any[]> {
        return ConferenceMember.array(context,this.member_ids);
    }

    static __api__open(conferenceId: number): ExecuteAPI {
        return new ExecuteAPI(Conference.Model, 'open',{conferenceId:conferenceId}, null);
    }

    open(context:APIContext):Observable<any> {
        return context.apiService.execute(Conference.__api__open(this.id), 
            context.authService.LoginToken);
    }

    static __api__close(conferenceId: number): ExecuteAPI {
        return new ExecuteAPI(Conference.Model, 'close',{conferenceId:conferenceId}, null);
    }

    close(context:APIContext):Observable<any> {
        return context.apiService.execute(Conference.__api__close(this.id), 
            context.authService.LoginToken);
    }
}