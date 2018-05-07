import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';
import { CacheService } from '../../shared/services/cache.service';
import { CloudAccount } from '../../shared/models/cloud/cloud-account.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Permission } from '../../shared/models/elearning/permission.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
    credential: Credential;
    account: CloudAccount;
    returnUrl: string;
    buildMode: string = "<%= BUILD_TYPE %>";

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
        if (this.buildMode=='prod') {
            this.apiService.cloudInfo().subscribe(account=> {
                this.authService.CloudAcc = this.account = account;
            });
        }
    }

    getCloudInfo():Observable<any> {
        if (this.authService.CloudAcc)
            return Observable.of(this.authService.CloudAcc);
        else {
            if (this.buildMode=='prod')
                return this.apiService.cloudInfo();
            else
                return this.apiService.cloudInfo(this.cloudid);
        }
    }

    login() {
        this.getCloudInfo().subscribe((acc)=> {
            this.authService.CloudAcc = acc;
            this.authService.login(this.credential).subscribe(
                user => {
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



