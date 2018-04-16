import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Company } from '../../shared/models/elearning/company.model';


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


}

