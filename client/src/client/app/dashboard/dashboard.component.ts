import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-dashboard',
    templateUrl: 'dashboard.component.html'

})
export class DashboardComponent extends BaseComponent{

    isAdmin:boolean;

    constructor() {
        super();
        this.isAdmin =  this.authService.CurrentUser.is_admin || this.authService.CurrentUser.login=='admin'
    }

}

