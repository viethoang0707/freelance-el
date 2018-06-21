import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON } from '../../../shared/models/constants';
import * as _ from 'underscore';
import { SelectCoursesDialog } from '../../../shared/components/select-course-dialog/select-course-dialog.component';
import { Course } from '../../../shared/models/elearning/course.model';
import { ExamSetting } from '../../../shared/models/elearning/exam-setting.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';

@Component({
    moduleId: module.id,
    selector: 'exam-setting-dialog',
    templateUrl: 'exam-setting.dialog.component.html',
})
export class ExamSettingDialog extends BaseComponent {


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

