import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { CourseMaterial } from '../../../shared/models/elearning/course-material.model';
import * as _ from 'underscore';

@Component({
	moduleId: module.id,
	selector: 'course-material-dialog',
	templateUrl: 'course-material.dialog.component.html',
})
export class CourseMaterialDialog extends BaseDialog<CourseMaterial> {

	private percentage: number;

	constructor(private ngZone: NgZone) {
		super();
	}

	ngOnInit() {
	}

	uploadFile(file) {
		this.percentage = 0;
		this.apiService.upload_S3(file, this.authService.LoginToken).subscribe(
			data => {
				if (data["result"]) {
					this.ngZone.run(() => {
						this.object.url = data["url"];
						this.object.filename = file.name;
						this.object.material_file_id = data["attachment_id"];
					});
				} else {
					this.ngZone.run(() => {
						this.percentage = +data;
					});
				}
			},
			() => {
			}
		);
	}

	changeFile(event: any) {
		let file = event.files[0];
		this.uploadFile(file);
	}





}

