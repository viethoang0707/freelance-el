import { Component, OnDestroy } from '@angular/core';
import { HomeComponent } from '../home.component';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'etraining-breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            console.log('Sub',response);
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
