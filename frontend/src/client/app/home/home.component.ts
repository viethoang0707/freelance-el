import { Component, ElementRef, Renderer, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { BaseComponent } from '../shared/components/base/base.component';
import * as _ from 'underscore';
import { HomeEventManager } from './home-manager.service';
import { AppEventManager } from '../shared/services/app-event-manager.service';
import { UserLog } from '../shared/models/elearning/log.model';
import { Group } from '../shared/models/elearning/group.model';
import { BaseModel } from '../shared/models/base.model';
import { User } from '../shared/models/elearning/user.model';
import { MenuService } from '../shared/services/menu.service';
import { SettingDialog } from '../setting/setting-dialog.component';
import { UserProfileDialog } from '../account/user/user-form/profile-dialog.component';
import { ChangePasswordDialog } from '../account/user/change-password/change-password-dialog.component';
import { UserViewDialogComponent } from '../account/user/user-view/user-view.dialog.component';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {

    @ViewChild(SettingDialog) settingDialog: SettingDialog;
    @ViewChild(UserViewDialogComponent) profieDialog: UserViewDialogComponent;
    @ViewChild(ChangePasswordDialog) changePassDialog: ChangePasswordDialog;

    menuClick: boolean;
    menuButtonClick: boolean;
    topbarMenuButtonClick: boolean;
    topbarMenuClick: boolean;
    topbarMenuActive: boolean;
    activeTopbarItem: Element;
    layoutStatic: boolean;
    sidebarActive: boolean;
    mobileMenuActive: boolean;
    darkMenu: boolean;

    constructor( private router: Router, private menuService: MenuService,
        private eventManager :HomeEventManager) {
        super();
        this.appEvent.onTokenExpired.first().subscribe(()=> {
            this.warn('Your token has been expired');
            this.authService.logout();
            this.router.navigate(['/auth']);
        });
        this.appEvent.onLogout.first().subscribe(()=> {
            UserLog.logout(this, this.ContextUser.id).subscribe();
            this.authService.logout();
            this.router.navigate(['/auth']);
        });
        this.appEvent.onLogin.first().subscribe((user:User)=> {
            UserLog.login(this, user.id).subscribe();
            this.success(`Hello ${user.name}`)
            this.settingService.ViewMode =  user.IsAdmin?'admin':'lms'
        });
        this.appEvent.onUnauthorizedAccess.first().subscribe(()=> {
            this.error('Access denied. You must login again!')
            this.authService.logout();
        });
        this.menuService.onShowSetting.subscribe(()=> {
            this.settingDialog.show();
        })
    }

    ngOnInit() {
    }

    onWrapperClick() {
        if (!this.menuClick && !this.menuButtonClick) {
            this.mobileMenuActive = false;
        }

        if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
            this.topbarMenuActive = false;
            this.activeTopbarItem = null;
        }
        this.menuClick = false;
        this.menuButtonClick = false;
        this.topbarMenuClick = false;
        this.topbarMenuButtonClick = false;
    }

    ngAfterViewInit() {
        this.eventManager.showProfileEvents.subscribe(() => {
            this.profieDialog.show(this.ContextUser);
        });
        this.eventManager.changePasswordEvents.subscribe(() => {
            this.changePassDialog.show();
        });
        this.eventManager.topbarMenuEvents.subscribe(() => {
            this.topbarMenuClick = true;
        });
        this.eventManager.topbarRootItemEvents.subscribe((item: any) => {
            if (this.activeTopbarItem === item) {
                this.activeTopbarItem = null;
            } else {
                this.activeTopbarItem = item;
            }
        });
        this.eventManager.menuEvents.subscribe(() => {
            this.menuButtonClick = true;
            if (this.isMobile()) {
                this.mobileMenuActive = !this.mobileMenuActive;
            }
        });
        this.eventManager.topbarMobileMenuEvents.subscribe(() => {
            this.topbarMenuButtonClick = true;
            this.topbarMenuActive = !this.topbarMenuActive;
        });
        this.eventManager.sidebarEvents.subscribe(() => {
            this.menuClick = true;
        });
        this.eventManager.toggleMenuEvents.subscribe(() => {
            this.layoutStatic = !this.layoutStatic;
        });
    }


    isMobile() {
        return window.innerWidth < 640;
    }

}
