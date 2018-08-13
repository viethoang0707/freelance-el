import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
        this.setting = new ExamSetting();
        this.grades = [];
        this.deletedGrades = [];
        this.display = false;
    }

    show(exam: Exam) {
        this.display = true;
        this.exam = exam;
        this.grades = [];
        this.deletedGrades = [];
        exam.listGrades(this).subscribe(grades => {
            this.grades = grades;
        })
        exam.populateSetting(this).subscribe(() => {
            this.setting = exam.setting;
        })
    }

    hide() {
        this.display = false;
    }

    addGrade() {
        var grade = new ExamGrade();
        grade.name = 'New grade';
        grade.exam_id = this.exam.id;
        this.grades.push(grade);
    }


    saveExamSetting() {
        this.setting.save(this).subscribe(() => {
            var existGrades = _.filter(this.grades, (grade:ExamGrade)=> {
                return !grade.IsNew && (grade.name && grade.name !='');
            });
            var newGrades = _.filter(this.grades, (grade:ExamGrade)=> {
                return grade.IsNew && (grade.name && grade.name !='');
            });
            var deleteGrades = _.filter(this.grades, (grade:ExamGrade)=> {
                return !grade.IsNew && (!grade.name || grade.name ==='');
            });
            Observable.forkJoin(ExamGrade.updateArray(this, existGrades),
                ExamGrade.createArray(this, newGrades), 
                ExamGrade.deleteArray(this, deleteGrades))
            .subscribe(()=> {
                    this.success(this.translateService.instant('Setting saved successfully.'));
                    this.hide();

            });
        });
    }
}

