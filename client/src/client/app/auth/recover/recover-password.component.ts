import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { CloudAccount } from '../../shared/models/cloud/cloud-account.model';


@Component({
  moduleId: module.id,
  selector: 'recover-password',
  templateUrl: 'recover-password.component.html'
})

export class RecoverPasswordComponent extends BaseComponent implements OnInit {

    account: CloudAccount;
    @Input() recover_email: string;

    constructor() { 
      super(); 
    }

    ngOnInit() {
      this.account =  this.cacheService.CloudAcc;
    }

    recoverPassword() {
        this.authService.resetPass(this.recover_email, this.account.id).subscribe(() => {
            this.success('Password recovery instruction sent to your email')
        });
    }
}

