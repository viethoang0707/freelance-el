import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, CONTENT_STATUS } from '../../../shared/models/constants'
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

    private tree: TreeNode[];
    private courses: Course[];
    private displayCourses: Course[];
    private selectedGroupNodes: TreeNode[];
    private selectedCourse: any;
    private treeUtils: TreeUtils;
    COURSE_MODE = COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
    }

    ngOnInit() {
        this.buildCoursTree();
        this.loadCourses();
    }

    buildCoursTree() {
        
        Group.listCourseGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
            
        });
    }

    addCourse() {
        var course = new Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(() => {
            var duplicateCates = _.filter(this.courses, obj=> {
                return course.code == obj.code;
            });
            if (duplicateCates.length >=2)
                this.warn(this.translateService.instant('There is another course with same code in database'));
            this.loadCourses();
        });
    }


    editCourse() {
        if (this.selectedCourse)
            this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(() => {
            var duplicateCates = _.filter(this.courses, obj=> {
                return this.selectedCourse.code == obj.code;
            });
            if (duplicateCates.length >=2)
                this.warn(this.translateService.instant('There is another course with same code in database'));
        });
    }

    enrollCourse() {
        if (this.selectedCourse) {
            if (this.selectedCourse.status!='published') {
                this.error(this.translateService.instant('You have to publish the course first'));
                return;
            }
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

    filterCourse() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayCourses = _.filter(this.courses, course => {
                var parentGroupNode =  _.find(this.selectedGroupNodes, node => {
                    return node.data.id == course.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayCourses =  this.courses;
        }
    }
}
