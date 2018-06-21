import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Submission } from './submission.model';
import { Answer } from './answer.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

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

    static __api__byRef(ref: string): SearchReadAPI {
        return new SearchReadAPI(Room.Model, [],"[('ref','=',"+ref+")]");
    }

    static byRef(context:APIContext, ref: string):Observable<any> {
        return Room.single(context,[],"[('ref','=','"+ref+"')]");
    }
}
