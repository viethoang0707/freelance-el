import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { Room } from '../meeting/room.model';
import * as _ from 'underscore';
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

    static __api__byClass(classId: number): SearchReadAPI {
        return new SearchReadAPI(Conference.Model, [],"[('class_id','=',"+classId+")]");
    }

    static byClass(context:APIContext, classId: number):Observable<any> {
        return Conference.search(context,[],"[('class_id','=',"+classId+")]")
        .map(conferences => {
            if (conferences.length)
                return conferences[0];
            else
                return null;
        });
    }

    static __api__listOpenConference(classId: number): SearchReadAPI {
        return new SearchReadAPI(Conference.Model, [],"[('status','=','open')]");
    }

    static listOpenConference(context:APIContext):Observable<any> {
        return Conference.search(context,[],"[('status','=','open')]");
    }
}