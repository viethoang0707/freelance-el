import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('eticket.notification')
export class Notification extends BaseModel{

    constructor(){
        super();
        
        this.title = undefined;
        this.target_user_id = undefined;
        this.target_user_id__DESC__ = undefined;
        this.date_open = undefined;
        this.ticket_id = undefined;
    }

    title: string;
    ticket_id: number;
    target_user_id: number;
    target_user_id__DESC__: string;
    @FieldProperty<Date>()
    date_open: Date;

    static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Notification.Model, [],"[('target_user_id','=',"+userId+")]");
    }
    
    static listByUser(context:APIContext, userId):Observable<any> {
        return Notification.search(context,[], "[('target_user_id','=',"+userId+")]");
    }
}
