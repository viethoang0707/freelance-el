import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, COURSE_STATUS } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { CourseDialog } from '../course-dialog/course-dialog.component';
import { ClassListDialog } from '../../class/class-list/class-list-dialog.component';
import { CourseEnrollDialog } from '../../class/enrollment-dialog/enrollment-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseListComponent extends BaseComponent {

    @ViewChild(CourseDialog) courseDialog: CourseDialog;
    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    @ViewChild(ClassListDialog) classListDialog: ClassListDialog;

    tree: TreeNode[];
    courses: Course[];
    displayCourses: Course[];
    // selectedNode: TreeNode;
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];
    selectedCourse: any;
    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    constructor(private treeUtils: TreeUtils) {
        super();
        this.filterGroups = [];
    }

    ngOnInit() {
        Group.listByCategory(this, GROUP_CATEGORY.COURSE).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        });
        this.loadCourses();
    }

    add() {
        var course = new Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(() => {
            this.loadCourses();
        });
    }

    edit() {
        if (this.selectedCourse)
        this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(() => {
            this.loadCourses();
        });
    }

    enroll() {
        if (this.selectedCourse) {
            if (this.selectedCourse.mode=='self-study')
                this.courseEnrollDialog.enrollCourse(this.selectedCourse);
            else if (this.selectedCourse.mode=='group')
                this.classListDialog.show(this.selectedCourse);
        }
    }

    loadCourses() {
        Course.all(this).subscribe(courses => {
            this.courses = courses;
            this.displayCourses = courses;
            this.displayCourses.sort((course1, course2): any => {
                if (course1.id > course2.id)
                    return -1;
                else if (course1.id < course2.id)
                    return 1;
                else
                    return 0;
            });
        });
    }

    // nodeSelect(event: any) {
    //     console.log(this.selectedNode);
    //     if (this.selectedNode) {
    //         if (this.selectedNode.children.length == 0) {
    //             this.displayCourses = _.filter(this.courses, (course => {
    //                 return course.group_id == this.selectedNode.data.id;
    //             }));
    //         } else {
    //             this.displayCourses = [];
    //             this.selectedNode.children.forEach(node => {
    //                 var filter = _.filter(this.courses, (course => {
    //                     return course.group_id == node.data.id;
    //                 }));
    //                 filter.forEach(course => {
    //                     this.displayCourses.push(course);
    //                 });
    //             });

    //         }
    //     }

    // }


    delete() {
        if (this.selectedCourse)
            this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to delete ?'),
                accept: () => {
                    this.selectedCourse.delete(this).subscribe(() => {
                        this.loadCourses();
                        this.selectedCourse = null;
                    })
                }
            });
    }

}
