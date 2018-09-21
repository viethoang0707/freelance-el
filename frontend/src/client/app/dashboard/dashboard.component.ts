import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent extends BaseComponent implements OnInit{

    private viewMode:string;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.settingService.viewModeEvents.subscribe((mode:string) => {
            this.viewMode = mode;
            if (this.viewMode =='admin')
                this.router.navigate(['/dashboard/admin']);
            else
                this.router.navigate(['/dashboard/lms']);
        });
    }

    ngOnInit() {
        this.viewMode = this.settingService.ViewMode;
        if (this.viewMode =='admin')
            this.router.navigate(['/dashboard/admin']);
        else
            this.router.navigate(['/dashboard/lms']);
    }

}

