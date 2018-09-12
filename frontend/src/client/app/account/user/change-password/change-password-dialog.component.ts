import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base/base.component';

@Component({
    moduleId: module.id,
    selector: 'change-password-dialog',
    templateUrl: 'change-password-dialog.component.html',
})

export class ChangePasswordDialog extends BaseComponent {

    @Input() old_pass: string;
    @Input() new_pass: string;
    display: boolean;

    constructor() {
        super();
        this.new_pass = '';
        this.old_pass = '';
        this.display = false;
    }

    show() {
        this.display = true;
    }

    hide() {
        this.display = false;
    }

    changePass() {
        this.ContextUser.changePassword(this, this.old_pass, this.new_pass).subscribe((resp) => {
            this.success('Action completed');
            this.hide();

        }, () => {
            this.error('Action failed');

        });
    }

}