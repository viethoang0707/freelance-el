import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'etraining-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {
    credential: Credential;
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
        this.remember = (this.credential.username != "" && this.credential.password != "");
    }

    login() {
        this.authService.login(this.credential, this.cloudid)
            .subscribe(
            user => {
                this.authService.saveCredential(this.credential, this.remember);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Thông tin đăng nhập không đúng.' });
            });
    }
}


