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

    enroll() {
        if (this.selectedClass) {
            this.courseEnrollDialog.enrollClass(this.course, this.selectedClass);
        }
    }

    loadClasses() {
        CourseClass.listByCourse(this, this.course.id).subscribe(classes => {
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
            this.loadClasses();
        });
    }

    editClass() {
        this.classDialog.show(this.selectedClass);
    }

    deleteClass() {
        CourseMember.listByClass(this, this.selectedClass.id).subscribe((members) => {
            if (members.length)
                this.error(this.translateService.instant('You cannot delete class with member inside'));
            else
                this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                    this.selectedClass.delete(this).subscribe(() => {
                        this.loadClasses();
                    })
                });
        })
    }

    closeClass() {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have close permission for this class.  You will not be able to enroll new members after the class is closed');
            return;
        }
        this.confirm('Are you sure to proceed ?', () => {
            this.selectedClass.close(this).subscribe(() => {
                this.selectedClass.status = 'closed';
                this.success('Class close');
            });
        });
    }

    openClass() {
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have open permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ?.', () => {
            this.selectedClass.open(this).subscribe(() => {
                this.selectedClass.status = 'open';
                this.success('Survey open');
            });
        });

    }
}
