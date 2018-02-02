import { Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/user.model';
import * as _ from 'underscore';
import { USER_STATUS } from '../../../shared/models/constants'

@Component({
    moduleId: module.id,
    selector: 'etraining-user-by-group-report',
    templateUrl: 'user-by-group-report.component.html',
})
export class UserByGroupReportComponent extends BaseComponent{

    constructor() {
        super();
    }

    

}
