import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { Credential } from '../../shared/models/credential.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Company } from '../../shared/models/company.model';
import { CacheService } from '../../shared/services/cache.service';
declare var jQuery: any;


@Component({
    moduleId: module.id,
    selector: 'etraining-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class SideMenuComponent extends BaseComponent implements OnInit {

    @Input() reset: boolean;
    company: Company;
    model: any[];
    credential: Credential
    layoutMenuScroller: HTMLDivElement;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public app: HomeComponent, 
        private eventManager: HomeEventManager) {
        super();
    }

    ngOnInit() {
        this.company =  this.cacheService.UserCompany;
        if (this.settingService.adminMode) {
            this.setAdminMenu();
        } else {
            this.setUserMenu();
        }

        this.settingService.adminModeEvents.subscribe((adminMode:boolean) => {
            if (adminMode)
                this.setAdminMenu();
            else
                this.setUserMenu();
        });
    }

    setAdminMenu() {
        this.model = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                {
                    label: 'Enrollment', icon: 'school',
                    items: [
                        { label: 'Course', routerLink: ['/enrollment/courses'] },
                        { label: 'Course group', routerLink: ['/enrollment/groups'] },
                        { label: 'Class', routerLink: ['/enrollment/classes'] },
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
                    label: 'Report', icon: 'pie_chart',routerLink: ['/reports']
                },
                {
                    label: 'Accounts', icon: 'people',
                    items: [
                        { label: 'User', routerLink: ['/account/users'] },
                        { label: 'Group', routerLink: ['/account/groups'] }
                    ]
                },
                {
                    label: 'Setting', icon: 'settings',
                    items: [
                        { label: 'Application', routerLink: ['/setting/app'] },
                        { label: 'Mail', routerLink: ['/setting/mail'] }
                    ]
                }
            ];
    }

    setUserMenu() {
        this.model = [
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
