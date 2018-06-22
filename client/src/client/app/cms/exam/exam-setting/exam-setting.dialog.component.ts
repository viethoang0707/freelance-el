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
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamSetting } from '../../../shared/models/elearning/exam-setting.model';
import { ExamGrade } from '../../../shared/models/elearning/exam-grade.model';
import { BaseModel } from '../../../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'exam-setting-dialog',
    templateUrl: 'exam-setting.dialog.component.html',
})
export class ExamSettingDialog extends BaseComponent {

    private setting: ExamSetting;
    private grades: ExamGrade[];
    private display: boolean;
    private exam: Exam;
    private deletedGrades: ExamGrade[];

    constructor() {
        super();
        this.setting =  new ExamSetting();
        this.grades = [];
        this.deletedGrades = [];
        this.display =  false;
    }

    show(exam:Exam) {
        this.display =  true;
        this.exam = exam;
        this.grades = [];
        this.deletedGrades = [];
        ExamGrade.listByExam(this, exam.id).subscribe(grades=> {
            this.grades =  grades;
        })
        ExamSetting.byExam(this, exam.id).subscribe((setting:ExamSetting)=> {
            if (!setting) {
                setting =  new ExamSetting();
                setting.exam_id =  exam.id;
            }
            this.setting =  setting;
        })
    }

    hide() {
        this.display =  false;
    }

    addGrade() {
        var grade = new ExamGrade();
        grade.exam_id =  this.exam.id;
        this.grades.push(grade);
    }

    removeGrade(grade: ExamGrade) {
        if (grade.id) {
            this.deletedGrades.push(grade);
        } else
            this.grades = _.reject(this.grades, (obj) => {
                return obj == grade;
            });
    }

    saveExamSetting() {
        var deleteApiList = _.map(this.deletedGrades, (grade:ExamGrade)=> {
            return grade.__api__delete();
        });
        var createApiList = [];
        if (this.setting.IsNew)
            createApiList.push(this.setting.__api__create());
        _.each(this.grades,(grade:ExamGrade)=> {
            if (grade.IsNew)
                createApiList.push(grade.__api__create());
        });
        var updateApiList = [];
        if (!this.setting.IsNew)
            updateApiList.push(this.setting.__api__update());
        _.each(this.grades,(grade:ExamGrade)=> {
            if (!grade.IsNew)
                updateApiList.push(grade.__api__update());
        });
        Observable.forkJoin(BaseModel.bulk_create(this,...createApiList),
            BaseModel.bulk_update(this,...updateApiList), BaseModel.bulk_delete(this, ...deleteApiList))
        .subscribe(()=> {
            this.hide();
            this.success(this.translateService.instant('Setting saved successfully'));
        })
    }
}

