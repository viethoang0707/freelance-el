import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';

@Model('eticket.notification')
export class Comment extends BaseModel{

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
}
