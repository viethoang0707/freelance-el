import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Company } from '../../shared/models/company.model';

@Component({
  moduleId: module.id,
  selector: 'etraining-recover-password',
  templateUrl: 'recover-password.component.html'
})

export class RecoverPasswordComponent extends BaseComponent implements OnInit {

    @Input() recover_email: string;
    @Input() recover_cloud: string;
    company: Company;
    mode: string = '<%= BUILD_TYPE %>';

    constructor() { 
      super(); 
    }

    ngOnInit() {
      this.company =  this.cacheService.UserCompany;
    }

    recoverPassword() {
        this.authService.resetPass(this.recover_email, this.recover_cloud).subscribe((resp) => {
              this.messageService
              .add({
                severity:'success', 
                summary:'Success', 
                detail: this.translateService.instant('Password recovery instruction sent to your email')
              });
        })
    }

}

