import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Token } from '../../shared/models/cloud/token.model';


@Component({
  moduleId: module.id,
  selector: 'recover-password',
  templateUrl: 'recover-password.component.html'
})

export class RecoverPasswordComponent extends BaseComponent implements OnInit {

    private buildMode: string = "<%= BUILD_TYPE %>";
    
    @Input() recover_email: string;
    @Input() cloudid: string;


    constructor() { 
      super(); 
    }

    ngOnInit() {
    }

    recoverPassword() {
        this.accApiService.resetPasswordRequest(this.recover_email, this.cloudid).subscribe(() => {
            this.success('Instruction to reset passwrod will be sent to your email.');
        }, (err)=> {
          this.error(err["message"]);
        });
    }
}

