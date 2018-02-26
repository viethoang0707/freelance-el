import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/group.model';
import { Course } from '../../../shared/models/course.model';
import { CourseClass } from '../../../shared/models/course-class.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseClassDialog } from '../class-dialog/class-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { SelectItem } from 'primeng/api';
import { CourseEnrollDialog } from '../../enrollment-dialog/enrollment-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-class-list',
    templateUrl: 'class-list.component.html',
    styleUrls: ['class-list.component.css'],
})
export class CourseClassListComponent extends BaseComponent implements OnInit {

    @ViewChild(CourseClassDialog) classDialog: CourseClassDialog;
    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    selectedClass: CourseClass;
    classes: CourseClass[];

    tree: TreeNode[];
    selectedNode: TreeNode;
    selectedCourse: Course;
    courses:Course[];

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    constructor(private treeUtils:TreeUtils) {
        super();
        this.courses = [];
    }

    nodeSelect(event: any) {
        if (this.selectedNode) {
            Course.listByGroupAndMode(this,this.selectedNode.data.id,'group').subscribe(courses => {
                this.courses = courses;
            });
        }
    }

    ngOnInit() {
        this.loadClasses();
        Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
            this.tree = this.treeUtils.buildTree(groups);
        });
    }

    enroll() {
        if (this.selectedClass)
            this.courseEnrollDialog.enrollClass(this.selectedClass);
    }

    loadClasses() {
        var self = this;
        CourseClass.all(this).subscribe(classes => {
            this.classes = classes;
        });
    }

    add() {
        if (this.selectedCourse) {
            var clazz = new CourseClass();
            clazz.course_id =  this.selectedCourse.id;
            this.classDialog.show(clazz);
            this.classDialog.onCreateComplete.subscribe(() => {
                this.loadClasses();
            });
        }
        
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
            this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to delete ?'),
                accept: () => {
                    this.selectedClass.delete(this).subscribe(() => {
                        this.loadClasses();
                        this.selectedClass = null;
                    })
                }
            });
    }
   

}
