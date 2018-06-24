import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, CONTENT_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { CourseDialog } from '../course-dialog/course-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';

@Component({
    moduleId: module.id,
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseListComponent extends BaseComponent {

    COURSE_MODE = COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private tree: TreeNode[];
    private courses: Course[];
    private displayCourses: Course[];
    private selectedGroupNodes: TreeNode[];
    private selectedCourse: any;
    private treeUtils: TreeUtils;

    @ViewChild(CourseDialog) courseDialog: CourseDialog;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
    }

    ngOnInit() {
        Group.listCourseGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
        })
        this.loadCourses();
    }

    checkDuplicate(course: Course) {
        var duplicates = _.filter(this.courses, (obj: Course) => {
            return course.code == obj.code;
        });
        if (duplicates.length >= 2)
            this.warn(this.translateService.instant('There is another course with same code in database'));
    }

    addCourse() {
        var course = new Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(() => {
            this.checkDuplicate(course);
            this.loadCourses();
        });
    }

    editCourse() {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have edit permission for this course');
            return;
        }
        this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(() => {
            this.checkDuplicate(this.selectedCourse);
        });
    }

    requestReview() {
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have submit-review permission for this course');
            return;
        }
        this.workflowService.createCourseReviewTicket(this, this.selectedCourse).subscribe(()=> {
            this.success('Request submitted');
            this.selectedCourse.refresh(this).subscribe();
        });
    }

    deleteCourse() {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have delete permission for this course');
            return;
        }
        this.confirm('Are you sure to delete ?', () => {
            this.selectedCourse.delete(this).subscribe(() => {
                this.loadCourses();
                this.selectedCourse = null;
            })
        });
    }

    loadCourses() {
        Course.all(this).subscribe(courses => {
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
                var parentGroupNode = _.find(this.selectedGroupNodes, node => {
                    return node.data.id == course.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayCourses = this.courses;
        }
    }
}

