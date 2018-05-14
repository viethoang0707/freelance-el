import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

@Model('eticket.ticket')
export class Ticket extends BaseModel{

    constructor(){
        super();
        
        this.title = undefined;
        this.content = undefined;
        this.status = undefined;
        this.submit_user_id = undefined;
        this.approve_user_id = undefined;
        this.submit_user_id__DESC__ = undefined;
        this.approve_user_id__DESC__ = undefined;
        this.date_open = undefined;
        this.date_close = undefined;
        this.res_model =  undefined;
        this.res_id = undefined;
    }

    title: string;
    content: string;
    status: string;
    res_id: number;
    res_model: string;
    submit_user_id: number;
    approve_user_id: number;
    submit_user_id__DESC__: string;
    approve_user_id__DESC__: string;
    @FieldProperty<Date>()
    date_open: Date;
    @FieldProperty<Date>()
    date_close: Date;

    static listByApproveUser(context:APIContext, userId):Observable<any> {
        return Ticket.search(context,[], "[('approve_user_id','=',"+userId+")]");
    }

    static listBySubmitUser(context:APIContext, userId):Observable<any> {
        return Ticket.search(context,[], "[('submit_user_id','=',"+userId+")]");
    }

    static byWorkflowObject(context:APIContext, id: number, model: string):Observable<any> {
        return Ticket.search(context,[],"[('res_id','=',"+id+"),('res_model','=','"+model+"'),('status','=','open')]")
        .map(tickets => {
            if (tickets.length)
                return tickets[0];
            else
                return null;
        });
    }


}
