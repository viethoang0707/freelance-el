import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { HomeEventManager } from '../home-manager.service';
import { HomeComponent } from '../home.component';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Token } from '../../shared/models/cloud/token.model';
import { SettingService } from '../../shared/services/setting.service';
import { MenuService } from '../../shared/services/menu.service';
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
    private menu: any[];
    private layoutMenuScroller: HTMLDivElement;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public app: HomeComponent, private menuService: MenuService,
        private eventManager: HomeEventManager) {
        super();
        this.settingService.viewModeEvents.subscribe(mode => {
            this.reset = true;
            if (mode == 'admin')
                this.setAdminMenu();
            else
                this.setUserMenu();
        });
    }

    ngOnInit() {
        if (this.settingService.ViewMode == 'admin')
            this.setAdminMenu();
        else
            this.setUserMenu();
    }

    setAdminMenu() {
        this.menu = this.menuService.adminMenu();
    }

    setUserMenu() {
        this.menu = this.menuService.userMenu();
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
