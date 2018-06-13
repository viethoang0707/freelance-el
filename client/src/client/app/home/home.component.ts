import { Component, ElementRef, Renderer, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDialog } from './change-password-dialog/change-password-dialog.component';
import { AuthService } from '../shared/services/auth.service';
import { BaseComponent } from '../shared/components/base/base.component';
import * as _ from 'underscore';
import { HomeEventManager } from './home-manager.service';
import { UserProfileDialog } from '../account/user/profile-dialog/profile-dialog.component';
import { LoadingService } from '../shared/services/loading.service';
import { UserLog } from '../shared/models/elearning/log.model';
import { Group } from '../shared/models/elearning/group.model';
import { BaseModel } from '../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {

    @ViewChild(ChangePasswordDialog) passwordDialog: ChangePasswordDialog;
    @ViewChild(UserProfileDialog) userProfileDialog: UserProfileDialog;

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
    loading: boolean;

    constructor( private router: Router, private eventManager :HomeEventManager,loadingService: LoadingService) {
        super();
        this.loading =  false;
        loadingService.onStart.subscribe(()=> {
            this.loading = true;
        });
        loadingService.onFinish.subscribe(()=> {
            this.loading = false;
        });
        router.navigate(['/dashboard']);
    }

    ngOnInit() {
        // Pre-loading cache
        BaseModel.bulk_search(this,Group.__api__all()).subscribe();
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
        this.eventManager.changePasswordEvents.subscribe(() => {
            this.passwordDialog.show();
        });
        this.eventManager.showProfileEvents.subscribe(() => {
            var user = this.authService.UserProfile;
            this.userProfileDialog.show(user);
        });
        this.eventManager.logoutEvents.subscribe(() => {
            UserLog.logout(this, this.authService.UserProfile.id).subscribe();
            this.authService.logout();
            this.router.navigate(['/auth']);
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
