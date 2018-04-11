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
import { CourseEnrollDialog } from '../../enrollment-dialog/enrollment-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'class-list-dialog',
    templateUrl: 'class-list-dialog.component.html',
    styleUrls: ['class-list-dialog.component.css'],
})
export class ClassListDialogComponent extends BaseComponent implements OnInit {

    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    classes: CourseClass[];

    courses:Course;

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    constructor(private treeUtils:TreeUtils) {
        super();
        this.courses = [];
    }

    ngOnInit() {
        this.loadClasses();
    }

    enroll(class) {
       this.courseEnrollDialog.enrollClass(class);
    }

    loadClasses() {
        var self = this;
        CourseClass.all(this).subscribe(classes => {
            this.classes = classes;
        });
    }

    add() {
        var clazz = new CourseClass();
        clazz.course_id =  this.course.id;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(() => {
            this.loadClasses();
        });        
    }

    edit(class) {
        this.classDialog.show(class);
        this.classDialog.onUpdateComplete.subscribe(() => {
            this.loadClasses();
        });
    }

    delete(class) {
        this.confirm('Are you sure to delete ?', () => {
            this.selectedClass.delete(this).subscribe(() => {
                this.loadClasses();
            })
        });
    }
}
