import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, CONTENT_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { ClassListDialog } from '../class-list/class-list-dialog.component';
import { CourseEnrollDialog } from '../enrollment-dialog/enrollment-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';

@Component({
    moduleId: module.id,
    selector: 'course-enrollment-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseEnrollmentListComponent extends BaseComponent {

    COURSE_MODE = COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private tree: TreeNode[];
    private courses: Course[];
    private displayCourses: Course[];
    private selectedGroupNodes: TreeNode[];
    private selectedCourse: any;
    private treeUtils: TreeUtils;

    @ViewChild(CourseEnrollDialog) courseEnrollDialog: CourseEnrollDialog;
    @ViewChild(ClassListDialog) classListDialog: ClassListDialog;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
    }

    ngOnInit() {
        Group.listCourseGroup(this).subscribe(groups=> {
            this.tree = this.treeUtils.buildGroupTree(groups);
        })
        this.loadCourses();
    }


    enrollCourse() {
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this course'));
            return;
        }
        if (this.selectedCourse) {
            if (this.selectedCourse.mode=='self-study')
                this.courseEnrollDialog.enrollCourse(this.selectedCourse);
            else if (this.selectedCourse.mode=='group')
                this.classListDialog.show(this.selectedCourse);
        }
    }

    loadCourses() {
        Course.allForEnroll(this).subscribe(courses => {
            this.courses = courses;
            this.displayCourses = courses;
            this.displayCourses.sort((course1, course2): any => {
                return (course2.id - course1.id)
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
