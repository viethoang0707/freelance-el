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

    @Input() recover_email: string;

    constructor() { 
      super(); 
    }

    ngOnInit() {
    }

    recoverPassword() {
        this.authService.resetPass(this.recover_email).subscribe(() => {
            this.success('Password recovery instruction sent to your email')
        });
    }
}

