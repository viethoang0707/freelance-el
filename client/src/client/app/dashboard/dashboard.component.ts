import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { HomeEventManager } from '../home/home-manager.service';

@Component({
    moduleId: module.id,
    selector: 'etraining-dashboard',
    templateUrl: 'dashboard.component.html'

})
export class DashboardComponent extends BaseComponent implements OnInit{

    isAdmin:boolean;

    constructor(private eventManager: HomeEventManager) {
        super();
        this.isAdmin = this.settingService.adminMode;
    }

    ngOnInit() {
    	this.settingService.adminModeEvents.subscribe((adminMode:boolean) => {
            this.isAdmin = adminMode;
        });
    }

}

