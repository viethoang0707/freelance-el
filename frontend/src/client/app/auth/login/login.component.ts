import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Credential } from '../../shared/models/credential.model';
import { SettingService } from '../../shared/services/setting.service';
import { Token } from '../../shared/models/cloud/token.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Permission } from '../../shared/models/elearning/permission.model';
import { User } from '../../shared/models/elearning/user.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit {

    private credential: Credential;
    private returnUrl: string;
    private buildMode: string = "<%= BUILD_TYPE %>";

    @Input() remember: boolean;
    @Input() cloudid: string;

    constructor(private route: ActivatedRoute, private router: Router) {
        super();
        this.credential = new Credential();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.credential = this.authService.StoredCredential || new Credential();
        this.remember = this.authService.Remember;
    }

    login() {
        this.authService.login(this.credential, this.cloudid).subscribe(
            resp => {
                let user:User = resp["user"];
                this.appEvent.userLogin(user);
                this.authService.Remember = this.remember;
                if (this.remember)
                    this.authService.StoredCredential = this.credential;
                user.getPermission(this).subscribe(permission => {
                    this.authService.UserPermission = permission;
                    this.router.navigate([this.returnUrl]);
                });
            },
            error => {
                this.error('Login failed.');
            });
    }
}



