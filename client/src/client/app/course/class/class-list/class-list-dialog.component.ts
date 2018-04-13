import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/elearning/group.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { CourseEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { CourseClassDialog } from '../class-dialog/class-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'class-list-dialog',
    templateUrl: 'class-list-dialog.component.html',
    styleUrls: ['class-list-dialog.component.css'],
})
export class ClassListDialog extends BaseComponent implements OnInit {

    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    @ViewChild(CourseClassDialog) classDialog : CourseClassDialog;

    classes: CourseClass[];
    selectedClass: any;
    courses:Course;
    teachers: any;

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    constructor() {
        super();
        this.classes = [];
        this.teachers = [];
    }

    ngOnInit() {
        
    }

    enroll() {
        if (this.selectedClass)
          this.courseEnrollDialog.enrollClass(this.selectedClass);
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

    add() {
        var clazz = new CourseClass();
        clazz.course_id =  this.course.id;
        clazz.course_name =  this.course.name;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(() => {
            this.loadClasses();
        });        
    }

    edit() {
        if (this.selectedClass)
            this.classDialog.show(this.selectedClass);
        this.classDialog.onUpdateComplete.subscribe(() => {
            this.loadClasses();
        });
    }

    delete() {
        if (this.selectedClass)
        this.confirm('Are you sure to delete ?', () => {
            this.selectedClass.delete(this).subscribe(() => {
                this.loadClasses();
            })
        });
    }
}
