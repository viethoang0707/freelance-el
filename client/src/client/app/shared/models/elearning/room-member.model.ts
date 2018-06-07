import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('emeeting.member')
export class RoomMember extends BaseModel{

    constructor(){
        super();
        
        this.avatar = undefined;
        this.name = undefined;
        this.ref = undefined;
        this.email = undefined;
        this.room_id = undefined;
    }

    avatar: string;
    name: string;
    ref: string;
    email: string;
    room_id: number;

    static byRef(context:APIContext, ref: string):Observable<any> {
        return RoomMember.search(context,[],"[('ref','=','"+ref+"')]")
        .map(members => {
            if (members.length)
                return members[0];
            else
                return null;
        });
    }

}