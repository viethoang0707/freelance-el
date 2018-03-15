import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { Course } from '../../../shared/models/course.model';
import { CourseMaterial } from '../../../shared/models/course-material.model';
import { CourseMaterialDialog } from '../course-material/course-material.dialog.component';


@Component({
	moduleId: module.id,
	selector: 'etraining-course-material-list-dialog',
	templateUrl: 'course-material-list.component.html',
})
export class CourseMaterialListDialog extends BaseComponent {

	display: boolean;
	course: Course;
	selectedMaterial: CourseMaterial;
	materials: CourseMaterial[];
	@ViewChild(CourseMaterialDialog) materialDialog: CourseMaterialDialog;

	constructor() {
		super();
		this.display = false;
		this.materials = [];
	}

	show(course: Course) {
		this.display = true;
		this.course = course;
		this.loadMaterials();
	}

	loadMaterials() {
		CourseMaterial.listByCourse(this, this.course.id)
			.subscribe(materials => {
				this.materials = materials;
			})
	}

	hide() {
		this.display = false;
	}

	add() {
		var material = new CourseMaterial();
		material.course_id = this.course.id;
		this.materialDialog.show(material);
		this.materialDialog.onCreateComplete.subscribe(() => {
			this.loadMaterials();
		});


	}

	edit() {
		if (this.selectedMaterial)
			this.materialDialog.show(this.selectedMaterial);
		this.materialDialog.onUpdateComplete.subscribe(() => {
			this.loadMaterials();
		});
	}

	delete() {
		if (this.selectedMaterial)
			this.confirmationService.confirm({
				message: this.translateService.instant('Are you sure to delete ?'),
				accept: () => {
					this.selectedMaterial.delete(this).subscribe(() => {
						this.loadMaterials();
						this.selectedMaterial = null;
					})
				}
			});
	}
}
