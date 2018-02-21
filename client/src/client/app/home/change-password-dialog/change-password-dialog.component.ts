import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';

@Component({
    moduleId: module.id,
    selector: 'change-password-dialog',
    templateUrl: 'change-password-dialog.component.html',
})

export class ChangePasswordDialog extends BaseComponent implements OnInit {

    @Input() old_pass: string;
    @Input() new_pass: string;
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
                this.messageService
                .add(
                    { 
                        severity: 'error', 
                        summary: 'Error', 
                        detail: this.translateService.instant('Error change password!') });
            }
        });
    }

}
