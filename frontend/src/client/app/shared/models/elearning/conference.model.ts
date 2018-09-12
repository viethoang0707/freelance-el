import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { ListAPI } from '../../services/api/list.api';
import { ExecuteAPI } from '../../services/api/execute.api';
import { SearchReadAPI } from '../../services/api/search-read.api';

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
    }

    class_id: number;
    room_ref: string;
    room_pass: string;
    status: string;
    name: string;

    static __api__listMembers(conferenceId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ConferenceMember.Model,fields,"[('conference_id','=',"+conferenceId+")]");
    }

    listMembers( context:APIContext,fields?:string[]): Observable<any[]> {
        return ConferenceMember.search(context,fields,"[('conference_id','=',"+this.id+")]");
    }

    static __api__registerCnferenceMember(conferenceId: number, memberIds:number[]): ExecuteAPI {
        return new ExecuteAPI(Conference.Model, 'register_conference_member',{conferenceId:conferenceId, memberIds:memberIds}, null);
    }

    registerConferenceMember(context:APIContext, courseMemberIds: number[]):Observable<any> {
        return context.apiService.execute(Conference.__api__registerCnferenceMember(this.id,courseMemberIds), 
            context.authService.LoginToken);
    }

}