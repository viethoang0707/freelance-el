import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, COURSE_STATUS } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/course.model';
import { Group } from '../../../shared/models/group.model';
import { CourseDialog } from '../course-dialog/course-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseListComponent extends BaseComponent {

    @ViewChild(CourseDialog) courseDialog: CourseDialog;

    tree: TreeNode[];
    selectedCourse: Course;
    courses: Course[];
    filterGroups: Group[];
    selectedGroupNodes: TreeNode[];
    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;

    constructor(private treeUtils: TreeUtils) {
        super();
        this.filterGroups = [];
    }

    ngOnInit() {
        Group.listByCategory(this,GROUP_CATEGORY.COURSE).subscribe(groups => {
            this.tree = this.treeUtils.buildTree(groups);
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

    delete() {
        if (this.selectedCourse)
            this.confirmationService.confirm({
                message: this.translateService.instant('Are you sure to delete ?'),
                accept: () => {
                    this.selectedCourse.delete(this).subscribe(() => {
                        this.loadCourses();
                    })
                }
            });
    }

    loadCourses() {
        Course.all(this).subscribe(courses => {
            this.courses = courses;
        });
    }

    nodeSelect(event:any) {
        this.filterGroups = _.map(this.selectedGroupNodes, function(node) {
            return node.data;
        });
    }

}
