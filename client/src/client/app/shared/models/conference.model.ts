import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from './decorator';
import { APIContext } from './context';
import * as _ from 'underscore';

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

    static byClass(context:APIContext, classId: number):Observable<any> {
        return Conference.search(context,[],"[('class_id','=',"+classId+")]")
        .map(conferences => {
            if (conferences.length)
                return conferences[0];
            else
                return null;
        });
    }
}