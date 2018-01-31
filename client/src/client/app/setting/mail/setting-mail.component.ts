import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseComponent } from '../../shared/components/base/base.component';
import { SMTP } from '../../shared/models/smtp.model';


@Component({
    moduleId: module.id,
    selector: 'setting-mail',
    templateUrl: 'setting-mail.component.html',
})
export class SettingMailComponent extends BaseComponent {

    smtp: SMTP;
    originSmtp: SMTP;

    constructor() {
        super();
        this.smtp =  new SMTP();
    }

    ngOnInit() {
    	SMTP.all(this).subscribe(configs => {
    		this.smtp = configs[0];
    		this.originSmtp =  new SMTP();
    		Object.assign(this.originSmtp, this.smtp);
    	});        
    }

    save() {
    	this.smtp.save(this).subscribe(()=> {
    		Object.assign(this.originSmtp, this.smtp);
            this.messageService
            .add({ severity: 'success', 
            	summary: 'Success', 
            	detail: this.translateService.instant('Setting saved successfully!' )});
        })
    }

    restore() {
    	Object.assign(this.smtp, this.originSmtp);
    }
}

