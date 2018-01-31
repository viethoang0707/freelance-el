import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Company } from '../../shared/models/company.model';


@Component({
    moduleId: module.id,
    selector: 'setting-app',
    templateUrl: 'setting-app.component.html',
})
export class SettingAppComponent extends BaseComponent {

    company: Company;
    originCompany: Company;

    constructor() {
        super();
    }

    ngOnInit() {
        this.company =  this.cacheService.UserCompany;
        this.originCompany =  new Company();
        Object.assign(this.originCompany, this.company);
    }

    save() {
    	this.company.save(this).subscribe(()=> {
    		Object.assign(this.originCompany, this.company);
    		this.cacheService.UserCompany = this.company;
            this.messageService
            .add({ severity: 'success', 
            	summary: 'Success', 
            	detail: this.translateService.instant('Setting saved successfully!' )});
        })
    }

    restore() {
    	Object.assign(this.company, this.originCompany);
    }
}

