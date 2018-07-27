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

  private token: string;

  @Input() new_pass: string;
  @Input() confirm_pass: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    this.accApiService.resetPasswordExecute(this.token, this.new_pass).subscribe(() => {
      this.success('Your password has been reset successfully.');
    }, (err) => {
      this.error(err["message"]);
    });
  }
}

