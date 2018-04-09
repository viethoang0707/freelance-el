import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';
import { CacheService } from '../../shared/services/cache.service';
import { CloudAccount } from '../../shared/models/cloud/cloud-account.model';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
    credential: Credential;
    account: CloudAccount;
    returnUrl: string;
    productionMode: boolean = '<%= BUILD_TYPE %>==' =='prod';

    @Input() remember: boolean;
    @Input() cloudid: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        super();
        this.account = new CloudAccount();
        this.credential =  new Credential();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.cacheService.StoredCredential || new Credential();
        this.remember = this.cacheService.Remember;
        if (this.productionMode) {
            this.apiService.cloudInfo().subscribe(acc=> {
                this.cacheService.CloudAcc = aaccount = cc;
            });
        }
    }

    getCloudInfo():Observable<any> {
        if (this.cacheService.CloudAcc)
            return Observable.of(this.cacheService.CloudAcc);
        else {
            if (this.productionMode)
                return this.apiService.cloudInfo();
            else
                return this.apiService.cloudInfo(this.cloudid);
        }
    }

    login() {
        this.getCloudInfo().subscribe((acc)=> {
            this.cacheService.CloudAcc = acc;
            this.authService.login(this.credential).subscribe(
                user => {
                    this.cacheService.Remember = this.remember;
                    this.cacheService.UserProfile = user;
                    if (this.remember)
                        this.cacheService.StoredCredential = this.credential;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error('Login failed.');
                });
        });
    }
}



