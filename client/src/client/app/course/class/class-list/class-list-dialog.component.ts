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
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE } from '../../../shared/models/constants'
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

    private classes: CourseClass[];
    private selectedClass: any;
    private course:Course;
    private teachers: any;
    private display: boolean;

    COURSE_MODE = COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

    constructor() {
        super();
        this.classes = [];
        this.teachers = [];
    }

    ngOnInit() {
        
    }

    enroll() {
        if (this.selectedClass)
          this.courseEnrollDialog.enrollClass(this.course, this.selectedClass);
    }

    loadClasses() {
        this.startTransaction();
        CourseClass.listByCourse(this, this.course.id).subscribe(classes => {
            this.classes = classes;
            this.closeTransaction();
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
        clazz.course_id =  this.course.id;
        clazz.course_name =  this.course.name;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(() => {
            this.loadClasses();
        });        
    }

    editClass() {
        if (this.selectedClass)
            this.classDialog.show(this.selectedClass);
    }

    deleteClass() {
        if (this.selectedClass) {
            CourseMember.listByClass(this, this.selectedClass.id).subscribe((members)=> {
                if (members.length)
                    this.error(this.translateService.instant('You cannot delete class with member inside'));
                else
                    this.confirm('Are you sure to delete ?', () => {
                        this.selectedClass.delete(this).subscribe(() => {
                            this.loadClasses();
                        })
                    });
            })
        }
    }
}
