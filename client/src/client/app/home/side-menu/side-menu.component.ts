import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CloudAccount } from '../../shared/models/cloud/cloud-account.model';
import { CacheService } from '../../shared/services/cache.service';
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'app-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SideMenuComponent extends BaseComponent implements OnInit {

    @Input() reset: boolean;
    account: CloudAccount;
    menu: any[];
    layoutMenuScroller: HTMLDivElement;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public app: HomeComponent, 
        private eventManager: HomeEventManager) {
        super();
        this.settingService.viewModeEvents.subscribe(mode => {
            if (mode=='admin')
                this.setAdminMenu();
            else
                this.setUserMenu();
        });
    }

    ngOnInit() {
        this.account =  this.authService.CloudAcc;
        if (this.settingService.ViewMode =='admin')
                this.setAdminMenu();
            else
                this.setUserMenu();
    }

    setAdminMenu() {
        this.menu = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                {
                    label: 'Syllabus', icon: 'school',
                    items: [
                        { label: 'Course', routerLink: ['/course/courses'] },
                        { label: 'Course group', routerLink: ['/course/groups'] },
                    ]
                },
                {
                    label: 'Assessment', icon: 'grade',
                    items: [
                        { label: 'Question banks', routerLink: ['/assessment/questions'] },
                        { label: 'Question category', routerLink: ['/assessment/groups'] },
                        { label: 'Exam', routerLink: ['/assessment/exams'] }
                    ]
                },
                {
                    label: 'Analysis', icon: 'pie_chart',
                    items: [
                        { label: 'Report', routerLink: ['/analysis/reports'] },
                        { label: 'Chart', routerLink: ['/analysis/charts'] },
                    ]
                },
                {
                    label: 'Accounts', icon: 'people',
                    items: [
                        { label: 'User', routerLink: ['/account/users'] },
                        { label: 'Group', routerLink: ['/account/groups'] },
                        { label: 'Permission', routerLink: ['/account/permissions'] }
                    ]
                }
            ];
    }

    setUserMenu() {
        this.menu = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                { label: 'My course', icon: 'school', routerLink: ['/lms/courses'] },
                { label: 'My exam', icon: 'alarm_add', routerLink: ['/lms/exams'] },
                { label: 'Conference', icon: 'perm_phone_msg', routerLink: ['/lms/meetings'] },
            ];
    }


    ngAfterViewInit() {
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    }


    updateNanoScroll() {
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller();
        }, 500);
    }

    ngOnDestroy() {
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }
}
