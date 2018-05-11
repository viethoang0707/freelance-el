import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { Ticket } from '../../shared/models/ticket/ticket.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import {SelectItem, MenuItem} from 'primeng/api';
import * as _ from 'underscore';
import { TabPanel } from 'primeng/tabview';

@Component({
    moduleId: module.id,
    selector: 'ticket-dialog',
    templateUrl: 'ticket-dialog.component.html',
})
export class TicketDialog extends BaseDialog<Ticket> {


    constructor() {
        super();
    }

    ngOnInit() {
        this.onShow.subscribe(object => {

            });
        });  
    }



}


