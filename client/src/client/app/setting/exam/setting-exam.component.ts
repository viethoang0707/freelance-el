import { Component, OnInit, Input} from '@angular/core';
import { Observable}     from 'rxjs/Observable';
import { ModelAPIService } from '../../shared/services/api/model-api.service';
import { AuthService } from '../../shared/services/auth.service';
import { BaseComponent } from '../../shared/components/base/base.component';
import { ExamSetting } from '../../shared/models/elearning/exam-setting.model';
import { ExamGrade } from '../../shared/models/elearning/exam-grade.model';
import * as _ from 'underscore';
import { BaseModel } from '../../shared/models/base.model';

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
    	BaseModel
    	.bulk_search(this,
    		ExamGrade.__api__all(),
    		ExamSetting.__api__all())
    	.subscribe(jsonArr=> {
    		this.grades =  ExamGrade.toArray(jsonArr[0]);
    		var settings = ExamSetting.toArray(jsonArr[1]);
    		if (settings.length)
    			this.setting = settings[0];
    	})
    }

	addGrade() {
		var grade = new ExamGrade();
		this.grades.push(grade);
	}

	removeGrade(grade: ExamGrade) {
		if (grade.id) {
			grade.delete(this).subscribe(() => {
				this.grades = _.reject(this.grades, (obj) => {
					return obj == grade;
				});
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

