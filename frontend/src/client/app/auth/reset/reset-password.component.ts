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


  @Input() new_pass: string;
  @Input() confirm_pass: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
  }

  resetPassword() {
   
  }
}

