import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SyllabusUtils } from '../../../shared/helpers/syllabus.utils';
import { Group } from '../../../shared/models/elearning/group.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { User } from '../../../shared/models/elearning/user.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { TreeNode, MenuItem } from 'primeng/api';
import { COURSE_UNIT_TYPE, COURSE_UNIT_ICON } from '../../../shared/models/constants';
import { CourseUnitDialog } from '../course-unit-dialog/course-unit-dialog.component';
import { CourseUnitPreviewDialog } from '../course-unit-preview-dialog/course-unit-preview-dialog.component';
import * as _ from 'underscore';
import { SelectCoursesDialog } from '../../../shared/components/select-course-dialog/select-course-dialog.component';
import { Course } from '../../../shared/models/elearning/course.model';

@Component({
    moduleId: module.id,
    selector: 'course-setting-dialog',
    templateUrl: 'course-setting.dialog.component.html',
})
export class CourseSettingDialog extends BaseDialog<Course> {

    @ViewChild(SelectCoursesDialog) coursesDialog: SelectCoursesDialog;

    constructor() {
        super();
    }

    selectCourse() {
        this.coursesDialog.show();
        this.coursesDialog.onSelectCourses.first().subscribe(courses => {
            if (courses && courses.length) {
                this.object.prequisite_course_id = courses[0].id;
                this.object.prequisite_course_id__DESC__ = courses[0].name;
            }
            
        });
    }
}

