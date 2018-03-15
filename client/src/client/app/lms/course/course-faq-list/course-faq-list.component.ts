import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { CourseMember } from '../../../shared/models/course-member.model';
import { Course } from '../../../shared/models/course.model';
import { CourseFaq } from '../../../shared/models/course-faq.model';
import { CourseFaqDialog } from '../course-faq/course-faq.dialog.component';


@Component({
	moduleId: module.id,
	selector: 'etraining-course-faq-list-dialog',
	templateUrl: 'course-faq-list.component.html',
})
export class CourseFaqListDialog extends BaseDialog<CourseFaq> {

	display: boolean;
	course: Course;
	selectedFaq: CourseFaq;
	faqs: CourseFaq[];
	@ViewChild(CourseFaqDialog) faqDialog: CourseFaqDialog;

	constructor() {
		super();
		this.display = false;
		this.faqs = [];
	}

	show(course: Course) {
		this.display = true;
		this.course = course;
		this.loadFaqs();
	}

	loadFaqs() {
		CourseFaq.listByCourse(this, this.course.id)
			.subscribe(faqs => {
				this.faqs = faqs;
			})
	}

	hide() {
		this.display = false;
	}

	add() {
		var faq = new CourseFaq();
		faq.course_id = this.course.id;
		this.faqDialog.show(faq);
		this.faqDialog.onCreateComplete.subscribe(() => {
			this.loadFaqs();
		});


	}

	edit() {
		if (this.selectedFaq)
			this.faqDialog.show(this.selectedFaq);
		this.faqDialog.onUpdateComplete.subscribe(() => {
			this.loadFaqs();
		});
	}

	delete() {
		if (this.selectedFaq)
			this.confirmationService.confirm({
				message: this.translateService.instant('Are you sure to delete ?'),
				accept: () => {
					this.selectedFaq.delete(this).subscribe(() => {
						this.loadFaqs();
						this.selectedFaq = null;
					})
				}
			});
	}
}
