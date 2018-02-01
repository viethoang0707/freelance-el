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
        private eventManager: HomeEventManager,
        private cacheService: CacheService) {
        super();
    }

    ngOnInit() {
        this.company =  this.cacheService.UserCompany;
        this.credential = this.authService.StoredCredential;
        var user = this.authService.CurrentUser;
        if (user.login == 'admin' || user.is_admin) {
            this.model = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                {
                    label: 'Enrollment', icon: 'school',
                    items: [
                        { label: 'Course', routerLink: ['/enrollment/courses'] },
                        { label: 'Course group', routerLink: ['/enrollment/groups'] },
                        { label: 'Class', routerLink: ['/enrollment/classes'] },
                        { label: 'Member', routerLink: ['/enrollment/members'] }
                    ]
                },
                {
                    label: 'Assessment', icon: 'grade',
                    items: [
                        { label: 'Question banks', routerLink: ['/assessment/question/list'] },
                        { label: 'Question category', routerLink: ['/assessment/question-category/list'] },
                        { label: 'Exam', routerLink: ['/assessment/exam/list'] }
                    ]
                },
                {
                    label: 'Report', icon: 'pie_chart',
                    items: [
                        { label: 'Category', routerLink: ['/library/category/list'] },
                        { label: 'Item', routerLink: ['/library/item/list'] }
                    ]
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
        } else {
            this.model = [
                { label: 'My course', icon: 'school', routerLink: ['/lms/course'] },
                { label: 'Conference', icon: 'perm_phone_msg', routerLink: ['/conference'] },
                { label: 'My exam', icon: 'alarm_add', routerLink: ['/lms/exam'] },
                { label: 'Library', icon: 'local_library', routerLink: ['/library'] },
            ];
        }
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
