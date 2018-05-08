import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

@Model('eticket.room')
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
    }

    title: string;
    content: string;
    status: string;
    submit_user_id: number;
    approve_user_id: number;
    submit_user_id__DESC__: string;
    approve_user_id__DESC__: string;
    @FieldProperty<Date>()
    date_open: Date;
    @FieldProperty<Date>()
    date_close: Date;
}
