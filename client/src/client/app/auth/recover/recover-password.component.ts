import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';


/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'etraining-recover-password',
  templateUrl: 'recover-password.component.html'
})

export class RecoverPasswordComponent extends BaseComponent implements OnInit {

    @Input() recover_email: string;
    @Input() recover_cloud: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router){ super(); }

    ngOnInit() {

    }

    recoverPassword() {
        this.authService.resetPass(this.recover_email, this.recover_cloud).subscribe((resp) => {
              this.messageService.add({severity:'success', summary:'Success', detail:'Hướng dẫn khôi phục mật khẩu đã được gửi đến hòm thư điện tử của bạn.'});
        })
    }

}

