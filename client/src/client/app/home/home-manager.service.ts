

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class HomeEventManager {
    private showProfileEventReceiver: Subject<any> = new Subject();
    private changePasswordEventReceiver: Subject<any> = new Subject();
    private logoutEventReceiver: Subject<any> = new Subject();
    private menuEventReceiver: Subject<any> = new Subject();
    private topbarMenuEventReceiver: Subject<any> = new Subject();
    private topbarMobileMenuEventReceiver: Subject<any> = new Subject();
    private topbarRootItemEventReceiver: Subject<any> = new Subject();
    private sidebarEventReceiver: Subject<any> = new Subject();
    private toggleMenuEventReceiver: Subject<any> = new Subject();
    private switchViewModeEventReceiver: Subject<any> = new Subject();

    showProfileEvents:Observable<any> =  this.showProfileEventReceiver.asObservable();
    changePasswordEvents:Observable<any> =  this.changePasswordEventReceiver.asObservable();
    logoutEvents:Observable<any> =  this.logoutEventReceiver.asObservable();
    topbarMenuEvents:Observable<any> =  this.topbarMenuEventReceiver.asObservable();
    topbarMobileMenuEvents:Observable<any> =  this.topbarMobileMenuEventReceiver.asObservable();
    menuEvents:Observable<any> =  this.menuEventReceiver.asObservable();
    topbarRootItemEvents:Observable<any> =  this.topbarRootItemEventReceiver.asObservable();
    sidebarEvents:Observable<any> =  this.sidebarEventReceiver.asObservable();
    toggleMenuEvents:Observable<any> =  this.toggleMenuEventReceiver.asObservable();
    switchViewModeEvents:Observable<any> =  this.switchViewModeEventReceiver.asObservable();


    showProfile() {
        this.showProfileEventReceiver.next();
    }

    changePassword() {
        this.changePasswordEventReceiver.next();
    }

    logout() {
        this.logoutEventReceiver.next();
    }

    topbarMenuClick() {
        this.topbarMenuEventReceiver.next();
    }

    topbarMobileMenuClick() {
        this.topbarMobileMenuEventReceiver.next();
    }

    menuClick() {
        this.menuEventReceiver.next();
    }

    topbarRootItemClick(profile) {
        this.topbarRootItemEventReceiver.next(profile);
    }

    sidebarClick() {
        this.sidebarEventReceiver.next();
    }

    toggleMenuClick() {
        this.toggleMenuEventReceiver.next();
    }

    swithViewMode(isAdmin:boolean) {
        this.switchViewModeEventReceiver.next(isAdmin);
    }


}
