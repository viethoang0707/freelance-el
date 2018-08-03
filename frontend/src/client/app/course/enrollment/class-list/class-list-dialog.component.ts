import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/elearning/group.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { GROUP_CATEGORY, CLASS_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { CourseEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { CourseClassDialog } from '../class-dialog/class-dialog.component';

const CLASS_FIELDS = ['name', 'member_count', 'status', 'course_name', 'supervisor_id', 'start', 'end'];

@Component({
    moduleId: module.id,
    selector: 'class-list-dialog',
    templateUrl: 'class-list-dialog.component.html',
    styleUrls: ['class-list-dialog.component.css'],
})
export class ClassListDialog extends BaseComponent implements OnInit {

    COURSE_MODE = COURSE_MODE;
    CLASS_STATUS = CLASS_STATUS;

    private classes: CourseClass[];
    private selectedClass: any;
    private course: Course;
    private teachers: any;
    private display: boolean;

    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    @ViewChild(CourseClassDialog) classDialog: CourseClassDialog;

    constructor() {
        super();
        this.classes = [];
        this.teachers = [];
    }

    ngOnInit() {

    }

    enroll(courseClass: CourseClass) {
        this.courseEnrollDialog.enrollClass(this.course, courseClass);
    }

    loadClasses() {
        this.course.listClasses(this, CLASS_FIELDS).subscribe(classes => {
            this.classes = classes;
        });
    }

    hide() {
        this.display = false;
    }

    show(course: Course) {
        this.course = course;
        this.display = true;
        this.loadClasses();
    }

    addClass() {
        var clazz = new CourseClass();
        clazz.course_id = this.course.id;
        clazz.course_name = this.course.name;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(() => {
            this.classes = [clazz, ...this.classes];
            this.success('Add class successfully');
        });
    }

    editClass(courseClass: CourseClass) {
        this.classDialog.show(courseClass);
    }

    deleteClass(courseClass: CourseClass) {
        if (courseClass.member_count)
            this.error(this.translateService.instant('You cannot delete class with member inside'));
        else
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                courseClass.delete(this).subscribe(() => {
                    this.selectedClass = null;
                    this.classes = _.reject(this.classes, (obj: CourseClass) => {
                        return courseClass.id == obj.id;
                    });
                    this.success('Delete class successfully');
                })
            });
    }

    closeClass(courseClass: CourseClass) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != courseClass.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this class.  You will not be able to enroll new members after the class is closed'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            courseClass.close(this).subscribe(() => {
                courseClass.status = 'closed';
                this.success(this.translateService.instant('Class close'));
            });
        });
    }

    openClass(courseClass: CourseClass) {
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != courseClass.supervisor_id) {
            this.error(this.translateService.instant('You do not have open permission for this class'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            courseClass.open(this).subscribe(() => {
                courseClass.status = 'open';
                this.success(this.translateService.instant('Class open'));
            });
        });

    }
}
