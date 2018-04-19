import { Component, OnInit, Input, NgZone} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseCertificate } from '../../../shared/models/elearning/course-certificate.model';
import * as _ from 'underscore';



@Component({
    moduleId: module.id,
    selector: 'course-certificate-dialog',
    templateUrl: 'course-certificate.dialog.component.html',
})
export class CourseCertificateDialog extends BaseDialog<CourseCertificate> {

	constructor() {
		super();
	}

	ngOnInit() {
	}

}

