import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';
import { SettingService } from '../../shared/services/setting.service';
import { CloudAccount } from '../../shared/models/cloud/cloud-account.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Permission } from '../../shared/models/elearning/permission.model';
import { UserLog } from '../../shared/models/elearning/log.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
    
    private credential: Credential;
    private account: CloudAccount;
    private returnUrl: string;
    private buildMode: string = "<%= BUILD_TYPE %>";

    @Input() remember: boolean;
    @Input() cloudid: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        super();
        this.account = new CloudAccount();
        this.credential =  new Credential();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.authService.StoredCredential || new Credential();
        this.remember = this.authService.Remember;
    }

    getCloudInfo():Observable<any> {
        if (this.buildMode=='prod')
            return this.cloudApiService.cloudInfo();
        else
            return this.cloudApiService.cloudInfo(this.cloudid);
    }

    login() {
        this.getCloudInfo().subscribe((acc)=> {
            this.authService.CloudAcc = acc;
            this.authService.login(this.credential).subscribe(
                user => {
                    UserLog.login(this, user.id).subscribe();
                    this.authService.Remember = this.remember;
                    this.authService.UserProfile = user;
                    if (this.remember)
                        this.authService.StoredCredential = this.credential;
                    user.getPermission(this).subscribe(permission=> {
                        this.authService.UserPermission =  permission;
                        this.router.navigate([this.returnUrl]);
                    });
                },
                error => {
                    this.error('Login failed.');
                });
        });
    }
}



