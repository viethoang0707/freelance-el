import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { HomeEventManager } from '../home/home-manager.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'

})
export class DashboardComponent extends BaseComponent implements OnInit{

    private viewMode:string;

    constructor(private eventManager: HomeEventManager) {
        super();
        this.settingService.viewModeEvents.subscribe((mode:string) => {
            this.viewMode = mode;
        });
    }

    ngOnInit() {
    	this.viewMode = this.settingService.ViewMode;
    }

}

