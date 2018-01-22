


/**
 * Created by quang.nguyen on 26/8/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base/base.component';


/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'change-password-dialog',
    templateUrl: 'change-password-dialog.component.html',

})

export class ChangePasswordDialog extends BaseComponent implements OnInit {

    old_pass: string;
    new_pass: string;
    display: boolean;

    constructor() {
        super();
        this.new_pass = '';
        this.old_pass = '';
        this.display = false;
    }


    ngOnInit() {
    }

    show() {
        this.display = true;
    }

    hide() {
        this.display = false;
    }

    changePass() {
        this.authService.changePass(this.old_pass, this.new_pass).subscribe((resp) => {
            if (resp.success) {
                this.hide();
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Lỗi khi đổi mật khẩu!' });
            }
        });
    }

}
