import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('eticket.comment')
export class Comment extends BaseModel{

    constructor(){
        super();
        
        this.content = undefined;
        this.submit_user_id = undefined;
        this.submit_user_id__DESC__ = undefined;
        this.date_submit = undefined;
        this.ticket_id = undefined;
    }

    content: string;
    ticket_id: number;
    submit_user_id: number;
    submit_user_id__DESC__: string;
    @FieldProperty<Date>()
    date_submit: Date;

    static __api__listByTicket(ticketId: number): SearchReadAPI {
        return new SearchReadAPI(Comment.Model, [],"[('ticket_id','=',"+ticketId+")]");
    }

    static listByTicket(context:APIContext, ticketId):Observable<any> {
        return Comment.search(context,[], "[('ticket_id','=',"+ticketId+")]");
    }
}
