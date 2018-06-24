import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.ticket')
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
        this.code = undefined;
    }

    title: string;
    content: string;
    status: string;
    code:string;
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

    static __api__byWorkflowObject(id: number, model: string): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('res_id','=',"+id+"),('res_model','=','"+model+"'),('status','=','open')]");
    }

    static __api__listByApproveUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('approve_user_id','=',"+userId+")]");
    }

    static __api__listBySubmitUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('submit_user_id','=',"+userId+")]");
    }

    static listByApproveUser(context:APIContext, userId:number):Observable<any> {
        return Ticket.search(context,[], "[('approve_user_id','=',"+userId+")]");
    }

    static __api__listPendingBySubmitUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Ticket.Model, [],"[('submit_user_id','=',"+userId+"),('status','=','pending')]");
    }

    static listPendingByApproveUser(context:APIContext, userId:number):Observable<any> {
        return Ticket.search(context,[], "[('approve_user_id','=',"+userId+"),('status','=','pending')]");
    }

    static listBySubmitUser(context:APIContext, userId:number):Observable<any> {
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
