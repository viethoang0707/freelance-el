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

    @Input() login: string;

    constructor() { 
      super(); 
    }

    ngOnInit() {
    }

    recoverPassword() {
       this.authService.requestResetPassword(this.login).subscribe(()=> {
         this.success('Reset link will be sent to your email');
       }) 
    }
}

