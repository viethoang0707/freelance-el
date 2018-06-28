import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Token } from '../../shared/models/cloud/token.model';


@Component({
  moduleId: module.id,
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent extends BaseComponent implements OnInit {

    private actionDone: boolean;
    private token: string;
    private buildMode: string = "<%= BUILD_TYPE %>";
    
    @Input() new_pass: string;
    @Input() confirm_pass: string;
    @Input() cloudid: string;

    constructor(private route: ActivatedRoute, private router: Router) { 
      super(); 
    }

    ngOnInit() {
      this.actionDone =  false;
      this.token = this.route.snapshot.queryParams['token'] || '/';
    }

    resetPassword() {
        this.accApiService.resetPasswordExecute(this.token, this.new_pass, this.cloudid).subscribe(() => {
            this.actionDone =  true;
        });
    }
}

