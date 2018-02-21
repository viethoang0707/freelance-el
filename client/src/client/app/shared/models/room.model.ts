import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from './decorator';
import { APIContext } from './context';
import * as _ from 'underscore';

@Model('emeeting.room')
export class Room extends BaseModel{

    constructor(){
        super();
        
        this.category = undefined;
        this.name = undefined;
        this.ref = undefined;
        this.password = undefined;

    }

    category: string;
    name: string;
    ref: string;
    password: string;

    static byRef(context:APIContext, ref: string):Observable<any> {
        return Room.search(context,[],"[('ref','=','"+ref+"')]")
        .map(rooms => {
            if (rooms.length)
                return rooms[0];
            else
                return null;
        });
    }
}
