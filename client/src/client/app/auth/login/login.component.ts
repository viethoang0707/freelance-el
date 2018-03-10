import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';
import { CacheService } from '../../shared/services/cache.service';
import { Company } from '../../shared/models/company.model';

@Component({
    moduleId: module.id,
    selector: 'etraining-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
    credential: Credential;
    company: Company;
    returnUrl: string;
    mode: string = '<%= BUILD_TYPE %>';

    @Input() remember: boolean;
    @Input() cloudid: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {
        super();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.authService.StoredCredential;
        console.log(this.credential);
        this.remember = this.authService.Remember;
        this.company =  this.cacheService.UserCompany;
    }

    login() {
        this.authService.login(this.credential, this.cloudid)
            .subscribe(
            user => {
                this.authService.saveCredential(this.credential, this.remember);
                this.authService.CurrentUser.getCompany(this).subscribe(company => {
                    this.cacheService.UserCompany =  company;
                });
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translateService.instant('Login failed.') });
            });
    }
}


