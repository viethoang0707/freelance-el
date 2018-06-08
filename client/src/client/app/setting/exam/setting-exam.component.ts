import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseComponent } from '../../shared/components/base/base.component';
import { ExamSetting } from '../../shared/models/elearning/exam-setting.model';
import { ExamGrade } from '../../shared/models/elearning/exam-grade.model';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'setting-exam',
    templateUrl: 'setting-exam.component.html',
    styleUrls: ['setting-exam.component.css'],
})
export class SettingExamComponent extends BaseComponent implements OnInit {

	private setting: ExamSetting;
	private grades: ExamGrade[];

    constructor() {
        super();
        this.setting =  new ExamSetting();
        this.grades = [];
    }

    ngOnInit() {
    	this.loadExamGrade();
    }

    loadExamGrade() {
		this.startTransaction();
		ExamGrade.all(this).subscribe(grades => {
			this.grades = grades;
			this.closeTransaction();
		});
	}

	loadSetting() {
		ExamSetting.appSetting(this).subscribe(setting=> {
			if (setting)
				this.setting =  setting;
		});
	}

	addGrade() {
		var grade = new ExamGrade();
		this.grades.push(grade);
	}

	removeGrade(grade: ExamGrade) {
		if (grade.id) {
			this.startTransaction();
			grade.delete(this).subscribe(() => {
				this.grades = _.reject(this.grades, (obj) => {
					return obj == grade;
				});
				this.closeTransaction();
			})
		} else
			this.grades = _.reject(this.grades, (obj) => {
				return obj == grade;
			});
	}

	saveExamSetting() {
		var subscriptions = _.map(this.grades, grade=> {
			return grade.save(this);
		})
		subscriptions.push(this.setting.save(this));
		Observable.forkJoin(subscriptions).subscribe(()=> {
			this.success(this.translateService.instant('Setting saved successfully'));
		})
	}

}

